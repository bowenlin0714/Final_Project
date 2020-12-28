<template lang="pug">
  #adminopinions.min-vh-100
    b-container(class="")
      h1(class="my-3 mb-2") 意見表管理
      b-row
        b-col(cols="12" lg="6")
          b-form-group()
            b-form-radio-group
              b-form-radio(v-model="selected" value = "全部" checked) 顯示全部
              b-form-radio(v-model="selected" value = '已回覆') 顯示已回覆
              b-form-radio(v-model="selected" value = '未回覆') 顯示未回覆
        b-col(cols="12" lg="3").mb-4.ml-auto
          b-form-input(
            id="filter-input"
            type="search"
            placeholder="Type to Search"
            v-model="keyword"
          )
        b-col(cols='12' class="")
          b-table(
            class=""
            stacked="md"
            id="formstable"
            class="mx-auto"
            :filter = "keyword"
            :filter-included-fields="filterOn"
            :items='formlists'
            :fields='fields'
            :current-page="currentPage"
            :per-page="perPage"
            :sort-by.sync="sortBy"
            primary-key="_id"
            striped=true
            row-contextmenu
            v-b-modal.modal-1
            )
            template(#cell(opinion)='row')
              b-button(variant="info" @click.stop="row.toggleDetails" ) 完整訊息
            template(v-slot:row-details="row")
              p.text-break &emsp;意見與回饋: {{row.item.opinion}}
              b-button( @click="row.toggleDetails").bg-info 關閉
            template(#cell(isRes)='data')
              b-button(style="border-style:none;" @click.stop="checkRes(data, data.index)").bg-transparent.border-none
                font-awesome-icon(v-if="data.item.isRes" :icon=['fas', 'check'] ).text-success
                font-awesome-icon(v-else :icon=['fas', 'times'] ).text-danger
            template(#cell(delete)='data')
              b-button(variant="danger" @click.stop="delforms(data, data.index)" ) 刪除 {{checkDel}}
        div.w-100
          p(v-if="formlists.length == 0").text-center.ml-center 目前沒有內容
      p(style="text-align:center").text-center 分類排序:{{ sortBy }}
      p(style="text-align:center").text-center 第 {{currentPage}} 頁 共 {{formlists.length}} 筆結果
      b-pagination(
        v-model="currentPage"
        :total-rows="rows"
        aria-controls="membertable"
        :per-page="perPage"
        align="center"
        )
</template>

<script>
import '@/assets/css/back.stylus'
export default {
  name: 'AdminOpinions',
  data () {
    return {
      sortBy: 'date',
      sortDesc: false,
      checkDel: '',
      keyword: null,
      filterOn: [],
      selected: null,
      selectedForm: null,
      showDetail: false,
      detailTexts: {
        name: '',
        opinion: ''
      },
      perPage: 6,
      currentPage: 1,
      fields: [
        {
          key: 'date',
          label: '日期',
          sortable: true
        },
        {
          key: 'name',
          label: '姓名',
          sortable: true
        },
        {
          key: 'email',
          label: '電子信箱'
        },
        {
          key: 'phone',
          label: '電話號碼'
        },
        {
          key: 'opinion',
          label: '意見與回饋'
        },
        {
          key: 'isRes',
          label: '已回覆',
          sortable: true
        },
        {
          key: 'delete',
          label: '刪除'
        }
      ]
    }
  },
  computed: {
    formlists () {
      // var arrays = []
      if (this.selected === '已回覆') {
        return this.$store.state.formlists.filter(item => item.isRes === true)
      } else if (this.selected === '未回覆') {
        return this.$store.state.formlists.filter(item => item.isRes === false)
      } else {
        return this.$store.state.formlists
      }
      // return this.keyword
      //   ? this.$store.state.formlists.filter(item => item.name.includes(this.keyword) || item.email.includes(this.keyword))
      //   : this.$store.state.formlists
    },
    rows () {
      return this.formlists.length
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/forms').then((response) => {
      console.log(response.data.result)
      var data = response.data.result
      this.$store.commit('formlists', data)
    })
  },
  methods: {
    delforms (data, index) {
      var deldata = data
      var delIndex = index
      console.log(deldata, delIndex)
      this.checkDel = ''
      this.$bvModal.msgBoxConfirm('確定要刪除嗎', {
        title: data.item.date,
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: '確認',
        cancelTitle: '取消',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then((data) => {
          if (data) {
            this.axios.delete(process.env.VUE_APP_API + '/forms/del/' + deldata.item._id)
              .then(res => {
                if (res.data.success) {
                  this.$store.commit('delforms', delIndex)
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
    showForm1 (item, index) {
      this.showDetail = true
      this.detailTexts.name = item.name
      this.detailTexts.opinion = item.opinion
      console.log(this.detailTexts)
    },
    showForm2 (item, index) {
      this.showDetail = true
      console.log(this.showDetail)
      this.detailTexts.name = item.item.name
      this.detailTexts.opinion = item.item.opinion
      console.log(this.detailTexts)
    },

    checkRes (data) {
      this.axios.patch(process.env.VUE_APP_API + '/forms/edit/' + data.item._id, { isRes: !data.item.isRes })
        .then(res => {
          if (res.data.success) {
            this.$store.commit('checkRes', data.item._id)
            this.$root.$emit('bv::refresh::table', 'formstable')
          } else {
            alert('發生錯誤')
          }
        })
        .catch(err => {
          alert(err.response.data.message)
        })
      console.log(data.item._id)
    }
  }

}
</script>
