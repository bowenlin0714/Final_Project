<template lang="pug">
  #shopcar
    b-container.shadow
      b-row
        b-col(cols="12")
          b-breadcrumb(:items="breads")
          ul
            li(v-for="item in cartproducts") {{item.p_id.name}}
              p {{item.amount}}
          b-button(@click="log()")

</template>

<script>
export default {
  components: {

  },
  name: 'Home',
  data () {
    return {
      images: [],
      breads: [
        {
          text: '首頁',
          to: '/'
        },
        {
          text: '購物車',
          active: true
        }
      ],
      fields: [
        {
          key: 'p_id',
          label: '商品名稱'
        },
        {
          key: 'amount',
          label: '商品數量',
          sortable: true
        }

      ]
    }
  },
  computed: {
    cartproducts () {
      return this.$store.state.user.shopcar
    }

  },
  methods: {
    log () {
      console.log(this.$store.state.user.shopcar)
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/users/' + this.$store.state.user.id).then((res) => {
      const data = res.data.result.shopcar
      this.$store.commit('cartproducts', data)
    })
  }
}
</script>
<style lang="stylus">

</style>
