import {
  get,
  post,
  binary, // post 上传文件 (二进制文件)
  form, // post 表单
  temp, // 临时post 拼接URL
  download // 下载文件
} from '@/http/request'

const apis = {
  /* demo -- start */
  // 调用方式1（推荐使用）  this.$apis.demoGet({id: 1, sex: 2})
  demoGet      : get('/isDemo/getApi'),
  demoPost     : post('isDemo/postApi'),
  demoBinary   : binary('isDemo/binaryApi'),
  demoForm     : form('isDemo/formApi'),
  demoTemp     : temp('isDemo/tempApi'),
  demoDownload : download('isDemo/tempApi'),
  /* demo -- end */
  /* 公共 -- start */
  getConfig    : form('/api/auth/ddConfig'), // 鉴权
  login        : form('/api/auth/login'), // 登录
  uploadFile   : binary('/api/file/upload'), // 登录
  courseSearch : get('/api/xxx/xxx')
  /* 公共 -- end */
}

export default function getApis () { return apis }
