<template lang="pug">
  #news
    b-container.shadow
      b-row
        b-col(cols="12").mx-auto
          b-breadcrumb(:items="breads").mt-2
          ul.p-0
            b-row
              b-col(cols="12" lg="11").mx-auto
                h2.text-center.mb-4 Toy News
                li(v-for="data in news")
                  b-card(no-body).my-2
                    b-container
                      b-row
                        b-col(cols="3").d-none.d-sm-block.border.p-0
                          a(:href="'https://www.toy-people.com/' + data.href" target="blank")
                            .img(:style="{ background: data.img, }")
                        b-col(cols="12" lg="9").p-5
                          a(:href="'https://www.toy-people.com/' + data.href" target="blank")
                            h3 {{data.text}}
                          p {{data.innertext}}
                          p.text-right.mt-3 更新日期 : {{data.times}}
                p.text-right 資料來源: 玩具人

</template>

<script>
export default {
  name: 'News',
  data () {
    return {

      breads: [
        {
          text: '首頁',
          to: '/'
        },
        {
          text: '公仔新知',
          active: true
        }
      ]
    }
  },
  computed: {
    news () {
      return this.$store.state.news
    }
  },
  mounted () {

  }
}
</script>
