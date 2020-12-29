<template>
  <a-form layout="inline">
    <a-form-item>
      {{ formState }}
      <SearchCourseName v-model="formState.courseName" />
      <a-button type="primary" class="m-r-8" @click="submit">校验</a-button>
      <a-button type="primary" @click="reset">重置</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup>
import { defineComponent, reactive } from 'vue'
import SearchCourseName from '@/components/searchForm/SearchCourseName'
defineComponent(SearchCourseName)
const initFormData = () => ({ courseName: '' })
const formState = reactive(initFormData())

function submit () {

}
function reset () {
  Object.assign(formState, initFormData())
}
</script>
<style scoped lang="lett">
</style>
