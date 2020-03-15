<template>
  <div id="wrapper">
    <nav class="navbar navbar-expand-md navbar-custom w-100" id="navbar">
      <a class="navbar-brand" href="/">
        <img src="../assets/images/logo.png" alt="Icon" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="#navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
        style="outline: 0; border: none;"
      >
        <span class="navbar-toggler-icon w-100 h-100">
          <i class="fas fa-bars fa-lg"></i>
        </span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item mr-4">
            <a href="/" class="nav-link">About Us</a>
          </li>
          <li class="nav-item mr-4">
            <a href="/logout" class="nav-link">Log-out</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container info">
      <div class="row d-flex justify-content-around mb-1" id="info">
        <p id="name">
          <strong>Name:</strong>
          {{ name }}
        </p>
        <p id="status">
          <strong>Status:</strong>
          {{ status }}
        </p>
        <p id="ID">
          <strong>ID Number:</strong>
          {{ ID === '' ? 'Not TAS' : ID }}
        </p>
        <p id="email">
          <strong>Email:</strong>
          {{ email }}
        </p>
        <p id="goal">
          <strong>Goal:</strong>
          {{ goal === 'Loading' ? goal : goal + ' laps' }}
        </p>
      </div>
    </div>
    <div class="container info">
      <div class="row d-flex justify-content-around mt-1" id="info">
        <p id="name">
          <strong>Small T-Shirts:</strong>
          {{ tshirtPurchases.s_count }}
        </p>
        <p id="status">
          <strong>Medium T-Shirts:</strong>
          {{ tshirtPurchases.m_count }}
        </p>
        <p id="ID">
          <strong>Large T-Shirts:</strong>
          {{ tshirtPurchases.l_count }}
        </p>
      </div>
    </div>

    <div class="container-fluid dashboard">
      <div class="row equal justify-content-center">
        <div class="col-12 col-md-6 mt-3 justify-content-center">
          <div class="row" id="panels">
            <div class="col-12">
              <div class="row panel">
                <div class="col-12 col-md-4">
                  <p class="font-weight-bold">Pledging To</p>
                </div>
                <div class="col-12 col-md-4">
                  <p class="font-weight-bold">Flat Donation</p>
                </div>
                <div class="col-12 col-md-4">
                  <p class="font-weight-bold">Per Lap Donation</p>
                </div>
              </div>
              <div
                class="row panel"
                v-if="!pledgedToRows.length && eFlatDonation + eLapDonation === 0"
              >
                <div class="col-12 col-md-4">
                  <p class="font-weight-bold"></p>
                </div>
                <div class="col-12 col-md-4">
                  <p class="font-weight-bold">
                    {{ name === 'Loading...' ? 'Loading...' : 'None (as of now)' }}
                  </p>
                </div>
                <div class="col-12 col-md-4">
                  <p class="font-weight-bold"></p>
                </div>
              </div>
              <DataRow
                v-for="row in pledgedToRows"
                :key="row.id"
                :person="row.pledged_to"
                :pledgeSingle="row.flat_donation"
                :pledgePerLap="row.per_lap_donation"
              ></DataRow>
              <DataRow
                person="W4R Event"
                :pledgeSingle="eFlatDonation"
                :pledgePerLap="eLapDonation"
                v-if="eFlatDonation + eLapDonation > 0"
              ></DataRow>
              <div class="row panel bg-dark" v-if="pledgedToRows.length">
                <div class="col-12 col-md-4">
                  <p>Total (NT$)</p>
                </div>
                <div class="col-12 col-md-4">
                  <p>{{ pledgeToTotal().singleTotal }}</p>
                </div>
                <div class="col-12 col-md-4">
                  <p>{{ pledgeToTotal().lapTotal }}</p>
                </div>
              </div>
              <!--div id="overlay">
                <p class="px-5">
                  I agree that money not collected in cash will be deducted from my ID Card, and the
                  section CANNOT be modified after the deadline
                </p>
                <button type="submit" class="btn btn-primary" id="agree">AGREE</button>
                </div-->
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 mt-3 justify-content-center">
          <div class="row" id="panels">
            <div class="col-12">
              <div class="row panel">
                <div class="col-12 col-md-4">
                  <p class="font-weight-bold">Pledge From</p>
                </div>
                <div class="col-12 col-md-4">
                  <p class="font-weight-bold">Flat Donation</p>
                </div>
                <div class="col-12 col-md-4">
                  <p class="font-weight-bold">Per Lap Donation</p>
                </div>
              </div>
              <div class="row panel" v-if="!pledgeRecievedRows.length">
                <div class="col-12 col-md-4">
                  <p class="font-weight-bold"></p>
                </div>
                <div class="col-12 col-md-4">
                  <p class="font-weight-bold">
                    {{ name === 'Loading...' ? 'Loading...' : 'None (as of now)' }}
                  </p>
                </div>
                <div class="col-12 col-md-4">
                  <p class="font-weight-bold"></p>
                </div>
              </div>
              <DataRow
                v-for="row in pledgeRecievedRows"
                :key="row.id"
                :person="row.pledged_to"
                :pledgeSingle="row.flat_donation"
                :pledgePerLap="row.per_lap_donation"
              ></DataRow>
              <div class="row panel bg-dark" v-if="pledgeRecievedRows.length">
                <div class="col-12 col-md-4">
                  <p>Total (NT$)</p>
                </div>
                <div class="col-12 col-md-4">
                  <p>{{ pledgeRecievedTotal().singleTotal }}</p>
                </div>
                <div class="col-12 col-md-4">
                  <p>{{ pledgeRecievedTotal().lapTotal }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 mt-5">
          <DonationForm @form-submitted="submitDonationForm"></DonationForm>
        </div>

        <div class="col-12 col-md-6 mt-5">
          <ShirtForm @form-submitted="submitShirtForm"></ShirtForm>
        </div>
        <div class="col-12 col-md-4 mt-2 align-self-center" v-if="goal === 0">
          <LapsForm @form-submitted="submitLapsForm"></LapsForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// <div class="container d-flex justify-content-center align-items-center h-100">
//   <h1 v-if="!email_confirmed">Please confirm your account first.</h1>
// </div>
import DataRow from '../components/DataRow.vue'
import ShirtForm from '../components/ShirtForm.vue'
import DonationForm from '../components/DonationForm.vue'
import LapsForm from '../components/LapsForm.vue'
import { getToken } from '../lib/'

export default {
  name: 'Dashboard',
  data() {
    return {
      prevRoute: null,
      name: 'Loading...',
      email: 'Loading...',
      ID: 'Loading...',
      status: 'Running',
      goal: 'Loading',
      emailConfirmed: false,
      tshirtPurchases: {},
      pledgeRecievedRows: [],
      pledgedToRows: [],
      refreshing: null,
      eFlatDonation: 0,
      eLapDonation: 0,
      auth: {
        headers: {
          authorization: `Bearer ${getToken()}`
        }
      }
    }
  },
  components: {
    DataRow,
    DonationForm,
    ShirtForm,
    LapsForm
  },
  methods: {
    pledgeToTotal() {
      let values = { singleTotal: 0, lapTotal: 0 }
      this.pledgedToRows.forEach(row => {
        values.singleTotal += Number(row.flat_donation)
        values.lapTotal += Number(row.per_lap_donation)
      })
      return values
    },
    pledgeRecievedTotal() {
      let values = { singleTotal: 0, lapTotal: 0 }
      this.pledgeRecievedRows.forEach(row => {
        values.singleTotal += row.flat_donation
        values.lapTotal += row.per_lap_donation
      })
      return values
    },
    getInfo() {
      this.axios
        .get('user/me')
        .then(response => {
          let stuff = JSON.parse(JSON.stringify(response))
          let data = JSON.parse(stuff.data)

          this.$store.commit('setAuthentication', true)
          this.$store.commit('setUserData', JSON.parse(response.data))

          this.emailConfirmed = data.email_confirmed
          this.name = data.username
          this.email = data.email
          this.ID = data.school_id
          this.goal = data.goal_laps

          if (!data.email_confirmed) {
            this.$swal
              .fire({
                icon: 'error',
                title: 'Please confirm your email!',
                text:
                  "We just sent you a confirmation email. Please activate account by clicking the link in the email. If you don't get it, check spam or check if your email has been mistyped.",
                showCloseButton: false,
                showCancelButton: false,
                confirmButtonText: 'Back to Home'
              })
              .then(() => {
                this.$router.push('/')
              })
          }
        })
        .catch(error => {
          console.log(error)
          this.$swal
            .fire({
              icon: 'error',
              title: 'Something went wrong with your account...',
              text: 'We had some difficulties logging you into your account.'
            })
            .then(() => {
              this.$router.push('/logout')
            })
        })

      this.axios
        .get('pledge/me')
        .then(response => {
          let stuff = JSON.parse(JSON.stringify(response))

          let pledges = JSON.parse(JSON.stringify(stuff.data.pledges))
          const receives = JSON.parse(JSON.stringify(stuff.data.receives))
          const eventwide = pledges.find(p => p.eventwide)

          if (eventwide) {
            this.eFlatDonation = eventwide.flat_donation
            this.eLapDonation = eventwide.per_lap_donation

            pledges = pledges.filter(p => p !== eventwide)
          }

          console.log(pledges)

          this.pledgeRecievedRows = receives
          this.pledgedToRows = pledges
        })
        .catch(function(error) {
          console.log(error)
        })

      this.axios
        .get('tshirts/me')
        .then(response => {
          let stuff = JSON.parse(JSON.stringify(response))
          this.tshirtPurchases = stuff.data
          // this.tshirtPurchases.s_count
          console.log(this.tshirtPurchases.s_count)
          this.isLoading = false
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    submitDonationForm(formData) {
      if (!this.emailConfirmed) {
        this.$swal.fire({
          icon: 'error',
          title: 'Email not confirmed!',
          text: 'Cannot proceed without email confirmation.'
        })
      }

      const flatPledge = formData.flatPledge
      const lapPledge = formData.lapPledge

      if (formData.eventwide) {
        this.axios
          .post('pledge/event', {
            flat_donation: flatPledge,
            per_lap_donation: lapPledge
          })
          .then(response => {
            this.$swal.fire({
              icon: 'success',
              title: 'Pledge Made',
              text: response.data.message
            })

            this.eFlatDonation = flatPledge
            this.eLapDonation = lapPledge
          })
      } else {
        const person = formData.person

        this.axios
          .post('pledge/to', {
            pledged_email: person,
            flat_donation: flatPledge,
            per_lap_donation: lapPledge
          })
          .then(response => {
            this.$swal.fire({
              icon: 'success',
              title: 'Pledge Made',
              text: response.data.message
            })

            const existing = this.pledgedToRows.find(pledge => pledge.pledged_to === person)

            if (existing) {
              existing.flat_donation = flatPledge
              existing.per_lap_donation = lapPledge
            } else {
              this.pledgedToRows.push({
                id: performance.now(),
                pledged_to: person,
                flat_donation: flatPledge,
                per_lap_donation: lapPledge
              })
            }
          })
          .catch(error => {
            this.$swal.fire({
              icon: 'error',
              title: 'Something went wrong',
              text: error.response.data.message
            })
          })
      }
    },
    submitShirtForm(formData) {
      if (!this.emailConfirmed) {
        this.$swal.fire({
          icon: 'error',
          title: 'Email not confirmed!',
          text: 'Cannot proceed without email confirmation.'
        })
      }

      const sCount = formData['smallShirts']
      const mCount = formData['mediumShirts']
      const lCount = formData['largeShirts']

      this.axios
        .post(
          'tshirts/purchase',
          {
            s_count: sCount == null ? 0 : sCount,
            m_count: mCount == null ? 0 : mCount,
            l_count: lCount == null ? 0 : lCount
          },
          this.auth
        )
        .then(response => {
          this.$swal.fire({
            icon: 'success',
            title: 'Purchase Made',
            text: response.data.message
          })

          this.tshirtPurchases.s_count = Number(this.tshirtPurchases.s_count) + Number(sCount)
          this.tshirtPurchases.m_count = Number(this.tshirtPurchases.m_count) + Number(mCount)
          this.tshirtPurchases.l_count = Number(this.tshirtPurchases.l_count) + Number(lCount)
        })
        .catch(error => {
          this.$swal.fire({
            icon: 'error',
            title: 'Something went wrong',
            text: error.response.data.message
          })
        })
    },
    submitLapsForm({ laps }) {
      if (!this.emailConfirmed) {
        this.$swal.fire({
          icon: 'error',
          title: 'Email not confirmed!',
          text: 'Cannot proceed without email confirmation.'
        })
      }

      this.axios
        .post('user/goal', { laps })
        .then(() => {
          this.$swal.fire({
            icon: 'success',
            title: 'Goal laps recorded',
            text: `Your goal of ${laps} lap(s) has been recorded!`
          })

          this.goal = laps
        })
        .catch(error => {
          this.$swal.fire({
            icon: 'error',
            title: 'Something went wrong',
            text: error.response.data.message
          })
        })
      console.log(laps)
    },
    setInterval() {
      this.refreshing = setInterval(this.getInfo, 1000)
    }
  },
  created() {
    this.getInfo()
    // this.setInterval()
    // if (this.prevRoute === '/login' || this.prevRoute === '/signup') {
    //   this.$swal.fire({
    //     icon: 'success',
    //     title: "You're logged in!",
    //     timer: 1000
    //   })
    // }
  },
  mounted() {},
  beforeDestroy() {
    clearInterval(this.refreshing)
  },
  beforeCreate: () => {
    document.body.id = 'dashboard'
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from.path
    })
  }
}
</script>

<style lang="scss">
@import '../assets/styles/main.scss';
</style>
