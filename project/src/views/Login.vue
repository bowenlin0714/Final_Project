<template lang="pug">
  #login
    b-container().shadow
      b-row
        b-col(cols="12")
          b-breadcrumb(:items="breads")
          b-container()
            b-row.pb-5
              b-col(cols="12" lg="5" class="logleft").border.ml-auto.rounded-left.p-5
                div.text-center
                  font-awesome-icon(:icon="['fas','user-astronaut']").text-black
                b-form(@submit="onSubmit")
                  b-form-group(
                    id="input-group-1"
                    label="帳號 :"
                    label-for="input-1"
                    description=""
                  )
                    b-form-input(
                      id="input-1"
                      v-model="account"
                      type="email"
                      required
                      placeholder="請輸入帳號"
                    )
                  b-form-group(
                    id="input-group-2"
                    label="密碼 :"
                    label-for="input-1"
                    description=""
                  )
                    b-form-input(
                      id="input-2"
                      v-model="password"
                      type="password"
                      required
                      placeholder="請輸入密碼"
                    )
                  b-row
                    b-col(cols="6")
                      span 還沒有帳號嗎?點我註冊
                    b-col(cols="6")
                      button(@click="onSubmit").rounded.w-100.mr-0 登入
              b-col(cols="12" lg="5" class="logright").border.mr-auto.rounded-right
                div.text-white
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
    onSubmit () {
      this.axios.post(process.env.VUE_APP_API + '/users/login', this.$data)
        .then(res => {
          if (res.data.success) {
            this.$store.commit('login', res.data.result)
            alert('登入成功')
            if (res.data.result.isAdmin) {
              this.$router.push('/admin')
            } else {
              this.$router.push('/')
            }
          } else {
            alert('登入失敗')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}

</script>

<style lang="stylus">

</style>
