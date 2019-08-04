// pages/map/map.js
Page({
  //页面的初始数据
  data: {
    tempFilePath:'',
    latitude:0,
    longitude:0,
    markers:[
      {
        iconPath:"/common/map/3.png",
        id:0,
        latitude:40,
        longitude:116,
        width:30,
        height:30
      },
      {
        iconPath: "/common/map/4.png",
        id: 1,
        latitude: 40,
        longitude: 116.1,
        width: 30,
        height: 30
      },
      {
        iconPath: "/common/map/7.png",
        id: 2,
        latitude: 40.121186,
        longitude: 116.24586,
        width: 30,
        height: 30
      }
    ],
    controls:[
      {
        id:0,
        iconPath:'/common/map/14.png',
        position:{
          left:10,
          top:400-50,
          width:30,
          height:30
        },
        clickable:true
      }
    ]
  },
  regionchange(e) {
    //console.log('视野开始改变', e.type)
  },
  //markers组件
  markertap(e) {    
    console.log(e.markerId)
  },
  //controls组件
  controltap(){     
    this.getLocation()
  },
  //获取自己位置
  getLocation(){    
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: (res)=> {
        const latitude=res.latitude
        const longitude=res.longitude
        const speed=res.speed
        const accuracy=res.accuracy
        this.setData({ latitude, longitude})
      },
      fail: (res)=> {},
      complete: (res)=> {},
    })
  },
  //打开地图选择位置
  chooseLocation() {
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
      },
    })
  },
  //使用微信内置地图查看位置
  openLocation() {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success:(res)=> {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 18
        })
      }
    })
  },
  //开始录音
  startRecord() {     
    wx.startRecord({
      success: (res) => {
        console.log(res)
        this.setData({ tempFilePath: res.tempFilePath })
      }
    })
  },
  //停止录音
  stopRecord() {    
    wx.stopRecord()
  },
  //播放录音
  play() {      
    wx.playVoice({
      filePath: this.data.tempFilePath,
    })
  },
  //分享
  share() {     
    wx.showShareMenu({
      withShareTicket: true,
      success() {
        console.log('success')
      },
      fail() {
        console.log('err')
      }
    })
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    this.getLocation()
  }
})