const uploadFile = require('../middlewares/fileMulter')
const response = require('../response')
const Token = require('../middlewares/token_deal')
const request = require('request')
const getLocationAPI = require('../middlewares/api')

let tokenCheck = async (ctx,next) => {
    let token = ctx.request.header.authorization
    // console.log(Token.proveToken(token));
    ctx.body = Token.proveToken(token)
}

let getLocationInfo = async (ctx,next) => {
    const location = ctx.query.location
    const data = await getLocationAPI(location)
    ctx.body = data
}

module.exports = {
    'GET /tokenCheck': tokenCheck,
    'GET /getLocationInfo': getLocationInfo
}
