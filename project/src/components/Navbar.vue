<template lang="pug">
  #navbar
    b-navbar(toggleable='lg' type='dark' variant='success')
      b-container
        b-navbar-brand(to='/') 大北化工
        b-navbar-toggle(target='nav-collapse')
        b-collapse#nav-collapse(is-nav)
          b-navbar-nav.ml-auto
            b-nav-item(v-if="user.id.length === 0" to="/login") 登入
            b-nav-item(v-if="user.id.length === 0" to="/reg") 註冊
            b-nav-item(v-if="isAdmin" to="/admin") 管理者頁面
            b-nav-item(v-if="user.id.length > 0" @click = "logout") 登出
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
