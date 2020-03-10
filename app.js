const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser')
const fs = require('fs')
const router_middleware = require('./middlewares/controller')
const path = require('path')
const staticFiles = require('koa-static')
const corsMid = require('./middlewares/cors')
const uploader = require('./middlewares/fileMulter')
const cacheControl = require('koa-cache-control')
const axios = require('axios')
const request = require('request')

app.use(staticFiles(path.join(__dirname + '/public/')))
app.use(bodyParser())
app.use(cacheControl({
    noCache: true
}))
app.use(corsMid())


//路由
router.post('/upload',uploader('fileWGPicture'),async(ctx,next)=>{
    ctx.body = {
        filename: ctx.req.file.filename//返回文件名
    }
})

app.use(router.routes())
app.use(router_middleware())
app.listen(3020);
