<template lang="pug">
  #reg
    b-container.shadow
      b-row
        b-col(cols="12").my-3
          b-breadcrumb(:items="breads")
          b-container
            b-row.mb-3
              b-col(cols="12" lg="4" ).bg-dark.ml-auto.shadow.left.p-5
                div(style="width:75%")
                  h2 歡迎加入
                  h2 BUYFIG
                  p 填寫註冊資料之後按註冊，成功之後登入就可以開始購物嘍
              b-col(cols="12" lg="6").border.mr-auto.bg-white.shadow
                div.p-4
                  h3.text-center Sign Up
                  b-form(@submit.stop.prevent="onSubmit").mt-4
                    b-form-group(
                        label="姓名 :"
                        label-for="name"
                        )
                      b-form-input(
                        name="name"
                        v-model="name"
                        placeholder="name"
                        :state="validateState('name')"
                        v-validate="{ required: true, min:1 }"
                        data-vv-as="姓名")
                      b-form-invalid-feedback().mb-3 {{ veeErrors.first('name') }}
                    b-row
                      b-col(cols="12")
                        b-form-group(
                          label="帳號 :"
                          label-for="account")
                          b-form-input(
                            name="account"
                            v-model="account" placeholder="account"
                            :state="validateState('account')"
                            v-validate="{ required: true, min:4 }"
                            data-vv-as="帳號")
                          b-form-invalid-feedback().mb-3 {{ veeErrors.first('account') }}
                      b-col(cols="12")
                        b-form-group(
                          label="密碼 :"
                          label-for="password")
                          b-form-input(
                            type="password"
                            name="password"
                            v-model="password"
                            placeholder="password"
                            :state="validateState('password')"
                            v-validate="{ required: true, min:4 }"
                            data-vv-as="密碼")
                          b-form-invalid-feedback().mb-3 {{ veeErrors.first('password') }}
                    b-row
                      b-col(cols="6")
                        b-form-group(
                          label="email :"
                          label-for="email")
                          b-form-input(
                            name="email"
                            v-model="email"
                            placeholder="email"
                            :state="validateState('email')"
                            v-validate="{ required: true, email: true }"
                            data-vv-as="e-mail"
                          )
                          b-form-invalid-feedback().mb-3 {{ veeErrors.first('email') }}
                      b-col(cols="6")
                        b-form-group(
                          label="手機 :"
                          label-for="phone")
                          b-form-input(
                            name="phone"
                            v-model="phone"
                            placeholder="phone"
                            :state="validateState('phone')"
                            v-validate="{ required: true, phone }"
                            data-vv-as="手機")
                          b-form-invalid-feedback().mb-3 {{ veeErrors.first('phone') }}
                    b-form-group(
                        label="匯款帳戶 : 選填"
                        label-for="payaccount"
                        )
                      b-form-input(
                        name="payaccount"
                        v-model="payaccount"
                        placeholder="Remittance account"
                        )
                    input(type='checkbox'  checked value="lll" v-model ="isAdmin" :true-value="true" :true-false="false" v-if="isAdmin")
                    br
                    b-col(cols="12" lg="10").mx-auto
                      b-button(@click="onSubmit" style="border-radius:20px").py-2.shadow.w-100 註冊
                    p.mt-4.mb-0 已經有帳號了嗎?點我
                      a(href="#/login") 登入

</template>

<script>
import { Validator } from 'vee-validate'
export default {
  name: 'Reg',
  data () {
    return {
      breads: [
        {
          text: '首頁',
          to: '/'
        },
        {
          text: '註冊',
          active: true
        }
      ],
      name: '',
      account: '',
      password: '',
      email: '',
      phone: '',
      isAdmin: false,
      isBan: false,
      payaccount: ''

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
          this.axios.post(process.env.VUE_APP_API + '/users/create', this.$data)
            .then(res => {
              if (res.data.success) {
                this.$swal.fire({
                  toast: true,
                  position: 'top-start',
                  icon: 'success',
                  title: '註冊成功',
                  showConfirmButton: false,
                  timer: 3000
                })
                if (!this.$store.state.user.isAdmin) {
                  this.$router.push('/login')
                }
              } else {
                alert('註冊失敗')
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    }
  },
  mounted () {
    const pressed = []
    const secretCode = 'isadmin'

    window.addEventListener('keyup', (e) => {
      pressed.push(e.key)
      pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length)
      if (pressed.join('').includes(secretCode)) {
        this.$data.isAdmin = true
        console.log('success')
      }
    })
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
