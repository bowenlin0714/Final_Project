<template>
<div class="home">

</div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      positionY1: 0, // 背景Y轴偏移量
      Y1: 0,
      ratio: 0.5 // 视差偏移率
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
  components: {}
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
