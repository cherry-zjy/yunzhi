// pages/index/msg/msg.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    IsNext: false,
    next: false,//没有数据时弹框只提醒一次
    list: [],
    pageIndex:1,
  },
  getInfo() {
    var that = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        app.ajax({
          method: 'get',
          url: app.mainUrl + 'api/AppHomePage/GetMessage',
          header: {
            "Authorization": res.data
          },
          data: {},
          success: function (res) {
            wx.hideLoading()
            if (res.data.Status == 1) {
              that.setData({
                list: res.data.Result[0].message
              })
            } else if (res.data.Status == 40001) {
              wx.showModal({
                title: '提示',
                content: res.data.Result,
                success: function (res) {
                  if (res.confirm) {
                    wx.removeStorage({
                      key: 'token',
                      success: function (res) {
                        console.log("删除token，保证只提醒一次")
                      },
                    })
                    wx.removeStorage({
                      key: 'type',
                      success: function (res) {
                        console.log("删除type，保证只提醒一次")
                      },
                    })
                    wx.navigateTo({
                      url: '../../login/enter/enter',
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            } else {
              wx.showModal({
                showCancel: false,
                title: '提示',
                content: res.data.Result,
              })
            }
          },
          error: function () {
            wx.hideLoading()
          }
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: "请先登录",
          success: function (res) {
            if (res.confirm) {
              wx.removeStorage({
                key: 'token',
                success: function (res) {
                  console.log("删除token，保证只提醒一次")
                },
              })
              wx.removeStorage({
                key: 'type',
                success: function (res) {
                  console.log("删除type，保证只提醒一次")
                },
              })
              wx.navigateTo({
                url: '../../login/enter/enter',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      complete: function (res) {
      },
    })
  },
  save(){
    wx.navigateTo({
      url: 'report/report'
    })
  },
  gotodetail(event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: "report/detail/detail?id=" + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var tt = this;
    tt.setData({
      mainurl: app.mainUrl,
      pageIndex: 1
    })
    tt.getInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // var that = this
    // if (that.data.IsNext) {
    //   if (that.data.pageIndex == 1) {
    //     that.setData({
    //       pageIndex: 2
    //     })
    //   }
    //   that.getInfo()
    // } else {
    //   if (that.data.next == false) {//没有数据时弹框只提醒一次
    //     that.setData({
    //       next: true
    //     })
    //     wx.showToast({
    //       title: '没有更多数据了',
    //     })
    //   }
    // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})