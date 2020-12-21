import { VNodeTypes, CSSProperties } from 'vue';


interface ModalFuncProps{
  prefixCls?: string;
  class?: string;
  visible?: boolean;
  title?: VNodeTypes;
  content?: VNodeTypes;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  centered?: boolean;
  width?: string | number;
  okText?: VNodeTypes;
  okType?: ButtonType;
  cancelText?: VNodeTypes;
  icon?: VNodeTypes;
  iconType?: string;
  mask?: boolean;
  maskClosable?: boolean;
  zIndex?: number;
  okCancel?: boolean;
  style?: CSSProperties | string;
  maskStyle?: CSSProperties;
  type?: string;
  keyboard?: boolean;
  getContainer?: getContainerFunc;
  autoFocusButton?: null | 'ok' | 'cancel';
  transitionName?: string;
  maskTransitionName?: string;
}

interface rule{
  pattern:RegExp;
  message:string;
}

export declare class AntdRules{
  /**
   * 价格校验
   */
  static price:rule
  /**
   * 邮箱校验
   */
  static email:rule
  /**
   * 手机号校验
   */
  static phone:rule
  /**
   * 身份证校验
   */
  static id:rule
  /**
   * 座机校验
   */
  static mobile:rule
  /**
   * 正整数校验
   */
  static positiveInt:rule
  /**
   * 汉字 数字 字母 下划线 中划线 校验
   * @param min 最小长度
   * @param max 最大长度
   */
  static normalStr(min:number,max:number,message?:string):rule
  /**
   * 长度限制
   * @param min 最小长度
   * @param max 最大长度
   * @param message 提示消息
   */
  static minMax(min:number,max:number,message?:string):{min:number,max:number,message:string}
  /**
   * 必填校验
   * @param str 提示问题
   * @param trigger 校验触发的时机
   */
  static requireStr(str,trigger?:string|string[]):{ required:boolean, message:string, trigger:string }
}



export declare class AntdUtils {
  /**
   * 正确的消息提示 防抖 1500ms
   * @param msg 提示文字
   */
  static SuccessMessage(msg:string):void
  /**
   * 危险的消息提示 防抖 1500ms
   * @param msg 提示文字
   */
  static WarningMessage(msg:string):void
  /**
   * 错误的消息提示 防抖 1500ms
   * @param msg 提示文字
   */
  static ErrorMessage(msg:string):void
  /**
   * 二次确认框
   * @param option 提示文案 或整体配置
   */
  static confirm (option:string|ModalFuncProps):Promise<undefined>
}



interface tableState {
  loading: boolean;
  dataSource: any;
  rowKey: string;
  pagination: any;
  onChange(): any;
}

interface useTableReturn {
  setSourceAndTotal: (soure: any[], total: number) => void;
  setPageSize: (pageSize: number) => void;
  searchTable: () => void;
  resetTable: () => void;
  setTableSource: (dataSource: any[]) => void;
  setTableTotal: (total: number) => any;
  tableState: tableState;
}



interface useTableArg {
  config?: {
    init?: boolean;
    pageNum?: string;
    pageSize?: string;
    sortField?: string;
    sortType?: string;
  };
  getDataFn?: (pageValObj: {
    [pageNum: string]: number;
    // @ts-ignore
    [pageSize: string]: number;
    // @ts-ignore
    [sortField: string]: string;
    // @ts-ignore
    [sortType: string]: string;
  }) => void;
  pagination?: {
    defaultCurrent?:number;
    defaultPageSize?:number
    itemRender?: (...args: any[]) => any;
    disabled?: boolean;
    hideOnSinglePage?: boolean;
    showSizeChanger?: boolean;
    pageSizeOptions?: string[];
    showQuickJumper?: boolean | { [key: string]: any; };
    showTotal?: any;
    simple?: boolean;
    showLessItems?: boolean;
  } ;
}


export declare class AntdSwr {
  /**
   * antd table 工具
   * @param options 配置
   */
  static useTable(options?:useTableArg):useTableReturn
} 