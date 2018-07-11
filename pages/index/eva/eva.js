// pages/index/eva/eva.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag2: 0,
    Text:'',
    detailid:'',
  },
  changeColor11: function () {
    var that = this;
    that.setData({
      flag2: 1
    });
  },
  changeColor12: function () {
    var that = this;
    that.setData({
      flag2: 2
    });
  },
  changeColor13: function () {
    var that = this;
    that.setData({
      flag2: 3
    });
  },
  changeColor14: function () {
    var that = this;
    that.setData({
      flag2: 4
    });
  },
  changeColor15: function () {
    var that = this;
    that.setData({
      flag2: 5
    });
  },

  Changeinput(e) {
    this.setData({
      Text: e.detail.value
    });
  },

  save() {
    if (this.data.Text == "") {
      wx.showModal({
        showCancel: false,
        title: '提示',
        content: '请输入评论内容',
      })
      return;
    }
    var tt = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        app.ajax({
          method: 'get',
          url: app.mainUrl + 'api/AppProductComment/GetProductCommont',
          header: {
            "Authorization": res.data
          },
          data: {
            'Commont': tt.data.Text,
            'Star': tt.data.flag2,
            'prodID': tt.data.detailid
          },
          success: function (res) {
            wx.hideLoading()
            if (res.data.Status == 1) {
              wx.showToast({
                title: res.data.Result
              })
              setTimeout(() => {
                wx.navigateTo({
                  url: 'evafeedback/evafeedback?id=' + tt.data.detailid
                })
              }, 1500);
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
                    wx.navigateTo({
                      url: '../../login/login',
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '获取信息失败，请重新登录',
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../../login/login',
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
          },
          error: function () {
            wx.navigateTo({
              url: '../../login/login'
            })
          }
        })
      },
      fail: function (res) {
        wx.showToast({
          title: "获取信息失败，请重新登录"
        })
      },
      complete: function (res) {
      },
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      detailid: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})