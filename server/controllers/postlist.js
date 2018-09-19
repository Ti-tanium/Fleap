const { mysql } = require('../qcloud')

module.exports = async ctx => {
    const { category, Free, openId } = ctx.request.query
    console.log('category:\n', category, Free)
    const sql = mysql('merchandise')
    let postList
    let price = 0.0
    if (openId) {
        postList = await sql.where('openId', openId)
    } else if (Free) {
        postList = await sql.where('price', price)
    } else if (category === 'all') {
        postList = await sql.select('merchandise.*')
    } else {
        postList = await sql.where('category', category)
    }
    ctx.state.data = {
        list: postList
    }
}
