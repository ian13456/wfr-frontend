<template>
  <form @submit.prevent="onSubmit" class="mb-5">
    <div class="form-group">
      <label for="laps" style="font-size: 2em;">Goal Number of Laps</label>
      <input type="number" class="form-control" id="laps" v-model="laps" required />
    </div>
    <button type="submit" class="btn btn-primary w-100">Submit</button>
  </form>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      laps: null
    }
  },
  methods: {
    onSubmit() {
      let formData = {
        laps: this.laps
      }
      this.$emit('form-submitted', formData)
    }
  }
}
</script>
