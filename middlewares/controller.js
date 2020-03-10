const fs = require('fs')
const uploader = require('./fileMulter')
/**
 * 
 * @param {router} router 
 * @param {mapping JS files exported} mapping 
 */
let addMapping = (router,mapping,backUrl) => {
    for(let url in mapping){
        if(url.includes("GET")){
            urlPath = url.slice(4)
            router.get('/' + backUrl + urlPath, mapping[url])
        }else if(url.includes("POST")){
            urlPath = url.slice(5)
            if(typeof mapping[url] === "object"){
                let mappingObj = mapping[url]
                router.post('/' + backUrl + urlPath,uploader(mappingObj.formName),mappingObj.method)
            }else{
                router.post('/' + backUrl + urlPath,mapping[url])
            }
        }
    }
}

/**
 * 
 * @param {router} router 
 * @param {controllers' dir , default 'controllers'} dir 
 */
let addControllers = (router,dir) => {
    let dirPath = `${__dirname.split('/').slice(0,-1).join('/')}/${dir}`
    let files = fs.readdirSync(dirPath);
    let js_files = files.filter((f) => {
        return f.endsWith('.js')
    })
    for(let f of js_files){
        console.log(` process controller: ${f} ... `)
        // 导入 js 文件
        let mapping = require(dirPath + '/' + f)
        addMapping(router,mapping,f.split('.')[0])
    }
}

module.exports = (dir) => {
    let controllers_dir = dir || 'controllers',router = require('koa-router')({ prefix: '/api' });
    addControllers(router,controllers_dir)
    return router.routes();
}