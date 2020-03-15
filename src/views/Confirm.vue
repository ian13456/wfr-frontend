<template>
  <div id="wrapper"></div>
</template>

<script>
// TODO: ADD SOME TEXT

export default {
  name: 'Confirm',
  mounted() {
    const { key } = this.$route.params
    this.axios
      .post('user/confirm', { token: key })
      .then(() => {
        this.$router.push('/dashboard')
      })
      .catch(() => {})
  }
}
</script>
