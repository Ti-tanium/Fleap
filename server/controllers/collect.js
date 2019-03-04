const {mysql} = require('../qcloud')
module.exports = async ctx => {
    const {openId, id} = ctx.request.query
    try {
        const collected = await mysql('record').select().where({openId: openId, postId: id, type: 0})
        if (collected.length === 0) {
            ctx.state.data = {
                collected: false
            }
        } else {
            ctx.state.data = {
                collected: true
            }
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            msg: 'sql error' + e.sqlMessage
        }
        console.log('sql error' + e.sqlMessage)
    }
}
