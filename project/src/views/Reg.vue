<template lang="pug">
  #reg
    b-container
      form
        h1 稱謂/公司行號 &emsp;
          input(v-model="name")
        h1 帳號 &emsp;
          input(v-model="account")
        h1 密碼 &emsp;
          input(v-model="password")
        h1 e-mail &emsp;
          input(v-model="email")
        h1 手機 &emsp;
          input(v-model="phone")
        button(@click="onSubmit") 送出

</template>

<script>
export default {
  name: 'Reg',
  data () {
    return {
      name: '',
      account: '',
      password: '',
      email: '',
      phone: ''
    }
  },
  methods: {
    onSubmit () {
      this.axios.post(process.env.VUE_APP_API + '/users/create', this.$data)
        .then(res => {
          if (res.data.success) {
            alert('註冊成功')
          } else {
            alert('註冊失敗')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
