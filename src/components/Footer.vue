<template lang="pug">
  #footer()
    b-container(fluid
    v-if="$route.path =='/' || $route.path =='/products' || $route.path =='/about' || $route.path =='/reg' || $route.path =='/login'|| $route.path =='/contact' || $route.path =='/shopcar'|| $route.path =='/productsdetail' || $route.path =='/membercenter'|| $route.path =='/news'"
    class="footContainer").shadow.px-0
      b-row
        b-col(cols="12").p-0
          .footer
            b-container
              b-row
                b-col(cols="6" md="3").text-center.text-md-left.px-4
                  p.mb-1
                    font-awesome-icon(:icon="['fas','info-circle']")
                    | 關於我們
                  p.p-0.my-0
                    a(href="#/about" title="關於我們") 關於我們
                  p(style="font-size:1rem").p-0.my-2.text-white  營業時間 : 9:00am ~  8:00pm
                  p(style="font-size:1rem").p-0.my-2.text-white  客服時間 : 9:00am ~  10:00pm
                  p(style="font-size:1rem").p-0.my-2.text-white  電話 : 0988555555  (02)2300-9966
                  p(style="font-size:1rem").p-0.my-2.text-white  地址 : 243新北市泰山區貴子里致遠新村55之1號
                b-col(cols="6" md="3").text-center.text-md-left
                  p.mb-1
                    font-awesome-icon(:icon="['fas','hand-point-right']")
                    | 站內連結
                  p.p-0.my-0
                    a(href="#/contact" title="聯絡我們") 聯絡我們
                  p.py-0.my-1
                    a(href="#/shopcar" title="shopcar") 購物車
                  p.py-0.my-1
                    a(href="#/products" title="products") 商品列表
                b-col(cols="6"  md="3").text-center.text-md-left
                  p.mb-1
                    font-awesome-icon(:icon="['fas','link']")
                    | 友情連結
                  p.p-0.my-0
                    a(href="https://www.beast-kingdom.com.tw/" target="blank" title="野獸國") 野獸國
                  p.py-0.my-1
                    a(href="https://p-bandai.com/tw?gclid=Cj0KCQiAuJb_BRDJARIsAKkycUldmSfSLUQtcGyoy0RnzsttC-V5A_TFBSBn5HAOu9U6jwmX_DVRMpYaAlnGEALw_wcB" title="萬代南夢宮" target="blank") 萬代南夢宮
                  p.py-0.my-1
                    a(href="https://www.banpresto.jp/"  target="blank" title="萬代南夢宮") banpresto
                  p.py-0.my-1
                    a(href="http://www.hottoys.com.hk//"  target="blank" title="HotToys") HotToys
                b-col(cols="6"  md="3").text-center.text-md-left
                  p
                    font-awesome-icon(:icon="['fas','handshake']")
                    | 社群媒體
                    p.p-0.mt-2
                      a(href="https://www.facebook.com/" target="_blank")
                        font-awesome-icon(:icon="['fab','facebook-square']").text-white.h3
                    p.p-0.m-0
                      a(href="https://www.instagram.com/" target="_blank")
                        font-awesome-icon(:icon="['fab','instagram']").text-white.h3
                br

            b-container(fluid).mt-3
              b-row
                b-col(cols="12" class="copyright").text-center
                  span.text-white Copyright&copy;2020 所有圖片皆來自於網路
</template>
<style lang="stylus" >

</style>
<script>
export default {
  name: 'Footer'
}
</script>
