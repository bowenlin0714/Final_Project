<template lang="pug">
  #adminbanners
    b-container
      h1(class="my-3 mb-2") 輪播圖管理
      cols(col="12")
        b-table(
          :fields='fields'
        )

</template>

<script>

export default {
  name: 'AdminBanners',
  data () {
    return {
      fields: [
        {
          key: 'name',
          label: '名稱'
        },
        {
          key: 'edit',
          label: '編輯'
        }
      ]
    }
  }

}
</script>
