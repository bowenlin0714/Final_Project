<template lang="pug">
  #adminbanners.min-vh-100
    b-container
      h1.my-3.mb-2.text-center 輪播圖管理
      b-col(cols="12")
        b-button(v-b-modal.addBanner).bg-success.mb-3 新增
        b-modal(
          id="addBanner"
          title="新增輪播圖"
          size="sm"
          @ok="handleOk"
          okTitle="確定"
          cancelTitle="取消"
          @show="resetModal"
          @hidden="resetModal").d-flex.flex-column
          b-form(@submit.stop.prevent="onSubmit")
            b-form-group(
              label="檔案敘述 :"
              label-for="input1"
              id="input1").mb-0
              b-form-input(
                id="input1"
                name="input1"
                v-model="description"
                placeholder="請輸入"
                :state="validateState('input1')"
                v-validate="{ required: true }"
                data-vv-as="檔案敘述"
                ).mb-2 請輸入檔案敘述
              b-form-invalid-feedback().mb-3 {{ veeErrors.first('input1') }}
            b-form-group(label="上傳圖片 :" label-for="input2" id="input2").mb-0
              img-inputer(v-model="image" theme="light" size="middle" )
        b-table(
            small
            id="brtable"
            class="mx-auto"
            :items="bannerlists"
            :fields="fields"
            stacked="md"
            ).text-left.text-lg-center
          template(v-slot:cell(isShow)="data" )
            b-button(style="border-style:none;" @click="checkisShow(data, data.index)").bg-transparent.border-none
              font-awesome-icon(v-if="data.item.isShow" :icon=['fas', 'check'] ).text-success
              font-awesome-icon(v-else :icon=['fas', 'times'] ).text-danger
          template(#cell(description)='data')
            span() {{data.item.description}}
          template(#cell(src)='data' class="test" style="width:20px")
            img(:src= 'data.item.src' style="width:400px;height:187.5px")
          template(#cell(edit)='data')
            b-button(variant="success"  v-b-modal.change @click="sendData(data.item, data.index)") 更改
          template(#cell(del)='data')
            b-button(variant="danger" @click="delbanners(data, data.index)") 刪除
        b-modal(
          id="change"
          title="編輯"
          size="sm"
          okTitle="確定"
          cancelTitle="取消"
          ok-variant="success"
          @ok="editBanners(selected , selectedIndex)"
          ).d-flex.flex-column
          label.mr-2 檔案名 :
          input(type="input" placeholder="請輸入" v-model="description" )
          img(:src="selected.src" style="width:100%").pt-3
      div.w-100
        p(v-if="bannerlists.length == 0").text-center.h1.text-white 目前沒有內容

</template>
<style lang="stylus">

</style>
<script>

export default {
  name: 'AdminBanners',
  data () {
    return {
      selected: '',
      selectedIndex: '',
      description: '',
      image: null,
      images: [],
      fields: [
        {
          key: 'description',
          label: '檔案名',
          tdClass: 'nameOfTheClass'
        },
        {
          key: 'isShow',
          label: '是否展示'
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
    handleOk (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.onSubmit()
    },
    validateState (ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref)
      }
      return null
    },
    checkisShow (data) {
      this.axios.patch(process.env.VUE_APP_API + '/banners/edit/' + data.item._id, { isShow: !data.item.isShow })
        .then(res => {
          if (res.data.success) {
            this.$store.commit('checkisShow', data.item._id)
            this.$root.$emit('bv::refresh::table', 'formstable')
          } else {
            alert('發生錯誤')
          }
        })
        .catch(err => {
          alert(err.response.data.message)
        })
      console.log(data.item._id)
    },
    sendData (data, index) {
      this.selected = data
      this.selectedIndex = index
    },
    async onSubmit () {
      this.$validator.validateAll().then(result => {
        if (!result) {
          return
        }
        if (!this.image.type.includes('image')) {
          alert('檔案格式不符')
        } else {
          console.log(this.image)
          const fd = new FormData()
          fd.append('image', this.image)
          fd.append('description', this.description)
          this.axios.post(process.env.VUE_APP_API + '/banners/create', fd)
            .then(res => {
              if (res.data.success) {
              // 將新增的圖片塞進相簿陣列
                console.log(res)
                res.data.result.src = process.env.VUE_APP_API + '/banners/file/' + res.data.result.file
                res.data.result.title = res.data.result.description
                res.data.result.isEdit = false
                this.images.push(res.data.result)
                // 送出後清空表單
                this.$bvModal.hide('addBanner')
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
      })
    },
    resetModal () {
      this.description = ''
      this.image = null
    },
    editBanners (data, index) {
      this.axios.patch(process.env.VUE_APP_API + '/banners/edit/' + data._id, { description: this.description })
        .then(res => {
          if (res.data.success) {
            console.log(res)
            this.$store.commit('editBanners', { description: this.description, index })
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
      console.log(response.data.result)
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
