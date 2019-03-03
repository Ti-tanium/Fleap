const {mysql} = require('../qcloud')

module.exports = async ctx => {
    const openId = ctx.request.query.openId
    try {
        var posts = await mysql('post').select().where({openId: openId})
        var userinfo = await mysql('user').select('nickName', 'avatarUrl').where('openId', openId)
        for (var i = 0; i < posts.length; i++) {
            Object.assign(posts[i], userinfo[0])
        }
        ctx.state.data = {
            posts: posts
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                msg: 'sql error:' + e.sqlMessage
            }
        }
    }
}
