<script>
import { getDictItem } from '@/dicts'

export default {
  name  : 'SelectGradeLevel',
  model : {
    prop  : 'value',
    event : 'change'
  },
  props: {
    value: {
      type    : String,
      default : undefined
    },
    periodType: {
      type    : String,
      default : undefined
    }
  },
  data () {
    return {
      options: []
    }
  },
  watch: {
    periodType (val) {
      if (val) {
        this.$emit('change', undefined)
        this.options = Object.entries(getDictItem('gradeLevel', val)).map(([value, label]) => ({ value, label }))
      } else {
        this.$emit('change', undefined)
        this.options = []
      }
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
    const props = { label: '年级', ...this.$attrs }
    return (
      <a-form-model-item on={on} props={props}>
        <a-select
          style="width:104px;"
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
