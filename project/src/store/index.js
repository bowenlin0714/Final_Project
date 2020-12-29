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
    delmember (state, id) {
      const idx = state.memberlists.findIndex(user => {
        return user._id === id
      })
      state.memberlists.splice(idx, 1)
    },
    delforms (state, id) {
      const idx = state.formlists.findIndex(form => {
        return form._id === id
      })
      state.formlists.splice(idx, 1)
    },
    delbanners (state, index) {
      state.bannerlists.splice(index, 1)
    },
    editBanners (state, data) {
      console.log(data.description)
      // console.log(state.bannerlists[data.index].)
      state.bannerlists[data.index].description = data.description
      console.log(state.bannerlists[data.index].description)
    },
    checkRes (state, id) {
      const idx = state.formlists.findIndex(form => {
        return form._id === id
      })
      state.formlists[idx].isRes = !state.formlists[idx].isRes
    },
    checkisShow (state, id) {
      const idx = state.bannerlists.findIndex(banner => {
        return banner._id === id
      })
      state.bannerlists[idx].isShow = !state.bannerlists[idx].isShow
    },
    checkBan (state, id) {
      const idx = state.memberlists.findIndex(user => {
        return user._id === id
      })
      state.memberlists[idx].isBan = !state.memberlists[idx].isBan
    }

  },
  actions: {
  },
  modules: {
  },
  plugins: [Persistedstate()]

})
