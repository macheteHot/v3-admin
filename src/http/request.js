import axios from 'axios'
import { Utils } from '@/utils'
import { ErrorMessage } from '@/utils/antdvUtils'
import jsFileDownload from 'js-file-download'
import Qs from 'qs'
import { SESSIONID, BACK_ROUTE } from '@/constants'
import { Modal } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const { session, destroySession, setSession } = Utils.useSession()
// 此函数 返回 将会把返回数据放到所有接口中! 适用于对所有请求添加同样参数的情况
const getAllData = () => ({ })

// 不走lodash cloneDeep 调用toJSON 以使响应式对象序列化
const JSONClone = obj => JSON.parse(JSON.stringify(obj))

function reLogin () {
  Modal.confirm({
    title   : '未登录',
    icon    : 'info-circle',
    content : '登录已过期，是否重新登录?',
    onOk () {
      Modal.destroyAll()
      destroySession(SESSIONID)
      const { hash, name, path, params, query } = route
      setSession(BACK_ROUTE, { hash, name, path, params, query })
      router.push({ name: 'login' })
    },
    onCancel () {
      Modal.destroyAll()
    }
  })
}

// http 说明表
const ERROR_MSG = {
  400 : '请求错误(400)',
  401 : '未授权，请重新登录(401)',
  403 : '拒绝访问(403)',
  404 : '请求出错(404)',
  408 : '请求超时(408)',
  429 : '系统繁忙，请稍后重试(429)',
  502 : '网络错误(502)',
  503 : '服务不可用(503)',
  504 : '网络超时(504)'
}

const http = axios.create({
  // 不使用baseUrl 以适应各种部署情况
  // timeout: 5000 不超时
})

http.interceptors.request.use(
  config => {
    const sessionid = session[SESSIONID]
    if (sessionid) config.headers[SESSIONID] = sessionid
    return config
  },
  error => {
    throw new Error(JSON.stringify(error))
  }
)

http.interceptors.response.use(
  response => {
    const res = response.data
    if (!res.success) { // 逻辑错误 自定义错误码
      if (res.errorMsg) {
        ErrorMessage(res.errorMsg)
      }
      globalError('接口调用失败')
      switch (res.errorCode) {
        case 401:
        case '401':
          reLogin()
          throw new Error('no login')
        default:
          break
      }
      throw new Error(JSON.stringify(res))
    }
    return res.data
  },
  error => {
    // http error
    globalError(new Date(), 'err' + error) // for debug
    const status = error?.response?.status ?? 'unKnow'
    ErrorMessage(status ? ERROR_MSG[status] ?? `连接出错(${status})!` : '未知错误!')
    throw new Error(JSON.stringify(error))
  }
)
// get 方法 也调用一次 toJSON
export const get = url => {
  return (params = {}) => {
    return http.get(url, { params: JSONClone({ ...params, ...getAllData() }), paramsSerializer: x => Qs.stringify(x, { arrayFormat: 'repeat' }) })
  }
}
// post JSON 默认调用 toJSON
export const post = url => {
  return (data = {}) => {
    return http.post(url, { ...data, ...getAllData() })
  }
}
// post 表单 手动 toJSON
export const form = url => {
  return (data = {}) => {
    // 达到和直接post json 一样的效果 先调用 toJSON
    return http.post(url, Qs.stringify(JSONClone({ ...data, ...getAllData() }), { arrayFormat: 'repeat' }))
  }
}
// temp post 但是拼接URL 临时使用

export const temp = url => {
  return (params = {}) => {
    return http.post(url, {}, { params: JSONClone({ ...params, ...getAllData() }) })
  }
}

// post 二进制文件
export const binary = url => {
  return (objOrFile, cbProgress = Function.prototype) => {
    const postForm = new FormData()
    if (Object.prototype.toString.call(objOrFile) === '[object Object]') { // 是对象 就序列化
      for (const key in objOrFile) {
        if (Object.prototype.hasOwnProperty.call(objOrFile, key)) {
          postForm.append(key, objOrFile[key])
        }
      }
    } else { // 是文件就添加file头
      postForm.append('file', objOrFile) // 自定义名称
    }
    const allDataObj = getAllData()
    Object.keys(allDataObj).forEach(key => {
      postForm.append(key, allDataObj[key])
    })
    return new Promise((resolve, reject) => {
      http.post(url, postForm, {
        headers          : { 'Content-Type': 'multipart/form-data;', 'X-Requested-With': '' },
        onUploadProgress : ({ loaded, total }) => {
          // 进度条实现
          cbProgress({ percent: Math.round((loaded / total) * 100) - 10 }) // 上传完成为90
        }
      })
        .then(res => {
          cbProgress({ percent: 100 }) // 后端返回为 100
          resolve(res)
        })
        .catch(reject)
    })
  }
}

// download 是一个同步函数 不需要async await
export const download = url => {
  /**
   * 要传递的对象, 下载的文件名
   */
  return (params = {}, name) => {
    // 下载不过拦截器
    axios(
      {
        url,
        method           : 'GET',
        params           : JSONClone({ ...params, ...getAllData() }),
        paramsSerializer : x => Qs.stringify(x, { arrayFormat: 'repeat' }),
        responseType     : 'blob',
        headers          : {
          [SESSIONID]: session[SESSIONID]
        }
      }
    ).then(res => {
      jsFileDownload(res.data, name)
    })
  }
}
