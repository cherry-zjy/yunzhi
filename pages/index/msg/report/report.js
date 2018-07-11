// pages/index/msg/report/report.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1,
    type: '',
    Text: '',
    token: '',
    IsNext: false,
    next: false, //没有数据时弹框只提醒一次
    list: [],
    showModal: false,
    handleid: ''
  },
  handle() {
    wx.navigateTo({
      url: 'detail/detail'
    })
  },
  Changeinput(e) {
    this.setData({
      Text: e.detail.value
    });
  },
  search() {
    this.setData({
      pageIndex: 1,
      list: []
    });
    this.getInfo()
  },
  getInfo() {
    var that = this
    wx.getStorage({
      key: 'token',
      success: function(res) {
        app.ajax({
          method: 'get',
          url: app.mainUrl + 'api/AppDeclare/GetDeclareList',
          header: {
            "Authorization": res.data
          },
          data: {
            pageIndex: Number(that.data.pageIndex),
            pageSize: 10,
            sear: that.data.Text == '' ? '-1' : that.data.Text
          },
          success: function(res) {
            wx.hideLoading()
            if (res.data.Status == 1) {
              that.data.list = that.data.list.concat(res.data.Result.dataList)
              that.setData({
                list: that.data.list,
              })
              that.data.pageIndex = that.data.pageIndex + 1
              that.setData({
                IsNext: res.data.Result.IsNext || false
              })
            } else if (res.data.Status == 40001) {
              wx.showModal({
                title: '提示',
                content: res.data.Result,
                success: function(res) {
                  if (res.confirm) {
                    wx.removeStorage({
                      key: 'token',
                      success: function(res) {
                        console.log("删除token，保证只提醒一次")
                      },
                    })
                    wx.navigateTo({
                      url: '../../../login/login',
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
          error: function() {
            wx.hideLoading()
          }
        })
      },
      fail: function(res) {
        wx.showModal({
          title: '提示',
          content: '获取信息失败，请重新登录',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../../../login/login',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      complete: function(res) {},
    })


  },
  /**
   * 弹窗
   */
  showDialogBtn: function(e) {
    var id = e.currentTarget.dataset.id
    this.setData({
      handleid: id,
    })
    // 显示遮罩层  
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(-500).step()
    this.setData({
      animationData: animation.export(),
      showModal: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModal: true
      })
    }.bind(this), 200)
  },
  // 监听input值改变，获取输入信息
  ChangeName(e) {
    this.setData({
      message: e.detail.value
    });
  },
  //关闭对话框
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function() {
    this.hideModal();
    var that = this
    wx.getStorage({
      key: 'token',
      success: function(res) {
        app.ajax({
          method: 'get',
          url: app.mainUrl + 'api/AppDeclare/AppRecpt',
          header: {
            "Authorization": res.data
          },
          data: {
            DecID: that.data.handleid,
            msg: that.data.message,
          },
          success: function(res) {
            wx.hideLoading()
            if (res.data.Status == 1) {
              wx.showToast({
                title: res.data.Result,
                pageIndex:1,
                list:[]
              })
              setTimeout(() => {
                that.getInfo()
              }, 1500);
            } else if (res.data.Status == 40001) {
              wx.showModal({
                title: '提示',
                content: res.data.Result,
                success: function(res) {
                  if (res.confirm) {
                    wx.removeStorage({
                      key: 'token',
                      success: function(res) {
                        console.log("删除token，保证只提醒一次")
                      },
                    })
                    wx.navigateTo({
                      url: '../../../login/login',
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
          error: function() {
            wx.hideLoading()
            wx.showModal({
              showCancel: false,
              title: '提示',
              content: "失败",
            })
          }
        })
      },
      fail: function(res) {
        wx.showModal({
          title: '提示',
          content: '获取信息失败，请重新登录',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../../login/login',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      complete: function(res) {},
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
    // wx.getStorage({
    //   key: 'token',
    //   success: function (res) {
    //     tt.setData({
    //       token: res.data
    //     });
    //   },
    //   fail: function (res) {
    //     wx.showToast({
    //       title: "获取信息失败，请重新登录"
    //     })
    //     setTimeout(() => {
    //       wx.navigateTo({
    //         url: '../../login/login'
    //       })
    //     }, 1500);
    //   },
    //   complete: function (res) {
    //   },
    // })
    // wx.getStorage({
    //   key: 'type',
    //   success: function (res) {
    //     tt.setData({
    //       type: res.data
    //     });
    //   },
    //   fail: function (res) {
    //     wx.showToast({
    //       title: "获取信息失败，请重新登录"
    //     })
    //     setTimeout(() => {
    //       wx.navigateTo({
    //         url: '../../login/login'
    //       })
    //     }, 1500);
    //   },
    //   complete: function (res) {
    //   },
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getInfo();
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
    var that = this
    if (that.data.IsNext) {
      if (that.data.pageIndex == 1) {
        that.setData({
          pageIndex: 2
        })
      }
      that.getInfo()
    } else {
      if (that.data.next == false) { //没有数据时弹框只提醒一次
        that.setData({
          next: true
        })
        if (that.data.list.length >= 1) {
          wx.showToast({
            title: '没有更多数据了',
          })
        }
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})