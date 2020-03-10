const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/koa'

mongoose.connect(DB_URL)

/**
 * mongoose.connection 有三个状态： conncected -> disconnected ( 错误状态 error )
 */
mongoose.connection.on('connected', () => {
    console.log("success");
})

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose