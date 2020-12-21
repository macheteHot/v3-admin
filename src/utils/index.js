import { isFunction, debounce, throttle } from 'lodash'
import { ref, reactive, readonly } from 'vue'
import moment from 'moment'

function initSession () {
  const obj = { ...sessionStorage }
  const sessionObj = reactive({})
  for (const k in obj) {
    if (Object.hasOwnProperty.call(obj, k)) {
      sessionObj[k] = JSON.parse(obj[k]).value
    }
  }
  return sessionObj
}

const session = initSession()

export class Utils {
  static sleep (time = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, time)
    })
  }

  static getServerDate () {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', '/', true)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 3) {
          resolve(Date(xhr.getResponseHeader('Date')))
        }
      }
      xhr.send(null)
    })
  }

  static GeneratorUuid () {
    let d = Date.now()
    if (performance !== undefined && isFunction(performance.now)) {
      d += performance.now()
    }
    return 'x' + 'xxxxxxxx-fxxx-wxxx-fxxx-exxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
  }

  static useSession () {
    function setSession (key, value) {
      session[key] = value
      sessionStorage.setItem(key, JSON.stringify({ value }))
    }
    function destroySession (...args) {
      args.forEach(key => {
        delete session[key]
        sessionStorage.removeItem(key)
      })
    }
    return {
      session: readonly(session),
      setSession,
      destroySession
    }
  }
}

export class DateUtils {
  /** 时间格式化 */

  /**
   * format Date return YYYY-MM-DD
   *@param {String|Number} time time or unixstamp
   * @return {String} YYYY-MM-DD
   */
  static YYYY_MM_DD (time = 0) {
    return moment(time).format('YYYY-MM-DD')
  }

  /**
   * format Date return YYYY-MM-DD HH:mm
   *@param {String|Number} time time or unixstamp
   * @return {String} YYYY-MM-DD HH:mm
   */
  static YYYY_MM_DD_HH_MM (time = 0) {
    return moment(time).format('YYYY-MM-DD HH:mm')
  }

  /**
   * format Date return YYYY-MM-DD hh:mm:ss
   *@param {String|Number} time time or unixstamp
   * @return {String} YYYY-MM-DD hh:mm:ss
   */
  static YYYY_MM_DD_HH_MM_SS (time = 0) {
    return moment(time).format('YYYY-MM-DD HH:mm:ss')
  }

  /**
   * format Date return HH:mm:ss
   *@param {String|Number} time time or unixstamp
   * @return {String} HH:mm:ss
   */
  static HH_MM_SS (time = 0) {
    return moment(time).format('HH:mm:ss')
  }

  /**
   * format Date<T> return return T default is YYYY-MM-DD HH:mm:ss
   * @param {String|Number} time time or unixstamp
   * @param {*} format formatString default is YYYY-MM-DD HH:mm:ss
   */
  static dateFormat (time, format = 'YYYY-MM-DD HH:mm:ss') {
    return moment(time).format(format)
  }
}

export class Swr {
  static useLoading (fn = Function.prototype) {
    const loading = ref(false)
    const moifyFn = async (...args) => {
      try {
        loading.value = true
        await fn(...args)
      } finally {
        loading.value = false
      }
    }
    return [loading, moifyFn]
  }

  static useDebounce (fn = Function.prototype, wait = 500, options = {}) {
    return debounce(fn, wait, options)
  }

  static useDebounceFnStart (fn = Function.prototype, wait = 500) {
    return debounce(fn, wait, { leading: true, trailing: false })
  }

  static useDebounceFnEnd (fn = Function.prototype, wait = 500) {
    return debounce(fn, wait, { leading: false, trailing: true })
  }

  static useThrottleFn (fn = Function.prototype, wait = 500, options = { trailing: true, leading: true }) {
    return throttle(fn, wait, options)
  }
}
