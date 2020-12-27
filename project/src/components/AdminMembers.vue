<template lang="pug">
  #adminmembers.min-vh-100
    b-container()
      h1(class="my-3 mb-2") 會員資料管理
      b-row
        b-col(cols='12')
          b-table(
            stacked="md"
            id="membertable"
            class="mx-auto"
            :items='memberlists'
            :fields='fields' fixed
            :current-page="currentPage"
            :per-page="perPage"
            striped=true
            )
            template(#cell(address)='row')
              b-button(variant="info" @click.stop="row.toggleDetails") 會員地址
            template(v-slot:row-details="row")
              p 地址: {{row.item.address}}
              b-button( @click="row.toggleDetails").bg-info 關閉
            template(#cell(delete)='data')
              b-button(variant="danger" @click="delmember(data, data.index)") 刪除
      p(style="text-align:center").text-center 第 {{currentPage}} 頁 共 {{memberlists.length}} 筆結果
      b-pagination(
        v-model="currentPage"
        :total-rows="rows"
        aria-controls="membertable"
        :per-page="perPage"
        align="center"
        )
</template>

<script>
import '@/assets/css/back.stylus'
export default {
  name: 'AdminMembers',
  data () {
    return {
      address: {
        name: '',
        address: ''
      },
      perPage: 6,
      currentPage: 1,
      fields: [
        {
          key: 'name',
          label: '姓名'
        },
        {
          key: 'account',
          label: '帳號'
        },
        {
          key: 'email',
          label: '電子信箱'
        },
        {
          key: 'phone',
          label: '電話號碼'
        },
        {
          key: 'address',
          label: '會員地址'
        },
        {
          key: 'delete',
          label: '刪除'
        }
      ]
    }
  },
  computed: {
    memberlists () {
      var result = null
      result = this.$store.state.memberlists.filter((item) => {
        return item.isAdmin === false
      })
      return result
    },
    rows () {
      return this.memberlists.length
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/users/accounts').then((response) => {
      console.log(response.data.result)
      var data = response.data.result
      this.$store.commit('memberlists', data)
    })
  },
  methods: {
    delmember (data, index) {
      var deldata = data
      var delIndex = index
      console.log(deldata, delIndex)
      this.checkDel = ''
      this.$bvModal.msgBoxConfirm('確定要刪除嗎', {
        title: data.item.date,
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        cancelTitle: '取消',
        okTitle: '確認',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then((data) => {
          if (data) {
            this.axios.delete(process.env.VUE_APP_API + '/users/del/' + deldata.item._id)
              .then(res => {
                if (res.data.success) {
                  this.$store.commit('delmember', delIndex)
                } else {
                  alert('發生錯誤')
                }
              })
              .catch(err => {
                alert(err.response.data.message)
              })
          }
        })
    },
    showAdddress (data, index) {
      this.address.name = data.item.name
      this.address.address = data.item.address
    }
  }

}
</script>

<style lang="stylus">

</style>
