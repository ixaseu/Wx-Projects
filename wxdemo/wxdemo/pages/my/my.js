// pages/my/my.js
import My from './my-model.js'
const my =new My()
Page({
  //页面的初始数据
  data: {
    isLogin:false
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    let token = wx.getStorageSync('token')
    this.setData({isLogin:token})
    console.log('token',token)
  },
  goMap(e) {
    wx.navigateTo({
      url: '/pages/map/map',
    })
  },
  login(){
    wx.login({
      success:(res)=>{
        console.log(res)
        my.axios("POST",'/api/user/appletlogin',{code:res.code})
        .then((res)=>{
          console.log(res)
          let token=res.token
          wx.setStorageSync('token',token)
          this.setData({isLogin:true})
        })
      }
    })
  },
  getInfo(){
    wx.getUserInfo({
      success(info){
        console.log(info)
      },
      fail(){
        console.log(err)
      }
    })
  }
})