import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'BUYFIG'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: 'BUYFIG / 關於我們'
    }
  },
  {
    path: '/shopcar',
    name: 'Shopcar',
    component: () => import(/* webpackChunkName: "shopcar" */ '../views/Shopcar.vue'),
    meta: {
      title: 'BUYFIG / 購物車'
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import(/* webpackChunkName: "products" */ '../views/Products.vue'),
    meta: {
      title: 'BUYFIG / 商品列表'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "contact" */ '../views/Contact.vue'),
    meta: {
      title: 'BUYFIG / 聯絡我們'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      title: 'BUYFIG / 登入'
    }
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import(/* webpackChunkName: "reg" */ '../views/Reg.vue'),
    meta: {
      title: 'BUYFIG / 註冊'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin/AdminHome.vue'),
    meta: {
      title: 'BUYFIG / 管理者後台'
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.isLogin && !Store.state.user.id) {
    next('/login')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  let title = ''

  title = to.meta.title

  document.title = title
})

export default router
