<template>
  <el-container>
    <el-header >
    </el-header>
<el-main>
      <div>
        <div>Welcome! Finish setting up your account</div>
<div v-if="error" class="error">
          {{ error }}
        </div>
<el-form ref="form" :model="form">
          <el-form-item>
            <label>First name</label>
            <el-input v-model="form.firstname" placeholder="Your first name"></el-input>
            <label>Last name</label>
            <el-input v-model="form.lastname" placeholder="Your last name"></el-input>
            <label>Password</label>
            <el-input v-model="form.password" type="password" placeholder="Password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="signUp">Complete</el-button>
          </el-form-item>
        </el-form>
</div>
</el-main>
  </el-container>
</template>
<script>
import { Signup } from '../constants/query.gql'
export default {
  data() {
    return {
      error: false,
      form: {
        firstname: '',
        lastname: '',
        password: '',
      }
    }
  },
  methods: {
    async signUp() {
      this.$apollo.provider.clients.defaultClient.cache.reset()
      const { firstname, lastname, password } = this.form
      if (!(firstname && lastname && password)) {
        this.error = 'Please complete the form'
        return
      }
      console.log("firstname: " + firstname + " lastname: " + lastname + " password: " + password + " id: " + this.$route.params.id);
      this.$apollo.mutate({
        mutation: Signup,
        variables: {
          id: this.$route.params.id,
          firstName: firstname,
          lastName: lastname,
          password
        }
      }).then(({data: {signUp}}) => {
        const id = signUp.user.id
        const token = signUp.token
        this.saveUserData(id, token)
        this.$router.push({name: 'workspace'})
      }).catch((error) => {
        this.error = 'Something went wrong'
        console.log(error)
      })
    },
    saveUserData (id, token) {
      localStorage.setItem('user-id', id)
      localStorage.setItem('user-token', token)
      this.$root.$data.userId = localStorage.getItem('user-id')
    },
  }
}
</script>