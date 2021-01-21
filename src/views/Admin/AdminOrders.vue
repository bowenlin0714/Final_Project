<template lang="pug">
  #adminorders.min-vh-100.text-white
    b-container
      b-row
        b-col(cols="12")
          h1.my-3.mb-2.text-center 訂單管理
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
                  stacked="md"
                  :items="row.item.orders"
                  :fields='orders').bg-white
                  template(#cell(detail)='row')
                    b-button(variant="info" v-b-modal.orderdetail @click="showOrderdetail(row.item)") 查看訂單明細
                  template(#cell(ispaid)='data')
                    b-button(@click="handlepaid(row, data.index)" )
                      p(v-if="data.item.ispaid").text-success 已付款 {{data.ispaid}}
                      p(v-else).text-danger 未付款
                  template(#cell(shipment)='data')
                    b-button(v-if="data.item.shipment === '未出貨'" @click="handleship(row, data.index)" )
                      p.text-danger {{data.item.shipment}}
                    b-button(v-else @click="notship(row, data.index)" )
                      p.text-info {{data.item.shipment}}
                hr
                b-container.d-flex.flex-row-reverse
                  b-button( @click="row.toggleDetails").bg-danger.mb-2 關閉
            template(#cell(amount)='data')
              p  {{data.item.orders.length}}
        b-modal(id="orderdetail" title="訂單明細 : "
        size="xl" hide-footer)
          b-container
            b-row
              b-col(cols="12")
                b-row
                  b-col(cols="12")
                    p.my-1  購買日期 : {{orderdetail.date}}
                    p.my-1 訂單編號: {{orderdetail._id}}
                  b-col(cols="12").text-left
                    p.my-1  收件人 : {{orderdetail.name}}
                    p.my-1 電話 : {{orderdetail.phone}}
                p.my-1  運送地址 : {{orderdetail.where}}
                p.my-1  付款方式 : {{orderdetail.howtopay}}
                  span.ml-3 付款狀態 :
                  span.text-danger {{orderdetail.ispaid}}
                p 運送方式 : {{orderdetail.method}}
                  span.ml-3  出貨狀態 :
                  span.text-danger {{orderdetail.shipment}}
                b-table(
                  stacked="md"
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
                  p.my-1 商品數量 : {{orderlength}}
                  p.my-1 小計 : {{orderdetail.total - orderdetail.shipping}}
                  p 運費 : {{orderdetail.shipping}}
                  hr
                  h4 合計 : {{orderdetail.total}}
</template>

<script>

export default {
  name: 'AdminOrders',
  data () {
    return {
      orderlists: [],
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
          label: '訂單明細'
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
          label: '名稱'
        },
        {
          key: 'image',
          label: '圖片'
        },
        {
          key: 'amount',
          label: '數量'
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

  },
  methods: {
    handlepaid (row, index2) {
      const id = row.item._id
      const index1 = row.index
      this.orderlists[index1].orders[index2].ispaid = !this.orderlists[index1].orders[index2].ispaid
      this.axios.patch(process.env.VUE_APP_API + '/users/edit/' + id, { orders: this.orderlists[index1].orders }).then(res => {
        console.log(res)
      })
    },
    handleship (row, index2) {
      const id = row.item._id
      const index1 = row.index
      this.orderlists[index1].orders[index2].shipment = '已出貨'
      this.axios.patch(process.env.VUE_APP_API + '/users/edit/' + id, { orders: this.orderlists[index1].orders }).then(res => {
        console.log(res)
      })
    },
    notship (row, index2) {
      const id = row.item._id
      const index1 = row.index
      this.orderlists[index1].orders[index2].shipment = '未出貨'
      this.axios.patch(process.env.VUE_APP_API + '/users/edit/' + id, { orders: this.orderlists[index1].orders }).then(res => {
        console.log(res)
      })
    },
    showOrderdetail (data) {
      this.orderdetail = data
      this.orderlength = data.products.length
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/users/').then((res) => {
      var data = res.data.result
      const result = data.filter(res => {
        return res.orders.length !== 0
      })
      for (const one of result) {
        for (const two of one.orders) {
          this.images = two.products.map(product => {
            console.log(product)
            product.p_id.src = process.env.VUE_APP_API + '/products/' + product.p_id.images[0].file
          })
        }
      }
      this.orderlists = result
    })
  }
}

</script>
