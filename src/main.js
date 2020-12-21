import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import registerAntd from '@/plugins/antd'
import registerGlobalComponents from '@/components/global/globalComponent'

import './style/reset.css'
// 自动生成样式库
import './style/auto.css'

const app = createApp(App)
// 载入 antd
registerAntd(app)
// 载入全局组件
registerGlobalComponents(app)
//! disabled warn You need to be careful
// app.config.warnHandler = Function.prototype
app
  .use(router)
  .mount('#app')
