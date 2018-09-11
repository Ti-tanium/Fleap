// 工具函数库

export function get (url, data) {
  return request(url, 'GET', data)
}

export function post (url, data) {
  return request(url, 'POST', data)
}

function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url, // 开发者服务器接口地址",
      data: data, // 请求的参数",
      method: method,
      dataType: 'json', // 如果设为json，会尝试对返回的数据做一次 JSON.parse
      success: res => {
        if (res.data.code === 0) {
          resolve(res.data)
        } else {
          showModal('添加失败', res.data.data.msg)
          reject(res.data)
        }
      }
    })
  })
}

export function showSuccess (text) {
  wx.showToast({
    title: text, // 提示的内容,
    icon: 'success', // 图标,
    duration: 2000, // 延迟时间,
    mask: true, // 显示透明蒙层，防止触摸穿透,
    success: res => {}
  })
}

export function showModal (title, content) {
  wx.showModal({
    title: title, // 提示的标题,
    content: content, // 提示的内容,
    showCancel: true, // 是否显示取消按钮,
    cancelText: '取消', // 取消按钮的文字，默认为取消，最多 4 个字符,
    cancelColor: '#000000', // 取消按钮的文字颜色,
    confirmText: '确定', // 确定按钮的文字，默认为取消，最多 4 个字符,
    confirmColor: '#3CC51F', // 确定按钮的文字颜色,
    success: res => {
      if (res.confirm) {
      } else if (res.cancel) {
      }
    }
  })
}
