<template>
  <div id="wrapper" style="background: #303030"></div>
</template>

<script>
// TODO: ADD SOME TEXT

export default {
  name: 'Confirm',
  beforeCreate: () => {
    document.body.id = 'confirm'
  },
  mounted() {
    const { token } = this.$route.params
    this.axios
      .post('user/confirm', { token })
      .then(() => {
        this.$swal
          .fire({
            icon: 'success',
            title: 'Email successfully confirmed!',
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
