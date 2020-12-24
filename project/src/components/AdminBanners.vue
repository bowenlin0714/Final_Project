<template lang="pug">
  #adminbanners
    b-container
      h1(class="my-3 mb-2") 輪播圖管理
      b-col(cols="12")
        b-table(
            id="brtable"
            class="mx-auto"
            :items="bannerlists"
            :fields="fields"
            stacked="md"
            )
          template(#cell(src)='data').w-75
            img(:src= 'data.item.src' style="width:400px")
          template(#cell(edit)='data')
            b-button(variant="success" v-if="data.item.isEdit" @click="save(data)") 保存
            b-button(variant="success" v-else @click="edit(data)") 更改

</template>

<script>

export default {
  name: 'AdminBanners',
  data () {
    return {
      image: null,
      images: [],
      fields: [
        {
          key: 'description',
          label: '檔案名'
        },
        {
          key: 'src',
          label: ''
        },
        {
          key: 'edit',
          label: '編輯'
        }

      ]
    }
  },
  computed: {
    bannerlists () {
      return this.$store.state.bannerlists
    }
  },
  methods: {
    edit (data) {
      data.item.isEdit = true
    },
    save (data) {
      data.item.isEdit = false
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/banners').then((response) => {
      this.images = response.data.result.map(image => {
        image.src = process.env.VUE_APP_API + '/banners/' + image.file
        return image
      })
      var data = this.images
      this.$store.commit('bannerlists', data)
    })
  }
}

</script>
