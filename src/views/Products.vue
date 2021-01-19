<template lang="pug">
  b-container(class="products").shadow
    b-row
      b-col(cols="12")
        b-breadcrumb(:items="breads")
      b-col(cols="12")
        b-row
          b-col(cols="12" lg="3" ).ml-auto.mb-3
            div(class="searchbar").mb-2
              font-awesome-icon( :icon=['fas', 'search'] ).h4.mt-2
              b-form-input(
                  type="text"
                  placeholder="Type to search"
                  v-model="keyword"
                  style="right:0"
                ).w-75.ml-2
          b-col(cols="10").d-block.d-lg-none.mx-auto
            b-dropdown(text="選擇類別" block menu-class="w-100" variant="info").mb-4
              b-dropdown-item-button(
                v-for="item in this.$store.state.categories"
                @click="tagCategory(item)") {{item.text}}

      b-col(cols="2")
        b-list-group(v-for="(category, index) in category" :key="index").p-1.d-none.d-lg-block
            b-list-group-item.p-0.text-center.d-block
              div(v-ripple class="button is-primary")
                b-button(
                  class="activebtn"
                  @click="tagCategory(category)"
                  style="font-size:0.9rem"
                  v-if="tag === category.value").w-100.shadow-sm {{category.text}}
                b-button(
                  @click="tagCategory(category)"
                  style="font-size:0.9rem"
                  v-else).w-100.shadow-sm {{category.text}}
      b-col(cols="12" lg="10")
        b-row(style="min-height:60vh").d-flex.justify-content-center.justify-content-lg-start
          h3(v-if="finalLists.length===0").m-auto 目前沒有商品
          b-col(cols="10" lg="4" v-for="item in finalLists")
            a(href="#/productsdetail", title="title" style="text-decoration:none" @click="showdetail(item)")
              b-card(class="productCard").mb-3.shadow.border.pb-0
                .img.border
                  b-card-img(:src="item.src[0]" style="max-height:100%")
                b-card-text(style="height: 4rem").mt-2
                  p {{item.name}}
                b-card-text(style="vertical-align: middle").d-flex.align-items-center.mt-2
                 span.text-danger.mr-3(v-if="item.onsale").h5 特價: NT: {{item.countPrice}}
                 s(v-if="item.onsale") NT: {{item.price}}
                 span(v-else) NT: {{item.price}}
                //-  font-awesome-icon( :icon=['fas', 'heart'] ).text-danger.m-0.text-right
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
      isLoading: false,
      fullPage: true,
      keyword: '',
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
    tag () {
      return this.$store.state.tag
    },
    category () {
      return this.$store.state.categories
    },
    filterLists () {
      var result = null
      if (this.$store.state.tag === '') {
        result = this.$store.state.onShoplists
        return result
      } else {
        result = this.$store.state.onShoplists.filter(product => {
          return product.category === this.$store.state.tag
        })
      }
      console.log(result)
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
      this.$store.state.tag = data.value
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
      this.$store.commit('onShoplists', data)
    })
  }
}
</script>
