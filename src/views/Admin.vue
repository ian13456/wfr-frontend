<template>
  <div id="admin-wrapper">
    <div>
      <a href="/">
        <img src="../assets/images/logo.png" alt="Logo" />
      </a>
    </div>
    <div>
      <h3>
        <h3>Search For User</h3>
        <AdminForm @form-submitted="submitForm"></AdminForm>
      </h3>
    </div>
    <ul id="list">
      <li v-for="{ email, email_confirmed, goal_laps, id, is_admin, username } in users" :key="id">
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Full Name</td>
              <td>{{ username }}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{{ email }}</td>
            </tr>
            <tr>
              <td>Email Confirmed</td>
              <td>{{ email_confirmed }}</td>
            </tr>
            <tr>
              <td>Goal Laps</td>
              <td>{{ goal_laps }}</td>
            </tr>
            <tr>
              <td>Is Admin</td>
              <td>{{ is_admin }}</td>
            </tr>
          </tbody>
        </table>
      </li>
    </ul>
  </div>
</template>

<script>
import AdminForm from '../components/AdminForm'

export default {
  name: 'Admin',
  components: { AdminForm },
  data: () => ({ users: null }),
  methods: {
    submitForm({ query }) {
      console.log(query)
      this.axios.get('admin/users', { params: { query: query } }).then(({ data }) => {
        this.users = data.users.map(user => JSON.parse(user))
        console.log(this.users)
      })
    }

    //   this.axios
    //     .post('user/signin', {
    //       email: formData['email'],
    //       password: formData['password']
    //     })
    //     .then(response => {
    //       // localStorage.setItem(
    //       // "jwt",
    //       //  JSON.parse(JSON.stringify(response)).data.access_token
    //       //);
    //       console.log(response)
    //       setCookie(JSON.parse(JSON.stringify(response)).data.access_token)
    //       this.$router.go('/dashboard')

    //       this.$store.commit('setAuthentication', true)
    //       this.$store.commit('setUserData', JSON.parse(response).user)
    //     })
    //     .catch(error => {
    //       this.$swal.fire({
    //         icon: 'error',
    //         title: 'Your email or password is incorrect',
    //         text: error.response.data.message,
    //         footer: '<a href="/signup">Don\'t have an account? Sign up here</a>'
    //       })
    //     })
    // }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/admin.css';
</style>
