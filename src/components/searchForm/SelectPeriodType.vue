<script>
import { getDictListUseSelect } from '@/dicts'

export default {
  name  : 'SelectPeriodType',
  model : {
    prop  : 'value',
    event : 'change'
  },
  props: {
    value: {
      type    : String,
      default : undefined
    }
  },
  data () {
    return {
      options: getDictListUseSelect('periodType')
    }
  },
  created () {
  },
  methods: {
  },
  render () {
    // 对change 事件进行覆盖
    const on = { ...this.$listeners }
    // 引入未覆盖的属性 留作扩展
    const props = { label: '学段', ...this.$attrs }
    return (
      <a-form-model-item on={on} props={props}>
        <a-select
          style="width:104px"
          allowClear={true}
          options={this.options}
          value={this.value}
          onChange={(val) => { this.$emit('change', val, this.options) }}
        />
      </a-form-model-item>
    )
  }
}
</script>
<style scoped lang="less">
</style>
