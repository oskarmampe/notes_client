import Vue from 'vue';
import VueApollo from 'vue-apollo';
import ElementUI from 'element-ui';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { enableExperimentalFragmentVariables } from 'graphql-tag';
import store from './store';
import router from './router';
import App from './App.vue';

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false;

const uri = `${process.env.VUE_APP_URI}/graphql`;
const httpLink = new HttpLink({ uri });

const cache = new InMemoryCache();

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => console.log(`[GraphQL Error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
  }
  if (networkError) console.log(`[Network Error]: ${networkError}`);
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('user-token');
  console.log(token);
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    authMiddleware,
    httpLink,
  ]),
  cache,
  connectToDevTools: true,
});

const apolloProvider = new VueApollo({
  defaultClient: client,
  defaultOptions: {
    $loadingKey: 'loading',
  },
});

Vue.use(VueApollo);

new Vue({
  router,
  provide: apolloProvider.provide(),
  store,
  render: h => h(App),
}).$mount('#app');
