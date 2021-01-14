<template lang="pug">
  #news
    b-container.shadow
      b-row
        b-col(cols="12").mx-auto
          b-breadcrumb(:items="breads")
          ul.p-0
            b-row
              b-col(cols="12" lg="9").mx-auto
                h1 Toy News
                li(v-for="data in datas")
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
      datas: null,
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
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/news').then((res) => {
      this.datas = res.data.result[0].data
      console.log(this.data)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
