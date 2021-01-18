<template lang="pug">
  #adminmembers.min-vh-100
    b-container()
      h1(class="my-3 mb-2") 會員資料管理
      b-row
        b-col(cols="12" lg="6")
          b-form-group()
            b-form-radio-group
              b-form-radio(v-model="selected" value = "全部" checked) 顯示全部
              b-form-radio(v-model="selected" value = '顯示正常會員') 顯示正常會員
              b-form-radio(v-model="selected" value = '顯示已封鎖會員') 顯示已封鎖會員
        b-col(cols="12" lg="3").mb-4.ml-auto
          b-form-input(
            id="filter-input"
            type="search"
            placeholder="Type to Search"
            v-model="keyword"
          )
        b-col(cols='12')
          b-table(
            stacked="md"
            id="membertable"
            class="mx-auto"
            :items='memberlists'
            :fields='fields' fixed
            :filter = "keyword"
            :filter-included-fields="filterOn"
            :current-page="currentPage"
            :sort-by.sync="sortBy"
            :per-page="perPage"
            striped=true
            ).text-lg-center
            template(#cell(address)='row')
              b-button(variant="info" @click.stop="row.toggleDetails") 會員地址
            template(v-slot:row-details="row")
              p 地址: {{row.item.address}}
              b-button( @click="row.toggleDetails").bg-info 關閉
            template(#cell(isBan)='data')
              b-button(style="border-style:none;" @click.stop="checkBan(data, data.index)").bg-transparent.border-none
                span(v-if="data.item.isBan").text-danger 封鎖中
                span(v-else ).text-success 正常
            template(#cell(delete)='data')
              b-button(variant="danger" @click="delmember(data, data.index)") 刪除
          div.w-100
            p(v-if="memberlists.length == 0").text-center.h1 目前沒有內容
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
      sortBy: 'account',
      keyword: null,
      filterOn: [],
      perPage: 6,
      selected: null,
      selectedForm: null,
      currentPage: 1,
      fields: [
        {
          key: 'name',
          label: '姓名',
          sortable: true
        },
        {
          key: 'account',
          label: '帳號',
          sortable: true
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
          key: 'isBan',
          label: '會員狀態'
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
      if (this.selected === '顯示正常會員') {
        return this.$store.state.memberlists.filter(item => item.isBan === false)
      } else if (this.selected === '顯示已封鎖會員') {
        return this.$store.state.memberlists.filter(item => item.isBan === true)
      } else {
        return this.$store.state.memberlists
      }
      // return result
    },
    rows () {
      return this.memberlists.length
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/users/').then((response) => {
      console.log(response.data.result)
      var data = response.data.result.filter((item) => {
        return item.isAdmin === false
      })
      this.$store.commit('memberlists', data)
    })
  },
  methods: {
    checkBan (data) {
      this.axios.patch(process.env.VUE_APP_API + '/users/edit/' + data.item._id, { isBan: !data.item.isBan })
        .then(res => {
          if (res.data.success) {
            this.$store.commit('checkBan', data.item._id)
            this.$root.$emit('bv::refresh::table', 'formstable')
          } else {
            alert('發生錯誤')
          }
        })
        .catch(err => {
          alert(err.response.data.message)
        })
      console.log(data.item._id)
    },
    delmember (data, index) {
      var deldata = data
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
                  this.$store.commit('delmember', deldata.item._id)
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
