<template lang="pug">
  #productsdetail.p-0.m-0
    b-container.shadow
      b-row
        b-col(cols="12")
          b-breadcrumb
            b-breadcrumb-item(to="/") 首頁
            b-breadcrumb-item(to="/products") 商品列表
            b-breadcrumb-item(to="/products" @click="tagCategory(category)") {{breadtag[0].text}}
            b-breadcrumb-item(active) {{productdetail.name}}
        b-col(cols="2").ml-4.mr-4
          b-list-group(v-for="(category, index) in this.$store.state.categories" :key="index").p-1.d-none.d-lg-block
            b-list-group-item.p-0.text-center.d-block
              div(v-ripple class="button is-primary")
                a(href="#/products").text-white
                  b-button(@click="tagCategory(category)" style="font-size:14px" ).w-100.shadow-sm {{category.text}}

        b-col(cols="12" lg="9").border.bg-white.pt-3
            b-row
              b-col(cols="12" lg="7")
                div(class="bigimg").ml-1.border
                  img(v-show="preview" :src="productdetail.src[0]")
                  img(:src="bigURL")
                ul.d-flex
                  li(v-for="image in productdetail.src" style="width:100px;height:100px;overflow:hidden;background:black;display:flex;justify-content:center;align-items-center").m-2.border
                    img(:src="image" @click="changeimg(image)").w-100.h-auto
              b-col(cols="12" lg="5")
                div(style="min-height:50vh").d-flex.flex-column.justify-content-lg-between
                  div.d-flex.justify-content-lg-between
                    p 商品編號 : {{productdetail.productNumber}}
                    button(class="favbut" )
                     font-awesome-icon( :icon=['far', 'heart'] v-if="!checkfav" @click="addfav(productdetail)").m-0
                     font-awesome-icon( :icon=['fas', 'heart'] v-else @click="cancelfav(productdetail)").text-danger.m-0

                  p {{productdetail.name}}
                  s(v-if="productdetail.onsale").d-block NT :{{productdetail.price}}
                  p.h3.text-danger(v-if="productdetail.onsale") NT: {{productdetail.countPrice}}
                  p.h4(v-else) NT: {{productdetail.price}}
                  p 商品數量: {{productdetail.amount }}
                  div.d-flex.align-items-center
                    p(for="amount" ).d-block.mt-3 購買數量 :
                    b-form-spinbutton(
                      size="lg"
                      id="amount"
                      min="1"
                      :max="productdetail.amount"
                      v-model="cartProducts.amount"
                    ).w-50.ml-3
                  b-button(class="disabled" v-if="productdetail.amount === 0" ).w-100.py-2.mt-4 目前缺貨中
                  b-button(class="shopbtn" @click="addcartProduct(productdetail )" v-else ).w-100.py-2.mt-4 加入購物車
                    CartAnimation(style="position:absolute;top:25%;left:-150%").d-none.d-lg-block
                    Cartsmall(style="position:absolute;top:7%;left:0%").d-block.d-lg-none
                  p 付款與運送: 店到店 + 80 自取免運
              b-col(cols="12")
                b-tabs(style="min-height:40vh").mb-3
                  b-tab(title="商品詳細")
                    pre.h5.mt-5 {{productdetail.description}}
                    div.text-center
                      img(v-for="image in productdetail.src" :src="image" style="max-width:100%").my-2
                  b-tab(title="商品評論")
                    b-container
                      p(style="background: #CAE8F2" v-if="productdetail.comments.length < 1" ).py-2.my-3.text-center 商品目前沒有評論
                      b-row
                        b-col(cols="12")
                          ul
                            li(v-for="(comment, index) of productdetail.comments" style="list-style:none")
                              star-rating(:read-only="true" :rating="comment.stars" :star-size="20" :show-rating="false")
                              p.mt-2.ml-2 {{comment.accounts}} : {{comment.comment}}
                              b-button(@click="delComments(productdetail, index)" v-if="user.isAdmin === true").mb-2.bg-danger 刪除
                          hr
                          h3.mb-3 留下評論 :
                        b-col(cols="12" class="form").pt-2.rounded
                          b-form
                            p 滿意程度 :
                            star-rating(:show-rating="false" :star-size="20" v-model="rating").mb-3.mt-2
                            p 商品評價 :
                            b-form-textarea(v-model="comment").mb-3
                            b-row
                              b-col(cols="3").mb-3.ml-auto.mr-3
                                b-button(@click="sendcomments(productdetail)").w-100 送出

        b-col(cols="12")
          hr
          h1.text-center.my-4 相關商品
          Hot

</template>

<style lang="stylus">

</style>
<script>
import StarRating from 'vue-star-rating'
import { Carousel3d, Slide } from 'vue-carousel-3d'
import Hot from '@/components/Hot'
import CartAnimation from '@/components/CartAnimation'
import Cartsmall from '@/components/Cartsmall'

export default {
  name: 'productsdetail',
  data () {
    return {
      // checkfav: false,
      id: '',
      account: '',
      comment: '',
      preview: true,
      bigURL: '',
      rating: null,
      cartProducts: {
        amount: 1
      },
      cartLists: []
    }
  },
  components: {
    Slide,
    StarRating,
    Carousel3d,
    Hot,
    CartAnimation,
    Cartsmall
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    breadtag () {
      return this.$store.state.categories.filter(cate => {
        return cate.value === this.productdetail.category
      })
    },
    productdetail () {
      return this.$store.state.productdetail
    },
    checkfav () {
      let rel = false
      this.user.fav.map(item => {
        if (item._id === this.productdetail._id) {
          rel = true
        }
      })
      return rel
    },
    splicedcomments () {
      return this.$store.state.comment
    }
  },
  methods: {
    addfav (data) {
      // this.checkfav = true
      let rel = true
      this.user.fav.map(item => {
        if (item._id === this.productdetail._id) {
          rel = false
        }
      })
      if (rel) {
        this.user.fav.push(this.productdetail)
        this.axios.patch(process.env.VUE_APP_API + '/users/edit/' + this.user.id, {
          fav: this.user.fav
        }).then(res => {
          console.log(res)
          console.log(res)
          this.$store.commit('addfav', res.data.result.fav)
        })
      }
    },
    cancelfav (data) {
      const idx = this.user.fav.findIndex(fav => {
        return fav._id === data._id
      })
      this.user.fav.splice(idx, 1)
      this.axios.patch(process.env.VUE_APP_API + '/users/edit/' + this.user.id, {
        fav: this.user.fav
      }).then(res => {
        console.log(res)
      })
    },
    addcartProduct (data) {
      this.$store.state.addShow = true
      setTimeout(() => {
        this.$store.state.addShow = false
      }, 800)

      if (this.user.name === '') {
        alert('請先登入')
        this.$router.push('/login')
      } else {
        var user = this.$store.state.user
        let rel = true
        user.shopcar.map(item => {
          if (item.p_id._id === data._id &&
          item.p_id.amount >= this.cartProducts.amount &&
          this.cartProducts.amount + item.amount < item.p_id.amount) {
            item.amount += this.cartProducts.amount
            // this.productdetail.amount -= this.cartProducts.amount
            rel = false
          } else if (item.p_id._id === data._id && this.cartProducts.amount + item.amount >= item.p_id.amount) {
            item.amount = item.p_id.amount
            alert('超過商品數量')
            rel = false
          }
        })
        if (rel) {
          user.shopcar.push({ amount: this.cartProducts.amount, p_id: data })
          // this.productdetail.amount -= this.cartProducts.amount
        }
        this.axios.patch(process.env.VUE_APP_API + '/users/edit/' + user.id, {
          shopcar: user.shopcar
        }).then(res => {
          if (res.data.success) {
            // this.$router.push('/shopcar')
            console.log(res)
            this.$store.commit('addcartProduct', res.data.result.shopcar)
          } else {
            alert('發生錯誤')
          }
        })
      }
    },
    delComments (data, index) {
      var comments = data.comments
      this.axios.patch(process.env.VUE_APP_API + '/products/edit/' + data._id, {
        comments: comments
      })
      // .then(res => {
      //   if (res.data.success) {
      //     this.$store.commit('delcomment', index)
      //   } else {
      //     alert('發生錯誤')
      //   }
      // })
      // .catch(err => {
      //   alert(err.response.data.message)
      // })
    },
    tagCategory (data) {
      this.$store.state.tag = data.value
    },
    changeimg (image) {
      this.preview = false
      this.bigURL = image
    },
    sendcomments (data) {
      this.id = data._id
      var comments = {
        accounts: this.$store.state.user.account,
        comment: this.comment,
        stars: this.rating
      }
      data.comments.push(comments)
      console.log(data.comments)
      this.axios.patch(process.env.VUE_APP_API + '/products/edit/' + this.id, {
        comments: data.comments
      }).then(res => {
        if (res.data.success) {
          this.$store.commit('sendcomments', data)
        }
        this.comment = ''
        this.rating = null
      })
    }
  }

}
</script>
