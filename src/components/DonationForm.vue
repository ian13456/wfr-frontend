<template>
  <form class="mb-4" id="donation" @submit.prevent="onSubmit">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-8 custom-pledge-form">
        <h1>Pledge To Others</h1>
        <div>
          <input
            type="checkbox"
            class="custom-control-input"
            id="customCheck1"
            v-model="eventwide"
          />
          <label class="custom-control-label" for="customCheck1">
            Eventwide Donation
          </label>
        </div>
      </div>

      <div class="col-12 col-lg-8" v-if="!eventwide">
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            name="pledging"
            v-model="person"
            required
            placeholder="Search for existing emails..."
          />
        </div>
      </div>
      <div class="col-12 col-lg-8">
        <div class="form-group">
          <input
            type="number"
            class="form-control"
            name="Name"
            id="inputFlatPledge"
            placeholder="Flat Amount (NT$)"
            v-model="flatPledge"
            required
          />
        </div>
      </div>
      <div class="col-12 col-lg-8">
        <div class="form-group">
          <input
            type="number"
            class="form-control"
            name="Name"
            id="inputLapPledge"
            placeholder="Amount Per Lap (NT$)"
            v-model="lapPledge"
            required
          />
        </div>
      </div>
      <div class="col-12 col-lg-8 custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          id="customCheck2"
          required="true"
        />
        <label class="custom-control-label" for="customCheck2">
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
import AutoComplete from 'js-autocomplete'

export default {
  name: 'DonationForm',
  data() {
    return {
      eventwide: false,
      person: null,
      flatPledge: null,
      lapPledge: null,
      queryResults: null
    }
  },
  methods: {
    onSubmit() {
      this.$swal
        .fire({
          title: 'Confirmation',
          html: `Are you sure you want to make this pledge?<br><strong>Pledging To:</strong> ${
            this.eventwide ? 'W4R Event' : this.person
          }<br><strong>Flat Pledge:</strong> ${
            this.flatPledge
          }NT<br><strong>Per Lap Pledge:</strong> ${this.lapPledge}NT`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, I am sure'
        })
        .then(result => {
          if (!result.value) return
          let formData = {
            person: this.person,
            flatPledge: this.flatPledge,
            lapPledge: this.lapPledge,
            eventwide: this.eventwide
          }
          this.$emit('form-submitted', formData)
          this.person = this.flatPledge = this.lapPledge = null
        })
    }
  },
  mounted() {
    this.axios
      .get('user/emails?query=@')
      .then(response => {
        this.queryResults = JSON.parse(JSON.stringify(response)).data.emails
      })
      .catch(function(error) {
        alert(error)
        console.log(JSON.stringify(error))
      })

    new AutoComplete({
      selector: 'input[name="pledging"]',
      minChars: 1,
      source: (term, suggest) => {
        let results = []
        this.queryResults.forEach(element => {
          if (
            element.includes(this.person.toLowerCase()) &&
            this.$parent.email.indexOf('tas.tw') != -1
          ) {
            results.push(element)
          }
        })
        suggest(results)
      },
      onSelect: (event, term) => {
        this.person = term
      }
    })
  }
}
</script>

<style lang="scss">
.autocomplete-suggestions {
  text-align: left;
  cursor: default;
  border: 1px solid #ccc;
  border-top: 0;
  background: #fff;
  box-shadow: -1px 1px 3px rgba(0, 0, 0, 0.1);

  /* core styles should not be changed */
  position: absolute;
  display: none;
  z-index: 9999;
  max-height: 254px;
  overflow: hidden;
  overflow-y: auto;
  box-sizing: border-box;
}
.autocomplete-suggestion {
  position: relative;
  padding: 0 0.6em;
  line-height: 23px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.02em;
  color: #333;
}
.autocomplete-suggestion b {
  font-weight: normal;
  color: #1f8dd6;
}
.autocomplete-suggestion.selected {
  background: #f0f0f0;
}
#editable-select {
  background-color: white;
}
.es-list {
  color: black;
}
</style>
