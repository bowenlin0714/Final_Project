<template lang="pug">
  #new
    carousel-3d(style="overflow:visible" :controls-visible="true" ).mb-5.d-none.d-lg-block
      slide(v-for="(hot,i) in this.$store.state.productlists" :key="i" :index="i" style="overflow:visible" v-if="i<6")
        template(slot-scope="{ index, isCurrent, leftIndex, rightIndex }")
          img(src="../assets/new.png" class="hot" style="filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.7));width:6rem;margin-top:2.5rem;margin-left:1rem")
          div(class="hotdiv" style="overflow:hidden;width:100%;height:100%")
            b-button(class="hotbutton" ) 立即搶購
            img(:src="hot.src[0]" style="max-width:100%;overflow:hidden")

    carousel-3d(style="overflow:hidden" :controls-visible="true" :space="365" :disable3d="true").mb-5.d-block.d-lg-none
      slide(v-for="(hot,i) in this.$store.state.productlists" :key="i" :index="i" style="overflow:hidden" v-if="i<6")
        template(slot-scope="{ index, isCurrent, leftIndex, rightIndex }").d-none.d-lg-block
          div(class="hotdiv" style="overflow:hidden;width:100%;height:100%")
            p.pl-2 {{hot.name}}
            img(:src="hot.src[0]" style="max-width:100%;overflow:hidden")
</template>

<script>
export default {
  name: 'New'
}
</script>
