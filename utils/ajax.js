
// 然后在app.js中引用var ajax = require('utils/ajax.js')，挂载到全局的方法中，这样在每个页面通过getApp().ajax(config)就能使用自己封装后的api请求了。
function ajax(config) {
  wx.showLoading({
    title: '加载中',
  })
  var defaultConfig = {
    method: "GET",
    fail: function () {
      console.log('fail')
      wx.hideLoading()
      wx.stopPullDownRefresh()
      wx.showModal({
        title: "提示",
        content: "网络异常",
        showCancel: false,
        confirmText: "确定",
        confirmColor: "#3CC51F",
      })
    },
    // success:function(){
    //   console.log('success')
    //   wx.hideLoading()
    // }
  }
  if (config.method == 'POST') {
    defaultConfig.header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }

  let _config = Object.assign(defaultConfig, config)
  wx.request(_config)
}

module.exports = ajax