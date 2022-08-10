import Docxtemplater from 'docxtemplater'
import ImageModule from 'docxtemplater-image-module-free' //需要就导入
import PizZip from 'pizzip'
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'

export function exportWordAndImage(report) {
    var templateChose = process.env.VUE_APP_PUBLIC_PATH + '/template.docx'//模板推荐放在public文件夹下
    JSZipUtils.getBinaryContent(templateChose, function(error, content) {
        if (error) {
            console.error(error)
            return
        }
        var opts = {}
        opts.centered = false
        opts.getImage = function(tagValue) {
            return new Promise(function(resolve, reject) {
                JSZipUtils.getBinaryContent(tagValue, function(error, content) {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(content)
                })
            })
        }
        // 图片有关代码，没有图片的可以删除
        opts.getSize = function(img, tagValue, tagName) {
            // return [200, 200] // 图片大小 （固定的）如果你的图片大小要固定，请使用这行代码，将下面return new Promise的那部分注销掉
            // 非固定（这里是设置宽度最大为300px的图片）
            let wid = 300
            return new Promise(function(resolve, reject) {
                var image = new Image()
                image.src = tagValue
                let imgWidth, imgHeight, scale
                image.onload = function() {
                    imgWidth = image.width
                    imgHeight = image.height
                    scale = 0
                    if (imgWidth > wid) {
                        scale = wid / imgWidth
                        imgWidth = wid
                        imgHeight = imgHeight * scale
                    }
                    resolve([imgWidth, imgHeight])
                }
                image.onerror = function(e) {
                    console.log('img, tagName, tagValue : ', img, tagName, tagValue)
                    reject(e)
                }
            })
        }
        var imageModule = new ImageModule(opts)

        var zip = new PizZip(content)
        var doc = new Docxtemplater()
            .loadZip(zip)
            .setOptions({ linebreaks: true }) // 换行确认，如果你有的文本中有换行符的话，可以选择她导入到word起不起作用
            .attachModule(imageModule)
            .compile()
        doc
            .resolveData(
                {
                    // 这是你导入的数据，这个数据体中的属性或对象一定要和word模板中的插值一样
                    ...report
                }
            )
            .then(function() {
                console.log('Export...')
                doc.render()
                var out = doc.getZip().generate({
                    type: 'blob',
                    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                })
                // 输出文档，可以自定义自己的文档名
                saveAs(out, 'Temporary, you need to sync as.docx')
            })
    })
}