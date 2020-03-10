const Token = require('../middlewares/token_deal')
const AccountDB = require('../dao/users')
const response = require('../response')

let index = async (ctx,next) => {
    let token = ctx.request.header.authorization
    ctx.body = response(Token.proveToken(token))
}

module.exports = {
    'GET /': index
}