<template lang="pug">
  #productsdetail.p-0.m-0
    b-container.shadow
      b-row
        b-col(cols="12")
          b-breadcrumb
            b-breadcrumb-item(to="/") 首頁
            b-breadcrumb-item(to="/products") 商品列表
            b-breadcrumb-item(active) {{productdetail.name}}
        b-col(cols="2")
          b-list-group(v-for="(category, index) in this.$store.state.categories" :key="index").p-1.d-none.d-lg-block
            b-list-group-item.p-0.text-center.d-block
              b-button(@click="tagCategory(category)" style="font-size:14px").w-100.shadow-sm {{category.text}}
        b-col(cols="12" lg="10").border.bg-white.pt-3
          b-row
            b-col(cols="12" lg="7")
              div(class="bigimg").ml-1.border
                img(v-show="preview" :src="productdetail.src[0]")
                img(:src="bigURL")
              ul.d-flex
                li(v-for="image in productdetail.src" style="width:100px;height:100px;overflow:hidden;border:1px solid red")
                  img(:src="image" @click="changeimg(image)").w-100
            b-col(cols="12" lg="5")
              p 商品編號 : {{productdetail.productNumber}}
              p {{productdetail.name}}
              p NT :{{productdetail.price}}
              b-button 加入購物車
            b-col(cols="12")
              b-tabs(style="min-height:30vh")
                b-tab(title="商品敘述")
                  pre {{productdetail.description}}
                b-tab(title="商品評論") aa

      Hot
</template>

<style lang="stylus">

</style>
<script>
import { Carousel3d, Slide } from 'vue-carousel-3d'
import Hot from '@/components/Hot'
export default {
  name: 'productsdetail',
  data () {
    return {
      preview: true,
      bigURL: ''
    }
  },
  components: {
    Slide,
    Carousel3d,
    Hot
  },
  computed: {
    productdetail () {
      return this.$store.state.productdetail
    }
  },
  methods: {
    changeimg (image) {
      this.preview = false
      this.bigURL = image
    }
  }
}
</script>
