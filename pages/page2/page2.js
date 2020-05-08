// miniprogram/pages/page2/page2.js
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {

    swiperList:[
      {
        id:0,
        image_src:"../../image//pic7.jpg"
      },
      {
        id:1,
        image_src:"../../image/pic10.jpg"
      },
      {
        id:2,
        image_src:"../../image/pic9.jpg"
      },
      {
        id:3,
        image_src:"../../image/pic12.jpg"
      }
    ],
    catesList:[
      {
        id:1,
        name:"分类",
        image_src:"../../image/fenlei5.jpg"
      },
      {
        id:2,
        name:"发布",
        image_src:"../../image/fabu5.jpg"
      },
      {
        id:3,
        name:"热门",
        image_src:"../../image/remen5.jpg"
      }
    ],
    // 楼层数据
    floorList:[]
    


  },
 
  getUserInfo(e){ 
    console.log(e)
  },
  handleChange(e){
     let gender = e.detail.value
     this.setData({gender})
  },

  handleItemChange(e){
    // console.log(e);
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({tabs})
  },
  getFloorList(){
    request({ url:"https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"})
    .then(result =>{
      this.setData({
        floorList:result.data.message
      })
    })

  },
 /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var reqTask = wx.request({
    //   url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
    //   success: (result) => {
    //     this.setData({swiperList:result.data.message})
    //     // console.log(result)
    //   }

    // });
    this.getFloorList()
    
  },




  
})
