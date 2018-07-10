// pages/index/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    array1: [],
    index: 0,
    Text:''
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  Changeinput(e) {
    this.setData({
      Text: e.detail.value
    });
  },
  search(){
    wx.navigateTo({
      url: '../order/order?text=' + this.data.Text + '&id=' + this.data.array1[this.data.index].ID
    })
  },
  getInfo(){
    var that = this
    app.ajax({
      method: 'get',
      url: app.mainUrl + 'api/AppProductSort/TypeList',
      data: {},
      success: function (res) {
        wx.hideLoading()
        if (res.data.Status == 1) {
          for (let i = 0; i < res.data.Result.length;i++){
            that.data.array.push(res.data.Result[i].Type)
          }
          that.setData({
            array: that.data.array,
            array1: res.data.Result
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo()
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