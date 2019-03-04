const {mysql} = require('../qcloud')

module.exports = async ctx => {
    const openId = ctx.request.query.openId
    console.log(openId)
    try {
        const postsId = await mysql('record').select('postId').where({type: 0, openId: openId})
        console.log(postsId)
        var posts = []
        for (var i = 0; i < postsId.length; i++) {
            const post = await mysql('post').select().where({id: postsId[i].postId})
            var userinfo = await mysql('user').select('nickName', 'avatarUrl').where('openId', post[0].openId)
            Object.assign(post[0], userinfo[0])
            posts.push(post[0])
        }
        ctx.state.data = {
            postList: posts
        }
    } catch (e) {
        console.log(e)
        ctx.state = {
            code: -1,
            msg: 'sql error:' + e.sqlMessage
        }
        console.log('sql error:' + e.sqlMessage)
    }
}
