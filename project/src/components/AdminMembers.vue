<template lang="pug">
  #adminmembers
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
            template(#cell(delete)='data')
              b-button(variant="danger" @click="delmember(data, data.index)") 刪除
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
      this.axios.delete(process.env.VUE_APP_API + '/users/del/' + data.item._id)
        .then(res => {
          if (res.data.success) {
            this.$store.commit('delmember', index)
          } else {
            alert('發生錯誤')
          }
        })
        .catch(err => {
          alert(err.response.data.message)
        })
      console.log(data.item._id, index)
    }
  }

}
</script>

<style lang="stylus">

</style>
