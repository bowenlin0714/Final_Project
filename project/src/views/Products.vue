<template lang="pug">
  b-container(class="products").shadow
    b-row
      b-col(cols="12")
        b-breadcrumb(:items="breads")
      b-col(cols="12")
        b-row
          b-col(cols="3" ).ml-auto.mb-3
            div(class="searchbar").d-flex.align-items-center
              font-awesome-icon( :icon=['fas', 'search'] ).h4.mt-2
              b-form-input(
                  type="text"
                  placeholder="Type to search"
                  v-model="keyword"
                  style="right:0"
                ).w-75.ml-3
      b-col(cols="2")
        b-list-group(v-for="(category, index) in this.$store.state.categories" :key="index").p-1.d-none.d-lg-block
            b-list-group-item.p-0.text-center.d-block
              b-button(@click="tagCategory(category)" style="font-size:14px").w-100.shadow-sm {{category.text}}
      b-col(cols="10")
        b-row
          b-col(cols="4" v-for="item in finalLists")
            a(href="#/productsdetail", title="title" style="text-decoration:none" @click="showdetail(item)")
              b-card(class="productCard").mb-3.shadow.border
                div(style="height:30vh;overflow:hidden;line-height:30vh").border
                  b-card-img(:src="item.src[0]")
                b-card-text.mt-2 {{item.name}}
                b-card-text NT: {{item.price}}
      b-pagination(
            v-model="currentPage"
            :total-rows="filterLists.length"
            :per-page="perPage"
            aria-controls="itemList"
            align="center"
          ).pt-3.mx-auto.mb-4

</template>

<script>
export default {
  name: 'Products',
  data () {
    return {
      keyword: '',
      tag: '',
      currentPage: 1,
      perPage: 9,
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
  computed: {
    categories () {
      return this.$store.state.categories
    },
    filterLists () {
      var result = ''
      if (this.tag === '') {
        result = this.$store.state.productlists
        return result
      } else {
        result = this.$store.state.productlists.filter(product => {
          return product.category === this.tag
        })
      }
      return result
    },
    searchLists () {
      var result = ''
      if (this.keyword === '') {
        result = this.filterLists
        return result
      } else {
        result = this.filterLists.filter(product => {
          return product.name.search(this.keyword) !== -1
        })
      }
      return result
    },
    finalLists () {
      return this.searchLists
        .slice(
          (this.currentPage - 1) * this.perPage,
          this.currentPage * this.perPage
        )
    }
  },
  methods: {
    tagCategory (data) {
      this.tag = data.value
    },
    showdetail (data) {
      this.$store.commit('showdetail', data)
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
