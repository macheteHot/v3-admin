<template>
  <a-form layout="inline">
    <a-form-item label="邮箱" v-bind="validateInfos.email">
      <a-input v-model:value="formData.email" />
    </a-form-item>
    <a-form-item label="价格" v-bind="validateInfos.price">
      <a-input v-model:value="formData.price" />
    </a-form-item>
    <a-form-item label="身份证号" v-bind="validateInfos.id">
      <a-input v-model:value="formData.id" />
    </a-form-item>
    <a-form-item label="手机号" v-bind="validateInfos.phone">
      <a-input v-model:value="formData.phone" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" class="m-r-8" @click="submit">校验</a-button>
      <a-button type="primary" @click="reset">重置</a-button>
    </a-form-item>
  </a-form>
  <a-table
    class="m-t-16 flex-1"
    :columns="columns"
    v-bind="tableState"
    :scroll="tableState.scroll"
  />
</template>
<script setup>
import { Utils } from '@/utils'
import { AntdRules, AntdSwr, AntdUtils } from '@/utils/antdvUtils'
import { reactive } from 'vue'
import { uniqueId } from 'lodash'
import { useForm } from '@ant-design-vue/use'

// about Form

const formData = reactive({
  email : '',
  price : '',
  id    : '',
  phone : ''
})

const formRules = reactive({
  email : [AntdRules.requireStr('请输入邮箱'), AntdRules.email, AntdRules.minMax(10, 50, '请输入10到50个字符')],
  price : [AntdRules.requireStr('请输入价格'), AntdRules.price],
  id    : [AntdRules.requireStr('请输入身份证'), AntdRules.id],
  phone : [AntdRules.requireStr('请输入手机号'), AntdRules.phone]
})

const { resetFields, validate, validateInfos } = useForm(formData, formRules)

async function submit () {
  await validate()
  console.log({ ...formData }, 'validate Success')
}

// about Table
const mockFormData = reactive({ name: 1, sex: 2, age: 3 })

async function mockApi (obj) {
  const { pageSize } = obj
  await Utils.sleep(500)
  const list = Array(pageSize).fill('').map(() => ({
    id       : uniqueId('id'),
    name     : `${uniqueId('name')}`,
    balabala : `${uniqueId('balabala')}`
  }))
  return { data: list, total: 800 }
}

const columns = [
  { title: '1111', key: 'id', dataIndex: 'id', sorter: true },
  // { title: 'name', dataIndex: 'name' },
  { title: 'balabala', dataIndex: 'balabala' }
]
async function getTableData (pageValObj) {
  const { data, total } = await mockApi({ ...pageValObj, ...mockFormData })
  console.log(pageValObj)
  setSourceAndTotal(data, total)
}
const { setSourceAndTotal, tableState, searchTable } = AntdSwr.useTable(getTableData, 230)

async function reset () {
  resetFields()
  setSourceAndTotal([], 0)
}

</script>
<style scoped lang="less">
</style>
