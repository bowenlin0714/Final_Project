<template lang="pug">
  #login
    b-container().shadow
      b-row
        b-col(cols="12")
          b-breadcrumb(:items="breads")
          form
            h1 帳號 &emsp;
              input(v-model="account")
            h1 密碼 &emsp;
              input(v-model="password")
            button(@click="onSubmit") 登入
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
