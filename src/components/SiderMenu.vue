<template>
  <a-menu theme="dark" mode="inline" @click="clickMenu">
    <a-sub-menu>
      <template #title>
        <x-icon type="iconkid" />
        <span>全屏layout</span>
      </template>
      <a-menu-item key="base_demo">base_demo</a-menu-item>
    </a-sub-menu>
    <a-sub-menu>
      <template #title>
        <x-icon type="iconkid" />
        <span>管理平台layout</span>
      </template>
      <a-menu-item key="manage_welcome">manage_welcome</a-menu-item>
      <a-menu-item key="manage_demo">manage_demo</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

function clickMenu ({ key }) {
  if (key === router.currentRoute.value.name) {
    throw new Error('you\'r in current path now')
  }
  if (!router.hasRoute(key)) {
    throw new Error(`path nonexistent ---> router name is ${key}`)
  }
  router.push({ name: key })
}

</script>
<style scoped lang="less">
</style>
