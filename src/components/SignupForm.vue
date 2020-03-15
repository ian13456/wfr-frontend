<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="name">Full Name</label>
      <input type="text" class="form-control" id="name" v-model="name" required />
    </div>
    <div class="form-group">
      <label for="ID">TAS ID Number (if applicable)</label>
      <input
        type="number"
        class="form-control"
        id="ID"
        v-model="ID"
        maxlength="10"
        pattern="/^-?\d+\.?\d*$/"
        onkeypress="if(this.value.length==8) return false;"
      />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" class="form-control" id="email" v-model="email" required />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password" v-model="password" required />
    </div>
    <div class="form-group">
      <label for="comfirmPassword">Confirm Password</label>
      <input type="password" class="form-control" id="comfirmPassword" v-model="password2" required />
    </div>
    <div class="form-group">
      <span>
        Already have an account?
        <a href="/login">Login</a> here
      </span>
    </div>
    <button type="submit" class="btn btn-primary w-100">Sign Up</button>
    <a href="/">
      <div class="btn btn-primary w-100" style="background-color:#db8261;margin-top:10px">Go Back</div>
    </a>
  </form>
</template>

<script>
export default {
  name: "SignupForm",
  data() {
    return {
      name: null,
      email: null,
      ID: null,
      password: null,
      password2: null
    };
  },
  methods: {
    onSubmit() {
      if (!this.email.includes("@")) {
        this.$swal.fire({
          icon: "error",
          title: "Oh...",
          text: "Please use a valid email."
        });
        return;
      } else if (this.password.length < 8) {
        this.$swal.fire({
          icon: "error",
          title: "Oh...",
          text: "Your password must be longer than 8 characters."
        });
        return;
      } else if (this.password != this.password2) {
        this.$swal.fire({
          icon: "error",
          title: "Oh...",
          text: "Your passwords do not match."
        });
        return;
      }  else {
        this.$swal.showLoading();
      }
      let formData = {
        name: this.name,
        email: this.email,
        ID: this.ID,
        password: this.password
      };
      this.$emit("form-submitted", formData);
      // this.name = null;
      //this.email = null;
      //this.ID = null;
      //this.password = null;
      //this.password2 = null;
    }
  }
};
</script>