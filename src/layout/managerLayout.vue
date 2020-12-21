<template>
  <a-layout class="h-100vh">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div v-if="!collapsed" class="logo bg-red m-16 h-32">
        <p class="lh-32 text-center text-fff fs-24">此处是logo</p>
      </div>
      <sider-menu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="bg-fff p-0">
        <MenuUnfoldOutlined v-if="collapsed" class="fs-18 p-x-24 cursor-pointer hover:c-#0089ff" @click="toggleCollapsed" />
        <MenuFoldOutlined v-else class="fs-18 p-x-24 cursor-pointer hover:c-#0089ff" @click="toggleCollapsed" />
      </a-layout-header>
      <a-layout-content>
        <div :class="$route.meta.full === true ? '' : 'p-24'" class="h-100p">
          <router-view :key="$route.path" />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import SiderMenu from '@/components/SiderMenu.vue'

import { defineComponent, ref } from 'vue'
defineComponent(MenuFoldOutlined)
defineComponent(MenuUnfoldOutlined)
defineComponent(SiderMenu)

const collapsed = ref(false)
function toggleCollapsed () {
  collapsed.value = !collapsed.value
}
</script>
