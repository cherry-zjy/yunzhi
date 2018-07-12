//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [],
    orderlist: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    pageIndex: 1,
    msgbox: false,
    IsNext: false,
    next: false, //没有数据时弹框只提醒一次
    goodsList: []
  },
  getBanner() {
    var that = this;
    app.ajax({
      method: 'get',
      url: app.mainUrl + 'api/AppHomePage/GetBannerList',
      data: {
        pageIndex: 1,
        pageSize: 999
      },
      success: function(res) {
        wx.hideLoading()
        if (res.data.Status == 1) {
          that.setData({
            imgUrls: res.data.Result.dataList,
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
  commend() {
    var that = this
    app.ajax({
      method: 'get',
      url: app.mainUrl + 'api/AppProductSort/TypeList',
      data: {},
      success: function(res) {
        wx.hideLoading()
        if (res.data.Status == 1) {
          if (res.data.Result.length <= 5) {
            for (let i = 0; i < res.data.Result.length; i++) {
              that.data.orderlist.push(res.data.Result[i])
            }
          } else {
            for (let i = 0; i < 5; i++) {
              that.data.orderlist.push(res.data.Result[i])
            }
          }
          that.setData({
            orderlist: that.data.orderlist,
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
  getInfo() {
    var that = this
    app.ajax({
      method: 'get',
      url: app.mainUrl + 'api/AppHomePage/CommendInstrument',
      data: {
        pageIndex: Number(that.data.pageIndex),
        pageSize: 10
      },
      success: function(res) {
        wx.hideLoading()
        if (res.data.Status == 1) {
          that.data.goodsList = that.data.goodsList.concat(res.data.Result.data)
          that.setData({
            goodsList: that.data.goodsList,
          })
          that.data.pageIndex = that.data.pageIndex + 1
          that.setData({
            IsNext: res.data.Result.data[0].IsNext || false
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
  gotobanner(event) {
    var url = event.currentTarget.dataset.url
    wx.navigateTo({
      url: "banner/banner?url=" + url,
    })
  },
  search() {
    wx.navigateTo({
      url: 'search/search'
    })
  },
  orderdetail(event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: "order/order?id=" + id,
    })
  },
  cuiban() {
    wx.navigateTo({
      url: 'msg/msg'
    })
  },
  alldetail() {
    wx.navigateTo({
      url: 'allorder/allorder'
    })
  },
  goodsDetail(event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: 'gooddetail/gooddetail?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var tt = this;
    if (options.isvisitor) {
      console.log(options.isvisitor)
      tt.setData({
        msgbox: false
      })
    } else {
      console.log("???"+options.isvisitor)
      wx.getStorage({
        key: 'type',
        success: function(res) {
          console.log(res.data)
          if (res.data == 0 || res.data == 1) {
            tt.setData({
              msgbox: false
            })
          } else {
            tt.setData({
              msgbox: true
            })
          }
        },
        fail: function(res) {
          console.log(res.data)
          if (options.isvisitor) {
            tt.setData({
              msgbox: false
            })
          } else {
            wx.navigateTo({
              url: '../login/enter/enter'
            })
          }
        },
        complete: function(res) {},
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.setData({
      mainurl: app.mainUrl,
      pageIndex: 1
    })
    this.getBanner();
    this.getInfo();
    this.commend();
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this
    this.setData({
      pageIndex: 1,
      goodsList: []
    })
    app.ajax({
      method: 'get',
      url: app.mainUrl + 'api/AppHomePage/CommendInstrument',
      data: {
        pageIndex: Number(that.data.pageIndex),
        pageSize: 10
      },
      success: function(res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        if (res.data.Status == 1) {
          that.data.goodsList = that.data.goodsList.concat(res.data.Result.data)
          that.setData({
            goodsList: that.data.goodsList,
          })
          that.data.pageIndex = that.data.pageIndex + 1
          that.setData({
            IsNext: res.data.Result.data[0].IsNext || false
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
        wx.showToast({
          title: '没有更多数据了',
        })
      }
    }
  },
})