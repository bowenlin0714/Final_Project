<template lang="pug">
  #shopcar
    b-container.shadow
      b-row
        b-col(cols="12")
          b-breadcrumb(:items="breads")
          ul
            li(v-for="cart in cartproducts")
                p {{cart}}
</template>

<script>
export default {
  components: {

  },
  name: 'Home',
  data () {
    return {
      breads: [
        {
          text: '首頁',
          to: '/'
        },
        {
          text: '購物車',
          active: true
        }
      ]
    }
  },
  computed: {
    cartproducts () {
      return this.$store.state.cartproducts
    }
  },
  methods: {

  }
}
</script>
<style lang="stylus">

</style>
