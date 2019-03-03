const {mysql} = require('../qcloud')

module.exports = async ctx => {
    const id = ctx.request.body.id
    console.log('sold id:', id)
    try {
        await mysql('post').where({id: id}).update({sold: 1})
        ctx.state.data = {
            msg: 'successfully sold.'
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            msg: 'sql error:' + e.sqlMessage
        }
        console.log('sold:' + id + 'sql error:' + e.sqlMessage)
    }
}
