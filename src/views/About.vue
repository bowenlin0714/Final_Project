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
            h1.text-center.my-5 三大保證
            b-container(fluid).bg-white
              b-row
                b-col(cols="12" lg="6")
                  .fine
                    u-animate-container
                      u-animate(
                        name="fadeInLeftBig"
                        delay="0s"
                        duration="2s"
                        :iteration="1"
                        :offset="200"
                        animateClass="animated"
                        :begin="false"
                      )
                        div
                          .h4 FINE
                    p 現今市面上充斥著各種品質低劣，來源不明的公仔，網路上各種琳瑯滿目的標示讓消費者無法分辨真偽，為此，本公司為所有公仔愛好者提供一個可以安心購買的好地方，我們只販賣正版公仔，絕對不會販賣盜版商品，在出貨時也會保證商品的完整性，如發現商品有瑕疵，在七天之內都可以退貨，給各位消費者一個滿意的答覆。
                b-col(cols="12" lg="6")
                  div
              b-row.flex-column-reverse.flex-lg-row
                b-col(cols="12" lg="6")
                  div
                b-col(cols="12" lg="6")
                  .fast
                    u-animate-container
                      u-animate(
                        name="fadeInRightBig"
                        delay="0s"
                        duration="2s"
                        :iteration="1"
                        :offset="200"
                        animateClass="animated"
                        :begin="false"
                      )
                        div
                          .h4 FAST
                    p 買東西最難受的時刻就是等待商品送達的時間，每次等待的時間總是令人煎熬，為了解決這個問題，本公司在收到商品的第一時間內就會開始準備，也有跟多家物流公司與便利商店合作，在最短的時間內將商品送達到消費者的手中。
              b-row
                b-col(cols="12" lg="6")
                  .fair
                    u-animate-container
                      u-animate(
                        name="fadeInLeftBig"
                        delay="0s"
                        duration="2s"
                        :iteration="1"
                        :offset="300"
                        animateClass="animated"
                        :begin="false"
                      )
                        div
                          .h4 FAIR
                    p 在這個萬物掌聲響起的時代，甚麼東西都在漲價，就是薪水沒有漲，就連公仔也不意外，為了實踐人人有公仔買的精神，讓每位消費者都能夠買到價格合理，高品質的商品，BUYFIG的公仔在市面上都是非常合理的價格，我們時不時也會舉辦一些活動，讓各位消費者買得開心，買得安心。

                b-col(cols="12" lg="6")
                    div
            h1.text-center.my-5 購物須知
            b-container.p-3.mb-3.bg-white
              b-row
                b-col(cols="12").px-5.py-3
                  p.my-3 | 購物流程
                  p.text 請您先登入會員，挑選喜愛的商品，進入商品頁之後點選數量，按"加入購物車"，全部挑選完畢後，在螢幕上方購物車的畫面，點選"訂單結帳"。進入結帳畫面後，依系統指示輸入資料，並選擇送貨方式與付款方式，再按"確定購買"，系統會依照您選擇的付款方式引導您完成結帳動作，即可完成購物。
                  p.my-3 | 付款方式
                  p.text 選好商品之後，進入結帳畫面，您可以依據您希望的配送方式，選擇付款方式
                    | 若您選擇「貨到付款」，則宅配人員在配送商品時，會一併向您收取該筆訂單款項
                    | 若您選擇「先付款宅配到府/7-11超商取貨」，則有信用卡，ATM櫃員機，Line Pay等付款方式可以選擇
                    | 選擇ATM轉帳必須在三日內付款完成，否則系統將會自動取消該筆訂單
                  p.my-3 | 配送方式與運費
                  div.text 先付款後宅配之運費：每筆70元
                    p 7-11 取貨付款 80 元
                    p  7-11 取貨 30 元
                    p  全家 取貨付款 70 元
                    p  全家 取貨 20 元
                    p  黑貓宅急便 120元
                    p  郵寄 100元
                    p  自取 免費
                    | 商品訂購後，預計3-14天送達
                  p.my-3 | 收到商品錯誤或收到瑕疵品
                  p.text 收到商品如果有問題，請於三天內聯絡我們的電話，或是透過訊息中心告知
                    | 請詳述您的問題，並提供該筆訂單編號、下單時所使用的手機號碼、收到的實際商品的照片，
                    | 經由客服人員判斷確為商品有錯誤，會協助您進入退貨服務流程，並重新寄送正確商品給您。

                    | 提醒您，退回的商品必須是全新的狀態、而且完整包裝(含商品本體、配件、贈品、保證書、原廠包裝及所有附隨文件或資料的完整性)， 切勿缺漏任何             | 配件、請勿自行拆解檢查商品或損毀原廠外盒。原廠外盒及原廠包裝都屬於商品的一部分，或有遺失、毀損或缺件，可能影響您退貨的權益，也可能依照            | 損毀程度扣除為回復原狀所必要的費用。

    CartAnimation

</template>

<script>
import Parallax from 'vue-parallaxy'
import CartAnimation from '@/components/CartAnimation'

export default {

  name: 'About',
  components: { Parallax, CartAnimation },
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
  }
}
</script>

<style lang="stylus">

</style>
