/**
 * 身份证
 * 二代身份证 2019 标准
 */
export const IDReg = /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}[\dXx]$/
export function isID (path) {
  return IDReg.test(path)
}

/**
 * 0-9到数字
 */
export const NumberReg = /^\d+$/g
export function isNumber (path) {
  return NumberReg.test(path)
}

/**
 * 邮箱
 */
export const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export function isEmail (path) {
  return emailReg.test(path)
}

/**
 * 手机号码
 */
export const PhoneReg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/
export function isPhone (path) {
  return PhoneReg.test(path)
}

/**
 * 电话（座机)
 */
export const MobileReg = /^\d{3}-\d{8}$|^\d{4}-\d{7}|^\d{4}-\d{8}$/
export function isMobile (path) {
  return MobileReg.test(path)
}

/**
 * 价格 两位小数
 */
export const PriceReg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
export function isPrice (path) {
  return PriceReg.test(path)
}

/**
 *  正整数
 */
export const PositiveIntReg = /^[1-9]\d*?$/
export function isPositiveInt (path) {
  return PriceReg.test(path)
}
/**
 *  限制输入 min~max个汉字、字母、数字 下划线 中划线 的正则
 */
export function limtInputReg (min, max) {
  return new RegExp(`^[\\p{sc=Han}\\w-]{${min},${max}}$`, 'u')
}
