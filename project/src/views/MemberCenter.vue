<template lang="pug">
  #membercenter
    b-container.shadow
      b-row
        b-breadcrumb(:items="breads")

        b-col(cols="12")
          p 會員名稱: {{user.name}}
          p 會員帳號: {{user.account}}
          p 會員密碼: {{user.phone}}
          p 會員名稱: {{user.email}}
          p 會員地址: {{user.address}}
          p 我的訂單: {{user.orders}}

</template>

<script>
export default {
  name: 'MemberCenter',
  data () {
    return {
      breads: [
        {
          text: '首頁',
          to: '/'
        },
        {
          text: '會員中心',
          active: true
        }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>
