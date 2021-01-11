<template lang="pug">
  #adminorders.min-vh-100
    h1 訂單管理
    ul
      li(v-for="order in orderlists")
        div {{order.name}}
          div(v-for="o in order.orders") {{o}}

</template>

<script>

export default {
  name: 'AdminOrders',
  computed: {
    orderlists () {
      return this.$store.state.orderlists
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/users/').then((response) => {
      var data = response.data.result
      const result = data.filter(res => {
        return res.orders.length !== 0
      })
      console.log(result)
      // let array = null
      // for (let i = 0; i < result.length; i++) {
      //   console.log(result[i].orders.concat(result[i + 1].orders))
      //   array = result[i].orders.concat(result[i + 1].orders)
      // }
      // console.log(array)
      this.$store.commit('orderlists', result)
    })
  }
}

</script>
