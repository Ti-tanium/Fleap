const { mysql } = require('../qcloud')

module.exports = async ctx => {
    var {
        category,
        price,
        title,
        detail,
        images,
        openId,
        postTime,
        latitude,
        longitude
    } = ctx.request.body
    const sold = false
    let viewCount = 0
    try {
        await mysql('post').insert({
            category,
            price,
            title,
            detail,
            images,
            openId,
            sold,
            postTime,
            viewCount,
            latitude,
            longitude
        })
        ctx.state.data = {
            msg: 'success'
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                msg:
                    'fail to insert post information to datebase：' +
                    e.sqlMessage
            }
        }
    }
}
