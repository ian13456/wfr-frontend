import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Confirm from './views/Confirm.vue'
import Reset from './views/Reset.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Dashboard from './views/Dashboard.vue'
import Landing from './views/Landing.vue'
import Admin from './views/Admin.vue'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'
import VueCookies from 'vue-cookies'
import vSelect from 'vue-select'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import Vuex from 'vuex'
import { axios } from './lib'
import 'js-autocomplete'

Vue.config.productionTip = false

Vue.use(VueSweetalert2)
Vue.use(VueAxios, axios)
Vue.use(Vuelidate)
Vue.use(VueCookies)
Vue.use(Vuex)

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.component('v-select', vSelect)

Vue.$cookies.config('3d') //cookies expire after 3 days

const store = new Vuex.Store({
  state: {
    authenticated: false,
    userData: null,
    loading: false
  },
  mutations: {
    setAuthentication(state, status) {
      state.authenticated = status
    },
    setUserData(state, status) {
      state.userData = status
    },
    setLoading(state, status) {
      state.loading = status
    }
  }
})

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { guest: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: { guest: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: { requiresAuth: true },
      beforeEnter: async (to, from, next) => {
        const data = await axios.get('/user/me')
        if (data.is_admin) next()
        else next('/dashboard')
      }
    },
    {
      path: '/confirm/:token',
      component: Confirm,
      meta: { requiresAuth: true }
    },
    {
      path: '/reset/:token',
      Component: Reset,
      meta: { requiresAuth: true }
    },
    { path: '/', component: Landing }
  ]
})

router.beforeEach(function(to, from, next) {
  // const requiresAuth = to.matched.some(route => route.meta.requiresAuth)
  // const guest = to.matched.some(route => route.meta.guest)

  // console.log(to.path)

  // switch (to.path) {
  //   case '/logout': {
  //     Vue.$cookies.remove('jwt')
  //     next({
  //       path: '/login',
  //       params: { nextUrl: to.fullPath }
  //     })
  //     break
  //   }
  //   default: {
  //     const cookie = Vue.$cookies.get('jwt')

  //     if (requiresAuth) {
  //       if (cookie) {
  //         next()
  //       } else {
  //         next({ path: '/login', params: { nextUrl: to.fullPath } })
  //       }
  //     } else {
  //       // let timerInterval
  //       // Vue.swal.fire({
  //       //   title: 'You are already logged in!',
  //       //   html: 'Redirecting to dashboard...',
  //       //   timer: 1000,
  //       //   allowOutsideClick: false,
  //       //   onClose: () => {
  //       //     clearInterval(timerInterval)
  //       //     next({ name: 'dashboard' })
  //       //   }
  //       // })

  //       next()
  //     }

  //     break
  //   }
  // }

  console.log(to.path)
  if (to.path == '/logout') {
    Vue.$cookies.remove('jwt')
    next({
      path: '/login',
      params: { nextUrl: to.fullPath }
    })
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (Vue.$cookies.get('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (Vue.$cookies.get('jwt') == null) {
      next()
    } else {
      next({ name: 'dashboard' })
    }
  } else {
    next()
  }
})

export default router

new Vue({
  render: h => h(App),
  useEslint: false,
  router,
  store
}).$mount('#app')
