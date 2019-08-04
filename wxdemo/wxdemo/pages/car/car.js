// pages/car/car.js
import Car from './car-model.js'
const car =new Car()
Page({
  data: {
    carData:[],
    baseUrl:car.baseUrl,
    selectAll:false,
    allCount:0,
    allPrice:0
  },
  onShow: function (options) {
    this.refresh()
  },
  select(e){
    let index=car.getDataSet(e,'index')
    car.select(index)
    this.refresh()
  },
  selAll(){
    let state=!this.data.selectAll
    car.selectAll(state)
    this.setData({selectAll:state})
    this.refresh()
  },
  add(e){
    let index=car.getDataSet(e,'index')
    car.changeNum(index,0)
    this.refresh()
  },
  reduce(e){
    let index =car.getDataSet(e,'index')
    car.changeNum(index,1)
    this.refresh()
  },
  del(e){
    let index=car.getDataSet(e,'index')
    car.changeNum(index,-1)
    this.refresh()
  },
  refresh(){
    let carData=car.getCarData()
    let allPrice=car.getAllPrice()
    let allCount=car.getAllCount()
    this.setData({carData,allCount,allPrice})
  },
  submitOrder(){
    car.order()
    wx.navigateTo({
      url: '/pages/order/order',
    })
  }
})