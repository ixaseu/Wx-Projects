// pages/home/home.js
import Home from './home-model.js'
const home= new Home()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:home.baseUrl,
    banners:[],
    indicatorDots: true,
    autoplay: true,
    circular:true,
    interval: 4000,
    duration: 800,
    products:[],
    themes:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    home.axios('GET','/api/home/getHome')
    .then((res)=>{
      console.log(res)
      let {banners,products,themes}=res.data
      this.setData({banners,products,themes})
    })
  },
  goDetail(e){
    let id=home.getDataSet(e,'id')
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
  goTheme(e){
    let {themeid,title}=home.getDataSet(e)
    wx.navigateTo({
      url: `/pages/theme/theme?themeid=${themeid}&title=${title}`
    })
  },
  onPullDownRefresh(){
    home.axios('GET','/api/home/getHome')
    .then((res)=>{
    let {banners,products,themes}=res.data
      this.setData({ banners, products, themes})
      wx.stopPullDownRefresh()
    })
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