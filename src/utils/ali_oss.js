/**
 * @description: 获得随机文件名
 * @author: 罗亚硕
 * @date: 2022/8/4
 */
export function getFileNameUUID () {
    function rx() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return `${+new Date()}_${rx()}${rx()}`
}
/**
 * @description: 将文件名上传到阿里云，返回url
 * @author: 罗亚硕
 * @date: 2022/8/4
 * @param: dir:上传到的目录
 * @param: updata:上传到的信息
 */
import OSS from "ali-oss";
export function upload(dir,updata) {
    if(!dir){
        dir="somedir/"
    }
    else {
        dir=dir+'//'
    }
    const data = new Blob([updata]);
    var client = new OSS({
        endpoint: "oss-cn-hangzhou.aliyuncs.com", //填写Bucket所在地域
        accessKeyId: "LTAI5tNTp64pvj7ZyM9GBBrB",
        accessKeySecret: "uraarRMA75smURHejuKbVw6IhMgxWM",
        bucket: "miaotu-headers", // 填写Bucket名称。
    });
    var fileName = dir + getFileNameUUID() + ".txt";
    // var fileName = "exampledir/exampleobject.txt";
    client.put(fileName, data);
    let url="https://miaotu-headers.oss-cn-hangzhou.aliyuncs.com/" + fileName;
    return url
}
/**
 * @description: 从对象存储url的文件中读取内容
 * @author: 罗亚硕
 * @date: 2022/8/4
 * @param url 要访问的url
 * @param callback 回调函数
 */
export function readURL(url, callback) {
    const xhrFile = new XMLHttpRequest();
    xhrFile.open("GET", url, true);
    xhrFile.onload  = function() {
        const allText = xhrFile.response;
        callback(allText)
    }
    xhrFile.send();
}

