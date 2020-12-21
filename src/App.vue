<template>
  <div id="app">
    <a-config-provider :locale="config.locale">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { reactive } from 'vue'
const config = reactive({ locale: zhCN })

</script>
<style lang="less">

</style>
