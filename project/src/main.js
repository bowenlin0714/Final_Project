import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ImgInputer from 'vue-img-inputer'
import 'vue-img-inputer/dist/index.css'
import Carousel3d from 'vue-carousel-3d'
import Vuelidate from 'vuelidate'
import VeeValidate from 'vee-validate'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import VueI18n from 'vue-i18n'
import 'animate.css'
import VueWow from 'vue-wow'
import cheerio from 'cheerio'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircle, faTimes, faCheck, faChevronCircleUp, faShoppingCart, faInfoCircle, faHandPointRight, faLink, faHandshake, faUserAstronaut, faHome, faList, faFileContract, faImage, faSearch, faTrashAlt, faArrowAltCircleRight, faMoneyBill, faTruck, faStickyNote } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import Ripple from 'vue-ripple-directive'

library.add(
  faMoneyBill, faCircle, faTimes, faCheck, faFacebookSquare, faChevronCircleUp, faInstagram, faShoppingCart, faInfoCircle, faHandPointRight, faLink, faHandshake, faUserAstronaut, faHome, faList, faFileContract, faImage, faSearch, faTrashAlt, faArrowAltCircleRight, faTruck, faStickyNote, faHeart
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

axios.defaults.withCredentials = true

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(Carousel3d)
Vue.use(Vuelidate)
Vue.use(VueI18n)
Vue.use(VueWow)
Vue.use(cheerio)
Vue.directive('ripple', Ripple)

const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  events: 'input|blur', // 這是為了讓使用者離開該欄位時觸發驗證
  i18n,
  inject: true,
  errorBagName: 'veeErrors',
  fieldsBagName: 'veeFields',
  dictionary: {
    zhTW
  }
})

Vue.component('ImgInputer', ImgInputer)

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
