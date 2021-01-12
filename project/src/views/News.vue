<template lang="pug">
  #news
    b-container
      b-row
        b-col(cols="12")
        //- b-breadcrumb(:items="breads")
</template>

<script>
// export default {
//   name: 'News',
//   data () {
//     return {
//       breads: [
//         {
//           text: '首頁',
//           to: '/'
//         },
//         {
//           text: '公仔新知',
//           active: true
//         }
//       ]
//     }
//   }
// }
export default {
  name: 'App',
  created () {
    this.fetchUrl()
  },
  methods: {
    fetchUrl () {
      this.axios
        .get('https://www.youtube.com/user/marvelstudiostw/videos')
        .then(response => {
          console.log(response)
          // const $ = this.cheerio.load(response.data)
          // const span = $('#video-title')
          // console.log(span)
        }).catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
