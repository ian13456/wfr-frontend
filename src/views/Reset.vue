<template>
  <div id="wrapper"></div>
</template>

<script>
// TODO: ADD SOME TEXT

export default {
  name: 'Confirm',
  mounted() {
    const { token } = this.$route.params

    this.axios
      .post('user/password', { token })
      .then(() => {
        this.$swal
          .fire({
            icon: 'success',
            title: 'Successfully reset password!',
            allowOutsideClick: false
          })
          .then(() => {
            this.$router.push('/dashboard')
          })
      })
      .catch(() => {})
  }
}
</script>
