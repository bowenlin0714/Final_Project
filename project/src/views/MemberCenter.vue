<template lang="pug">
  #membercenter
    b-container.shadow
      b-row
        b-breadcrumb(:items="breads")
        b-container
          b-col(cols="12").bg-white.mb-3.p-3
            h4.d-inline 會員資料 :
            b-button(class="editbtn" @click="edituser" size="sm" v-if="this.isEdit").mb-2.ml-3 確定
            b-button(class="editbtn" @click="edit" size="sm" v-else).mb-2.ml-3 編輯
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
            h4  追蹤中商品 :
            b-table(
              :items="user.fav"
              :fields="favfields"
              )
              template(#cell(cancel)='data')
                b-button(size="sm") 取消追蹤
            p(v-if="user.fav.length === 0").text-center 目前沒有內容
            div
              h4  我的訂單 :
              b-card(n-body)
                b-tabs
                  b-tab(title="未完成")
                    b-table(
                      :items="unfinishOrder"
                      :fields="fields"
                    ).mt-3
                      template(#cell(ispaid)='data')
                        p.text-danger {{data.item.ispaid}}
                      template(#cell(shipment)='data')
                        p.text-danger {{data.item.shipment}}
                      template(#cell(detail)='row')
                        b-button(v-b-modal.unfinishDetail  @click="showUnfinishOrder(row.item)") 訂單詳細
                      template(#cell(orderAmount)='data')
                        p {{data.item.products.length}}
                    p(v-if="unfinishOrder.length === 0").text-center 目前沒有內容
                  b-tab(title="已完成")
                    b-table(
                      :items="completeOrder"
                      :fields="fields"
                    ).mt-3
                      template(#cell(ispaid)='data')
                        p.text-danger {{data.item.ispaid}}
                          b-button(size="sm") 已匯款
                      template(#cell(shipment)='data')
                        p.text-danger {{data.item.shipment}}
                      template(#cell(detail)='data')
                        b-button() 訂單明細
                      template(#cell(orderAmount)='data')
                        p {{data.item.products.length}}
                    p(v-if="completeOrder.length === 0").text-center 目前沒有內容

            P 付款資訊 :
            div.payinfo.mx-auto
              div.d-flex.justify-content-between
                h6 匯款 :
                div.mx-5.mt-3
                  p.m-0 富邦 4699 5555 5555 5555
                  p.m-0 玉山 4699 5555 5555 5555
                  p  郵局 4699 5555 5555 5555
                h6 Line Pay :
                img(src="../assets/qrcode.png" style="width:6rem;height:6rem").mx-5.mt-3
                h6 PChomePay :
                a(href="https://web.pchomepay.com.tw/")
                  img(src="../assets/pchome.png" style="width:6rem;height:3rem").mx-5.mt-3
              p.m-0.mt-3.text-center.w-100 確認匯款資訊後會立刻為您確認，如選擇貨到付款可忽略此訊息~

            b-modal(id="unfinishDetail" title="訂單明細 : "
              size="xl" hide-footer)
              b-container
                b-row
                  b-col(cols="12")
                    b-row
                      b-col(cols="6")
                        p  購買日期 : {{unfinishDetail.date}}
                          span.ml-3 訂單編號: {{unfinishDetail._id}}
                      b-col(cols="6")
                        p.text-right  收件人 : {{unfinishDetail.name}}
                          span.ml-3 電話 : {{unfinishDetail.phone}}
                    p  運送地址 : {{unfinishDetail.where}}
                    p  付款方式 : {{unfinishDetail.howtopay}}
                      span.ml-3 付款帳戶 : {{unfinishDetail.payaccount}}
                      span.ml-3 付款狀態 :
                      span.text-danger {{unfinishDetail.ispaid}}
                    p 運送方式 : {{unfinishDetail.method}}
                      span.ml-3  出貨狀態 :
                      span.text-danger {{unfinishDetail.shipment}}
                    b-table(
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
                    div.text-right
                      //- p.m-0 商品數量 : {{orderlength}}
                      p.m-0 小計 : {{unfinishDetail.total - unfinishDetail.shipping}}
                      p 運費 : {{unfinishDetail.shipping}}
                      h4 合計 : {{unfinishDetail.total}}

</template>

<script>
export default {
  name: 'MemberCenter',
  data () {
    return {
      unfinishDetail: '',
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
          key: 'ispaid',
          label: '付款狀態'
        },
        {
          key: 'shipment',
          label: '出貨狀態'
        },
        {
          key: 'detail',
          label: '訂單詳細'
        }
      ],
      detailProducts: [
        {
          key: 'p_id.name',
          label: '商品名稱'
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
          label: '商品名稱'
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
        return res.shipment !== '完成'
      })
    },
    completeOrder () {
      return this.user.orders.filter(res => {
        return res.shipment === '完成'
      })
    }
  },
  methods: {
    edit () {
      this.isEdit = true
    },
    edituser () {
      this.axios.patch(process.env.VUE_APP_API + '/users/edit/' + this.user.id, this.user)
        .then(res => {
          console.log(res)
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
    console.log(this.$store.state.user)
    this.axios.get(process.env.VUE_APP_API + '/users/' + this.user.id).then((res) => {
      console.log(res.data.result.orders)
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
