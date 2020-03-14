const uploadFile = require('../middlewares/fileMulter')
const response = require('../response')
const Token = require('../middlewares/token_deal')
const request = require('request')
const getLocationAPI = require('../middlewares/api')
const AccountDB = require('../dao/users')

const tokenCheck = async (ctx,next) => {
    let token = ctx.request.header.authorization
    // console.log(Token.proveToken(token));
    ctx.body = Token.proveToken(token)
}

const getLocationInfo = async (ctx,next) => {
    const location = ctx.query.location
    const data = await getLocationAPI(location)
    ctx.body = data
}

const login = async (ctx,next) => {
    const phoneNumber = ctx.request.body.phoneNumber
    const res = await AccountDB.find({phoneNumber})
    const body = {code: 200}
    console.log(res)
    if(res.length > 0){
        body.isRegistered = true
    }else{
        body.isRegistered = false
    }
    ctx.body = body
}

const register = async(ctx,next) => {
    const accountInfo = ctx.request.body
    const res = await AccountDB.save(accountInfo)
    ctx.body = {
        code: 200
    }
} 

module.exports = {
    'GET /tokenCheck': tokenCheck,
    'GET /getLocationInfo': getLocationInfo,
    'POST /login': login,
    'POST /register': register
}
