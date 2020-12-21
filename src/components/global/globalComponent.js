
const requireComponents = require.context('./', true, /\.vue/)

export default function registerGlobalComponents (app) {
  requireComponents.keys().forEach(fileName => {
    // 组件实例
    const reqCom = requireComponents(fileName)
    const reqComName = fileName.match(/(?<=\.\/).*(?=\.vue)/)[0]
    // 装载
    app.component(reqComName, reqCom.default ?? reqCom)
  })
}
