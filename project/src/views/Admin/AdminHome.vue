<template lang="pug">
  #adminhome.h-100
    b-container(fluid class="").h-100
      b-row().h-100
        b-col(cols="12" lg="2"  class=" bgleft d-none d-lg-block " ).min-vh-100
          b-nav(vertical class="navleft" style="text-align:center" )
            h1.mt-4.mb-4 管理者後台
            b-nav-item(to="/admin").text-left.h4.ml-4
              font-awesome-icon(:icon=['fas', 'home'] )
              span.ml-2 後台首頁
            b-nav-item(to="/admin/adminproducts").text-left.ml-4
              font-awesome-icon(:icon=['fas', 'shopping-cart'] )
              span.ml-2 --商品管理
            b-nav-item(to="/admin/adminmembers").text-left.ml-4
              font-awesome-icon(:icon=['fas', 'user-astronaut'] )
              span.ml-2 --會員資料管理
            b-nav-item(to="/admin/adminorders").text-left.ml-4
              font-awesome-icon(:icon=['fas', 'list'] )
              span.ml-2 --訂單管理
            b-nav-item(to="/admin/adminopinions").text-left.ml-4
              font-awesome-icon(:icon=['fas', 'file-contract'] )
              span.ml-2 --意見表管理
            b-nav-item(to="/admin/adminbanners").text-left.ml-4
              font-awesome-icon(:icon=['fas', 'image'] )
              span.ml-2 --輪播圖管理
        b-col(cols="12" lg="10"  class="bgright").min-vh-100
          b-container(v-if="$route.path =='/admin'")
            b-row
              b-col(cols="12").text-center
                h1.text-white 管理者後台
          router-view
      div(class="block d-lg-none")
        b-nav(vertical class="")
            b-nav-item(to="/admin/adminproducts") 商品管理
            b-nav-item(to="/admin/adminmembers") 會員資料管理
            b-nav-item(to="/admin/adminorders") 訂單管理`
            b-nav-item(to="/admin/adminopinions") 意見表管理
            b-nav-item(to="/admin/adminbanners") 輪播圖管理

</template>

<style lang="stylus" scoped>
  html,body
    height 100%
</style>

<script>
import '@/assets/css/back.stylus'

export default {
  name: 'AdminHome',
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>
