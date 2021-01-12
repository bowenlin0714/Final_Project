<template lang="pug">
#cartsmall.bg-dark(style="width:0.1rem;height:0.1rem")
  .shop_cart
    .add
      transition(name='shop_cart')
        img.add_img(v-if='this.$store.state.addShow' src='../assets/shopcar.png' alt style="width:6rem;filter: brightness(2)")
    .cart.d-none
      img(src='../assets/shopcar.png' alt)
</template>

<script>

export default {
  name: 'Cartsmall',
  data () {
    return {
      addShow: false
    }
  },
  created () {
  },
  methods: {
    cartAnimation () {
      this.$store.state.addShow = true
      // 添加类名的方法没有动画结束的时机,这里我直接写了一个定时器,时机和动画时间一致,在图片移动到购物车位置时隐藏
      setTimeout(() => {
        this.$store.state.addShow = false
      }, 1500)
    }
  }
}
</script>

<style scoped>
  .transition_test {
    text-align: right;
  }
  .shop_cart .add {
    position: relative;
    margin-top: 6.25rem;
    width: 31.25rem;
    display: inline-block;
  }
  .shop_cart .add button {
    position: absolute;
    z-index: 99;
  }
  .shop_cart .cart{
    width: 18.75rem;
    display: inline-block;
  }
  .shop_cart .cart img {
    width: 1rem;
  }
  .shop_cart .add_img {
    width: 6.25rem;
    position: absolute;
    left: 25.5rem;
    bottom: 42rem;
  }
  /* 动画效果实现 */
  /* @keyframes bounce-in {
    0% {
      transform: scale(1);
      transform: translate(-610px, 100px);
    }
    100% {
      transform: scale(.5);
      transform: translate(0px, 0px);
    }
  }
  .shop_cart-enter-active {
    animation: bounce-in 1s;
  } */

  /* CSS类名实现 */
  .shop_cart-enter-active {
    transition: all 1.5s ease-in;
  }
  .shop_cart-enter {
    opacity: 0.1;
    transform: scale(2.5);
    transform: translate(0, 46.25rem);
  }
</style>
