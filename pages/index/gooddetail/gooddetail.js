// pages/index/gooddetail/gooddetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailid:'',
    mainurl:'',
    List:[],
    spectype:[],
    userlist:[],
    check:'detail',
    pageIndex: 1,
    IsNext: false,
    next: false,//没有数据时弹框只提醒一次
    evalist:[]
  },
  getInfo(){
    var that = this;
    app.ajax({
      method: 'get',
      url: app.mainUrl + 'api/AppProductDetail/GetProductDetail',
      data: {
        "prodID": that.data.detailid,
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.Status == 1) {
          that.setData({
            List: res.data.Result,
            spectype: res.data.Result.spectype,
            userlist: res.data.Result.userlist,
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
                wx.navigateTo({
                  url: '../login/enter/enter',
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
  getComment(){
    var that = this
    app.ajax({
      method: 'get',
      url: app.mainUrl + 'api/AppProductComment/CommontList',
      data: {
        prodID: that.data.detailid,
        pageIndex: Number(that.data.pageIndex),
        pageSize: 10
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.Status == 1) {
          that.data.evalist = that.data.evalist.concat(res.data.Result.dataList)
          that.setData({
            evalist: that.data.evalist,
          })
          that.data.pageIndex = that.data.pageIndex + 1
          that.setData({
            IsNext: res.data.Result.IsNext || false
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
  changedetail(){
    this.setData({
      check: 'detail'
    })
  }, 
  changeeva() {
    this.setData({
      check: 'eva'
    })
  },
  // 打电话
  makePhoneCall: function (event) {
    var phone = event.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone,
      success: function () {
        console.log("成功拨打电话")
      }
    })
  },
  eva(){
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.navigateTo({
          url: '../eva/eva?id=' + that.data.detailid
        })
      },
      fail: function (res) {
        wx.navigateTo({
          url: '../../login/enter/enter'
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
    this.getInfo();
    this.getComment();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      mainurl: app.mainUrl,
    })
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
    var that = this;
    if (that.data.check == "eva"){
      if (that.data.IsNext) {
        if (that.data.pageIndex == 1) {
          that.setData({
            pageIndex: 2
          })
        }
        that.getComment()
      } else {
        if (that.data.next == false) {//没有数据时弹框只提醒一次
          that.setData({
            next: true
          })
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
  onShareAppMessage: function () {
  
  }
})