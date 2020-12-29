<script setup>
export default {
  name  : 'SelectClass',
  model : {
    prop  : 'value',
    event : 'change'
  },
  props: {
    value: {
      type    : String,
      default : undefined
    },
    schoolCorpId: {
      type    : String,
      default : undefined
    },
    gradeLevel: {
      type    : String,
      default : undefined
    },
    periodType: {
      type    : String,
      default : undefined
    }
  },
  emits: ['change'],
  data () {
    return {
      options: []
    }
  },
  watch: {
    schoolCorpId () {
      this.getOptions()
      this.$emit('change', undefined)
    },
    periodType () {
      this.options = []
      this.$emit('change', undefined)
    },
    gradeLevel () {
      this.getOptions()
      this.$emit('change', undefined)
    }
  },
  created () {
  },
  methods: {
    async getOptions () {
      if (this.schoolCorpId === '' || !this.schoolCorpId) {
        return null
      }
      const list = await this.$apis.classList({
        periodType   : this.periodType,
        gradeLevel   : this.gradeLevel,
        schoolCorpId : this.schoolCorpId,
        pageSize     : 99999
      }) ?? []
      this.options = list.map((cv) => ({ value: cv.classId, label: cv.className }))
    }
  },
  render () {
    const on = { ...this.$listeners }
    const props = { label: '班级', ...this.$attrs }
    return (
      <a-form-model-item on={on} props={props}>
        <a-select
          options={this.options}
          value={this.value}
          style="width:277px;"
          onChange={(val) => { this.$emit('change', val, this.options) }}
        />
      </a-form-model-item>
    )
  }
}
</script>
<style scoped lang="less">
</style>
