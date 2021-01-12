<template lang="pug">
  #app(style="overflow-x:hidden;min-height:100vh" ).d-flex.flex-column.justify-content-between
    b-navbar(toggleable='lg' type='dark'  class="fixed-top nav" )
      b-container
        b-navbar-brand(to='/') BUYFIG
        a(href="#/shopcar", title="title").class.ml-auto.d-flex.position-relative.mr-3
            font-awesome-icon(:icon="['fas','shopping-cart']" class="shopicon")
            .orange
              p(style="top:50%;left:50%;transform:translate(-50%,-50%)").position-absolute.text-white {{this.$store.state.user.shopcar.length}}
        b-navbar-toggle(target='nav-collapse')
        b-collapse#nav-collapse(is-nav style="width:100px !important")
          b-navbar-nav(class = "mainnav").ml-auto
            b-nav-item(class="mainNavitem" to="/products") 商品列表
            b-nav-item(class="mainNavitem" to="/contact") 聯絡我們
            //- b-nav-item(class="mainNavitem" to="/news") 公仔新知
            b-nav-item(class="mainNavitem" to="/about") 關於我們
            b-nav-item(disabled) |
            b-nav-item(class="mainNavitem" to="/membercenter" @click="tomembercenter" v-if="user.account !== ''") {{user.account}}
            b-nav-item(class="mainNavitem" to="/membercenter" @click="tomembercenter" v-else) 會員中心
            b-nav-item(class="mainNavitem" v-if="isAdmin" to="/admin") 管理者頁面
            b-nav-item(class="mainNavitem" v-if="user.id.length > 0" @click = "logout") 登出
    #socialLink(v-if="$route.path!=='/admin'")
      a(href="#")
       font-awesome-icon(:icon="['fas','chevron-circle-up']")
    router-view
    Footer
</template>

<script>
import '@/assets/css/front.stylus'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: { Footer },
  computed: {
    user () {
      return this.$store.state.user
    },
    isAdmin: function () {
      let result
      if (this.$store.state.user.isAdmin === true && this.$store.state.user.account !== '') {
        result = true
        return result
      }
      return result
    }

  },
  methods: {
    tomembercenter () {
      if (this.$store.state.user.name === '') {
        this.$router.push('/login')
      } else {
        this.$router.push('/membercenter')
      }
    },
    logout () {
      this.axios.delete(process.env.VUE_APP_API + '/users/logout')
        .then(res => {
          if (res.data.success) {
            alert('登出成功')
            this.$store.commit('logout')

            if (this.$router.path !== '/') {
              this.$router.push('/')
            } else {
              alert(res.data.message)
            }
          }
        })
        .catch(err => {
          alert(err.res.data.message)
        })
    },
    heartbeat () {
      this.axios.get(process.env.VUE_APP_API + '/users/heartbeat')
        .then(res => {
          if (this.user.id.length > 0) {
            if (!res.data) {
              alert('登入時效已過')
              this.$store.commit('logout')
              if (this.$router.path !== '/') {
                this.$router.push('/')
              }
            }
          }
        })
        .catch(() => {
          alert('發生錯誤')

          this.$store.commit('logout')
          if (this.$router.path !== '/') {
            this.$router.push('/')
          }
        })
    }
  },
  mounted () {
    this.heartbeat()
    setInterval(() => {
      this.heartbeat()
    }, 5000)
    console.log(this.user)
  }
}
</script>

<style lang="stylus">
html {
  overflow-y: overlay;
}
</style>
