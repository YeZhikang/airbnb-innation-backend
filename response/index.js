module.exports = (category,data) => {
    if(category === 1){
        return {
            code: 200,
            ...data
        }
    }
    return {
        code: 400,
        ...data
    }
}