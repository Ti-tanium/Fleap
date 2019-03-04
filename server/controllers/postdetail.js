const { mysql } = require('../qcloud')

module.exports = async ctx => {
    const { itemId } = ctx.request.query
    console.log('itemId:', itemId)
    try {
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
