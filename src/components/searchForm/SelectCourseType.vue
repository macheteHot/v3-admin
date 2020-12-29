<script>
import { getDictListUseSelect } from '@/dicts'

export default {
  name  : 'SelectCourseType',
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
      options: getDictListUseSelect('courseType')
    }
  },
  watch: {
  },
  methods: {
  },
  render () {
    // 对change 事件进行覆盖
    const on = { ...this.$listeners }
    // 引入未覆盖的属性 留作扩展
    const props = { label: '课程类型', ...this.$attrs }
    return (
      <a-form-model-item on={on} props={props}>
        <a-select
          style="width:94px"
          options={this.options}
          value={this.value}
          allowClear={true}
          onChange={(val) => { this.$emit('change', val, this.options) }}
        />
      </a-form-model-item>
    )
  }
}
</script>
<style scoped lang="less">
</style>
