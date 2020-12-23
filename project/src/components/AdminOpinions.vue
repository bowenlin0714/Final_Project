<template lang="pug">
  #adminopinions
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
            type="text"
            placeholder="Type to Search"
            v-model="keyword"
          )
        b-col(cols='12' class="")
          b-table(
            class=""
            stacked="md"
            id="formstable"
            class="mx-auto"
            :items='formlists'
            :fields='fields'
            :current-page="currentPage"
            :per-page="perPage"
            striped=true
            @row-clicked="(item, index) => showForm1( item, index)"
            row-contextmenu
            v-b-modal.modal-1
            )
            template(#cell(opinion)='data')
              b-button(variant="info" @click.stop="showForm2(data, data.index)" v-b-modal.modal-1) 完整訊息
            template(#cell(isRes)='data')
              b-button(style="border-style:none;" @click.stop="checkRes(data, data.index)").bg-transparent.border-none
                font-awesome-icon(v-if="data.item.isRes" :icon=['fas', 'check'] ).text-success
                font-awesome-icon(v-else :icon=['fas', 'times'] ).text-danger
            template(#cell(delete)='data')
              b-button(variant="danger" @click.stop="delforms(data, data.index)") 刪除
        b-modal(id="modal-1" :title="detailTexts.name")
          p.text-break {{detailTexts.opinion}}

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
      keyword: '',
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
          label: '日期'
        },
        {
          key: 'name',
          label: '姓名'
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
          label: '已回覆'
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
    delforms (data, index) {
      console.log(data)
      this.axios.delete(process.env.VUE_APP_API + '/forms/del/' + data.item._id)
        .then(res => {
          if (res.data.success) {
            this.$store.commit('delforms', index)
          } else {
            alert('發生錯誤')
          }
        })
        .catch(err => {
          alert(err.response.data.message)
        })
      console.log(data.item._id, index)
    },
    checkRes (data, index) {
      this.axios.patch(process.env.VUE_APP_API + '/forms/edit/' + data.item._id, data)
        .then(res => {
          if (res.data.success) {
            this.$store.commit('checkRes', index)
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
