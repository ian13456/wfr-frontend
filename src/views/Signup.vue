<template>
  <div id="wrapper">
    <div class="container">
      <div class="row">
        <a href="/">
          <img src="../assets/images/logo.png" alt="Logo" />
        </a>
      </div>
      <div class="row">
        <div class="col-12 col-md-8 form">
          <h3 class="heading">Create Your Account Now</h3>
          <SignupForm @form-submitted="submitForm"></SignupForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignupForm from '../components/SignupForm.vue'
import { setCookie } from '../lib/'

export default {
  name: 'Signup',
  components: {
    SignupForm
  },
  methods: {
    submitForm(formData) {
      console.log(formData)
      this.axios
        .post('user/signup', {
          email: formData['email'],
          school_id: formData['ID'],
          username: formData['name'],
          password: formData['password'],
          goal_laps: 0
        })
        .then(response => {
          console.log(JSON.parse(JSON.stringify(response)).data.message)
          //  localStorage.setItem(
          //  "jwt",
          //  JSON.parse(JSON.stringify(response)).data.access_token
          // );
          setCookie(JSON.parse(JSON.stringify(response)).data.access_token)
          this.$router.go('/dashboard')
        })
        .catch(error => {
          this.$swal.fire({
            icon: 'error',
            title: 'Something went wrong...',
            text: error.response.data.message,
            footer: '<a href="mailto:w4r@tas.tw" target="_top">Have problems? Contact us</a>'
          })
        })
    }
  },
  beforeCreate: () => {
    document.body.id = 'signup'
  }
}
</script>

<style lang="scss">
@import '../assets/styles/main.scss';
</style>
