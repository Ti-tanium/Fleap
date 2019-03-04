const { mysql } = require('../qcloud')
module.exports = async ctx => {
    const { category, count, start } = ctx.request.query

    console.log('requesting category:' + category + ' for ' + count + ' posts' + ' start at:' + start)
    let posts
    try {
        if (category === 'new') {
            // latest posts
            posts = await mysql('post').select().where({sold: 0}).orderBy('id', 'desc').limit(count).offset(parseInt(start))
        } else if (category === 'near') {
            // TODO: calculate distance select ?
            posts = {}
        } else if (category === 'recommend') {
            // TODO: recommendation algorithm needed
            posts = {}
        } else {
            const categorysql = await mysql('post_category').select('id').where('code_name', category)
            const categoryId = categorysql[0].id
            console.log('category id:', categoryId)
            posts = await mysql('post').select().where({sold: 0, category: categoryId}).limit(count).offset(parseInt(start))
        }
        // get avatar and nickname
        for (var i = 0; i < posts.length; i++) {
            try {
                var userinfo = await mysql('user').select('nickName', 'avatarUrl').where('openId', posts[i].openId)
                Object.assign(posts[i], userinfo[0])
            } catch (e) {
                ctx.state = {
                    code: -1,
                    msg: 'Get userinfo error:' + e.sqlMessage
                }
            }
        }
        ctx.state.data = {
            posts: posts
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            msg: 'sql error:' + e.sqlMessage
        }
        console.log('sql error:' + e.sqlMessage)
    }
}
