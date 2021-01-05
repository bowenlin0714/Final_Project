<template lang="pug">
  #adminproducts.min-vh-100
    b-container
      div.d-flex.align-items-center.justify-content-center.position-relative
        h1(class="my-3 mb-2" style="z-index:2").text-center 商品管理
      b-row
        b-col(cols="12"  lg="3").ml-auto
          b-form-input(
              type="text"
              placeholder="Type to search"
              v-model="keyword"
              style="right:0"
            ).mb-3
        b-col(cols="12")
          b-button(v-b-modal.addForm  style="height:48px").bg-success.w-100.mb-3.d-block.d-lg-none 新增商品
        b-col(cols="12" ).d-block.d-lg-none
          b-dropdown(text="選擇類別" block menu-class="w-100" variant="info").mb-3
            b-dropdown-item-button(v-for="item in categories" @click="tagCategory(item)") {{item.text}}
      b-row
        b-col(cols="1").p-0
          b-button(v-b-modal.addForm  style="height:48px").bg-success.w-100.mb-3.d-none.d-lg-block 新增商品
          b-list-group(v-for="(category, index) in categories" :key="index").p-1.d-none.d-lg-block
            b-list-group-item.p-0.text-center.d-block
              b-button(@click="tagCategory(category)" style="font-size:14px").w-100.bg-info {{category.text}}
        b-col(cols="12" lg="11")
          .products.p-4.pb-5
            h3(v-if="itemsForList.length === 0").text-white.text-center 目前沒有商品
            b-row(v-else)
              b-col(cols="12" sm="6" md="6" lg="3"  v-for="item in itemsForList" :key="item.id" )
                b-card(
                ).mt-4.shadow.border
                  b-container
                    b-card-title(:title="item.name" class="d-inline-block text-truncate")
                  div(style="height:20vh;overflow:hidden")
                    b-card-img(:src="item.src[0]")
                  b-card-text.my-1 商品狀態:
                    span(v-if="item.onShop").text-success 販售中
                    span(v-else).text-danger 已下架
                  b-card-text.my-1 已售: {{item.sold}}
                  b-card-text.my-1 剩餘: {{item.amount}}
                  div(style="width:100%;display:flex;flex-direction:column;height:100px")
                    b-button(@click="checkEdit(item)" v-b-modal.editForm).bg-success.mt-2 詳細內容 / 編輯
                    b-button(@click="delProducts(item)").bg-danger.mt-2.mr-0 刪除
          p(class="footer").text-center.pt-2.mb-0 第 {{currentPage}} 頁，共 {{productlists.length}} 筆結果
          b-pagination(
            v-model="currentPage"
            :total-rows="productlists.length"
            :per-page="perPage"
            aria-controls="itemList"
            align="center"
          ).pt-3
          //- 編輯商品
          b-modal(
            header-bg-variant="info"
            header-text-variant="white"
            id="editForm"
            title="商品內容 / 編輯商品"
            size="lg"
            @ok="handleOk2"
            okTitle='確定'
            cancelTitle="取消"
            okVariant= 'success' )
            b-form()
              b-col(cols="12")
                b-container
                  b-row
                    b-col(cols="6").p-0
                      p 商品編號:  {{editForm.productNumber}}
                    b-col(cols="6").p-0.d-flex.align-items-center
                      b-form-group(label="是否上架 : " id="input-group-11").m-0.p-0
                      b-button(style="border-style:none;" @click="checkOnshop()").bg-transparent.border-none.ml-2
                        font-awesome-icon(v-if="editForm.onShop" :icon=['fas', 'check'] ).text-success
                        font-awesome-icon(v-else :icon=['fas', 'times'] ).text-danger
                b-container
                  b-row.mb-3
                    b-col(cols="6").p-0
                      p(v-model="editForm.date") 上架日期: {{editForm.date}}
                    b-col(cols="6").p-0
                      p(v-model="editForm.sold") 已售數量: {{editForm.sold}}
                b-form-group(label="商品名稱 :").w-100
                  b-form-input(v-model="editForm.name")
              b-container
                b-row
                  b-col(cols="12")
                    b-form-group(label="商品圖片 :" id="input-group-2")
                      b-row
                        b-col( cols="12" lg="6" v-for="image in editForm.src").d-flex.p-3
                          div(style="max-height:50vh;overflow:hidden" ).w-100.d-flex.align-items-center.border.justify-content-center.rounded
                            img(:src="image").w-75
                  b-col(cols="12")
                    b-form-group(label="商品價格 :" id="input-group-3")
                      b-form-input(type="number"
                           v-model.number="editForm.price")
                    b-form-group(label="是否特價 :" id="input-group-4")
                      b-button(style="border-style:none;" @click="checkSale()").bg-transparent.border-none.d-inline
                        font-awesome-icon(v-if="editForm.onsale" :icon=['fas', 'check'] ).text-success
                        font-awesome-icon(v-else :icon=['fas', 'times'] ).text-danger
                    b-form-group(
                      label="特價價格 :"
                      id="editspecial"
                      label-for="editspecial"
                      v-if="editForm.onsale")
                      b-form-input(
                        type="number"
                        v-model.number="editForm.countPrice"
                        id="editspecial"
                        name="editspecial"
                        :state="validateState('editspecial')"
                        v-validate="{ required: true, min:0, numeric: true }"
                        data-vv-as="特價價格")
                      b-form-invalid-feedback().mb-3 {{ veeErrors.first('editspecial') }}
              b-col(cols="12")
                 b-form-group(label="商品敘述 : " id="input-group-8" )
                  b-form-textarea( v-model="editForm.description" max-rows="15")
              b-container
                b-row
                  b-col(cols="6")
                    b-form-group(label="商品類別 : " id="input-group-6")
                      b-form-select(id="input-1" :options="categories" v-model="editForm.category")
                        template(v-slot:first)
                          b-form-select-option(:value="null" disabled) 請選擇類別
                  b-col(cols="6")
                    b-form-group(label="商品數量 :" id="input-group-7")
                            b-form-input(type="number"
                                v-model.number="editForm.amount")
          //- 增加商品
          b-modal(
            header-bg-variant="info"
            header-text-variant="white"
            id="addForm"
            title="增加商品 : "
            size="lg"
            @ok="handleOk"
            okTitle='確定'
            cancelTitle="取消"
            okVariant= 'success'
            @show="resetModal"
            @hidden="resetModal")
            b-form(@submit.stop.prevent="onSubmit")
              b-container
                b-form-group(
                  label="商品名稱 :"
                  label-for="newname"
                  id="newname").w-100.mt-3
                  b-form-input(
                    id="newname"
                    name="newname"
                    v-model="newForm.name"
                    :state="validateState('newname')"
                    v-validate="{ required: true, min:2 }"
                    data-vv-as="商品名稱")
                  b-form-invalid-feedback().mb-3 {{ veeErrors.first('newname') }}
              b-container
                b-row
                  b-col(cols="12")
                    b-form-group(
                      label="商品圖片 :"
                      id="input-group-12")
                      b-container(fluid)
                        b-row
                          b-col(lg="6" cols="12").text-center.pb-2.pt-2
                            img-inputer(size="normal" v-model="image" )
                          b-col(lg="6" cols="12").text-center.pb-2.pt-2
                            img-inputer(size="normal" v-model="image2" )
                          b-col(lg="6" cols="12").text-center.pb-2.pt-2
                            img-inputer(size="normal" v-model="image3" )
                          b-col(lg="6" cols="12").text-center.pb-2.pt-2
                            img-inputer(size="normal" v-model="image4" )
                  b-col(cols="6")
                    b-form-group(
                      label="商品價格"
                      label-for="newprice"
                      id="newprice")
                      b-form-input(
                        type="number"
                        v-model.number="newForm.price"
                        id="newprice"
                        name="newprice"
                        :state="validateState('newprice')"
                        v-validate="{ required: true, min:1, numeric: true }"
                        data-vv-as="商品價格")
                      b-form-invalid-feedback().mb-3 {{ veeErrors.first('newprice') }}
                  b-col(cols="6")
                    b-form-group(
                      label="商品數量"
                      id="newamount"
                      label-for="newamount")
                      b-form-input(
                        type="number"
                        v-model.number="newForm.amount"
                        id="newamount"
                        name="newamount"
                        :state="validateState('newamount')"
                        v-validate="{ required: true, min:0, numeric: true, max: 999999 }"
                        data-vv-as="商品數量")
                      b-form-invalid-feedback().mb-3 {{ veeErrors.first('newamount') }}
              b-col(cols="12")
                 b-form-group(
                   label="商品敘述"
                   id="newdescription"
                   label-for="newdescription")
                  b-form-input(
                    v-model="newForm.description"
                    id="newdescription"
                    name="newdescription"
                    :state="validateState('newdescription')"
                    v-validate="{ required: true }"
                    data-vv-as="商品敘述")
                  b-form-invalid-feedback().mb-3 {{ veeErrors.first('newdescription') }}
              b-col(cols="12")
                 b-form-group(
                   label="商品類別"
                   id="newcategory"
                   label-for="newcategory")
                  b-form-select(
                    id="newcategory"
                    :options="categories"
                    v-model="newForm.category"
                    name="newcategory"
                    :state="validateState('newcategory')"
                    v-validate="{ required: true }"
                    data-vv-as="商品分類")
                  b-form-invalid-feedback().mb-3 {{ veeErrors.first('newcategory') }}
                    template(v-slot:first)
                      b-form-select-option(:value="null" disabled) 請選擇類別
              b-col(cols="12")
                b-form-group(
                  label="是否上架 :"
                  id="newonshop"
                  label-for="newonshop").d-inline
                  b-form-radio-group(
                    id="newonshop"
                    v-model="newForm.onShop"
                    name="newonshop"
                    :options="newRadios"
                    :state="validateState('newonshop')"
                     v-validate="{ required: true }"
                     data-vv-as="上架選項")
                  b-form-invalid-feedback(:state="validateState('newonshop')").mb-3 上架選項不可為空

</template>
<style lang="stylus">

</style>
<script>

export default {
  name: 'AdminProducts',
  data () {
    return {
      newRadios: [
        { text: '是', value: true },
        { text: '否', value: false }
      ],
      keyword: '',
      tag: '',
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
      image2: null,
      image3: null,
      image4: null,
      perPage: 8,
      currentPage: 1
    }
  },
  computed: {
    categories () {
      return this.$store.state.categories
    },
    finallists () {
      var result = ''
      if (this.keyword === '') {
        result = this.productlists
        return result
      } else {
        result = this.productlists.filter(product => {
          return product.name.search(this.keyword) !== -1
        })
      }
      return result
    },
    productlists () {
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
    itemsForList () {
      return this.finallists.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      )
    }
  },
  methods: {
    handleOk (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.onSubmit()
    },
    handleOk2 (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.editProducts()
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
    tagCategory (data) {
      this.tag = data.value
    },
    checkOnshop () {
      this.editForm.onShop = !this.editForm.onShop
    },
    checkSale () {
      this.editForm.onsale = !this.editForm.onsale
    },
    async editProducts () {
      this.$validator.validateAll().then(result => {
        if (!result) {
          return
        }
        const _id = this.editForm._id
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
              this.$bvModal.hide('editForm')
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
      })
    },
    async onSubmit () {
      this.$validator.validateAll().then(result => {
        if (!result) {
          return
        }
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
          fd.append('image', this.image2)
          fd.append('image', this.image3)
          fd.append('image', this.image4)
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
              console.log(res)
              if (res.data.success) {
                this.newForm.name = ''
                this.newForm.description = ''
                this.newForm.amount = 1
                this.newForm.price = 1
                this.newForm.category = null
                this.$bvModal.hide('addForm')

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
            }).catch(err => {
              console.log(err)
            })
        }
      })
    },
    checkEdit (data) {
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
    },
    resetModal () {
      this.newForm.name = ''
      this.newForm.description = ''
      this.newForm.amount = 1
      this.newForm.price = 1
      this.newForm.category = null
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

<style lang="stylus" >
  .nav-pills
    padding 0 !important
</style>
