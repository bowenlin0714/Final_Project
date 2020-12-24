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
    },
    memberlists: null,
    formlists: null,
    bannerlists: null
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
    },
    memberlists (state, data) {
      state.memberlists = []
      state.memberlists = (data)
    },
    formlists (state, data) {
      state.formlists = []
      state.formlists = (data)
    },
    bannerlists (state, data) {
      state.bannerlists = []
      state.bannerlists = (data)
    },
    delmember (state, index) {
      state.memberlists.splice(index, 1)
    },
    delforms (state, index) {
      state.formlists.splice(index, 1)
    },
    checkRes (state, index) {
      state.formlists[index].isRes = !state.formlists[index].isRes
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [Persistedstate()]

})
