const Token = require('../middlewares/token_deal')
const AccountDB = require('../dao/users')
const response = require('../response')

let LoginFunc = async (ctx,next) => {
    await AccountDB.find(ctx.request.body).then(res => {
        if(res.length === 0){
            ctx.body = response(4,"failed")
        }else{
            const TOKEN = Token.addToken({...ctx.request.body})
            ctx.body = response(1,{
                token: TOKEN,
                user: ctx.request.body
            })
        }
    })
}



module.exports = {
    'POST /': LoginFunc
}