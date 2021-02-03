<template lang="pug">
  #contact
    b-container(style="min-height:70vh").shadow
      b-breadcrumb.mt-2
        b-breadcrumb-item(to="/") 首頁
        b-breadcrumb-item(active) 聯絡我們
      b-row
        b-col(cols="12" lg="6").bg-white.rounded.mx-auto.mb-5.p-5.shadow
          b-form(@submit.stop.prevent="onSubmit")
            h2.text-center.contactus.position-relative Contact us
            b-form-group(label="姓名 :" label-for="name")
              b-form-input(
                name="name"
                v-model="name"
                placeholder="name"
                :state="validateState('name')"
                v-validate="{ required: true }"
                data-vv-as="姓名 :")
              b-form-invalid-feedback() {{ veeErrors.first('name') }}
            b-form-group(label="e-mail :" label-for="email")
              b-form-input(
                name="email"
                v-model="email"
                placeholder="e-mail"
                :state="validateState('email')"
                v-validate="{ required: true, email: true }"
                data-vv-as="e-mail"
              )
              b-form-invalid-feedback().mb-3 {{ veeErrors.first('email') }}
            b-form-group(label="手機 :" label-for="phone")
              b-form-input(
                name="phone"
                v-model="phone"
                placeholder="phone"
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
              b-button(@click="onSubmit" ).w-100.shadow.mt-3.py-2 送出
</template>

<script>
import { Validator } from 'vee-validate'

export default {
  nane: 'Contact',
  data () {
    return {
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
      this.$validator.validateAll().then(result => {
        if (!result) {
        } else {
          var date = new Date()
          var year = date.getFullYear()
          var month = date.getMonth() - 1
          var day = date.getDate()
          this.date = year + '/' + month + '/' + day
          this.axios.post(process.env.VUE_APP_API + '/forms/create', this.$data)
            .then(res => {
              if (res.data.success) {
                this.$swal.fire({
                  toast: true,
                  position: 'bottom-start',
                  padding: '1rem',
                  icon: 'success',
                  title: '送出成功!! 我們會盡快跟您聯絡',
                  showConfirmButton: false,
                  timer: 3000
                })
                this.$router.push('/')
              } else {
                alert('送出失敗')
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
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
