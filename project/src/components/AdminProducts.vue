<template lang="pug">
  #adminproducts.min-vh-100
    b-container
      div.d-flex.align-items-center.justify-content-center
        h1(class="my-3 mb-2") 商品管理
      b-row
        b-col(cols="1").p-0
          b-button(v-b-modal.addForm  style="height:48px").bg-success.w-100 新增商品

        b-col(cols="11")
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
                    b-button(@click="checkEdit(item)" v-b-modal.editForm).bg-success.mt-2 詳細內容 / 編輯
                    b-button(@click="delProducts(item)").bg-danger.mt-2.mr-0 刪除
          b-pagination(
            v-model="currentPage"
            :total-rows="productlists.length"
            :per-page="perPage"
            aria-controls="itemList"
            align="center"
          ).pt-3
          //- 編輯商品
          b-modal(id="editForm" title="商品內容 / 編輯商品" size="lg" @ok="editProducts()" okTitle='確定' cancelTitle="取消" okVariant= 'success' )
            b-form()
              b-col(cols="12")
                b-container
                  b-row
                    b-col(cols="6").p-0
                      p 商品編號: {{editForm.productNumber}}
                    b-col(cols="6").p-0.d-flex.align-items-center
                      b-form-group(label="是否上架 : " id="input-group-1").m-0.p-0
                      b-button(style="border-style:none;" @click="checkOnshop()").bg-transparent.border-none.ml-2
                        font-awesome-icon(v-if="editForm.onShop" :icon=['fas', 'check'] ).text-success
                        font-awesome-icon(v-else :icon=['fas', 'times'] ).text-danger
                b-container
                  b-row.mb-3
                    b-col(cols="6").p-0
                      p(v-model="editForm.date") 上架日期: {{editForm.date}}
                    b-col(cols="6").p-0
                      p(v-model="editForm.sold") 已售數量: {{editForm.sold}}
                b-form-group(label="商品名稱").w-100
                  b-form-input(v-model="editForm.name")
              b-container
                b-row
                  b-col(cols="8")
                    b-form-group(label="商品圖片 :" id="input-group-1")
                      div(style="max-height:50vh;overflow:hidden").w-100
                        img(:src="editForm.src"  ).w-100
                  b-col(cols="4")
                    b-form-group(label="商品價格 :" id="input-group-1")
                      b-form-input(type="number"
                           v-model.number="editForm.price")
                    b-form-group(label="是否特價 :" id="input-group-3")
                      b-button(style="border-style:none;" @click="checkSale()").bg-transparent.border-none.d-inline
                        font-awesome-icon(v-if="editForm.onsale" :icon=['fas', 'check'] ).text-success
                        font-awesome-icon(v-else :icon=['fas', 'times'] ).text-danger
                    b-form-group(label="特價價格 :" id="input-group-3" v-if="editForm.onsale")
                      b-form-input(type="number" v-model.number="editForm.countPrice")

              b-col(cols="12")
                 b-form-group(label="商品敘述 : " id="input-group-1" )
                  b-form-input(v-model="editForm.description")
              b-container
                b-row
                  b-col(cols="6")
                    b-form-group(label="商品類別 : " id="input-group-1")
                      b-form-select(id="input-1" :options="categories" v-model="editForm.category")
                        template(v-slot:first)
                          b-form-select-option(:value="null" disabled) 請選擇類別
                  b-col(cols="6")
                    b-form-group(label="商品數量 :" id="input-group-1")
                            b-form-input(type="number"
                                v-model.number="editForm.amount")
          //- 增加商品
          b-modal(id="addForm" title="增加商品 : " size="md" @ok="onSubmit()" okTitle='確定' cancelTitle="取消" okVariant= 'success' )
            b-form()
              b-form-group(label="商品名稱 :").w-100.mt-3
                b-form-input(v-model="newForm.name")
              b-container
                b-row
                  b-col(cols="8")
                    b-form-group(label="商品圖片" id="input-group-1")
                      img-inputer(size="normal" v-model="image" )
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
                 b-form-group(label="商品類別" id="input-group-1"  )
                  b-form-select(id="input-1" :options="categories" v-model="newForm.category" )
                    template(v-slot:first)
                      b-form-select-option(:value="null" disabled) 請選擇類別
              b-col(cols="12")
                b-form-group(label="是否上架 : " id="input-group-1").d-inline
                b-form-radio(v-model="newForm.onShop" value="true" name="radio").w-25.d-inline.ml-3 是
                b-form-radio(v-model="newForm.onShop" value="false" name="radio").w-25.d-inline.ml-3 否

</template>
<style lang="stylus">

</style>
<script>

export default {
  name: 'AdminProducts',
  data () {
    return {
      test: '',
      productlists: this.$store.state.productlists,
      newForm: {
        countPrice: null,
        onsale: null,
        src: '',
        name: '',
        category: '',
        description: '',
        onShop: null,
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
      editForm: {
        _id: '',
        countPrice: null,
        onsale: null,
        src: '',
        name: '',
        category: '',
        description: '',
        onShop: null,
        amount: null,
        price: null,
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
      isEdit: false,
      images: [],
      image: null,
      perPage: 8,
      currentPage: 1,
      categories: [
        { value: 'A', text: '日本景品' },
        { value: 'B', text: '組裝模型' },
        { value: 'C', text: 'PVC人偶' },
        { value: 'D', text: 'GK' },
        { value: 'E', text: '可動人偶' }
      ]
    }
  },
  computed: {
    // productlists () {
    //   return this.$store.state.productlists
    // },
    itemsForList () {
      return this.productlists.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      )
    }
  },
  methods: {
    selectType () {
    },
    checkOnshop () {
      console.log(this.editForm.onShop)
      this.editForm.onShop = !this.editForm.onShop
    },
    checkSale () {
      this.editForm.onsale = !this.editForm.onsale
    },
    editProducts () {
      const _id = this.editForm._id
      console.log(this.editForm.onShop)
      this.axios.patch(process.env.VUE_APP_API + '/products/edit/' + _id, {
        description: this.editForm.description,
        name: this.editForm.name,
        price: this.editForm.price,
        amount: this.editForm.amount,
        category: this.editForm.category,
        onsale: this.editForm.onsale,
        countPrice: this.editForm.countPrice,
        onShop: this.editForm.onShop
      })
        .then(res => {
          if (res.data.success) {
            console.log(res)
            this.$store.commit('editProducts', {
              _id,
              description: this.editForm.description,
              name: this.editForm.name,
              price: this.editForm.price,
              amount: this.editForm.amount,
              category: this.editForm.category,
              onsale: this.editForm.onsale,
              countPrice: this.editForm.countPrice,
              onShop: this.editForm.onShop
            })
          } else {
            alert('發生錯誤')
          }
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    onSubmit () {
      if (!this.image.type.includes('image')) {
        alert('檔案格式不符')
      } else {
        const now = new Date()
        const year = now.getFullYear()
        const month = now.getMonth() + 1
        const day = now.getDate()
        this.newForm.date = year + '/' + month + '/' + day
        var final = this.newForm
        const fd = new FormData()
        fd.append('image', this.image)
        fd.append('name', final.name)
        fd.append('category', final.category)
        fd.append('description', final.description)
        fd.append('onShop', final.onShop)
        fd.append('amount', final.amount)
        fd.append('price', final.price)
        fd.append('sold', final.sold)
        fd.append('onsale', false)
        fd.append('countPrice', 0)
        fd.append('date', final.date)
        fd.append('display', true)
        this.axios.post(process.env.VUE_APP_API + '/products/create', fd)
          .then(res => {
            console.log(res.data)
            if (res.data.success) {
              this.axios.get(process.env.VUE_APP_API + '/products/').then((response) => {
                this.images = response.data.result.map(image => {
                  image.src = process.env.VUE_APP_API + '/products/' + image.images[0].file
                  return image
                })
                this.newForm.name = ''
                this.newForm.description = ''
                this.newForm.amount = 1
                this.newForm.price = 1
                this.newForm.category = null
                var data = this.images
                this.$store.commit('productlists', data)
              })
            }
          }).catch(err => {
            console.log(err)
          })
      }
    },
    checkEdit (data) {
      console.log(data)
      this.isEdit = true
      var edited = this.editForm
      edited.name = data.name
      edited.amount = data.amount
      edited.price = data.price
      edited.onShop = data.onShop
      edited.productNumber = data.productNumber
      edited.src = data.src
      edited.description = data.description
      edited.category = data.category
      edited.sold = data.sold
      edited.date = data.date
      edited.onsale = data.onsale
      edited._id = data._id
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
  .nav-pills
    padding 0 !important
</style>
