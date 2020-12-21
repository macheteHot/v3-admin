import { isString } from 'lodash'
import { Swr } from '@/utils'
import { PriceReg, emailReg, PhoneReg, MobileReg, IDReg, PositiveIntReg, limtInputReg } from '@/utils/validate'
import { message, Modal } from 'ant-design-vue'
import { onMounted, reactive, readonly } from 'vue'

// 常见校验规则
export class AntdRules {
  static price = {
    pattern : PriceReg,
    message : '请输入正确的价格'
  }

  static email = {
    pattern : emailReg,
    message : '请输入正确的邮箱'
  }

  static phone = {
    pattern : PhoneReg,
    message : '请输入正确的手机号'
  }

  static id = {
    pattern : IDReg,
    message : '请输入正确的身份证号'
  }

  static mobile = {
    pattern : MobileReg,
    message : '请输入正确的座机号'
  }

  static positiveInt = {
    pattern : PositiveIntReg,
    message : '请输入正整数'
  }

  static minMax (min, max, message) {
    return {
      message: message ?? `请输入${min}到${max}个字符`,
      min,
      max
    }
  }

  static normalStr (min = 0, max = 9999, message) {
    return {
      pattern : limtInputReg(min, max),
      message : message ?? `请输入${min}到${max}个字符,包含汉字数字大小写字母下划线与分字符`
    }
  }

  static requireStr = (message, trigger = 'blur') => ({
    required: true,
    message,
    trigger
  })
}

/**
 * 返回一个 CreatedDecorator rules 中的配置项
 */

const debounceConfig = [1500, { leading: true, trailing: false }]
const debounceMsgSuccess = Swr.useDebounce(message.success, 1500, ...debounceConfig)
const debounceMsgWarning = Swr.useDebounce(message.warning, 1500, ...debounceConfig)
const debounceMsgError = Swr.useDebounce(message.error, 1500, ...debounceConfig)
export class AntdUtils {
  static SuccessMessage (msg) {
    debounceMsgSuccess(msg)
  }

  static WarningMessage (msg) {
    debounceMsgWarning(msg)
  }

  static ErrorMessage (msg) {
    debounceMsgError(msg)
  }

  static confirm (option) {
    const config = isString(option) ? { title: option } : option
    const merageConfig = {
      okType       : 'danger',
      maskClosable : false,
      ...config
    }
    return new Promise((resolve, reject) => {
      Modal.confirm({
        ...merageConfig,
        onOk     : () => { resolve() },
        onCancel : () => { reject(new Error('用户点击了取消')) }
      })
    })
  }
}

export class AntdSwr {
  static useTable ({ config = {}, pagination = {}, getDataFn = Function.prototype } = {}) {
    const baseConfig = {
      sortField        : null,
      sortType         : null,
      pageSizeOptions  : ['10', '20', '30', '40', '50'],
      current          : 1,
      pageSize         : 10,
      total            : 0,
      showSizeChanger  : true,
      showQuickJumper  : true,
      hideOnSinglePage : false,
      showTotal        : (total, range) => `共 ${total} 条记录 第 ${range[0]} -${range[1]} 条`
    }

    function change ({ current, pageSize }, filters = {}, { field = null, order = null } = {}) {
      const sortType = order?.slice(0, order.length - 3) ?? null
      const backOne = [
        tableState.pagination.pageSize !== pageSize,
        tableState.pagination.sortField !== field,
        tableState.pagination.sortType !== sortType
      ].some(_ => _)
      if (backOne) {
        tableState.pagination.current = 1
      } else {
        tableState.pagination.current = current
      }
      tableState.pagination.pageSize = pageSize
      tableState.pagination.sortField = field ?? null
      tableState.pagination.sortType = sortType
      getDataCallBack()
    }

    const tableState = reactive({
      loading    : false,
      dataSource : [],
      rowKey     : 'id',
      pagination : { ...baseConfig, ...pagination },
      onChange   : change
    })

    const {
      init = true,
      pageNum = 'pageNum',
      pageSize = 'pageSize',
      sortField = 'sortField',
      sortType = 'sortType'
    } = config

    async function getDataCallBack () {
      tableState.loading = true
      try {
        await getDataFn({
          [pageNum]   : tableState.pagination.current,
          [pageSize]  : tableState.pagination.pageSize,
          [sortField] : tableState.pagination.sortField ?? null,
          [sortType]  : tableState.pagination.sortType ?? null
        })
      } catch (error) {
        globalError(error)
      } finally {
        tableState.loading = false
      }
    }

    onMounted(() => {
      if (init) {
        getDataCallBack()
      }
    })

    function setPageSize (num) {
      tableState.pagination.pageSize = num
      getDataCallBack()
    }
    function searchTable () {
      setPageSize(1)
    }

    function resetTable () {
      tableState.pagination.current = 1
      tableState.pagination.pageSize = pagination?.pageSize ?? baseConfig.pageSize ?? 10
      getDataCallBack()
    }

    function setTableSource (val) {
      tableState.dataSource = val
    }
    function setTableTotal (total) {
      tableState.pagination.total = total
    }

    function setSourceAndTotal (source, total) {
      setTableSource(source)
      setTableTotal(total)
    }

    return {
      setPageSize,
      searchTable,
      resetTable,
      setTableSource,
      setTableTotal,
      setSourceAndTotal,
      tableState: readonly(tableState)
    }
  }
}
