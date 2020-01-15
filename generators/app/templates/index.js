const tinify = require('tinify')
const clc = require("cli-color");
const fs = require('fs')
let sourceDir = './source/'
let outputDir= './output/'
let compressList = []
let uncompressList = []
let reg= /\.(png|jpe?g)(\?.*)?$/
tinify.key = `<%= key %>` ;
let readData = fs.readdirSync(sourceDir)
readData.forEach((item)=>{
    if(reg.test(item)){
        compressList.push(item)
    }else{
        uncompressList.push(item)
    }
})
clearDir(outputDir)
console.log(clc.red('不可压缩的图片列表(只能压缩jpeg/png格式得图片)'))
console.log('==============================================')
console.log(uncompressList.length ? clc.red(uncompressList):'暂无')
console.log('==============================================')

promiseHandle(compressList).then(res=>{
    console.log(res)
})

function promiseHandle(){
    return new Promise((resolve,reject)=>{
        compressList.forEach((item)=>{
            compressFn(sourceDir+item,item)
        })
        resolve(true)
    })
}
/**
 * @description: 压缩图片
 * @param {type} 
 * @return: 
 */
function compressFn(list,name){
    const source = tinify.fromFile(list);
    return new Promise((resolve,reject)=>{
        source.toFile(`${outputDir}${name}`,function(err){
            if (err instanceof tinify.AccountError) {
                console.log(clc.red('Verify your API key and account limit.'))
                reject(err)
              } else if (err instanceof tinify.ServerError) {
                console.log(clc.red('Temporary issue with the Tinify API.'))
                reject(err)
              } else if (err instanceof tinify.ConnectionError) {
                console.log(clc.red("A network connection error occurred."))
                reject(err)
              } else {
                console.log(clc.greenBright(`${name} 压缩完成`))
                resolve('压缩完成')
              }
        });
    })
}
/**
 * @description: 清除之前得缓存图片
 * @param {type} 
 * @return: 
 */
function clearDir(dir){
    fs.readdirSync(dir).map((file) => {
        fs.unlink(`${dir}${file}`,(err) => {
          if (err) {
            console.log(err);
          }
        });
    });
}

