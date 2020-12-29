<template>
  <a-form-item v-bind="bindProps">
    <a-auto-complete
      :class="$attrs.class"
      style="width:277px"
      allow-clear
      :options="state.nameSearchSource"
      :value="props.modelValue"
      @focus="onSearchName"
      @search="onSearchName"
      @change="change"
    />
  </a-form-item>
</template>
<script setup>
import { reactive, defineProps, defineEmit, useContext } from 'vue'
import { Swr } from '@/utils'
import { omit } from 'lodash'

import getApis from '@/http/apis'
const { attrs } = useContext()
const apis = getApis()
const props = defineProps({
  modelValue: {
    type    : String,
    default : undefined
  }
})

const emit = defineEmit(['update:modelValue'])
const initState = () => ({ nameSearchSource: [] })
const state = reactive(initState())

function change (val) {
  emit('update:modelValue', val)
}

const onSearchName = Swr.useDebounceFnEnd(async () => {
  const res = await apis.courseSearch({ courseName: props.modelValue, pageSize: 10 })
  state.nameSearchSource = res?.map(_ => _.courseName) ?? []
})

const bindProps = { label: '课程名称', ...omit(attrs, ['class']) }
</script>
