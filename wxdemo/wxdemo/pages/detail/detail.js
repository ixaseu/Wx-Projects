// pages/detail/detail.js
import Detail from './detail-model.js'
import Car from '../car/car-model.js'
const detail =new Detail()
const car =new Car()
Page({
  data: {
    productCounts:1,
    range:[1,2,3,4,5,6,7,8,9],
    loading:true,
    info:{},
    baseUrl:detail.baseUrl,
    currentTabsIndex:0,
    cartTotalCounts:0
  },
  // 购物车图标数量角标
  getTotalCounts(){
    let carData = wx.getStorageSync('car')
    let totalCount = 0
    carData.map((item) => {      
      totalCount += item.num
    })
    this.setData({ cartTotalCounts:totalCount}) 
  },
  onLoad: function (option) {
    let id=option.id
    this.getFoodInfo(id)
    this.getTotalCounts()
  },
  //获取商品信息
  getFoodInfo(foodId){
    detail.axios('GET',`/api/home/getGoodsById?_id=${foodId}`)
    .then((res)=>{
      let info=res.data[0]
      this.setData({loading:false,info})
    })
  },
  // 选项卡切换
  changeTab(e){
    let index=detail.getDataSet(e,'index')
    this.setData({currentTabsIndex:index})
  },
  // 跳转到购物车
  goCar(){
    wx.switchTab({
      url: '/pages/car/car',
    })
  },
  // 购买数量
  changeNum(e){
    let index=e.detail.value
    let num=this.data.range[index]
    this.setData({productCounts:num})
  },
  // 添加到localstorage购物车中
  addCar(){
    car.addCar(this.data.info,this.data.productCounts)
    this.getTotalCounts()
  }
})