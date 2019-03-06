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
        location
    } = ctx.request.body
    const sold = false
    let viewCount = 0
    if (location === '') {
        location = null
    }
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
            location
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
