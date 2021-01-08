import Vue from 'vue'
import Vuex from 'vuex'
import Persistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [
      { value: '', text: '全部商品' },
      { value: 'A', text: '日本景品' },
      { value: 'B', text: '組裝模型' },
      { value: 'C', text: 'PVC人偶' },
      { value: 'D', text: 'GK' },
      { value: 'E', text: '可動人偶' },
      { value: 'F', text: '扭蛋 / 盒玩' },
      { value: 'G', text: '設計師公仔' },
      { value: 'H', text: '其他' }

    ],
    user: {
      name: '',
      account: '',
      id: '',
      shopcar: [],
      isAdmin: false
    },
    memberlists: null,
    formlists: null,
    bannerlists: null,
    productlists: null,
    productdetail: null,
    onShoplists: null,
    commentlists: null,
    cartlists: null,
    cartproducts: [],
    tag: '',
    comments: ''
  },
  mutations: {
    login (state, data) {
      state.user.name = data.name
      state.user.id = data._id
      state.user.account = data.account
      state.user.isAdmin = data.isAdmin
      state.user.shopcar = data.shopcar
    },
    logout (state) {
      state.user.name = ''
      state.user.id = ''
      state.user.account = ''
      state.user.isAdmin = false
      state.user.shopcar = []
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
    onShoplists (state, data) {
      state.onShoplists = []
      state.onShoplists = data.filter(product => product.onShop === true)
    },
    cartproducts (state, data) {
      state.user.shopcar = data
      console.log(state.user.shopcar)
    },
    addcartProduct (state, data) {
      state.user.shopcart = data
    },
    cartlists (state, data) {
      state.cartlists = []
      state.cartlists = (data)
    },
    productlists (state, data) {
      state.productlists = []
      state.productlists = (data)
    },
    showdetail (state, data) {
      state.productdetail = []
      state.productdetail = (data)
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
    delcomment (state, index) {
      state.productdetail.comments.splice(index, 1)
    },
    delProducts (state, id) {
      const idx = state.productlists.findIndex(product => {
        return product._id === id
      })
      state.productlists.splice(idx, 1)
    },
    delbanners (state, index) {
      state.bannerlists.splice(index, 1)
    },
    editBanners (state, data) {
      console.log(data.description)
      state.bannerlists[data.index].description = data.description
    },
    editProducts (state, data) {
      const idx = state.productlists.findIndex(product => {
        return product._id === data._id
      })
      var newProducts = state.productlists[idx]
      newProducts.name = data.name
      newProducts.price = data.price
      newProducts.amount = data.amount
      newProducts.category = data.category
      newProducts.onsale = data.onsale
      newProducts.countPrice = data.countPrice
      newProducts.onShop = data.onShop
      newProducts.description = data.description
    },
    sendcomments (state, data) {
      state.productlists.comments = data.comments
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
