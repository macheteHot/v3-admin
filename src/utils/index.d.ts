import { reactive,Ref } from 'vue';
interface useSessionReturnType{
  /**
   * 只读响应式 reactive
   */
  session: readonly reactive<object>;
  /**
   * 设置session
   * @param key is key name 
   * @param value can set any value
   */
  setSession(key:string, value:any):void;
  /**
   * 
   * @param keys liek key1 key2 key3 delete them all 
   */
  destroySession(...keys:string[]):void;
}



/**
 * 工具类
 */
export declare class Utils {
  /**
   *  休眠时间
   * @param {Number} waitTime
   */
  static sleep():Promise<undefined>;
  /**
  * 获取服务器时间 返回Date对象
  */
  static getServerDate():Promise<Date>
  /**
   * 生成唯一UUID
   */
  static GeneratorUuid():string
  /**
   * session 管理工具
   */
  static useSession(key:string):useSessionReturnType
}

/**
 * 时间
 */
export declare class DateUtils{
  /**
   * 
   * @param date 时间
   * @param formatStr 格式化字符串 默认 YYYY-MM-DD HH:MM:ss
   */
  static dateFormat(date:Date|string|number,formatStr?:string):string
  /**
   * 格式化为 hh:mm:ss
   * @param date 时间
   */
  static HH_MM_SS(date:Date|string|number):string
  /**
   * 格式化为 YYYY-MM-DD HH:MM:ss
   * @param date 时间
   */
  static YYYY_MM_DD_HH_MM_SS(date:Date|string|number):string
   /**
   * 格式化为 YYYY-MM-DD HH:MM
   * @param date 时间
   */
  static YYYY_MM_DD_HH_MM(date:Date|string|number):string
   /**
   * 格式化为 YYYY-MM-DD
   * @param date 时间
   */
  static YYYY_MM_DD(date:Date|string|number):string
}




type fn = (...args:any[])=>any


interface ThrottleSettings {
  leading?: boolean;
  trailing?: boolean;
}

interface DebounceSettings extends ThrottleSettings {
  maxWait?: number;
}

/**
 * 函数工具类
 */
export declare class Swr{
  /**
   * 自动在函数运行前 结束后或报错 添加loading 变量
   * @param fn 需要loading的函数
   */
  static useLoading(fn:fn):[Ref<boolean>, fn];
  /**
   * 函数防抖 返回新的函数
   * @param fn 需要防抖的函数
   * @param wait 等待时间 毫秒 默认500
   * @param options 配置
   */
  static useDebounce(fn:fn,wait?:number,options?:DebounceSettings):fn
  /**
   * 函数开始时防抖
   * @param fn 
   */
  static useDebounceFnStart(fn:fn):fn
  /**
   * 函数结束时防抖
   * @param fn 
   */
  static useDebounceFnEnd(fn:fn):fn
  /**
   * 函数节流
   * @param fn 
   */
  static useThrottleFn(fn:fn,wait?:number,options:ThrottleSettings):fn
 
}