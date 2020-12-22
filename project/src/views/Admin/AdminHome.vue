<template lang="pug">
  #adminhome(style="margin-top:56px;" class="" )
    b-container(fluid class="")
      b-row(class="" )
        b-col(cols="12" lg="2"  class=" bgleft d-none d-lg-block vh-100" style="")
          b-nav(vertical class="")
            h1  管理者後台
            b-nav-item(@click="showProducts") 商品管理
            b-nav-item(@click="showMembers") 會員資料管理
            b-nav-item(@click="showOrders") 訂單管理
            b-nav-item(@click="showOpinions") 意見表管理
            b-nav-item(@click="showBanners") 輪播圖管理
        b-col(cols="12" lg="10"  class="bgright")
          AdminProducts(v-if="products")
          AdminMembers(v-if="members")
          AdminBanners(v-if="banners")
          AdminOrders(v-if="orders")
          AdminOpinions(v-if="opinions")
      div(class="block d-lg-none")
        b-nav(vertical class="")
            b-nav-item(@click="showProducts") 商品管理
            b-nav-item(@click="showMembers") 會員資料管理
            b-nav-item(@click="showOrders") 訂單管理
            b-nav-item(@click="showOpinions") 意見表管理
            b-nav-item(@click="showBanners") 輪播圖管理
</template>

<style lang="stylus">
  html,body
    height 100%
</style>

<script>
import '@/assets/css/back.stylus'
import AdminProducts from '@/components/AdminProducts'
import AdminMembers from '@/components/AdminMembers'
import AdminBanners from '@/components/AdminBanners'
import AdminOrders from '@/components/AdminOrders'
import AdminOpinions from '@/components/AdminOpinions'

export default {
  name: 'AdminHome',
  components: { AdminProducts, AdminMembers, AdminBanners, AdminOrders, AdminOpinions },
  data () {
    return {
      products: true,
      members: false,
      opinions: false,
      banners: false,
      orders: false
    }
  },
  methods: {
    showProducts () {
      this.products = true
      this.members = false
      this.opinions = false
      this.banners = false
      this.orders = false
    },
    showMembers () {
      this.products = false
      this.members = true
      this.opinions = false
      this.banners = false
      this.orders = false
    },
    showOpinions () {
      this.products = false
      this.members = false
      this.opinions = true
      this.banners = false
      this.orders = false
    },
    showBanners () {
      this.products = false
      this.members = false
      this.opinions = false
      this.banners = true
      this.orders = false
    },
    showOrders () {
      this.products = false
      this.members = false
      this.opinions = false
      this.banners = false
      this.orders = true
    }
  }
}
</script>
