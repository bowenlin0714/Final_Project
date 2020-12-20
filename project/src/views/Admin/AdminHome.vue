
<template lang="pug">
  #adminhome
    b-container-fluid
      b-row(class="d-flex" )
        b-col(cols="2" align-self="stretch" style="height: 100vh" class="bg-warning")
          b-nav(vertical class="w-100")
            h1  管理者後台
            b-nav-item
              router-link(to="/admin/adminproducts") 商品上架
            b-nav-item 會員資料
            b-nav-item 訂單資料
            b-nav-item 意見表管理
        b-col(cols="10" align-self="stretch" style="height: 100vh" class="bg-info")
          router-view
</template>

<style lang="stylus">
html,body
  height: 100vh;
  background-color: black
</style>

<script>
export default {
  name: 'AdminHome',

  data () {
    return {

    }
  }
}
</script>
