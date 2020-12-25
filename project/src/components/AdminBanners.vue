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
          template(#cell(description)='data')
              input(v-if="data.item.isEdit" style="height:30px;")
              span(v-else) {{data.item.description}}
          template(#cell(src)='data' class="test")
            img(:src= 'data.item.src' style="width:400px;height:187.5px")
          template(#cell(edit)='data')
            b-button(variant="success" v-if="data.item.isEdit" @click="save(data)") 保存
            b-button(variant="success" v-else @click="edit(data)") 更改
          template(#cell(del)='data')
            b-button(variant="danger" @click="delbanners(data, data.index)") 刪除

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
          label: '檔案名',
          tdClass: 'nameOfTheClass'
        },
        {
          key: 'src',
          label: ''
        },
        {
          key: 'edit',
          label: '編輯'
        },
        {
          key: 'del',
          label: '刪除'
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
      console.log(data.item.isEdit)
    },
    save (data) {
      data.item.isEdit = false
    },
    delbanners (data, index) {
      this.axios.delete(process.env.VUE_APP_API + '/banners/del/' + data.item._id)
        .then(res => {
          if (res.data.success) {
            this.$store.commit('delbanners', index)
          } else {
            alert('發生錯誤')
          }
        })
        .catch(err => {
          alert(err.response.data.message)
        })
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

<style lang="stylus">

</style>
