<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" class="form-control" id="email" v-model="email" required />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password" v-model="password" required />
    </div>
    <div class="form-group">
      <span>
        Don't have an account?
        <a href="/signup">Sign up</a> here
      </span>
    </div>
    <button type="submit" class="btn btn-primary w-100">Login</button>
    <a href="/">
      <div class="btn btn-primary w-100" style="background-color:#db8261;margin-top:10px">Go Back</div>
    </a>
  </form>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    onSubmit() {
      let formData = {
        email: this.email,
        password: this.password
      };
      this.$swal.showLoading();
      this.$emit("form-submitted", formData);
      this.email = null;
      this.password = null;
    }
  }
};
</script>