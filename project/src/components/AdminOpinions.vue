<template lang="pug">
  #adminopinions
    b-container(class="")
      h1(class="my-3 mb-2") 意見表管理
      b-row
        b-col(cols='12')
          b-table(
            id="formstable"
            class="mx-auto"
            :items='formlists'
            :fields='fields' fixed
            :current-page="currentPage"
            :per-page="perPage"
            striped=true
            )

            template(#cell(delete)='data')
              b-button(variant="danger") 刪除
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
  name: 'AdminOpinions',
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
          key: 'email',
          label: '電子信箱'
        },
        {
          key: 'phone',
          label: '電話號碼'
        },
        {
          key: 'opinion',
          label: '意見與回饋'
        },
        {
          key: 'delete',
          label: '刪除'
        }
      ]
    }
  },
  computed: {
    formlists () {
      var result = null
      result = this.$store.state.formlists
      return result
    },
    rows () {
      return this.formlists.length
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/forms').then((response) => {
      console.log(response.data.result)
      var data = response.data.result
      this.$store.commit('formlists', data)
    })
  }

}
</script>
