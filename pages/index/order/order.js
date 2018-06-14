// pages/index/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:'null',
    datalist:[{
      ID:'1',
      Name:'全自动宝色谱展开仪NIFETK-2E',
      Company:'仪器品牌公司',
      Star: 3,
      Image:'../../../img/sy_recommended_material@2x.png',
      Nostar:2
    },{
      ID:'1',
      Name:'全自动宝色谱展开仪NIFETK-2E',
      Company:'仪器品牌公司',
      Star: 3,
      Image:'../../../img/sy_recommended_material@2x.png',
      Nostar:2
    }]
  },
  onPickHeaderClick(){
    var that = this;
    if (that.data.state == 'null'){
      that.setData({
        state: 'top',
      })
    } else if (that.data.state == 'top'){
      that.setData({
        state: 'bottom',
      })
    }else{
      that.setData({
        state: 'null',
      })
    }
  },
  goodDetail(){
    wx.navigateTo({
      url: '../gooddetail/gooddetail'
    })
  },
  // star(){

  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // star()
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