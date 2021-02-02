<template lang="pug">
  #membercenter
    b-container.shadow
      b-row
        b-breadcrumb(:items="breads").mt-2.ml-3
        b-container
          b-col(cols="12" ).bg-white.mb-3.p-5
            .title.mb-5
             p Member Center
            h4.d-inline.my-4 會員資料 :
            b-button(class="editbtn" @click="edituser" size="sm" v-if="this.isEdit").mb-2.ml-3 確定
            b-button(class="editbtn" @click="edit" size="sm" v-else).mb-2.ml-3 編輯
            span(v-if="user.isBan").ml-3.text-danger 封鎖中，欲解鎖請洽客服
            div.my-2 ● 名稱:
              b-form-input(size="sm" v-model="user.name" v-if="isEdit").w-25.d-inline.ml-3
              span(v-else).ml-3 {{user.name}}
            div.my-2 ● 帳號:
              b-form-input(size="sm" v-model="user.account" v-if="isEdit").w-25.d-inline.ml-3
              span(v-else).ml-3 {{user.account}}
            div.my-2 ● 手機:
              b-form-input(size="sm" v-model="user.phone" v-if="isEdit").w-25.d-inline.ml-3
              span(v-else).ml-3 {{user.phone}}
            div.my-2 ● e-mail:
              b-form-input(size="sm" v-model="user.email" v-if="isEdit").w-25.d-inline.ml-3
              span(v-else).ml-3 {{user.email}}
            div.my-2 ● 匯款帳戶:
              b-form-input(size="sm" v-model="user.payaccount" v-if="isEdit").w-25.d-inline.ml-3
              span(v-else).ml-3 {{user.payaccount}}
            hr
            h4.my-3  訊息中心 :
            b-card(n-body)
              b-tabs
                b-row
                  b-col(cols="12" lg="8").mx-auto.mt-4
                    b-tab(title="官方訊息")
                      p(v-if="user.toMember.length === 0").text-center.my-4 目前沒有訊息
                      div(v-for="msg in user.toMember" class="msgbox").bg-light
                        p {{msg.detail}}
                        span {{msg.date}}
                    b-tab(title="傳送訊息")
                      p(v-if="user.toAdmin.length === 0").text-center.my-4 目前沒有訊息
                      div(v-for="msg in user.toAdmin" v-else class="msgbox").bg-light.d-flex.flex-row-reverse
                        p {{msg.detail}}
                        span.mr-3 {{msg.date}}
                      b-form(@submit.stop.prevent="sendmsg").my-3
                        b-form-input(
                          name="message"
                          v-model="message"
                          placeholder="請輸入"
                          :state="validateState('message')"
                          v-validate="{ required: true }"
                          data-vv-as="訊息 :")
                        b-form-invalid-feedback() {{ veeErrors.first('message') }}
                        b-row
                          b-col(cols="12" lg="3").ml-auto
                            b-button(class="msgbutton"  @click="sendmsg").w-100.mt-3 傳送訊息
            hr
            h4.my-3  追蹤中商品 :
            b-table(
              stacked="md"
              :items="user.fav"
              :fields="favfields"
              ).text-center
              template(#cell(name)='data')
                p(style="") {{data.item.name}}
              template(#cell(cancel)='data')
                b-button(size="sm" @click="cancelfav(data.index)") 取消追蹤
              template(#cell(image)='data')
                img(:src="data.item.src[0]" style="max-height:5rem")
            p(v-if="user.fav.length === 0").text-center 目前沒有內容
            hr
            div
              h4.my-3  我的訂單 :
              b-card(n-body)
                b-tabs
                  b-tab(title="未完成")
                    b-table(
                      stacked="md"
                      :items="unfinishOrder"
                      :fields="fields"
                    ).mt-3.text-center
                      template(#cell(paid)='data')
                        span(v-if="data.item.ispaid").text-success 已付款
                        span(v-else).text-danger 未付款
                      template(#cell(ship)='data')
                        p(v-if="data.item.shipment === '未出貨'").text-danger 未出貨
                        p(v-else).text-info 已出貨
                      template(#cell(detail)='row')
                        b-button(v-b-modal.unfinishDetail  @click="showUnfinishOrder(row.item)") 訂單明細
                      template(#cell(check)='data')
                        b-button(@click="checkreceive(data)" v-if="data.item.shipment === '已出貨'") 確認收貨
                        p(v-else).text-secondary 尚未出貨
                      template(#cell(orderAmount)='data')
                        p {{data.item.products.length}}
                    p(v-if="unfinishOrder.length === 0").text-center 目前沒有內容
                  b-tab(title="已完成")
                    b-table(
                      stacked="md"
                      class="complete"
                      :items="completeOrder"
                      :fields="fields"
                    ).mt-3.text-center
                      template(#cell(paid)='data')
                       span(v-if="data.item.ispaid").text-success 已付款
                       span(v-else).text-danger 未付款
                      template(#cell(ship)='data')
                        p.text-success 已收貨
                      template(#cell(detail)='data')
                        b-button() 訂單明細
                      template(#cell(check)='data')
                        b-button(@click="checkreceive(data.item)") 確認收貨
                      template(#cell(orderAmount)='data')
                        p {{data.item.products.length}}

                    p(v-if="completeOrder.length === 0").text-center 目前沒有內容

            div.payinfo.mx-auto.mt-5.p-3
              div.d-flex.justify-content-between.flex-column.flex-lg-row
                h6 匯款 :
                div.mx-5.mt-3
                  p.m-0 富邦 4699 5555 5555 5555
                  p.m-0 玉山 4699 5555 5555 5555
                  p  郵局 4699 5555 5555 5555
                h6.mt-3 Line Pay :
                img(src="../assets/qrcode.png" style="width:6rem;height:6rem").mx-5.mt-3
                h6.mt-3 PChomePay :
                a(href="https://web.pchomepay.com.tw/")
                  img(src="../assets/pchome.png" style="width:6rem;height:3rem").mx-5.mt-3
              p.m-0.mt-3.text-center.w-100 確認匯款資訊後會立刻為您確認，如選擇貨到付款可忽略此訊息~

            b-modal(id="unfinishDetail" title="訂單明細 : "
              size="xl" hide-footer )
              b-container
                b-row
                  b-col(cols="12" style="line-height:2rem")
                    b-row
                      b-col(cols="12" lg="6")
                        p  購買日期 : {{unfinishDetail.date}}
                        p 訂單編號: {{unfinishDetail._id}}
                      b-col(cols="12" lg="6")
                        p.text-left.text-lg-right  收件人 : {{unfinishDetail.name}}
                          span.ml-3 電話 : {{unfinishDetail.phone}}
                    p  運送地址 : {{unfinishDetail.where}}
                    p  付款方式 : {{unfinishDetail.howtopay}}
                      span.ml-3 付款帳戶 : {{unfinishDetail.payaccount}}
                      span.ml-3 付款狀態 :
                      span(v-if="unfinishDetail.ispaid").text-success 已付款
                      span(v-else).text-danger 未付款
                    p 運送方式 :
                      span.ml-3  出貨狀態 :
                      span(v-if="unfinishDetail.shipment === '已出貨'").text-info 已出貨
                      span(v-else).text-danger 未出貨
                    b-table(
                      stacked="md"
                      :items="unfinishDetail.products"
                      :fields="detailProducts"
                    ).mt-3
                      template(#cell(price)='data')
                        p(v-if="data.item.p_id.onsale").text-danger  {{ data.item.p_id.countPrice}}
                        p(v-else)  {{ data.item.p_id.price}}
                      template(#cell(image)='data')
                        img(:src="data.item.p_id.src" style="height:5rem")
                      template(#cell(smalltotal)='data')
                        p(v-if="data.item.p_id.onsale")  {{data.item.amount * data.item.p_id.countPrice}}
                        p(v-else)  {{data.item.amount * data.item.p_id.price}}
                    hr
                    div.text-left
                      p 備註 : {{unfinishDetail.note}}
                    div.text-left.text-lg-right
                      p.m-0 小計 : {{unfinishDetail.total - unfinishDetail.shipping}}
                      p 運費 : {{unfinishDetail.shipping}}
                      hr
                      h4 合計 : {{unfinishDetail.total}}

</template>

<script>
export default {
  name: 'MemberCenter',
  data () {
    return {
      unfinishDetail: '',
      message: '',
      isEdit: false,
      orderAmount: '',
      breads: [
        {
          text: '首頁',
          to: '/'
        },
        {
          text: '會員中心',
          active: true
        }
      ],
      fields: [

        {
          key: 'date',
          label: '購買日期',
          sortable: true
        },
        {
          key: 'orderAmount',
          label: '商品數量'
        },
        {
          key: 'total',
          label: '總價',
          sortable: true
        },
        {
          key: 'paid',
          label: '付款狀態'
        },
        {
          key: 'ship',
          label: '出貨狀態'
        },
        {
          key: 'detail',
          label: '訂單明細'
        },
        {
          key: 'check',
          label: '確認'
        }
      ],
      detailProducts: [
        {
          key: 'p_id.name',
          label: '商品名稱',
          tdClass: 'tdClass'

        },
        {
          key: 'image',
          label: '商品圖片'
        },
        {
          key: 'amount',
          label: '購買數量'
        },
        {
          key: 'price',
          label: '價格'
        },
        {
          key: 'smalltotal',
          label: '小計'
        }
      ],
      favfields: [
        {
          key: 'name',
          label: '商品名稱',
          tdClass: 'tdClass'
        },
        {
          key: 'image',
          label: '商品圖片'
        },
        {
          key: 'price',
          label: '價格'
        },
        {
          key: 'cancel',
          label: '取消追蹤'
        }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    unfinishOrder () {
      return this.user.orders.filter(res => {
        return res.shipment !== '已收貨'
      })
    },
    completeOrder () {
      return this.user.orders.filter(res => {
        return res.shipment === '已收貨'
      })
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
    checkreceive (data) {
      data.item.shipment = '已收貨'
      this.axios.patch(process.env.VUE_APP_API + '/users/edit/' + this.user.id, this.user)
    },
    cancelfav (index) {
      this.user.fav.splice(index, 1)
      this.axios.patch(process.env.VUE_APP_API + '/users/edit/' + this.user.id, this.user)
    },
    edit () {
      console.log(this.user.isBan)
      if (this.user.isBan === true) {
        this.$swal.fire({
          toast: true,
          position: 'bottom-start',
          padding: '1rem',
          icon: 'error',
          title: '封鎖中，欲解鎖請洽客服',
          showConfirmButton: false,
          timer: 3000
        })
      } else {
        this.isEdit = true
      }
    },
    sendmsg () {
      this.$validator.validateAll().then(result => {
        if (!result) {
        } else {
          var now = new Date()
          var year = now.getFullYear()
          var month = now.getMonth() + 1
          var day = now.getDate()
          var date = year + '/' + month + '/' + day
          var data = {
            detail: this.message,
            date: date
          }
          this.user.toAdmin.push(data)
          this.$validator.validateAll().then(res => {
            if (!res) {
            } else {
              this.axios.patch(process.env.VUE_APP_API + '/users/edit/' + this.user.id, {
                toAdmin: this.user.toAdmin
              }).then(res => {
                this.message = ''
                this.$validator.reset()
              // this.$store.commit('toAdmin', data)
              })
            }
          })
        }
      })
    },
    edituser () {
      this.axios.patch(process.env.VUE_APP_API + '/users/edit/' + this.user.id, this.user)
        .then(res => {
          this.isEdit = false
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    showUnfinishOrder (data) {
      this.unfinishDetail = data
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/users/' + this.user.id).then((res) => {
      for (const one of res.data.result.orders) {
        one.products.map(product => {
          product.p_id.src = process.env.VUE_APP_API + '/products/' + product.p_id.images[0].file
        })
      }

      this.$store.commit('login', res.data.result)
    })
  }
}
</script>
