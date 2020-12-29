<template>
  <a-menu theme="dark" mode="inline" @click="clickMenu">
    <a-sub-menu>
      <template #title>
        <x-icon type="iconkid" />
        <span>教务管理</span>
      </template>
      <a-menu-item key="manage_lessonSchedule">全部课表</a-menu-item>
      <a-menu-item key="manage_demo">课程管理</a-menu-item>
      <a-menu-item key="manage_demo">排课管理</a-menu-item>
    </a-sub-menu>
    <a-sub-menu>
      <template #title>
        <x-icon type="iconkid" />
        <span>报名管理</span>
      </template>
      <a-menu-item key="manage_welcome">报名列表</a-menu-item>
      <a-menu-item key="manage_demo">退课管理</a-menu-item>
      <a-menu-item key="manage_demo">退费管理</a-menu-item>
    </a-sub-menu>
    <a-sub-menu>
      <template #title>
        <x-icon type="iconkid" />
        <span>数据统计</span>
      </template>
      <a-menu-item key="manage_welcome">报名统计</a-menu-item>
      <a-menu-item key="manage_demo">上课统计</a-menu-item>
    </a-sub-menu>
    <a-sub-menu>
      <template #title>
        <x-icon type="iconkid" />
        <span>网校设置</span>
      </template>
      <a-menu-item key="manage_welcome">权限设置</a-menu-item>
      <a-menu-item key="manage_demo">推送设置</a-menu-item>
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
