//app.js
App({
  onLaunch: function () {
    console.log('小程序启动')
    wx.checkSession({
      success(){
        console.log('已登录')
      },
      fail(){
        console.log('未登录')
        wx.removeStorageSync('token')
      }
    })
  }
})