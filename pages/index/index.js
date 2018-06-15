//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    goodsList:[{
      ID:'1',
      ImageUrl:'../../img/sy_recommended_material@2x.png',
      Name:'全自动普色艺展开仪NIFETK-2E',
      Company:'仪器品牌公司'
    }, {
      ID: '1',
      ImageUrl: '../../img/sy_recommended_material@2x.png',
      Name: '全自动普色艺展开仪NIFETK-2E',
      Company: '仪器品牌公司'
      }, {
        ID: '1',
        ImageUrl: '../../img/sy_recommended_material@2x.png',
        Name: '全自动普色艺展开仪NIFETK-2E',
        Company: '仪器品牌公司'
      }, {
        ID: '1',
        ImageUrl: '../../img/sy_recommended_material@2x.png',
        Name: '全自动普色艺展开仪NIFETK-2E',
        Company: '仪器品牌公司'
      },
    ]
  },
  search(){
    wx.navigateTo({
      url: 'search/search'
    })
  },
  orderdetail(){
    wx.navigateTo({
      url: 'order/order'
    })
  },
  cuiban(){
    wx.navigateTo({
      url: 'msg/msg'
    })
  },
  alldetail(){
    wx.navigateTo({
      url: 'allorder/allorder'
    })
  },
  goodsDetail(){
    wx.navigateTo({
      url: 'gooddetail/gooddetail'
    })
  }
})
