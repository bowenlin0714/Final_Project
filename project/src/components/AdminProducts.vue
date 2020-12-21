<template lang="pug">
  #adminproducts
    h1 商品管理
</template>

<script>

export default {
  name: 'AdminProducts',
  mounted: {

  },
  created () {
    this.axios.get('http://data.taipei/youbike').then((response) => {
      console.log(response.data)
    })
  }

}
</script>
