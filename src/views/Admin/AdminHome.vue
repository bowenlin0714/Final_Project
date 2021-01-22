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
          b-container(v-if="$route.path =='/admin'" fluid)
            b-row
              b-col(cols="12" class="title").mx-auto.text-white
                h1 BUYFIG
                b-form-input(v-model="msg" placeholder="請輸入").my-4.w-100
                b-button(@click="sendmsg").bg-info.mb-3 發布訊息
                div(style="line-height:2.5rem;font-size:2rem")
                  p 今日營業額: {{todayTotal}}
                  p 總營業額: {{revenue}}
                  p 會員人數: {{users.length}}
                  p 熱銷前五名 :
                  ol
                    li(v-for="(product, i) in products" v-if="i<5")
                      p {{product.name}}
          router-view
      div(class="block d-lg-none")
        b-nav(vertical class="").shadow
            b-nav-item(to="/admin") 管理員首頁
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

      msg: '',
      revenue: 0,
      todayTotal: 0,
      users: null,
      products: []

    }
  },
  methods: {
    sendmsg () {
      var now = new Date()
      var year = now.getFullYear()
      var month = now.getMonth() + 1
      var day = now.getDate()
      var newdate = year + '/' + month + '/' + day
      const users = this.users

      for (const user of users) {
        var data = {
          detail: this.msg,
          date: newdate
        }
        user.toMember.push(data)
        this.axios.patch(process.env.VUE_APP_API + '/users/edit/' + user._id, { toMember: user.toMember }).then(res => {
          this.msg = ''
        })
      }
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/users/').then(res => {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1
      const day = now.getDate()
      const date = year + '/' + month + '/' + day
      this.users = res.data.result

      let revenue = 0
      let todayTotal = 0
      const array = []
      for (const user of this.users) {
        for (const order of user.orders) {
          revenue += order.total
          array.push(order)
        }
      }
      const result = array.filter(order => {
        return order.date === date
      })
      for (const data of result) {
        todayTotal += data.total
      }

      this.revenue = revenue
      this.todayTotal = todayTotal
    })

    this.axios.get(process.env.VUE_APP_API + '/products').then(res => {
      this.products = res.data.result
    })
  }
}
</script>
