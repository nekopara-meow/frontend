// var OSS = require('ali-oss');
import OSS from "ali-oss";
export function client(){
  var client = new OSS.Wrapper({
      endpoint: 'oss-cn-hangzhou.aliyuncs.com',//填写Bucket所在地域
      accessKeyId: 'LTAI5tNTp64pvj7ZyM9GBBrB',
      accessKeySecret: 'uraarRMA75smURHejuKbVw6IhMgxWM',
      bucket: 'miaotu-headers',// 填写Bucket名称。
  })  //后端提供数据 
  return client
}
/**
 * 生成随机uuid
 */
export const getFileNameUUID = () => {
  function rx() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return `${+new Date()}_${rx()}${rx()}`
}