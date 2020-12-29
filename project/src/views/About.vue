<template lang="pug">
  #about
    b-container().shadow
      b-row
        b-col(cols="12").p-0
          b-breadcrumb(:items="breads")
          .mask()
            div(class="bgTest" id="bgTest" :style="{'background-position-y':positionY1+'px'}")
              div.maskText
                h1 WHY BUYFIG
                h3 一 為什麼選擇BUYFIG 一
          .aboutPage
            h1.text-center.pt-5.pb-5 三大保證
            b-container(fluid)
              b-row
                b-col(cols="12" lg="6")
                  .goods
                    .fine
                      div 現今市面上充斥著各種品質低劣，來源不明的公仔，本公司只販賣正版公仔，為所有公仔愛好者一個可以安心購買的好地方，如發現商品有瑕疵
                b-col(cols="12" lg="6")
                  div
              b-row.flex-column-reverse.flex-lg-row
                b-col(cols="12" lg="6")
                  div
                b-col(cols="12" lg="6")
                  .goods
                    .fast
                      div 買東西最難受的時刻就是等待商品送達的時間，
              b-row
                b-col(cols="12" lg="6")
                  .goods
                    .fair
                      div 在這個萬物掌聲響起的時代，甚麼東西都在漲價，就是薪水沒有漲，就連公仔也不意外，為了實踐人人有公仔買的精神實踐人人有公仔買的精神實踐人人有公仔買的精神實踐人人有公仔買的精神實踐人人有公仔買的精神實踐人人有公仔買的精神實踐人人有公仔買的精神實踐人人有公仔買的精神實踐人人有公仔買的精神
                b-col(cols="12" lg="6")
                    div

</template>

<script>

</script>
<script>
import Parallax from 'vue-parallaxy'
export default {

  name: 'About',
  components: { Parallax },
  data () {
    return {
      positionY1: 0, // 背景Y轴偏移量
      Y1: 0,
      ratio: 0.5, // 视差偏移率
      breads: [
        {
          text: '首頁',
          to: '/'
        },
        {
          text: '關於我們',
          active: true
        }
      ]
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    const bgTest = document.getElementById('bgTest')
    this.Y1 = bgTest.offsetTop * this.ratio
  },
  methods: {

    handleScroll: function () {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      this.positionY1 = this.Y1 - scrollTop * this.ratio // 原始高度-滚动距离*视差系数
    }
  },
}
</script>

<style lang="stylus">

</style>
