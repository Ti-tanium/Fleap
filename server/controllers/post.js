const { mysql } = require('../qcloud')

module.exports = async ctx => {
    const {
        category,
        price,
        title,
        detail,
        image,
        openId,
        nickName,
        avatarUrl,
        major
    } = ctx.request.body
    console.log(
        category,
        price,
        title,
        detail,
        image,
        openId,
        nickName,
        avatarUrl,
        major
    )
    const sold = false
    try {
        await mysql('merchandise').insert({
            category,
            price,
            title,
            detail,
            image,
            openId,
            nickName,
            avatarUrl,
            major,
            sold
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
