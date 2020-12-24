<template lang="pug">
  #adminbanners
    b-container
      h1(class="my-3 mb-2") 輪播圖管理
      b-col(cols="12")
        b-table(
          :fields='fields'
          :items='images'
        )
        img(:src="'http://localhost:3000/banners/1608795785238.jpg'")

</template>

<script>

export default {
  name: 'AdminBanners',
  data () {
    return {
      image: null,
      description: '',
      images: [],
      fields: [

      ]
    }
  },
  mounted () {

  }
}

</script>
