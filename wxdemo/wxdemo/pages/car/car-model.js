import Base from '../../utils/base.js'
class Car extends Base{
  constructor(){
    super()
  }
  addCar(addData,num){
    let carData=this.getCarData()
    addData.num=num
    addData.sel=true
    let idx=this.isExit(addData)
    if(idx==-1){
      carData.push(addData)
    }else{
      carData[idx].num+=num
    }
    this.setCarData(carData)
  }
  //判断商品是否存在
  isExit(data){
    let carData=this.getCarData()
    let idx=-1
    carData.map((item,index)=>{
      if(data._id==item._id){
        idx=index
      }
    })
    return idx
  }
  //获取购物车数据 判断购物车数据的有无
  getCarData(){
    let data=wx.getStorageSync('car')
    if(!data){
      data=[]
    }
    return data
  }
  // 修改购物车数据
  setCarData(data){
    wx.setStorageSync('car',data)
  }
  // 加入购物车 +  - 删除 
  changeNum(idx,changeType){
    let carData=this.getCarData()
    switch(changeType){
      case 0:
        carData[idx].num++
      break;
      case 1:
        if(carData[idx].num>1){
          carData[idx].num--
        }
      break;
      case -1:
        carData.splice(idx,1)
      break;
    }
    this.setCarData(carData)
  }
  // 选中 单选
  select(index){
    let carData=this.getCarData()
    carData[index].sel=!carData[index].sel
    this.setCarData(carData)
  }
  // 选中 全选
  selectAll(state){
    let carData=this.getCarData()
    let result=carData.map((item,index)=>{
      item.sel=state
      return item
    })
    this.setCarData(result)
  }
  //获取商品总数
  getAllCount(){
    let carData=this.getCarData()
    let all=0
    carData.map((item)=>{
      if(item.sel){
        all+=item.num
      }
    })
    return all
  }
  //获取总商品总价
  getAllPrice(){
    let carData=this.getCarData()
    let allPrice=0
    carData.map((item)=>{
      if(item.sel){
        allPrice+=item.price*item.num
      }
    })
    return allPrice
  }
  //下单
  order(){
    let orderList=[]
    let newCarData=[]
    let carData=this.getCarData()
    carData.map((item)=>{
      if(item.sel){
        orderList.push(item)
      }else{
        newCarData.push(item)
      }
    })
    this.setCarData(newCarData)
    wx.setStorageSync('order',orderList)
  }
}
export default Car