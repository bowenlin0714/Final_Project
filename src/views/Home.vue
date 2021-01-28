<template lang="pug">
  #home
    b-container.border.p-0.shadow
      b-carousel(
        v-if="bannerlists.length > 0"
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
        a(href="#", title="title" target="_blank")
          b-carousel-slide(
            v-for="(banner,index) in bannerlists"
            :img-src="banner.src"
          )
      div.titlepic.my-3
        u-animate-container
          u-animate(
            name="fadeInLeft"
            delay="0s"
            duration="2s"
            :iteration="1"
            :offset="300"
            animateClass="animated"
            :begin="false"
          )
            span Hot!!
            p.d-inline 熱門商品
      Hot
      p
      div.titlepic.my-3
         u-animate-container
          u-animate(
            name="fadeInLeft"
            delay="0s"
            duration="2s"
            :iteration="1"
            :offset="300"
            animateClass="animated"
            :begin="false"
          )
            span New!!
            p.d-inline 最新商品
      New
      div.titlepic.my-3
        u-animate-container
          u-animate(
            name="fadeInLeft"
            delay="0s"
            duration="2s"
            :iteration="1"
            :offset="300"
            animateClass="animated"
            :begin="false"
          )
            span News!!
            p.d-inline 公仔新知
      b-container
        b-row
          b-col(cols="12" lg="9").mx-auto
            li(v-for="(data, i) in news" v-if="i<6")
              b-card(no-body).my-2
                b-container
                  b-row
                    b-col(cols="12" lg="3" style="min-height:12rem").border.p-0
                      a(:href="'https://www.toy-people.com/' + data.href" target="blank")
                        .img(:style="{ background: data.img }")
                    b-col(cols="12" lg="9").p-5
                      a(:href="'https://www.toy-people.com/' + data.href" target="blank")
                        h3 {{data.text}}
                      p {{data.innertext}}
                      p.text-right.mt-3 更新日期 : {{data.times}}
            a(href="#/news")
              p.text-right.my-3 查看更多....

</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d'
import Hot from '@/components/Hot'
import New from '@/components/New'
export default {
  name: 'Home',
  data () {
    return {
      test: null,
      images: [],
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
    news () {
      return this.$store.state.news
    },
    bannerlists () {
      return this.$store.state.bannerlists
    }
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
    // banner
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
    })
  }

}
</script>
