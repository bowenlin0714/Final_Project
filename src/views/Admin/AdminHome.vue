<template lang="pug">
  #adminhome.h-100
    b-container(fluid ).h-100
      b-row().h-100
        b-col(cols="12" lg="2"  class=" bgleft d-none d-lg-block " ).min-vh-100

          b-nav(vertical class="navleft" style="text-align:center" )
            h1.mt-4.mb-4 BUYFIG
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

        b-col(cols="12" lg="10"  class="bgright" ).min-vh-100
          b-container(v-if="$route.path =='/admin'" fluid)
            b-row
              b-col(cols="12" lg="9" class="title").mx-auto.text-white
                div.d-flex.flex-column.justify-content-around.m-4.flex-lg-row.align-items-center.w-100.mx-auto
                  div.d-flex.w-100.justify-content-around
                    .circle
                      div.text-center
                        h4 {{users.length}}
                        p  會員人數
                    .circle
                      div.text-center
                        h4 {{notres.length}}
                        p  未回覆回饋單
                  div.d-flex.w-100.justify-content-around
                    .circle
                      div.text-center
                        h4 {{todayTotal}}
                        p 今日營業額
                    .circle
                      div.text-center
                        h4 {{revenue}}
                        p  總營業額
                b-input-group().my-5
                  b-form-input(v-model="msg" placeholder="請輸入")
                  b-input-group-append()
                    b-button(@click="sendmsg" ).bg-info 發布訊息
                div(class="charttitle") 熱銷前五名 :
                div.bg-white.text-dark.p-2
                  ol.p-3
                    li(v-for="(product, i) in products" v-if="i<5").m-3
                      p {{product.name}}
                b-col(cols="12").mx-auto.p-0.my-3
                  div(class="charttitle") 每日營業額
                  div.bg-white.p-3
                    ve-histogram(:data="chartData" :settings="chartSettings")
                  div.d-flex.flex-column.flex-lg-row
                    b-col(cols="12" lg="6").p-0.my-3
                      div(class="charttitle") 每日回饋單數量
                      div.bg-white
                        ve-histogram(:data="formsData" :settings="chartSettings" )
                    b-col(cols="12" lg="5").ml-auto.p-0.my-3
                      div(class="charttitle") 商品數量
                      div.bg-white
                        ve-pie(:data="piesData" :settings="chartSettings")

          router-view
        radial-menu(
          style="z-index:99999999999"
          class="circlebtn"
          :itemSize="50"
          :radius="120"
          :angle-restriction="180"
        ).shadow.d-block.d-lg-none
          radial-menu-item(
            style="background-color: white"
            @click="toorders"
          ).shadow
            font-awesome-icon(:icon=['fas', 'file-contract'] )
          radial-menu-item(
            style="background-color: white"
            @click="tobanners"
          ).shadow
            font-awesome-icon(:icon=['fas', 'image'] )
          radial-menu-item(
            style="background-color: white"
            @click="toforms"
          ).shadow
            font-awesome-icon(:icon=['fas', 'list'] )
          radial-menu-item(
            style="background-color: white"
            @click="tomember"
          ).shadow
            font-awesome-icon(:icon=['fas', 'user-astronaut'] )
          radial-menu-item(
            style="background-color: white"
            @click="toproduct"
          ).shadow
            font-awesome-icon(:icon=['fas', 'shopping-cart'] )
          radial-menu-item(
            style="background-color: white"
            @click="tohome"
          ).shadow
            font-awesome-icon(:icon=['fas', 'home'] )

</template>

<style lang="stylus" scoped>
  html,body
    height 100%
</style>

<script>
import '@/assets/css/back.stylus'
import { RadialMenu, RadialMenuItem } from 'vue-radial-menu'
export default {
  name: 'AdminHome',
  components: {
    RadialMenu,
    RadialMenuItem
  },
  data () {
    this.chartSettings = {
      labelMap: {
        amount: '數量',
        total: '總計'
      }
    }
    return {
      notres: '',
      items: ['foo', 'bar', 'hello', 'world', 'more', 'items'],
      lastClicked: 'click on something!',
      chartData: {
        columns: ['date', 'total'],
        rows: []
      },
      piesData: {
        columns: ['category', 'amount'],
        rows: []
      },
      formsData: {
        columns: ['date', 'amount'],
        rows: []
      },
      msg: '',
      revenue: 0,
      todayTotal: 0,
      users: '',
      products: []

    }
  },
  methods: {
    toproduct () {
      this.$router.push('/admin/adminproducts')
    },
    tohome () {
      this.$router.push('/admin')
    },
    tomember () {
      this.$router.push('/admin/adminmembers')
    },
    toforms () {
      this.$router.push('/admin/adminopinions')
    },
    toorders () {
      this.$router.push('/admin/adminorders')
    },
    tobanners () {
      this.$router.push('/admin/adminbanners')
    },
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

      // 日期
      const originChart = this.$_.groupBy(array, (a) => {
        return a.date
      })
      for (const key in originChart) {
        originChart[key] = originChart[key].map(data => data.total).reduce((accumulator, currentValue) => {
          return accumulator + currentValue
        })
      }
      const chartArray = []
      for (const i in originChart) {
        const linshiObj = {
          date: i,
          total: originChart[i]
        }
        chartArray.push(linshiObj)
      }
      this.chartData.rows = chartArray.slice(-5)

      for (const data of result) {
        todayTotal += data.total
      }

      this.revenue = revenue
      this.todayTotal = todayTotal
    })
    // 回饋單數量
    this.axios.get(process.env.VUE_APP_API + '/forms').then(res => {
      const originChart = this.$_.groupBy(res.data.result, (a) => {
        return a.date
      })
      const formsArray = []
      for (const i in originChart) {
        const linshiObj = {
          date: i,
          amount: originChart[i].length
        }
        formsArray.push(linshiObj)
      }
      this.formsData.rows = formsArray.slice(-5)
      this.notres = res.data.result.filter(form => {
        return form.isRes === false
      })
    })

    this.axios.get(process.env.VUE_APP_API + '/products').then(res => {
      this.products = res.data.result

      // 分類種類

      const originChart = this.$_.groupBy(res.data.result, (a) => {
        return a.category
      })
      for (const key in originChart) {
        originChart[key] = originChart[key].map(data => data.amount).reduce((accumulator, currentValue) => {
          return accumulator + currentValue
        })
      }
      const productArray = []
      for (const i in originChart) {
        const linshiObj = {
          category: i,
          amount: originChart[i]
        }
        productArray.push(linshiObj)
      }
      this.piesData.rows = productArray
    })
  }
}
</script>
