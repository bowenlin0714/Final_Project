import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Store from '../store/index.js'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

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
    path: '/productsdetail',
    name: 'ProductsDetail',
    component: () => import(/* webpackChunkName: "productsdetail" */ '../views/ProductsDetail.vue'),
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
    path: '/membercenter',
    name: 'MemberCenter',
    component: () => import(/* webpackChunkName: "membercenter" */ '../views/MemberCenter.vue'),
    meta: {
      title: 'BUYFIG / 會員中心'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin/AdminHome.vue'),
    meta: {
      title: 'BUYFIG / 管理者後台'
    },
    children: [
      {
        path: 'adminproducts',
        component: () => import(/* webpackChunkName: "adminproducts" */ '../views/Admin/AdminProducts.vue'),
        meta: {
          title: ' 管理者後台 / 商品管理'
        }
      },
      {
        path: 'adminmembers',
        component: () => import(/* webpackChunkName: "adminmembers" */ '../views/Admin/AdminMembers.vue'),
        meta: {
          title: ' 管理者後台 / 會員資料管理'
        }
      },
      {
        path: 'adminorders',
        component: () => import(/* webpackChunkName: "adminorders" */ '../views/Admin/AdminOrders.vue'),
        meta: {
          title: ' 管理者後台 / 訂單管理'
        }
      },
      {
        path: 'adminopinions',
        component: () => import(/* webpackChunkName: "adminopinions" */ '../views/Admin/AdminOpinions.vue'),
        meta: {
          title: ' 管理者後台 / 意見表管理'
        }
      },
      {
        path: 'adminbanners',
        component: () => import(/* webpackChunkName: "adminbanners" */ '../views/Admin/AdminBanners.vue'),
        meta: {
          title: ' 管理者後台 / 輪播圖管理'
        }
      }
    ]
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
