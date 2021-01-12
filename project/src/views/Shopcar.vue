<template lang="pug">
  #shopcar
    b-container.shadow
      b-row
        b-breadcrumb(:items="breads")
        b-col(cols="12" v-if="step1")
          b-container()
            b-row
              b-col(cols="6").mx-auto.d-flex.justify-content-center.align-items-center
                div(class="step" ).mx-5
                  p 1
                font-awesome-icon( :icon=['fas', 'arrow-alt-circle-right'] ).h3.m-0
                div(class="step " ).mx-5
                  p 2
                font-awesome-icon( :icon=['fas', 'arrow-alt-circle-right'] ).h3.m-0
                div(class="step " ).mx-5
                  p 3
          hr
          b-table(
            id="formstable"
            class="mx-auto  text-center"
            :items='cartproducts'
            style=""
            :fields='fields'
          ).bg-white.rounded.mt-3.p-5
            template(#cell(img)='data' )
              img(:src="data.item.p_id.src" style="max-height:100%;max-width:100%")
            template(#cell(amount)='data')
              b-form-spinbutton(
                          v-model="data.item.amount"
                          size="sm"
                          id="amount"
                          min="1"
                          :max="data.item.p_id.amount"
                          @change="changeamount(data)"
                        )
            template(#cell(total)='data')
              p.p-0.m-0 {{data.item.amount * data.item.p_id.price}}
            template(#cell(delete)='data')
              b-button(style="background:transparent" @click="delshopitem(data.index)")
                font-awesome-icon( :icon=['fas', 'trash-alt'] ).text-danger.h3.m-0
          hr
          b-row
            b-col(cols="2").ml-auto
              p.h3.text-right.mb-3 總計: ${{total }}
              b-button(class="next" @click="tostep2").mb-3.w-100 下一步
        b-col(cols="12" v-if="step2")
          b-container()
            b-row
              b-col(cols="6").mx-auto.d-flex.justify-content-center.align-items-center
                div(class="step step2" ).mx-5
                  p 1
                font-awesome-icon( :icon=['fas', 'arrow-alt-circle-right'] ).h3.m-0
                div(class="step step2" ).mx-5
                  p 2
                font-awesome-icon( :icon=['fas', 'arrow-alt-circle-right'] ).h3.m-0
                div(class="step step2" ).mx-5
                  p 3
          hr
          b-form(v-if="step2").bg-white.p-3
            b-row
              b-col(cols="6")
                font-awesome-icon( :icon=['fas', 'truck'] ).h5.m-0
                h5.d-inline.ml-2 運送方式 :
                b-form-group.mt-3.ml-3
                  b-form-radio-group(
                      id="order1"
                      stacked
                      v-model="order.howtosend"
                      name="order1"
                      :options="howtosend"
                      ).mb-2
                  div(v-if=" order.howtosend.shipping === 100 || order.howtosend.shipping === 120").ml-4

                  b-form-input(v-if=" order.howtosend.shipping === 20 || order.howtosend.shipping === 30 || order.howtosend.shipping === 80 || order.howtosend.shipping === 70" placeholder="門市 " v-model="order.howtosend.where")
                  b-form-input(v-if=" order.howtosend.shipping === 120 || order.howtosend.shipping === 100 " placeholder="地址" v-model="order.howtosend.where")

                font-awesome-icon( :icon=['fas', 'money-bill'] ).h5.m-0
                h5.d-inline.ml-2 付款方式 :
                b-form-group(v-if="order.howtosend.shipping === 0 || order.howtosend.shipping === 100 || order.howtosend.shipping === 120 || order.howtosend.shipping === 30 || order.howtosend.shipping === 20" ).ml-3.mt-3
                  b-form-radio(v-model="order.howtosend.howtopay" value="Line Pay" name="order2" ) Line Pay
                  b-form-radio(v-model="order.howtosend.howtopay" value="銀行轉帳" name="order2") 轉帳
                  b-form-radio(v-model="order.howtosend.howtopay" value="PChomePay" name="order2").mb-2 PChomePay
                p(v-else).ml-3.mt-3  貨到付款無需選擇付款方式
              b-col(cols="6")
                font-awesome-icon( :icon=['fas', 'user-astronaut'] ).h5.m-0
                h5.d-inline.ml-2 收件人資訊 :

                div.d-flex.mt-3
                  p.mr-2.mb-0 姓名 :
                  b-form-input( v-model="user.name" size="sm" v-if="isedit"  ).w-25
                  p(v-else).mb-0 {{user.name}}
                div.d-flex.mt-4
                  p.mr-2.m-0 電話 :
                  b-form-input( v-model="user.phone" size="sm" v-if="isedit").w-25
                  p(v-else).m-0  {{user.phone}}
                b-button( size="sm" style="font-size: 0.8rem" @click="checkedit").d-block.my-3
                  p( v-if="isedit").m-0 確定
                  p( v-else).my-1.w-100 修改收件資訊
                font-awesome-icon( :icon=['fas', 'sticky-note'] ).h5.m-0
                label.w-100.d-inline.h5.ml-2 備註 :
                  b-form-textarea(rows="5" v-model="order.note").w-100.mt-3
          hr
          b-row
            b-col(cols="4").ml-auto.text-right
              p   {{order.howtosend.method}} {{order.howtosend.howtopay}}
              p 運費: ${{order.howtosend.shipping}}
              p.h3.mb-3 總計: ${{total + order.howtosend.shipping}}
              div.d-flex
                b-button(class="" @click="tostep1").mb-3.w-100 上一步
                b-button(class="next" @click="buy(user)").mb-3.w-100.ml-5 確定購買
        b-col(cols="12" v-if="step3")
          b-container()
            b-row
              b-col(cols="6").mx-auto.d-flex.justify-content-center.align-items-center
                div(class="step step3" ).mx-5
                  p 1
                font-awesome-icon( :icon=['fas', 'arrow-alt-circle-right'] ).h3.m-0
                div(class="step step3" ).mx-5
                  p 2
                font-awesome-icon( :icon=['fas', 'arrow-alt-circle-right'] ).h3.m-0
                div(class="step step3" ).mx-5
                  p 3
          hr
          div(style="padding-top: 10rem;padding-bottom: 10rem").bg-white.d-flex.justify-content-center.align-items-center.rounded
            div
              p.m-0 謝謝您的購買與支持
              p Thank You !
              p 收到商品後有任何問題,請盡量於三天內與我們聯繫,我們會盡快為您處理
              p 電話 : 0988555555 (02)2300-9966
              p 商品編號:
          hr
          b-button(to="/products") 繼續購買
</template>

<script>
export default {
  components: {

  },
  name: 'Home',
  data () {
    return {
      order: {
        howtosend: { method: null, howtopay: null, shipping: 0, where: null },
        address: '',
        note: ''
      },
      howtosend: [
        { text: '7-11 取貨付款 80 元', value: { method: '7-11 ', howtopay: '取貨付款', shipping: 80 } },
        { text: '7-11 取貨 30 元', value: { method: '7-11 ', howtopay: '取貨', shipping: 30 } },
        { text: '全家 取貨付款 70 元', value: { method: '全家 ', howtopay: '取貨付款', shipping: 70 } },
        { text: '全家 取貨 20 元', value: { method: '全家', howtopay: '取貨', shipping: 20 } },
        { text: '黑貓宅急便 120元', value: { method: '黑貓宅急便', shipping: 120 } },
        { text: '郵寄 100元', value: { method: '郵寄', shipping: 100 } },
        { text: '自取', value: { method: '自取', shipping: 0, where: null } }
      ],
      isedit: false,
      step1: true,
      step2: false,
      step3: false,
      amount: 1,
      images: [],
      breads: [
        {
          text: '首頁',
          to: '/'
        },
        {
          text: '購物車',
          active: true
        }
      ],
      fields: [
        {
          key: 'p_id.productNumber',
          label: '商品編號'
        },
        {
          key: 'img',
          label: '圖片'
        },
        {
          key: 'p_id.name',
          label: '商品名稱'
        },
        {
          key: 'amount',
          label: '數量'
        },
        {
          key: 'total',
          label: '小記'
        },
        {
          key: 'delete',
          label: '刪除'
        }

      ]
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    cartproducts () {
      return this.$store.state.user.shopcar
    },
    total () {
      var total = 0
      for (var i = 0; i < this.cartproducts.length; i++) {
        var item = this.cartproducts[i]
        total += item.p_id.price * item.amount
      }
      return total
    }
  },
  methods: {
    changeamount (data) {
      this.axios.patch(process.env.VUE_APP_API + '/users/edit/' + this.user.id, {
        shopcar: this.cartproducts
      }).then(res => {
        console.log(res)
      })
    },
    checkedit () {
      this.isedit = !this.isedit
    },
    delshopitem (index) {
      this.$store.state.user.shopcar.splice(index, 1)
      console.log(index)
      this.axios.patch(process.env.VUE_APP_API + '/users/edit/' + this.$store.state.user.id, {
        shopcar: this.$store.state.user.shopcar
      }).then(res => {
        console.log(res)
        // this.$store.state.user.shopcar =
      })
    },
    tostep1 () {
      this.step1 = true
      this.step2 = false
    },
    tostep2 () {
      this.step1 = false
      this.step2 = true
    },
    buy (user) {
      this.step3 = true
      this.step1 = false
      this.step2 = false
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1
      const day = now.getDate()

      const name = this.user.name
      const phone = this.user.phone
      const date = year + '/' + month + '/' + day
      const where = this.order.howtosend.where
      const method = this.order.howtosend.method
      const howtopay = this.order.howtosend.howtopay
      const note = this.order.note
      const shipping = this.order.howtosend.shipping
      const total = this.total + this.order.howtosend.shipping
      user.orders.push({
        name: name,
        phone: phone,
        date: date,
        where: where,
        method: method,
        howtopay: howtopay,
        shipment: '未出貨',
        ispaid: '未付款',
        note: note,
        shipping: shipping,
        total: total,
        products: user.shopcar

      })
      this.axios.patch(process.env.VUE_APP_API + '/users/edit/' + user.id, {
        lastbuydate: date,
        orders: user.orders
      }).then(res => {
        console.log(res)
        for (let i = 0; i < user.shopcar.length; i++) {
          this.axios.patch(process.env.VUE_APP_API + '/products/edit/' + user.shopcar[i].p_id._id, {
            amount: user.shopcar[i].p_id.amount -= user.shopcar[i].amount,
            sold: user.shopcar[i].p_id.sold += user.shopcar[i].amount
          }).then(res => {
            console.log(res)
            this.axios.patch(process.env.VUE_APP_API + '/users/edit/' + user.id, {
              shopcar: []
            }).then(res => {
              user.shpocar = []
            })
          })
        }
      })
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/users/' + this.$store.state.user.id).then((res) => {
      this.images = res.data.result.shopcar.map(image => {
        console.log(image)
        image.p_id.src = process.env.VUE_APP_API + '/products/' + image.p_id.images[0].file
        return image
      })
      var data = this.images
      console.log(data)
      this.$store.commit('cartproducts', data)
    })
  }
}
</script>
<style lang="stylus">

</style>
