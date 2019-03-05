const { mysql } = require('../qcloud')

module.exports = async ctx => {
    // TODO: 更新record表，传入用户OpenId，及postID，插入record
    // 对于游客可以免除这一步
    const { itemId, openId } = ctx.request.query
    console.log('itemId:', itemId, 'openId:', openId)
    try {
        if (openId) {
            await mysql('record').insert({type: 1, openId: openId, postId: itemId})
            console.log('view history added:' + openId + '&' + itemId)
        }
        const postDetail = await mysql('post')
        .select('*')
        .where('id', itemId)
        const userinfo = await mysql('user').select('QQId', 'phone').where('openId', postDetail[0].openId)
        var detail = {}
        Object.assign(detail, userinfo[0], postDetail[0])
        ctx.state.data = detail
    } catch (e) {
        console.log(e)
        ctx.state = {
            code: -1,
            msg: 'Get post Detail error:' + e.sqlMessage
        }
        console.log('Get post Detail error:' + e.sqlMessage)
    }

    try {
        // view count
        await mysql('post')
        .where('id', itemId)
        .increment('viewCount', 1)
    } catch (e) {
        ctx.state = {
            code: -1,
            msg: 'increase view count error:' + e.sqlMessage
        }
        console.log('increase view count error:' + e.sqlMessage)
    }
}
