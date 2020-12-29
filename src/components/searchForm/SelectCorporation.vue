<script>
export default {
  name  : 'SelectCorporation',
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
      options: []
    }
  },
  created () {
    this.getOptions()
  },
  methods: {
    async getOptions () {
      const list = await this.$apis.corporationList({ pageSize: 99999 }) ?? []
      this.options = list.map((cv) => ({ value: cv.id, label: cv.corpName }))
    }
  },
  render () {
    // 对change 事件进行覆盖
    const on = { ...this.$listeners }
    // 引入未覆盖的属性 留作扩展
    const props = { label: '发布学校', ...this.$attrs }
    return (
      <a-form-model-item on={on} props={props}>
        <a-select
          style="width:277px"
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
