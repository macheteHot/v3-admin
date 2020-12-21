<script>
import { createFromIconfontCN } from '@ant-design/icons-vue'
import { ICON_URL } from '@/constants'
export default {
  name: 'XIcon',
  render () {
    const IconFont = createFromIconfontCN({ scriptUrl: ICON_URL })
    return (
      <IconFont props={this.$attrs} />
    )
  }
}
</script>
