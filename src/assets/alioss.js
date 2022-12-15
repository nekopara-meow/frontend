// var OSS = require('ali-oss');
import OSS from "ali-oss";
export function client(){
  var client = new OSS({

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
function random_string(len) {
  len = len || 32
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  var maxPos = chars.length
  var pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}
export function uploadOSS(file) {
  return new Promise(async (resolve, reject) => {
    const fileName = `${random_string(6)}_${file.name}`
    const res = await client().multipartUpload(fileName, file)
    resolve(res)
    // 或者返回如下：
    // resolve({
    //     fileUrl: `${OSSConfig.uploadHost}/${fileName}`,
    //     fileName: file.name
    // })
  })
}
