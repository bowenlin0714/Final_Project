<template lang="pug">
  #login
    b-container(style="min-height:70vh").shadow
      b-row
        b-col(cols="12")
          b-breadcrumb(:items="breads").mt-2
          b-container()
            b-row.my-5
              b-col(cols="12" lg="5" class="logleft").border.ml-auto.rounded-left.bg-white.shadow
                div.text-center
                  font-awesome-icon(:icon="['fas','user-astronaut']").text-black
                b-form(@submit.stop.prevent="onSubmit")
                  b-form-group(
                    label="帳號 :"
                    label-for="account"
                  )
                    b-form-input(
                      name="account"
                      v-model="account"
                      placeholder="account"
                      :state="validateState('account')"
                      v-validate="{ required: true }"
                      data-vv-as="帳號")
                    b-form-invalid-feedback() {{ veeErrors.first('account') }}
                  b-form-group(
                    label="密碼 :"
                    label-for="password"
                  )
                    b-form-input(
                      type="password"
                      name="password"
                      v-model="password"
                      placeholder="password"
                      :state="validateState('password')"
                      v-validate="{ required: true }"
                      data-vv-as="密碼"
                    )
                    b-form-invalid-feedback().mb-3 {{ veeErrors.first('password') }}
                  b-form-checkbox.my-3 記住我
                  b-row
                    b-col(cols="12")
                      button(@click.stop.prevent="onSubmit").w-100.py-2.shadow-sm 登入
                    b-col(cols="12")
                      p.mt-4.mb-0 還沒有帳號嗎?點我
                        a(href="#/reg") 註冊
              b-col(cols="12" lg="5" class="logright").border.mr-auto.rounded-right.shadow.py-2
                div.text-white.text-center
                  h1 Welcome
                  h1 Back!!

</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      breads: [
        {
          text: '首頁',
          to: '/'
        },
        {
          text: '登入',
          active: true
        }
      ],
      account: '',
      password: ''
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
          this.axios.post(process.env.VUE_APP_API + '/users/login', this.$data)
            .then(res => {
              if (res.data.success) {
                this.$swal.fire({
                  toast: true,
                  position: 'bottom-start',
                  padding: '1rem',
                  icon: 'success',
                  title: '登入成功',
                  showConfirmButton: false,
                  timer: 3000
                })
                this.$store.commit('login', res.data.result)
                if (res.data.result.isAdmin) {
                  this.$router.push('/admin')
                } else {
                  this.$router.push('/')
                }
              } else {
                this.$swal.fire({
                  toast: true,
                  position: 'bottom-start',
                  padding: '1rem',
                  icon: 'warning',
                  title: '登入失敗',
                  showConfirmButton: false,
                  timer: 3000
                })
              }
            })
            .catch(err => {
              this.$swal.fire({
                toast: true,
                position: 'bottom-start',
                padding: '1rem',
                icon: 'warning',
                title: '帳號或密碼錯誤',
                showConfirmButton: false,
                timer: 3000
              })
              console.log(err)
            })
        }
      })
    }

  }
}

</script>

<style lang="stylus">
</style>
