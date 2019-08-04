import config from './config.js'
class Base{
  constructor(){
    this.baseUrl=config.rootApi
  }
  axios(method,url,data){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: this.baseUrl + url,
        method:method,
        data:data,
        success:(data)=>{
          resolve(data.data)
        },
        fail:(err)=>{
          reject(err)
        }
      })
    })
  }
  getDataSet(event,key){
    if(key){
      return event.currentTarget.dataset[key]
    }else{
      return event.currentTarget.dataset
    }
  }
}

export default Base