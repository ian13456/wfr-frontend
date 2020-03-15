<template>
  <div id="wrapper">
    <div class="container" id="signup">
      <div class="row">
        <a href="/">
          <img src="../assets/images/logo.png" alt="Logo" />
        </a>
      </div>
      <div class="row">
        <div class="col-12 col-md-8 form">
          <h3 class="heading">Welcome Back!</h3>
          <LoginForm @form-submitted="submitForm"></LoginForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
import { setCookie } from '../lib/'

export default {
  name: 'Login',
  components: {
    LoginForm
  },
  methods: {
    submitForm(formData) {
      this.axios
        .post('user/signin', {
          email: formData['email'],
          password: formData['password']
        })
        .then(response => {
          // localStorage.setItem(
          // "jwt",
          //  JSON.parse(JSON.stringify(response)).data.access_token
          //);
          console.log(response)
          setCookie(JSON.parse(JSON.stringify(response)).data.access_token)
          this.$router.go('/dashboard')

          // this.$store.commit('setAuthentication', true)
          // this.$store.commit('setUserData', JSON.parse(response).user)
        })
        .catch(error => {
          this.$swal.fire({
            icon: 'error',
            title: 'Something went wrong...',
            text: error.response.data.message,
            footer: '<a href="/signup">Don\'t have an account? Sign up here</a>'
          })
        })
    }
  },
  beforeCreate: () => {
    document.body.id = 'login'
  }
}
</script>

<style lang="scss">
@import '../assets/styles/main.scss';
</style>
