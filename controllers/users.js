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
    if(res.length > 0){
        body.isRegistered = true
        const {email,phoneNumber} = {email:res[0].email,...ctx.request.body}
        console.log({email,phoneNumber})
        body.TOKEN = Token.addToken({email,phoneNumber})

    }else{
        body.isRegistered = false
    }
    console.log(body)
    ctx.body = body
}

const register = async(ctx,next) => {
    const accountInfo = ctx.request.body
    const res = await AccountDB.save(accountInfo)
    ctx.body = {
        code: 200
    }
} 



/**
 * 
 * @param {*} ctx 
 * @param {*} next 
 * 用户进入首页，通过分析 token 来返回用户信息。
 */
const getUserInfo = async(ctx,next) => {
    const tokenInfo = Token.proveToken(ctx.request.header.authorization)
    ctx.body = {...tokenInfo}
}

module.exports = {
    'GET /tokenCheck': tokenCheck,
    'GET /getLocationInfo': getLocationInfo,
    'POST /login': login,
    'POST /register': register,
    'GET /getUserInfo': getUserInfo
}
