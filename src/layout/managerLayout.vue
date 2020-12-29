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
        <MenuUnfoldOutlined
          v-if="collapsed"
          class="fs-18 p-x-24 cursor-pointer hover:c-#0089ff"
          @click="toggleCollapsed"
        />
        <MenuFoldOutlined
          v-else
          class="fs-18 p-x-24 cursor-pointer hover:c-#0089ff"
          @click="toggleCollapsed"
        />
      </a-layout-header>
      <a-layout-content class="p-24">
        <div ref="contentRef" class="bg-#fff h-100p">
          <div class="p-y-24 p-x-32">
            <router-view :key="$route.path" />
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import SiderMenu from '@/components/SiderMenu.vue'
import { AntdUtils } from '@/utils/antdvUtils'
import { Swr } from '@/utils'

import func from 'lodash/fp/stubFalse'
defineComponent(MenuFoldOutlined)
defineComponent(MenuUnfoldOutlined)
defineComponent(SiderMenu)

const contentRef = ref(null)

const setContentHeight = Swr.useThrottleFn(() => {
  AntdUtils.setContentRefHeight(contentRef.value.offsetHeight)
}, 100)

onMounted(() => {
  window.requestAnimationFrame(() => {
    setContentHeight()
  })
  window.addEventListener('resize', setContentHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', setContentHeight)
})

const collapsed = ref(false)
function toggleCollapsed () {
  collapsed.value = !collapsed.value
}
</script>
