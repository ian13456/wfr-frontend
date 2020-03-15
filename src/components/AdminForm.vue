<template>
  <form @submit.prevent="onSubmit" id="admin-form">
    <label for="email">Email Search</label>
    <input id="email" v-model="query" />
    <button type="submit">Search</button>
  </form>
</template>

<script>
export default {
  name: 'AdminForm',
  data() {
    return {
      query: null
    }
  },
  methods: {
    onSubmit() {
      let formData = {
        query: this.query
      }
      this.$emit('form-submitted', formData)
      this.query = null
    }
  }
}
</script>
