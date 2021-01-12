<template lang="pug">
  #membercenter
    b-container.shadow
      b-row
        b-breadcrumb(:items="breads")
        b-container
          b-col(cols="12").bg-white.mb-3.p-3
            h3 會員資料
            p ● 名稱: {{user.name}}
            p ● 帳號: {{user.account}}
            p ● 密碼: {{user.phone}}
            p ● e-mail: {{user.email}}
            p ● 地址: {{user.address}}
            b-button(class="editbtn").my-2 編輯
            div ● 追蹤中商品:
            div ● 我的訂單:
              p.my-3 未完成 :
              b-table(
                :items="unfinishOrder"
                :fields="fields"
              ).mt-3
                template(#cell(ispaid)='data')
                  p.text-danger {{data.item.ispaid}}
                    b-button(size="sm") 已匯款
                template(#cell(shipment)='data')
                  p.text-danger {{data.item.shipment}}
                template(#cell(detail)='data')
                  b-button 訂單詳細
                template(#cell(orderAmount)='data')
                  p {{data.item.products.length}}
              p(v-if="unfinishOrder.length === 0").text-center 目前沒有內容
              p 已完成 :
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
                  b-button 訂單詳細
                template(#cell(orderAmount)='data')
                  p {{data.item.products.length}}
              p(v-if="completeOrder.length === 0").text-center 目前沒有內容

</template>

<script>
export default {
  name: 'MemberCenter',
  data () {
    return {
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
  mounted () {
    console.log(this.$store.state.user)
    this.axios.get(process.env.VUE_APP_API + '/users/' + this.user.id).then((res) => {
      this.$store.commit('centerOrders', res.data.result.orders)
    })
  }
}
</script>
