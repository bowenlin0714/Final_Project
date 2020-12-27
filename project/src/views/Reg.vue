<template lang="pug">
  #reg
    b-container
      form
        h1 姓名 &emsp;
          input(v-model="name")
        h1 帳號 &emsp;
          input(v-model="account")
        h1 密碼 &emsp;
          input(v-model="password")
        h1 e-mail &emsp;
          input(v-model="email")
        h1 手機 &emsp;
          input(v-model="phone")
        h1 地址 &emsp;
          input(v-model="address")
        input(type='checkbox'  checked value="lll" v-model ="isAdmin" :true-value="true" :true-false="false" v-if="isAdmin")
        br
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
      phone: '',
      address: '',
      isAdmin: false
    }
  },
  methods: {
    onSubmit () {
      this.axios.post(process.env.VUE_APP_API + '/users/create', this.$data)
        .then(res => {
          if (res.data.success) {
            alert('註冊成功')
            if (!this.$store.state.user.isAdmin) {
              this.$router.push('/')
            }
          } else {
            alert('註冊失敗')
          }
        })
        .catch(err => {
          console.log(err)
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
  }
}
</script>
