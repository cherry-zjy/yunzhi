// pages/index/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailid:'',
    state:0,
    sear:'',
    pageIndex: 1,
    IsNext: false,
    next: false,//没有数据时弹框只提醒一次
    datalist:[]
  },
  onPickHeaderClick(){
    var that = this;
    // if (that.data.state == 'null'){
    //   that.setData({
    //     state: 'top',
    //   })
    // } else 
    if (that.data.state == '1'){
      that.setData({
        state: 0,
        pageIndex: 1,
        datalist:[],
      })
      that.getInfo()
    }else{
      that.setData({
        state: 1,
        pageIndex: 1,
        datalist: [],
      })
      that.getInfo()
    }
  },
  goodDetail(event){
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../gooddetail/gooddetail?id='+id
    })
  },
  getInfo(){
    var that = this
    app.ajax({
      method: 'get',
      url: app.mainUrl + 'api/AppProductSort/GetProductSortList',
      data: {
        pageIndex: Number(that.data.pageIndex),
        pageSize: 10,
        sear: that.data.sear == "" ? "-1" : that.data.sear,
        sortID: that.data.detailid,
        order: that.data.state
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.Status == 1) {
          that.data.datalist = that.data.datalist.concat(res.data.Result.dataList)
          that.setData({
            datalist: that.data.datalist,
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
  sort(){
    wx.showModal({
      showCancel: false,
      title: '提示',
      content: "该功能暂未开放哦"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mainurl: app.mainUrl,
      detailid: options.id,
      sear: options.text == undefined ? '' : options.text
    })
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
    var that = this;
    if (that.data.check == "eva") {
      if (that.data.IsNext) {
        if (that.data.pageIndex == 1) {
          that.setData({
            pageIndex: 2
          })
        }
        that.getInfo()
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