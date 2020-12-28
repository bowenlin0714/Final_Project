import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueParallaxJs from 'vue-parallax-js'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircle, faTimes, faCheck, faChevronCircleUp, faShoppingCart, faInfoCircle, faHandPointRight, faLink, faHandshake, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons'

library.add(
  faCircle, faTimes, faCheck, faFacebookSquare, faChevronCircleUp, faInstagram, faShoppingCart, faInfoCircle, faHandPointRight, faLink, faHandshake, faUserAstronaut
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

axios.defaults.withCredentials = true

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(VueParallaxJs)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
