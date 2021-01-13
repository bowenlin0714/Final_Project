<template lang="pug">
  #adminorders.min-vh-100.text-white
    b-container
      b-row
        b-col(cols="12")
          h1 訂單管理
          b-table(
          class=""
          class="mx-auto"
          :items='orderlists'
          :fields='fields'
          ).text-white.text-center
            template(#cell(detail)='row')
              b-button(variant="info"  @click="row.toggleDetails") 完整訊息

            template(v-slot:row-details="row")
              div.bg-white
                b-table(
                  :items="row.item.orders"
                  :fields='orders').bg-white
                  template(#cell(detail)='row')
                    b-button(variant="info" v-b-modal.orderdetail @click="showOrderdetail(row.item)") 查看訂單明細
                  template(#cell(ispaid)='data')
                    p.text-danger {{data.item.ispaid}}
                  template(#cell(shipment)='data')
                    p.text-danger {{data.item.shipment}}
                hr
                div.d-flex.flex-row-reverse
                  b-button( @click="row.toggleDetails").bg-danger.mb-2.mr-3 關閉
            template(#cell(amount)='data')
              p  {{data.item.orders.length}}
        b-modal(id="orderdetail" title="訂單明細 : "
        size="xl" hide-footer)
          b-container
            b-row
              b-col(cols="12")
                b-row
                  b-col(cols="6")
                    p  購買日期 : {{orderdetail.date}}
                      span.ml-3 訂單編號: {{orderdetail._id}}
                  b-col(cols="6")
                    p.text-right  收件人 : {{orderdetail.name}}
                      span.ml-3 電話 : {{orderdetail.phone}}
                p  運送地址 : {{orderdetail.where}}
                p  付款方式 : {{orderdetail.howtopay}}
                  span.ml-3 付款狀態 :
                  span.text-danger {{orderdetail.ispaid}}
                p 運送方式 : {{orderdetail.method}}
                  span.ml-3  出貨狀態 :
                  span.text-danger {{orderdetail.shipment}}
                b-table(
                  :items="orderdetail.products"
                  :fields="detailProducts"

                ).mt-3
                  template(#cell(name)='data')
                    p {{data.item.p_id.name}}
                  template(#cell(price)='data')
                    p(v-if="data.item.p_id.onsale").text-danger  {{ data.item.p_id.countPrice}}
                    p(v-else)  {{ data.item.p_id.price}}
                  template(#cell(smalltotal)='data')
                    p(v-if="data.item.p_id.onsale")  {{data.item.amount * data.item.p_id.countPrice}}
                    p(v-else)  {{data.item.amount * data.item.p_id.price}}
                  template(#cell(image)='data')
                    img(:src="data.item.p_id.src" style="height:5rem")
                hr
                div.text-left
                  p 備註 : {{orderdetail.note}}
                div.text-right
                  p.m-0 商品數量 : {{orderlength}}
                  p.m-0 小計 : {{orderdetail.total - orderdetail.shipping}}
                  p 運費 : {{orderdetail.shipping}}
                  h4 合計 : {{orderdetail.total}}
</template>

<script>

export default {
  name: 'AdminOrders',
  data () {
    return {
      images: null,
      user: '',
      orderdetail: '',
      orderlength: '',
      fields: [
        {
          key: 'lastbuydate',
          label: '最後購買日期',
          sortable: true
        },
        {
          key: 'account',
          label: '帳號',
          sortable: true
        },
        {
          key: 'detail',
          label: '訂單'
        },
        {
          key: 'amount',
          label: '訂單數量'
        }
      ],
      orders: [
        {
          key: 'name',
          label: '買家'
        },
        {
          key: 'date',
          label: '購買日期',
          sortable: true
        },
        {
          key: 'phone',
          label: '電話'
        },
        {
          key: 'total',
          label: '總價',
          sortable: true
        },
        {
          key: 'detail',
          label: '訂單詳細'
        },
        {
          key: 'ispaid',
          label: '付款狀態'
        },
        {
          key: 'shipment',
          label: '出貨狀態'
        }
      ],
      detailProducts: [
        {
          key: 'name',
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
      ]
    }
  },
  computed: {
    orderlists () {
      return this.$store.state.orderlists
    }

  },
  methods: {
    showOrderdetail (data) {
      this.orderdetail = data
      this.orderlength = data.products.length
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/users/').then((response) => {
      var data = response.data.result
      const result = data.filter(res => {
        return res.orders.length !== 0
      })
      for (const one of result) {
        for (const two of one.orders) {
          this.images = two.products.map(product => {
            product.p_id.src = process.env.VUE_APP_API + '/products/' + product.p_id.images[0].file
          })
          console.log(result)
        }
      }
      this.$store.commit('orderlists', result)
    })
  }
}

</script>
