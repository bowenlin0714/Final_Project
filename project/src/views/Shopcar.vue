<template lang="pug">
  <div class="home">
    b-container
      div(style="width:100%;height:100vh")
      div(style="width:100%;height:100vh")
      div(style="width:100%;height:100vh")
      div(style="width:100%;height:100vh")
      div(style="width:100%;height:100vh")
      div(class="m_con wow  fadeInLeft") ssssssaaa
      div(style="width:100%;height:100vh")
      div(style="width:100%;height:100vh")
      div(style="width:100%;height:100vh")
  </div>
</template>

<script>
import { WOW } from 'wowjs'
export default {
  components: {

  },
  name: 'Home',
  data () {
    return {
      positionY1: 0, // 背景Y轴偏移量
      Y1: 0,
      ratio: 0.5 // 视差偏移率
    }
  },

  mounted () {
    this.$nextTick(() => {
      // 在dom渲染完后,再执行动画
      const wow = new WOW({
        live: false
      })
      wow.init()
    })
  },
  methods: {

    handleScroll: function () {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      this.positionY1 = this.Y1 - scrollTop * this.ratio // 原始高度-滚动距离*视差系数
    }
  }
}
</script>
<style lang="stylus">
.bgTest
  height: 500px;
  background: url("https://cms.cdn.91app.com/images/original/34187/4168a718-9d0e-437c-9ffb-7064556ea15c-1608794262-wrqmmzyp1y_m_1200x563_800x375_400x188.jpg") no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
  font-size: 20px;

</style>
