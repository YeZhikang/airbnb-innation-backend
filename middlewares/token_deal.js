const jwt = require('jsonwebtoken')
const serect = 'token';
const response = require('../response')

let tokenParser =  (tokens) => {
    if (tokens) {
        // console.log(tokens)
        let toke = tokens;
        // 解析
        let decoded = jwt.decode(toke, serect);
        return decoded;
    }
}



module.exports = {
    addToken: (user) => {
        const TOKEN = jwt.sign({
            email: user.email,
            phoneNumber: user.phoneNumber,
        }, serect, { expiresIn: '1h' });
        return TOKEN;
    },
    proveToken: (token) => {
        const PARSED_TOKEN = tokenParser(token)
        if(PARSED_TOKEN){
            if(PARSED_TOKEN && PARSED_TOKEN.exp <= new Date()/1000){
                return response(4,{ data: "Token失效" })
            }else {
                return response(1,{ data: {...PARSED_TOKEN} })
            }
        }
        return response(4,{ data: "TOKEN无法验证" })
    }
}