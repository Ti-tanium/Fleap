const { uploader } = require('../qcloud')

module.exports = async ctx => {
    // 获取上传之后的结果
    // 具体可以查看：
    const data = await uploader(ctx.req)
    console.log(data)
    ctx.state.data = data
}
