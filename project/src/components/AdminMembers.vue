<template lang="pug">
  #adminmembers
    b-container-fluid
      h1 會員資料管理
        b-row
          b-col(cols='12')
</template>

<script>
import '@/assets/css/back.stylus'
export default {
  name: 'AdminMembers',
  data () {
    return {
      members: {
        name: ''
      }
    }
  },
  created () {
    this.axios.get(process.env.VUE_APP_API + '/users/accounts').then((response) => {
      console.log(response.data.result)
      var data = response.data.result
      this.memberlists.push(data)
    })
  }

}
</script>

<style lang="stylus">

</style>
