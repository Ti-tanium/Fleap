const { mysql } = require('../qcloud')

module.exports = async ctx => {
    const { itemId } = ctx.request.query
    console.log('itemId:', itemId)
    const postDetail = await mysql('merchandise')
        .select('*')
        .where('id', itemId)

    ctx.state.data = postDetail[0]
    // view count
    await mysql('merchandise')
        .where('id', itemId)
        .increment('viewCount', 1)
}
