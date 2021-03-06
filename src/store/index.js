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
      { value: 'D', text: 'GK/雕像' },
      { value: 'E', text: '可動人偶' },
      { value: 'F', text: '扭蛋' },
      { value: 'G', text: '設計師公仔' },
      { value: 'H', text: '其他' }

    ],
    user: {
      name: '',
      account: '',
      email: '',
      id: '',
      phone: '',
      shopcar: [],
      orders: [],
      fav: [],
      payaccount: '',
      isAdmin: false,
      toAdmin: [],
      toMember: [],
      isBan: ''
    },
    memberlists: null,
    formlists: null,
    bannerlists: [],
    productlists: null,
    productdetail: null,
    onShoplists: [],
    commentlists: null,
    cartlists: null,
    cartproducts: [],
    unfinishOrder: [],
    orderlists: [],
    tag: '',
    comments: '',
    addShow: false,
    news: null
  },
  mutations: {
    login (state, data) {
      state.user.name = data.name
      state.user.account = data.account
      state.user.id = data._id
      state.user.phone = data.phone
      state.user.shopcar = data.shopcar
      state.user.isAdmin = data.isAdmin
      state.user.orders = data.orders
      state.user.email = data.email
      state.user.payaccount = data.payaccount
      state.user.fav = data.fav
      state.user.toAdmin = data.toAdmin
      state.user.toMember = data.toMember
      state.user.isBan = data.isBan

      // console.log(data)
    },
    logout (state) {
      state.user.name = ''
      state.user.account = ''
      state.user.id = ''
      state.user.phone = ''
      state.user.shopcar = []
      state.user.isAdmin = false
      state.user.orders = []
      state.user.email = ''
      state.user.payaccount = ''
      state.user.fav = []
      state.user.toAdmin = []
      state.user.toMember = []
      state.user.isBan = ''
    },
    memberlists (state, data) {
      state.memberlists = []
      state.memberlists = (data)
    },
    changeSelect (state, data) {
      state.user.shopcar = data.shopcar
    },
    formlists (state, data) {
      state.formlists = []
      state.formlists = (data)
    },
    bannerlists (state, data) {
      state.bannerlists = (data)
    },
    orderlists (state, data) {
      state.orderlists = data
    },
    onShoplists (state, data) {
      state.onShoplists = []
      state.onShoplists = data.filter(product => product.onShop === true)
    },
    centerOrders (state, data) {
      state.user.orders = data
    },
    unfinishOrder (state, data) {
      state.unfinishOrde = data
    },
    news (state, data) {
      state.news = data
    },
    cartproducts (state, data) {
      state.user.shopcar = data
    },
    addfav (state, data) {
      state.user.fav = data
    },
    addcartProduct (state, data) {
      state.user.shopcart = data
    },
    cartlists (state, data) {
      state.cartlists = []
      state.cartlists = (data)
    },
    cleancart (state) {
      state.user.shopcar = []
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
