// pages/index/allorder/allorder.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    List: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  commend() {
    var that = this
    app.ajax({
      method: 'get',
      url: app.mainUrl + 'api/AppProductSort/TypeList',
      data: {},
      success: function (res) {
        wx.hideLoading()
        if (res.data.Status == 1) {
          that.setData({
            List: res.data.Result
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
  orderdetail(event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: "../order/order?id=" + id,
    })
  },
  onLoad: function(options) {
    this.setData({
      mainurl: app.mainUrl,
    })
    this.commend()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})