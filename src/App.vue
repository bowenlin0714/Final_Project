<template lang="pug">
  #app.d-flex.flex-column.justify-content-between
    notifications(group="foo" position="top")
    loading(:active.sync="isLoading" )
        .loadingio-spinner-ripple-3q2sldg35oh
          .ldio-xoybongjwx
            div
            div
    b-navbar(toggleable='lg' type='dark'  class="fixed-top nav" ).shadow.vw-100.p-2
      b-container
        b-navbar-brand(to='/' ).bg-white
          img(src="./assets/mylog.svg" style="height:3rem").px-2
        a( title="title" @click="toCart").class.ml-auto.d-flex.position-relative.mr-3.d-block.d-lg-none
            font-awesome-icon(:icon="['fas','shopping-cart']" class="shopicon")
            .orange.sm
              p(style="top:50%;left:50%;transform:translate(-50%,-50%)").position-absolute.text-white {{this.$store.state.user.shopcar.length}}
        b-navbar-toggle(target='nav-collapse')
        b-collapse#nav-collapse(is-nav style="width:6rem !important")
          b-navbar-nav(class = "mainnav").ml-auto
            b-nav-item(class="mainNavitem" @click="toProduct")
               font-awesome-icon(:icon="['fas','dice-d6']" class="shopicon").mx-2.d-lg-none
               span  商品列表
            b-nav-item(class="mainNavitem" @click="toCart").d-none.d-lg-block 購物車
              .orange.lg
                p(style="").position-absolute.text-white {{this.$store.state.user.shopcar.length}}
            b-nav-item(class="mainNavitem" @click="toNews")
              font-awesome-icon(:icon="['fas','newspaper']" class="shopicon").mx-2.d-lg-none
              span  公仔新知
            b-nav-item(class="mainNavitem" @click="toContact")
              font-awesome-icon(:icon="['fas','phone']" class="shopicon").mx-2.d-lg-none
              span  聯絡我們
            b-nav-item(class="mainNavitem" @click="toAbout")
              font-awesome-icon(:icon="['fas','info-circle']" class="shopicon").mx-2.d-lg-none
              span  關於我們
            b-nav-item(disabled).d-none.d-lg-block |
            b-nav-item(class="mainNavitem" to="/membercenter" @click="tomembercenter" v-if="user.account !== ''")
              div( style="vertical-align:middle;")
                font-awesome-icon(:icon="['fas','minus-circle']" v-if="user.isBan").mx-2.text-danger
                span(class="disable").mx-2 {{user.account}}
            b-nav-item(class="mainNavitem" to="/membercenter" @click="tomembercenter" v-else)
              font-awesome-icon(:icon="['fas','user-astronaut']" class="shopicon").mx-2.d-lg-none
              span  會員中心
            b-nav-item(class="mainNavitem" v-if="isAdmin" to="/admin")
              font-awesome-icon(:icon="['fas','user-cog']" class="shopicon").mx-2.d-lg-none
              span  管理者頁面
            b-nav-item(class="mainNavitem" v-if="user.id.length > 0" @click = "logout")
              font-awesome-icon(:icon="['fas','door-open']" class="shopicon").mx-2.d-lg-none
              span  登出
    #socialLink(v-if="$route.path =='/' || $route.path =='/about' || $route.path =='/shopcar' || $route.path =='/products' || $route.path =='/productsdetail' || $route.path =='/contact'  || $route.path =='/news' || $route.path =='/login' || $route.path =='/reg' || $route.path =='/membercenter'")
      a(v-scroll-to="'#app'")
        font-awesome-icon(:icon="['fas','chevron-circle-up']")
    b-container(fluid).p-0
      router-view
      Footer

</template>

<script>
import '@/assets/css/front.stylus'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: { Footer },
  data () {
    return {
      isLoading: true
    }
  },
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
    toAbout () {
      window.scrollTo(0, 0)
      this.$router.push('/about')
    },
    toContact () {
      window.scrollTo(0, 0)
      this.$router.push('/contact')
    },
    toNews () {
      window.scrollTo(0, 0)
      this.$router.push('/news')
    },
    toProduct () {
      window.scrollTo(0, 0)
      this.$router.push('/products')
    },
    toCart () {
      if (this.user.name === '') {
        this.$swal.fire({
          toast: true,
          padding: '1rem',
          position: 'bottom-start',
          icon: 'warning',
          title: '請先登入',
          showConfirmButton: false,
          timer: 3000
        })
      } else {
        window.scrollTo(0, 0)
        this.$router.push('/shopcar')
      }
    },
    tomembercenter () {
      if (this.user.name === '') {
        this.$router.push('/login')
      } else {
        window.scrollTo(0, 0)
        this.$router.push('/membercenter')
      }
    },
    logout () {
      this.axios.delete(process.env.VUE_APP_API + '/users/logout')
        .then(res => {
          if (res.data.success) {
            this.$swal.fire({
              toast: true,
              position: 'bottom-start',
              padding: '1rem',
              icon: 'success',
              title: '登出成功',
              showConfirmButton: false,
              timer: 3000
            })
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
    // 商品
    this.axios.get(process.env.VUE_APP_API + '/products/').then((res) => {
      this.images = res.data.result.map(image => {
        var result = []
        for (let i = 0; i < image.images.length; i++) {
          result.push(process.env.VUE_APP_API + '/products/' + image.images[i].file)
          image.src = result
        }
        return image
      })
      var data = this.images
      this.$store.commit('onShoplists', data)
    })
    // 新聞
    this.axios.get(process.env.VUE_APP_API + '/news')
      .then(res => {
        setTimeout(() => {
          this.isLoading = false
        }, 2000)
        this.$store.commit('news', res.data.result[0].data)
      }).catch(err => {
        console.log(err)
      })
  }

}
</script>

<style lang="stylus">
html {
  overflow-y: overlay;
}

</style>
