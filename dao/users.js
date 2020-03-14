const mongoose = require('../middlewares/mongodb')
const Schema = mongoose.Schema;

const ACCOUNT_SCHEMA = new Schema({
    password: String,
    email: String,
    phoneNumber: String
})

const ACCOUNT_MODEL = mongoose.model('account',ACCOUNT_SCHEMA)

class AccountDB {
    constructor(){}
    find(obj){
        return new Promise( (resolve,reject) => {
            ACCOUNT_MODEL.find(obj,(err,doc) => {
            if(err){
                reject(err)
            }
            resolve(doc)
        })})
    }
    save(obj){
        const MODEL_OBJ = new ACCOUNT_MODEL(obj)
        return new Promise( (resolve,reject) => {
            MODEL_OBJ.save((error,doc) => {
                if(error){
                    reject(error)
                }
                resolve(doc)
            })
        })
    }

}

module.exports = new AccountDB()