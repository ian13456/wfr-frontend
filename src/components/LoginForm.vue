<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" class="form-control" id="email" v-model="email" required />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        type="password"
        class="form-control"
        id="password"
        v-model="password"
        required
      />
    </div>
    <div class="form-group">
      <span>
        Don't have an account?
        <a href="/signup">Sign up</a> here.
        <a v-on:click="forgotPassword">Forgot your password?</a>
      </span>
    </div>
    <button type="submit" class="btn btn-primary w-100">Login</button>
    <a href="/">
      <div class="btn btn-primary w-100" style="background-color:#db8261;margin-top:10px">
        Go Back
      </div>
    </a>
  </form>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    forgotPassword() {
      this.$swal
        .fire({
          icon: 'question',
          title: 'Enter your account email',
          text: "Enter your email and we'll send you a link to reset your password.",
          input: 'email',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Send',
          showLoaderOnConfirm: true,
          preConfirm: value => {
            console.log(value)
            this.axios
              .post('user/reset', { email: value })
              .then(() => {
                return ''
              })
              .catch(error => {
                this.$swal.showValidationMessage(`Request failed: ${error}`)
              })
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        })
        .then(({ dismiss }) => {
          if (!dismiss)
            this.$swal.fire({
              icon: 'success',
              title: `We've sent you an email!`,
              text: 'Check your inbox for a link to reset your password.'
            })
        })
    },
    onSubmit() {
      let formData = {
        email: this.email,
        password: this.password
      }
      this.$swal.showLoading()
      this.$emit('form-submitted', formData)
      this.email = null
      this.password = null
    }
  }
}
</script>
