import Vue from 'vue'
import Vuex from 'vuex'
import Persistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      id: ''
    }
  },
  mutations: {
    login (state, data) {
      state.user.name = data.name
      state.user.id = data._id
      state.user.account = data.account
    },
    logout (state) {
      state.user.name = ''
      state.user.id = ''
      state.user.account = ''
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [Persistedstate()]

})
