
declare function get(url:string):(params:any)=>Promise<T>
declare function post(url:string):(data:any)=>Promise<T>
declare function form(url:string):(data:any)=>Promise<T>
declare function temp(url:string):(data:any)=>Promise<T>
/** 上传文件 可传文件或者对象 */
declare function binary(url:string):(data:File|any,cbProgress?:({percent:number})=>viod)=>Promise<T>
/** 上传文件 可传文件或者对象 */
declare function download(url:string):void
export{
  get,
  post,
  form,
  temp,
  binary,
  download
}