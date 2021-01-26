<template lang="pug">
  #hot
    carousel-3d(style="overflow:visible" :controls-visible="true" ).mb-5.d-none.d-lg-block
      slide(v-for="(hot,i) in this.$store.state.hotproducts" :key="i" :index="i" style="overflow:visible;box-shadow: 0.1rem 0.3rem 0.3rem rgba(100,100,100, 0.8) !important" v-if="i<6")
        template(slot-scope="{ index, isCurrent, leftIndex, rightIndex }")
          img(src="../assets/hot.png" class="hot" style="filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.7))")
          div(class="hotdiv" style="overflow:hidden;width:100%;height:100%")
            b-button(class="hotbutton" href="#/productsdetail" @click="showdetail(hot)")
              a.text-white 立即搶購
            img(:src="hot.src[0]" style="max-width:100%;overflow:hidden")

    carousel-3d(style="overflow:hidden" :controls-visible="true" :space="365" :disable3d="true").mb-5.d-block.d-lg-none
      slide(v-for="(hot,i) in this.$store.state.hotproducts" :key="i" :index="i" style="overflow:hidden;box-shadow: 0.1rem 0.3rem 0.3rem rgba(100,100,100, 0.8) !important" v-if="i<6")
        template(slot-scope="{ index, isCurrent, leftIndex, rightIndex }").d-none.d-lg-block
          a(href="#/productsdetail" @click="showdetail(hot)" )
            div(class="hotdiv" style="overflow:hidden;width:100%;height:100%")
              p.pl-2.py-2 {{hot.name}}
              img(:src="hot.src[0]" style="max-width:100%;overflow:hidden")
</template>

<script>
export default {
  name: 'Hot',
  methods: {
    showdetail (hot) {
      this.$store.commit('showdetail', hot)
    }
  },
  mounted () {
    this.$store.commit('hotproducts')
  }

}
</script>
