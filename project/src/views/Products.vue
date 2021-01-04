<template lang="pug">
  b-container.shadow
    b-row
      b-col(cols="12")
        b-breadcrumb(:items="breads")
      b-col(cols="2")
        b-list-group(v-for="(category, index) in this.$store.state.categories" :key="index").p-1.d-none.d-lg-block
            b-list-group-item.p-0.text-center.d-block
              b-button(@click="tagCategory(category)" style="font-size:14px").w-100 {{category.text}}
      b-col(cols="10")
        b-row
          b-col(cols="4" v-for="item in this.$store.state.productlists")
           b-card().mb-3.shadow.border
            div(style="height:30vh;overflow:hidden;line-height:30vh").border
              b-card-img(:src="item.src[0]")
            b-card-text {{item.name}}

</template>

<script>
export default {
  name: 'Products',
  data () {
    return {
      breads: [
        {
          text: '首頁',
          to: '/'
        },
        {
          text: '商品列表',
          active: true
        }
      ],
      images: []
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/products/').then((response) => {
      this.images = response.data.result.map(image => {
        var result = []
        for (let i = 0; i < image.images.length; i++) {
          result.push(process.env.VUE_APP_API + '/products/' + image.images[i].file)
          image.src = result
        }
        return image
      })
      var data = this.images
      this.$store.commit('productlists', data)
    })
  }
}
</script>
