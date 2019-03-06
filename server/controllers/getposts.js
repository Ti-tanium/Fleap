const { mysql } = require('../qcloud')
module.exports = async ctx => {
    const {
        category,
        count,
        start,
        latitude,
        longitude,
        openId
    } = ctx.request.query

    console.log(
        'requesting category:' +
            category +
            ' for ' +
            count +
            ' posts' +
            ' start at:' +
            start
    )
    let posts
    let lat = parseFloat(latitude)
    let lon = parseFloat(longitude)
    try {
        if (category === 'new') {
            // latest posts
            posts = await mysql('post')
                .select()
                .where({ sold: 0 })
                .orderBy('id', 'desc')
                .limit(count)
                .offset(parseInt(start))
            console.log(posts)
        } else if (category === 'near') {
            posts = await mysql('post')
                .select()
                .where({ sold: 0 })
                .whereNotNull('latitude')
                .whereBetween('latitude', [lat - 1, lat + 1])
                .whereBetween('longitude', [lon - 1, lon + 1])
                .orderBy(
                    mysql.raw(
                        'ACOS(SIN( :latitude * 3.1415 / 180) * SIN( :latitude_identifier: * 3.1415 / 180) +COS( :latitude * 3.1415 / 180) *COS(:latitude_identifier: * 3.1415 / 180) *COS(:longitude * 3.1415 / 180 - :longitude_identifier: * 3.1415 / 180)) *(6380)',
                        {
                            latitude: lat,
                            latitude_identifier: 'latitude',
                            longitude: lon,
                            longitude_identifier: 'longitude'
                        }
                    )
                )
                .limit(count)
                .offset(parseInt(start))
        } else if (category === 'recommend') {
            posts = []
            if (openId) {
                const major = await mysql('user')
                    .select('major')
                    .where({ openId: openId })
                posts = await mysql('post')
                    .join('user', 'post.openId', '=', 'user.openId')
                    .select('post.*')
                    .where({ sold: 0 })
                    .where('user.major', major[0].major)
                    .limit(count)
                    .offset(parseInt(start))
            }
        } else {
            const categorysql = await mysql('post_category')
                .select('id')
                .where('code_name', category)
            const categoryId = categorysql[0].id
            console.log('category id:', categoryId)
            posts = await mysql('post')
                .select()
                .where({ sold: 0, category: categoryId })
                .limit(count)
                .offset(parseInt(start))
        }
        // get avatar and nickname
        for (var i = 0; i < posts.length; i++) {
            try {
                var userinfo = await mysql('user')
                    .select('nickName', 'avatarUrl')
                    .where('openId', posts[i].openId)
                Object.assign(posts[i], userinfo[0], {
                    distance:
                        category === 'near'
                            ? GetDistance(
                                  lat,
                                  lon,
                                  posts[i].latitude,
                                  posts[i].longitude
                              ).toFixed(2)
                            : null
                })
            } catch (e) {
                ctx.state = {
                    code: -1,
                    msg: 'Get userinfo error:' + e.sqlMessage
                }
            }
        }
        console.log(posts)
        ctx.state.data = {
            posts: posts
        }
    } catch (e) {
        console.log(e)
        ctx.state = {
            code: -1,
            msg: 'sql error:' + e.sqlMessage
        }
        console.log('sql error:' + e.sqlMessage)
    }
}

function GetDistance (lat1, lng1, lat2, lng2) {
    var radLat1 = lat1 * Math.PI / 180.0
    var radLat2 = lat2 * Math.PI / 180.0
    var a = radLat1 - radLat2
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0
    var s =
        2 *
        Math.asin(
            Math.sqrt(
                Math.pow(Math.sin(a / 2), 2) +
                    Math.cos(radLat1) *
                        Math.cos(radLat2) *
                        Math.pow(Math.sin(b / 2), 2)
            )
        )
    s = s * 6378.137 // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000
    return s
}
