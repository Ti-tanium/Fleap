const {mysql} = require('../qcloud')
module.exports = async ctx => {
    const {openId, id, action} = ctx.request.query
    try {
        if (action === 'query') {
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
        } else if (action === 'collect') {
            await mysql('record').insert({type: 0, openId: openId, postId: id})
            ctx.state.data = {
                msg: 'successfully collected'
            }
        } else if (action === 'discollect') {
            await mysql('record').delete().where({openId: openId, postId: id, type: 0})
            ctx.state.data = {
                msg: 'successfully discollected'
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
