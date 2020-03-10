const request = require('request')

const toUnicode = function encodeUnicode(str) {
    var res = [];
    for ( var i=0; i<str.length; i++ ) {
        res[i] = ( "00" + str.charCodeAt(i).toString(16) ).slice(-4);
    }
    return "\\u" + res.join("\\u")
}


const getLocationAPI = (location) => {
    return new Promise((resolve, reject) => {
        request(encodeURI(`https://www.airbnb.cn/api/v2/autocompletes?key=d306zoyjsyarp7ifhu67rjxn52tv0t20&language=zh&locale=zh&num_results=5&user_input=${location}&api_version=1.1.13&vertical_refinement=homes&options=should_filter_by_vertical_refinement%7Cshould_show_stays`), (error, res, body) => {
            if (!error && res.statusCode === 200) {
                body = JSON.parse(body)
                resolve(body)
            } else {
                reject(error)
            }
        })
    })
}

module.exports = getLocationAPI
