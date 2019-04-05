const { mysql } = require('../qcloud')

module.exports = async ctx => {
    var keywords = ctx.request.query.keywords
    console.log('keywords:' + keywords)
    try {
        const posts = await mysql('post')
            .select()
            .where('title', 'like', '%' + keywords + '%')
            .orWhere('detail', 'like', '%' + keywords + '%')
        ctx.state.data = {
            posts: posts
        }
        console.log(posts)
    } catch (e) {
        console.log(e)
        ctx.state = {
            code: -1,
            msg: 'sql error:' + e.sqlMessage
        }
        console.log('sql error:' + e.sqlMessage)
    }
}
