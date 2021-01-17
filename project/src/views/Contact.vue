<template lang="pug">
  #contact
    b-container(style="min-height:70vh").shadow
      b-breadcrumb(:items="breads")
      b-row
        b-col(cols="12" lg="6").bg-white.rounded.mx-auto.mb-3.p-5.shadow
          b-form
            h3.text-center.contactus.position-relative Contact us
            b-form-group(label="姓名 :" label-for="name")
              b-form-input(
                name="name"
                v-model="name"
                placeholder="請輸入"
                :state="validateState('name')"
                v-validate="{ required: true }"
                data-vv-as="姓名 :")
              b-form-invalid-feedback() {{ veeErrors.first('name') }}
            b-form-group(label="e-mail :" label-for="email")
              b-form-input(
                name="email"
                v-model="email"
                placeholder="請輸入"
                :state="validateState('email')"
                v-validate="{ required: true, email: true }"
                data-vv-as="e-mail"
              )
              b-form-invalid-feedback().mb-3 {{ veeErrors.first('email') }}
            b-form-group(label="手機 :" label-for="phone")
              b-form-input(
                name="phone"
                v-model="phone"
                placeholder="請輸入"
                :state="validateState('phone')"
                v-validate="{ required: true, phone }"
                data-vv-as="手機")
              b-form-invalid-feedback().mb-3 {{ veeErrors.first('phone') }}
            b-form-group(label="建議與回饋 :" label-for="opinion")
              b-form-textarea(
                rows="6"
                name="opinion"
                v-model="opinion"
                placeholder=""
                :state="validateState('opinion')"
                v-validate="{ required: true}"
                data-vv-as="建議與回饋")
              b-form-invalid-feedback().mb-3 {{ veeErrors.first('opinion') }}
            b-col(cols="10").mx-auto
              b-button(@click="onSubmit" ).w-100.shadow-sm.mt-3.py-2 送出
</template>

<script>
import { Validator } from 'vee-validate'

export default {
  nane: 'Contact',
  data () {
    return {
      breads: [
        {
          text: '首頁',
          to: '/'
        },
        {
          text: '聯絡我們',
          active: true
        }
      ],
      name: '',
      phone: '',
      email: '',
      opinion: '',
      isRes: false,
      date: ''
    }
  },
  methods: {
    validateState (ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref)
      }
      return null
    },
    onSubmit () {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth()
      var day = date.getDate()
      this.date = year + '/' + month + '/' + day
      console.log(this.date)
      this.axios.post(process.env.VUE_APP_API + '/forms/create', this.$data)
        .then(res => {
          if (res.data.success) {
            alert('送出成功')
            if (!this.$store.state.user.isAdmin) {
              this.$router.push('/')
            }
          } else {
            alert('送出失敗')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    Validator.extend('phone', {
      messages: {
        zhTW: field => field + '手機格式不符'
      },
      validate: value => {
        return value.length === 10 && /^09[0-9]{8}$/.test(value)
      }
    })
  }
}
</script>
