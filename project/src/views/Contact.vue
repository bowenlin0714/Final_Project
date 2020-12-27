<template lang="pug">
  #contact
    b-container
      b-row
        b-col(cols="12")
          form
            h1 姓名 &emsp;
              input(v-model="name")
            h1 e-mail &emsp;
              input(v-model="email")
            h1 手機 &emsp;
              input(v-model="phone")
            h1 建議與回饋 &emsp;
              textarea(v-model="opinion")

            button(@click="onSubmit") 送出
</template>

<script>
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
  }
}
</script>
