<template>
  <div id="wrapper" style="background: #303030"></div>
</template>

<script>
// TODO: ADD SOME TEXT

export default {
  name: 'Reset',
  beforeCreate: () => {
    document.body.id = 'reset'
  },
  mounted() {
    const { token } = this.$route.params

    this.$swal.queue([
      {
        title: 'Enter New Password',
        confirmButtonText: 'Continue &rarr;',
        text: 'Enter a password you want',
        input: 'password',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showLoaderOnConfirm: true,
        inputValidator: value => {
          return (!value || value.length < 8) && 'Password must be over 8 characters'
        },
        preConfirm: value => {
          this.$swal.insertQueueStep({
            title: 'Repeat the New Password',
            text: 'Repeat the password you entered',
            input: 'password',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showLoaderOnConfirm: true,
            inputValidator: v => {
              return v !== value && 'Passwords do not match.'
            },
            preConfirm: final => {
              console.log(final)
              this.$swal.showLoading()
              this.axios
                .post('user/password', { token, password: final })
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
          })
        }
      }
    ])
  }
}
</script>
