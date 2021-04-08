import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Signup from './views/Signup.vue';
import Login from './views/Login.vue';
import Workspace from './views/Workspace.vue';
import Folder from './views/Folder.vue';
import FolderDetail from './views/FolderDetail.vue';

Vue.use(Router);

const home = {
  path: '/',
  name: 'home',
  component: Home,
  meta: { title: 'Homepage', redirect: true },
};

const signup = {
  path: '/signup/:id',
  name: 'signup',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ './views/Signup.vue'),
  component: Signup,
  meta: { title: 'Signup' },
};

const login = {
  path: '/login',
  name: 'login',
  component: Login,
  meta: { title: 'Login' },
};


const folder = {
  path: 'folder/:id',
  component: Folder,
  props: true,
  children: [{
    path: '',
    name: 'folder',
    component: FolderDetail,
  }],
};

const workspace = {
  path: '/w',
  name: 'workspace',
  component: Workspace,
  meta: { title: 'Current Workspace', requiresAuth: true },
  children: [
    folder,
  ],
};

const router = new Router({
  mode: 'history',
  routes: [
    home,
    signup,
    login,
    workspace,
  ],
});


router.beforeEach((to, from, next) => {
  const auth = localStorage.getItem('user-token');
  console.log('AUTHORIZATION: ' + auth);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth) {
      next(login);
    }
  } else if (to.matched.some(record => record.meta.redirect)) {
    if (auth) {
      next(workspace);
    }
  }
  next();
});

router.afterEach((to, from) => {
  document.title = to.meta.title;
});

export default router;
