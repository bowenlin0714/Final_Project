<template lang="pug">
  #app
    b-navbar(toggleable='lg' type='dark'  class="fixed-top nav" )
      b-container
        b-navbar-brand(to='/') FigBuy
        b-navbar-toggle(target='nav-collapse')
        b-collapse#nav-collapse(is-nav)
          b-navbar-nav(class = "mainnav").ml-auto
            b-nav-item(to="/contact") 聯絡我們
            b-nav-item(v-if="user.id.length === 0" to="/login") 登入
            b-nav-item(v-if="user.id.length === 0 || user.isAdmin" to="/reg") 註冊
            b-nav-item(v-if="isAdmin" to="/admin") 管理者頁面
            b-nav-item(v-if="user.id.length > 0" @click = "logout") 登出
    #socialLink()
      a(href="https://www.facebook.com/")
       font-awesome-icon(:icon="['fab','facebook-square']")
      a(href="https://www.instagram.com/")
       font-awesome-icon(:icon="['fab','instagram']")
      a(href="#")
       font-awesome-icon(:icon="['fas','chevron-circle-up']")
    router-view(style="margin-top: 56px" )
</template>

<script>
import '@/assets/css/front.stylus'
export default {
  name: 'App',
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
  }
}
</script>

<style lang="stylus">
</style>
