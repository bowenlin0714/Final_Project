<template lang="pug">
  #adminproducts.min-vh-100
    b-container
      h1(class="my-3 mb-2") 商品管理
      b-button(v-b-modal.addForm).bg-success.ml-3.mb-3 新增
      b-row
        b-col(cols="12")
          .products.p-4.pb-5
            b-row
              b-col(cols="12" sm="6" md="6" lg="3"  v-for="item in itemsForList" :key="item.id" )
                b-card(
                ).mt-4.shadow.border
                  b-container
                    b-card-title(:title="item.name" class="d-inline-block text-truncate")
                  div(style="height:20vh;overflow:hidden")
                    b-card-img(:src="item.src")
                  b-card-text.my-1 商品狀態:
                    span(v-if="item.onShop").text-success 販售中
                    span(v-else).text-danger 已下架
                  b-card-text.my-1 已售: {{item.sold}}
                  b-card-text.my-1 剩餘: {{item.amount}}
                  div(style="width:100%;display:flex;flex-direction:column;height:100px")
                    b-button.bg-success.mt-2 編輯
                    b-button(@click="delProducts(item)").bg-danger.mt-2.mr-0 刪除
          b-pagination(
            v-model="currentPage"
            :total-rows="productlists.length"
            :per-page="perPage"
            aria-controls="itemList"
            align="center"
          ).pt-3
          b-modal(id="addForm" title="新增商品" size="md" @ok="onSubmit()" okTitle='確定' cancelTitle="取消" okVariant= 'success')
            b-form()
              b-col(cols="12")
                b-form-group(label="商品名稱").w-100
                  b-form-input(v-model="newForm.name")
              b-container
                b-row
                  b-col(cols="8")
                    b-form-group(label="商品圖片" id="input-group-1")
                      img-inputer(size="normal" v-model="newForm.image[0].file")
                  b-col(cols="4")
                    b-form-group(label="商品價格" id="input-group-1")
                      b-form-input(type="number"
                           v-model.number="newForm.price")
                    b-form-group(label="商品數量" id="input-group-1")
                      b-form-input(type="number"
                          v-model.number="newForm.amount")
              b-col(cols="12")
                 b-form-group(label="商品敘述" id="input-group-1" )
                  b-form-input(v-model="newForm.description")
              b-col(cols="12")
                 b-form-group(label="商品類別" id="input-group-1")
                  b-form-select(
                    id="input-1" :options="categories" v-model="newForm.category")
              b-col(cols="12")
                 b-form-group(label="是否上架" id="input-group-1")
                  b-form-radio 是
                  b-form-radio 否

</template>
<style lang="stylus">

</style>
<script>

export default {
  name: 'AdminProducts',
  data () {
    return {
      newForm: {
        name: '',
        category: '',
        productNumber: 1,
        description: '',
        amount: 1,
        price: 1,
        sold: 0,
        date: '',
        image: [
          {
            display: true,
            file: null
          }
        ]
      },
      checkDel: '',
      images: [],
      image: null,
      perPage: 8,
      selected: null,
      currentPage: 1,
      categories: [
        { value: null, text: '請選擇類別' },
        { value: 'A', text: '日本景品' },
        { value: 'B', text: '組裝模型' },
        { value: 'C', text: 'PVC人偶' },
        { value: 'D', text: 'GK' },
        { value: 'E', text: '可動人偶' }
      ]
    }
  },
  computed: {
    productlists () {
      return this.$store.state.productlists
    },
    itemsForList () {
      return this.productlists.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      )
    }
  },
  methods: {
    onSubmit () {
      // if (!this.newForm.image[0].file.type.includes('image')) {
      //   alert('檔案格式不符')
      // } else {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1
      const day = now.getDate()
      this.newForm.date = year + '/' + month + '/' + day
      var final = this.newForm
      console.log(final)
      const fd = new FormData()
      fd.append('image', final.image[0].file)
      fd.append('name', final.name)
      fd.append('category', final.category)
      fd.append('description', final.description)
      fd.append('productNumber', 6)
      fd.append('onShop', true)
      fd.append('amount', final.amount)
      fd.append('price', final.price)
      fd.append('sold', final.sold)
      fd.append('onsale', false)
      fd.append('countPrice', 0)
      fd.append('date', final.date)
      fd.append('display', true)
      console.log(fd)
      this.axios.post(process.env.VUE_APP_API + '/products/create', fd)
        .then(res => {
          if (res.data.success) {
            // 將新增的圖片塞進相簿陣列
            // res.data.result.images[0].file.src = process.env.VUE_APP_API + '/products/' + res.data.result.images[0].file
            // console.log(res.data.result.images[0].file)
            // res.data.result.images[0].display = true
            // this.images.push(res.data.result)
            // 送出後清空表單
            // this.newForm = null
            // this.axios.get(process.env.VUE_APP_API + '/products').then((response) => {
            //   this.images = response.data.result.map(image => {
            //     image.src = process.env.VUE_APP_API + '/products/' + image.file
            //     return image
            //   })
            //   var data = this.images
            //   this.$store.commit('productlists', data)
            // })
            location.reload()
          }
        }).catch(err => {
          console.log(err)
        })

      this.newForm.productNumber++
      // }
    },
    delProducts (data) {
      console.log(data._id)
      var deldata = data
      this.checkDel = ''
      this.$bvModal.msgBoxConfirm('確定要刪除嗎', {
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: '確認',
        cancelTitle: '取消',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      }).then((data) => {
        if (data) {
          this.axios.delete(process.env.VUE_APP_API + '/products/del/' + deldata._id)
            .then(res => {
              if (res.data.success) {
                this.$store.commit('delProducts', deldata._id)
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
    this.axios.get(process.env.VUE_APP_API + '/products/').then((response) => {
      this.images = response.data.result.map(image => {
        image.src = process.env.VUE_APP_API + '/products/' + image.images[0].file
        return image
      })
      var data = this.images
      this.$store.commit('productlists', data)
    })
  }

}
</script>

<style lang="stylus" >

</style>
