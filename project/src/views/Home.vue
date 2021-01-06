<template lang="pug">
  #home
    b-container.border.p-0.shadow
      b-carousel(
        controls
        no-touch
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
        id="carousel-no-animation"
        style="text-shadow: 0px 0px 2px #000"
        indicators
        img-width="1024"
        img-height="480"
      )
        a(href="https://www.beast-kingdom.com.tw/", title="title" target="_blank")
          b-carousel-slide(
            v-for="(banner,index) in this.$store.state.bannerlists"
            :img-src="banner.src"
          )
      div.titlepic.mt-3
        p 熱門商品
      Hot
      u-animate-container
        u-animate(
          name="fadeIn"
          delay="0s"
          duration="3s"
          :iteration="100"
          :offset="0"
          animateClass="animated"
          :begin="true"
        )
          div(style="width:200px;height:200px;background:red") csssssssssssssssssssssssssssssssssssssssss
      div.titlepic.mt-3
        p 最新商品
      New

</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d'
import Hot from '@/components/Hot'
import New from '@/components/New'
export default {
  name: 'Home',
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  components: {
    Carousel3d,
    Slide,
    Hot,
    New
  },
  computed: {
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/banners').then((res) => {
      const result = res.data.result.filter((banner) => {
        return banner.isShow === true
      })
      this.images = result.map(image => {
        image.src = process.env.VUE_APP_API + '/banners/' + image.file
        return image
      })
      var data = this.images
      this.$store.commit('bannerlists', data)
      console.log(this.$store.state.productlists.sold)
    })
  }

}
</script>
