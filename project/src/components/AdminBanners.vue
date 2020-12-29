<template lang="pug">
  #adminbanners.min-vh-100
    b-container
      h1(class="my-3 mb-2") 輪播圖管理
      b-col(cols="12")
        b-button(v-b-modal.addBanner).bg-success.mb-3 新增
        b-modal(id="addBanner" title="新增輪播圖" size="sm" hide-footer).d-flex.flex-column
          label 檔案敘述 :
          input(type="input" placeholder="請輸入" v-model="description")
          label.py-2 上傳圖片 :
          img-inputer(v-model="image" theme="light" size="middle" )
          b-button(@click="onSubmit()").bg-success.mt-3 新增
        b-table(
            id="brtable"
            class="mx-auto"
            :items="bannerlists"
            :fields="fields"
            stacked="md"
            )
          template(v-slot:cell(description)="data" )
            b-button(variant="danger" @click="delbanners(data, data.index)") 刪除
          template(#cell(description)='data')
            span() {{data.item.description}}
          template(#cell(src)='data' class="test")
            img(:src= 'data.item.src' style="width:400px;height:187.5px")
          template(#cell(edit)='data')
            b-button(variant="success"  v-b-modal.change @click="sendData(data.item, data.index)") 更改
          template(#cell(del)='data')
            b-button(variant="danger" @click="delbanners(data, data.index)") 刪除
        b-modal(id="change" title="新增輪播圖" size="sm" hide-footer ).d-flex.flex-column
            label 檔案敘述 :
            input(type="input" placeholder="請輸入" v-model="description")
            label.py-2 上傳圖片 :
            img-inputer(v-model="image" theme="light" size="middle" )
            b-button(@click="editBanners(selected , selectedIndex)").bg-success.mt-3 新增

</template>

<script>

export default {
  name: 'AdminBanners',
  data () {
    return {
      selected: null,
      selectedIndex: '',
      image: null,
      description: '',
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
    sendData (data, index) {
      this.selected = data
      this.selectedIndex = index
    },
    onSubmit () {
      if (!this.image.type.includes('image')) {
        alert('檔案格式不符')
      } else {
        const fd = new FormData()
        fd.append('image', this.image)
        fd.append('description', this.description)
        this.axios.post(process.env.VUE_APP_API + '/banners/create', fd)
          .then(res => {
            if (res.data.success) {
              // 將新增的圖片塞進相簿陣列
              res.data.result.src = process.env.VUE_APP_API + '/banners/file/' + res.data.result.file
              res.data.result.title = res.data.result.description
              res.data.result.isEdit = false
              this.images.push(res.data.result)
              // 送出後清空表單
              this.image = null
              this.description = ''
              this.axios.get(process.env.VUE_APP_API + '/banners').then((response) => {
                this.images = response.data.result.map(image => {
                  image.src = process.env.VUE_APP_API + '/banners/' + image.file
                  return image
                })
                var data = this.images
                this.$store.commit('bannerlists', data)
              })
            } else {
              alert('錯誤')
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    editBanners (data, index) {
      console.log(data, index, this.description)
      this.axios.patch(process.env.VUE_APP_API + '/banners/edit/' + data._id, { description: this.description })
        .then(res => {
          if (res.data.success) {
            console.log(res)
            this.$store.commit('editBanners', { description: data.description, index })
          } else {
            alert('發生錯誤')
          }
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    save (data) {
      data.item.isEdit = false
    },
    delbanners (data, index) {
      var deldata = data
      var delIndex = index
      console.log(deldata, delIndex)
      this.checkDel = ''
      this.$bvModal.msgBoxConfirm('確定要刪除嗎', {
        title: data.item.date,
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        cancelTitle: '取消',
        okTitle: '確認',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then((data) => {
          if (data) {
            this.axios.delete(process.env.VUE_APP_API + '/banners/del/' + deldata.item._id)
              .then(res => {
                if (res.data.success) {
                  this.$store.commit('delbanners', delIndex)
                } else {
                  alert('發生錯誤')
                }
              })
              .catch(err => {
                alert(err.response.data.message)
              })
          }
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
