const { mysql } = require('../qcloud')
module.exports = async ctx => {
    const {
        openId,
        nickName,
        avatarUrl,
        major,
        phone,
        QQId,
        gender
    } = ctx.request.body
    try {
        const sql = await mysql('user')
            .select()
            .where({ openId: openId })
        console.log(sql)
        if (sql.length === 0) {
            try {
                await mysql('user').insert({
                    openId,
                    nickName,
                    avatarUrl,
                    major,
                    phone,
                    QQId,
                    gender
                })
                ctx.state.data = {
                    msg: 'success'
                }
                console.log('Insert user information succeeded:', openId)
            } catch (e) {
                ctx.state = {
                    code: -1,
                    data: {
                        msg:
                            'fail to insert user information to datebase：' +
                            e.sqlMessage
                    }
                }
            }
        } else {
            try {
                await mysql('user')
                    .where({ openId: openId })
                    .update({ QQId: QQId, phone: phone, major: major })
            } catch (e) {
                ctx.state = {
                    code: -1,
                    data: {
                        msg:
                            'fail to update user information to datebase：' +
                            e.sqlMessage
                    }
                }
            }
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                msg: 'Sql error:' + e.sqlMessage
            }
        }
    }
}
