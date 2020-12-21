<template>
  <div>{{ msg }}</div>
</template>
<script setup>

import { ref } from 'vue'
const msg = ref('hello')
msg.value = 'world'

</script>
<style scoped lang="less">
</style>
