// pages/index/gooddetail/gooddetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    List:{
      Image:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      Star:4,
      Nostar:1,
      Name: '全自动宝色谱展开仪NIFETK-2E',
    },
    check:'detail',
    evalist:[{
      Name:'用户',
      Star: 4,
      Nostar: 1,
      Time: '2018-06-14',
      Content:'很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒',
    },{
      Name: '用户',
      Star: 4,
      Nostar: 1,
      Time: '2018-06-14',
      Content: '很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒',
      }, {
        Name: '用户',
        Star: 4,
        Nostar: 1,
        Time: '2018-06-14',
        Content: '很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒很棒',
      }]
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
  makePhoneCall: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: '18258773565',
      success: function () {
        console.log("成功拨打电话")
      }
    })
  },
  eva(){
    wx.navigateTo({
      url: '../eva/eva'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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