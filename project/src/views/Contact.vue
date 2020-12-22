<template lang="pug">
  #contact
    b-container
      form
        h1 姓名 &emsp;
          input(v-model="name")
        h1 e-mail &emsp;
          input(v-model="email")
        h1 手機 &emsp;
          input(v-model="phone")
        h1 意見與回饋 &emsp;
          textarea(v-model="opinion")
        br
        button(@click="onSubmit") 送出
        button 重置
</template>
<script>
export default {
  name: 'Contact',
  data () {
    return {
      name: '',
      email: '',
      phone: '',
      opinion: '',
      date: null,
      isRes: false
    }
  },
  methods: {
    onSubmit () {
      var now = new Date()
      var year = now.getFullYear()
      var month = now.getMonth()
      var day = now.getDate()
      this.$data.date = `${year}/${month}/${day}`
      console.log(this.$data.date)
      this.axios.post(process.env.VUE_APP_API + '/forms/create', this.$data)
        .then(res => {
          if (res.data.success) {
            alert('送出成功')
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
