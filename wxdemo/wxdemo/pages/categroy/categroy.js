// pages/categroy/categroy.js
import Categroy from './categroy-model.js'
const categroy = new Categroy()
Page({
  data: {
    baseUrl: categroy.baseUrl,
    navSel:0,
    nav: ['面食', '煎档', '烧烤', '酒水','特色菜'],
    typeInfo:[]
  },
  onLoad: function (options) {
    console.log('typeInfo',this.data.typeInfo)
    this.getInfoByType(1) 
  },
  sel(e){
    let index = categroy.getDataSet(e, 'index')
    this.setData({navSel:index})
    this.getInfoByType(index + 1)
  },
  getInfoByType(id) {
    let typeInfo = wx.getStorageSync('typeInfo')    
    console.log(typeInfo)
    if (typeInfo) {
      //typeifno 存在
      let exit = this.isExit(id)
      if (exit == -1) {
        console.log('数据不存在')
        categroy.axios('GET', `/api/home/goodsByType?type=${id}`)
          .then((res) => {
            let data = wx.getStorageSync('typeInfo')
            data.push(res)
            this.setData({ typeInfo: data })
            wx.setStorageSync('typeInfo', data)
          })
      } else {
        console.log('数据存在')
        let data = wx.getStorageSync('typeInfo')[exit]        
        console.log(data)
      }
    } else {
      let typeInfo = []
      let name = this.data.nav[id - 1]
      let temp = null;
      categroy.axios('GET', `/api/home/goodsByType?type=${id}`)
        .then((res) => {
          temp = res
          console.log(temp)
          typeInfo.push(temp)
          wx.setStorageSync('typeInfo', typeInfo)
          let data = wx.getStorageSync('typeInfo')
          this.setData({ typeInfo:data })
        })
    }
  },
  // 判断类别在缓存中是否存在
  isExit(id) {
    // -1 到缓存长度  -1 表示不存在 0 ，1，2 数据存在并且返回下标
    let index = -1
    let name = this.data.nav[id - 1]
    let typeInfo = wx.getStorageSync('typeInfo')
    typeInfo.map((item, idx) => {
      if (name == item.name) {
        //存在
        index = idx
      }
    })
    return index

  }
})