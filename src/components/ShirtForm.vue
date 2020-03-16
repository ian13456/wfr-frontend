<template>
  <form class="mb-4" @submit.prevent="onSubmit">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-8">
        <h1>
          Purchase T-Shirts <small style="font-size: .5em" v-if="isEdit">(edit)</small>
        </h1>
      </div>
      <div class="col-12 col-lg-8">
        <div class="form-group">
          <input
            type="number"
            class="form-control w-100"
            name="inputNumber"
            id="inputNumberSmall"
            placeholder="Number of T-Shirts (Small)"
            v-model="smallShirts"
          />
        </div>

        <div class="form-group">
          <input
            type="number"
            class="form-control w-100"
            name="inputNumber"
            id="inputNumberMedium"
            placeholder="Number of T-Shirts (Medium)"
            v-model="mediumShirts"
          />
        </div>

        <div class="form-group">
          <input
            type="number"
            class="form-control w-100"
            name="inputNumber"
            id="inputNumberLarge"
            placeholder="Number of T-Shirts (Large)"
            v-model="largeShirts"
          />
        </div>
      </div>
      <div class="col-12 col-lg-8 custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          id="customCheck"
          required="true"
        />
        <label class="custom-control-label" for="customCheck">
          I agree that money not collected in cash will be deducted from my ID Card, and
          the section CANNOT be modified after the deadline
        </label>
      </div>
      <div class="col-12 col-lg-8">
        <button type="submit" class="btn btn-primary w-100">Submit</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ShirtForm',
  props: ['isEdit'],
  data() {
    return {
      smallShirts: null,
      mediumShirts: null,
      largeShirts: null
    }
  },
  methods: {
    onSubmit() {
      this.smallShirts =
        this.smallShirts == null || isNaN(this.smallShirts) || this.smallShirts < 0
          ? 0
          : this.smallShirts
      this.mediumShirts =
        this.mediumShirts == null || isNaN(this.mediumShirts) || this.mediumShirts < 0
          ? 0
          : this.mediumShirts
      this.largeShirts =
        this.largeShirts == null || isNaN(this.largeShirts) || this.largeShirts < 0
          ? 0
          : this.largeShirts
      this.$swal
        .fire({
          title: 'Confirmation',
          html: `Are you sure you want to ${
            this.isEdit ? 'edit your purchase' : 'make this purchase'
          }?<br><strong>Small:</strong> ${this.smallShirts}<br><strong>Medium:</strong> ${
            this.mediumShirts
          }<br><strong>Large:</strong> ${this.largeShirts}`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, I am sure'
        })
        .then(result => {
          if (!result.value) return

          let formData = {
            smallShirts: this.smallShirts,
            mediumShirts: this.mediumShirts,
            largeShirts: this.largeShirts
          }
          this.$emit('form-submitted', formData)
          this.smallShirts = this.mediumShirts = this.largeShirts = null
        })
    }
  }
}
</script>
