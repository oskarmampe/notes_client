<template>
  <el-container>
    <el-header>
    </el-header>
<el-main>
      <div>
        <h2>Log in</h2>
        
        <div v-if="error" class="error">
          {{ error }}
        </div>
<el-form ref="form" :model="form">
          <el-form-item>
            <label>Email</label>
            <el-input v-model="form.email" placeholder="Email"></el-input>
            <label>Password</label>
            <el-input v-model="form.password" type="password" placeholder="Password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.once="login">Log in</el-button>
          </el-form-item>
        </el-form>
<div>
          <span>Don't have an account?</span>
          <router-link :to="{name: 'home'}" class="link">Create an account</router-link>
        </div>
      </div>
</el-main>
  </el-container>
</template>
<script>
import { Login } from '../constants/query.gql'
export default {
  data() {
    return {
      error: false,
      form: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    async login() {
      this.$apollo.provider.clients.defaultClient.cache.reset();

      const { email, password } = this.form
      if (email && password) {
        this.$apollo.mutate({
          mutation: Login,
          variables: { email, password }
        }).then(async (data) => {
          const login = data.data.login
          const id = login.user.id
          const token = login.token
          console.log(token);
          this.saveUserData(id, token)
          this.$router.push({name: 'workspace'});
          console.log('pushed')
        }).catch((error) => {
          this.error = 'Invalid email or password'
          console.log(error)
        })
      }
    },
    saveUserData (id, token) {
      localStorage.setItem('user-id', id)
      localStorage.setItem('user-token', token)
      this.$root.$data.userId = localStorage.getItem('user-id')
    },
  }
}
</script>
<style scoped>
.el-button {
  width: 100%;
}
</style>
