const { mysql } = require('../qcloud')

module.exports = async ctx => {
    const openId = ctx.request.query.openId
    console.log('Requesting additional User info:', openId)
    try {
        var sql = await mysql('user')
            .column('QQId', 'phone', 'major')
            .select()
            .where('openId', openId)

        console.log(sql)
        ctx.state.data = {
            list: sql
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                msg:
                    'fail to get additional user information from datebase：' +
                    e.sqlMessage
            }
        }
    }
}
