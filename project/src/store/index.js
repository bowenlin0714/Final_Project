import Vue from 'vue'
import Vuex from 'vuex'
import Persistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      account: '',
      id: '',
      isAdmin: false
    }

  },
  mutations: {
    login (state, data) {
      state.user.name = data.name
      state.user.id = data._id
      state.user.account = data.account
      state.user.isAdmin = data.isAdmin
    },
    logout (state) {
      state.user.name = ''
      state.user.id = ''
      state.user.account = ''
      state.user.isAdmin = false
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [Persistedstate()]

})
