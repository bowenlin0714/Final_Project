<template lang="pug">
  #shopcar
    b-container.shadow
      b-row
        b-col(cols="12")
          b-breadcrumb(:items="breads")
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

  mounted () {
  },
  methods: {

  }
}
</script>
<style lang="stylus">

</style>
