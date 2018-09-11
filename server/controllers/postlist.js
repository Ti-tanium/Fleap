const { mysql } = require('../qcloud')

module.exports = async ctx => {
    const { category, Free } = ctx.request.query
    console.log(category, Free)
    const sql = mysql('merchandise')
    let postList = await sql.where('category', category)
    if (Free) {
        postList = await sql.where('price', 0)
    }
    ctx.state.data = {
        list: postList
    }
}
