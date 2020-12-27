<template lang="pug">
  #login
    b-container().shadow
      b-row
        b-col(cols="12")
          b-breadcrumb(:items="breads")

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
          text: '購物車',
          active: true
        }
      ]

    }
  }

}

</script>
