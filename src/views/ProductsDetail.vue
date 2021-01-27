<template lang="pug">
  #productsdetail.p-0.m-0
    b-container.shadow
      b-row
        b-col(cols="12")
          b-breadcrumb.mt-2
            b-breadcrumb-item(to="/") 首頁
            b-breadcrumb-item(to="/products") 商品列表
            b-breadcrumb-item(to="/products" @click="tagCategory(category)") {{breadtag[0].text}}
            b-breadcrumb-item(active) {{productdetail.name}}
        b-col(cols="2").ml-4.mr-4
          b-list-group(v-for="(category, index) in this.$store.state.categories" :key="index").p-1.d-none.d-lg-block
            b-list-group-item.p-0.text-center.d-block
              div(v-ripple class="button is-primary")
                a(href="#/products").text-white
                  b-button(
                    class="activebtn"
                    @click="tagCategory(category)"
                    style="font-size:0.9rem"
                    v-if="tag === category.value").w-100.shadow-sm {{category.text}}
                  b-button(
                    @click="tagCategory(category)"
                    style="font-size:0.9rem"
                    v-else).w-100.shadow-sm {{category.text}}

        b-col(cols="12" lg="9" class="right").border.bg-white.pt-3
            b-row
              b-col(cols="12" lg="7")
                div(class="bigimg").ml-1.border
                  img(v-show="preview" :src="productdetail.src[0]")
                  img(:src="bigURL")
                ul.d-flex
                  li(v-for="image in productdetail.src" style="").m-2.border
                    img(:src="image" @click="changeimg(image)").w-100.h-auto
              b-col(cols="12" lg="5")
                div(style="min-height:50vh").d-flex.flex-column.justify-content-around
                  div.d-flex.justify-content-lg-between
                    p 商品編號 : {{productdetail.productNumber}}
                    button(class="favbut" ).d-none.d-lg-block
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
                  b-button(class="shopbtn" @click="addcartProduct(productdetail )" v-else ).py-2.mt-4 加入購物車
                    CartAnimation(style="position:absolute;top:25%;left:-150%").d-none.d-lg-block
                    Cartsmall(style="position:absolute;top:7%;left:0%").d-block.d-lg-none
                  b-button(class="favbtn" @click="addfav(productdetail)" ).w-100.py-2.d-block.d-lg-none 加入追蹤商品
                  p 付款與運送: 自取免運 詳情請見購物須知
              b-col(cols="12").mt-3
                b-tabs(style="min-height:40vh").mb-3
                  b-tab(title="商品詳細")
                    pre(style="line-height:2rem").h6.my-4 {{productdetail.description}}
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
                          h6.mb-3 留下評論 :
                        b-col(cols="12" class="form").pt-2.rounded
                          b-form
                            p 滿意程度 :
                            star-rating(:show-rating="false" :star-size="20" v-model="rating").mb-3.mt-2
                            p.mb-3 商品評價 :
                            b-form-textarea(
                              name="comment"
                              v-model="comment"
                              placeholder="請輸入"
                              :state="validateState('comment')"
                              v-validate="{ required: true }"
                              data-vv-as="商品評價 :").mb-3
                            b-form-invalid-feedback() {{ veeErrors.first('comment') }}
                            b-row
                              b-col(cols="3").mb-3.ml-auto.mr-3
                                b-button(@click="sendcomments(productdetail)" class="send").w-100 送出
            div.p-3.mb-3
              p.text-center 購物須知
              p.my-3 | 購物流程
              p.text 請您先登入會員，挑選喜愛的商品，進入商品頁之後點選數量，按"加入購物車"，全部挑選完畢後，在螢幕上方購物車的畫面，點選"訂單結帳"。進入結帳畫面後，依系統指示輸入資料，並選擇送貨方式與付款方式，再按"確定購買"，系統會依照您選擇的付款方式引導您完成結帳動作，即可完成購物。
              p.my-3 | 付款方式
              p.text 選好商品之後，進入結帳畫面，您可以依據您希望的配送方式，選擇付款方式
                | 若您選擇「貨到付款」，則宅配人員在配送商品時，會一併向您收取該筆訂單款項
                | 若您選擇「先付款宅配到府/7-11超商取貨」，則有信用卡，ATM櫃員機，Line Pay等付款方式可以選擇
                | 選擇ATM轉帳必須在三日內付款完成，否則系統將會自動取消該筆訂單
              p.my-3 | 配送方式與運費
              div.text 先付款後宅配之運費：每筆70元
                p 7-11 取貨付款 80 元
                p  7-11 取貨 30 元
                p  全家 取貨付款 70 元
                p  全家 取貨 20 元
                p  黑貓宅急便 120元
                p  郵寄 100元
                p  自取 免費
                | 商品訂購後，預計3-14天送達
              p.my-3 | 收到商品錯誤或收到瑕疵品
              p.text 收到商品如果有問題，請於三天內聯絡我們的電話，或是透過訊息中心告知
                | 請詳述您的問題，並提供該筆訂單編號、下單時所使用的手機號碼、收到的實際商品的照片，
                | 經由客服人員判斷確為商品有錯誤，會協助您進入退貨服務流程，並重新寄送正確商品給您。

                | 提醒您，退回的商品必須是全新的狀態、而且完整包裝(含商品本體、配件、贈品、保證書、原廠包裝及所有附隨文件或資料的完整性)， 切勿缺漏任何             | 配件、請勿自行拆解檢查商品或損毀原廠外盒。原廠外盒及原廠包裝都屬於商品的一部分，或有遺失、毀損或缺件，可能影響您退貨的權益，也可能依照            | 損毀程度扣除為回復原狀所必要的費用。
        b-col(cols="12")
          hr
          h4.text-center.my-4.mb-5.relative 相關商品
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
// import { Validator } from 'vee-validate'

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
    tag () {
      return this.$store.state.tag
    },
    category () {
      return this.$store.state.categories
    },
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
    validateState (ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref)
      }
      return null
    },
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
      })
    },
    addcartProduct (data) {
      this.$store.state.addShow = true
      setTimeout(() => {
        this.$store.state.addShow = false
      }, 800)

      if (this.user.name === '') {
        this.$swal.fire({
          toast: true,
          position: 'top-start',
          icon: 'warning',
          title: '請先登入',
          showConfirmButton: false,
          timer: 3000
        })
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
          user.shopcar.push({ select: true, amount: this.cartProducts.amount, p_id: data })
          // this.productdetail.amount -= this.cartProducts.amount
        }
        this.axios.patch(process.env.VUE_APP_API + '/users/edit/' + user.id, {
          shopcar: user.shopcar
        }).then(res => {
          if (res.data.success) {
            // this.$router.push('/shopcar')
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
      if (this.user.name === '') {
        this.$swal.fire({
          toast: true,
          position: 'top-start',
          icon: 'warning',
          title: '請先登入',
          showConfirmButton: false,
          timer: 3000
        })
        this.$router.push('/login')
      } else {
        this.$validator.validateAll().then(result => {
          if (!result) {
            return
          }

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
        })
      }
    }
  }

}
</script>
