// pages/index/msg/report/report.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{
      No: '123456798',
      Status:'未处理',
      bz:'东西已妥当',
      dec:'物料描述  硫化氢检测馆/10*20ppm',
      name:'王师傅，李师傅，刘师傅',
      Time:'2018-06-15 13:46:56'
    }, {
      No: '123456798',
      Status: '催办接受',
      bz: '东西已妥当',
      dec: '物料描述  硫化氢检测馆/10*20ppm',
      name: '王师傅，李师傅，刘师傅',
      Time: '2018-06-15 13:46:56'
    }]
  },
  handle(){
    wx.navigateTo({
      url: 'detail/detail'
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