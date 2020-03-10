const cors = require('koa-cors')

module.exports = () => {
    return cors({
        origin: function (ctx) {
            if (ctx.url === '/login') {
                return "*"; // 允许来自所有域名请求
            }
            return ['http://127.0.0.1:8080'];
        },
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    })
}