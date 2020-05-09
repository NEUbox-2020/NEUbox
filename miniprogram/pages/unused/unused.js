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
        image_src:"../../image/fenlei.png",
        url:"/pages/category/category"
      },
      {
        id:2,
        name:"发布",
        image_src:"../../image/fabu.png",
        url:"/pages/publish/publish",
      },
      {
        id:3,
        name:"收藏",
        image_src:"../../image/shoucangList.png",
        url:"/pages/collect/collect"
      },
      {
        id:4,
        name:"订单",
        image_src:"../../image/dingdan.png",
        url:"/pages/order/order"
      }
    ],
    // 楼层数据
    // floorList:[],
    floorList: [
      {
      floor_title: {
      name: "时尚女装",
      image_src: "https://api-hmugo-web.itheima.net/pyg/pic_floor01_title.png"
      },
      product_list: [
      {
      name: "优质服饰",
      image_src: "https://api-hmugo-web.itheima.net/pyg/pic_floor01_1@2x.png",
      image_width: "232",
      open_type: "navigate",
      navigator_url: "/pages/goods_list?query=服饰"
      },
      {
      name: "春季热门",
      image_src: "https://api-hmugo-web.itheima.net/pyg/pic_floor01_2@2x.png",
      image_width: "233",
      open_type: "navigate",
      navigator_url: "/pages/goods_list?query=热"
      },
      {
      name: "爆款清仓",
      image_src: "https://api-hmugo-web.itheima.net/pyg/pic_floor01_3@2x.png",
      image_width: "233",
      open_type: "navigate",
      navigator_url: "/pages/goods_list?query=爆款"
      },
      {
      name: "倒春寒",
      image_src: "https://api-hmugo-web.itheima.net/pyg/pic_floor01_4@2x.png",
      image_width: "233",
      open_type: "navigate",
      navigator_url: "/pages/goods_list?query=春季"
      },
      {
      name: "怦然心动",
      image_src: "https://api-hmugo-web.itheima.net/pyg/pic_floor01_5@2x.png",
      image_width: "233",
      open_type: "navigate",
      navigator_url: "/pages/goods_list?query=心动"
      }
      ]
      },
      {
      floor_title: {
      name: "户外活动",
      image_src: "https://api-hmugo-web.itheima.net/pyg/pic_floor02_title.png"
      },
      product_list: [
      {
      name: "勇往直前",
      image_src: "https://api-hmugo-web.itheima.net/pyg/pic_floor02_1@2x.png",
      image_width: "232",
      open_type: "navigate",
      navigator_url: "/pages/goods_list?query=户外"
      },
      {
      name: "户外登山包",
      image_src: "https://api-hmugo-web.itheima.net/pyg/pic_floor02_2@2x.png",
      image_width: "273",
      open_type: "navigate",
      navigator_url: "/pages/goods_list?query=登山包"
      },
      {
      name: "超强手套",
      image_src: "https://api-hmugo-web.itheima.net/pyg/pic_floor02_3@2x.png",
      image_width: "193",
      open_type: "navigate",
      navigator_url: "/pages/goods_list?query=手套"
      },
      {
      name: "户外运动鞋",
      image_src: "https://api-hmugo-web.itheima.net/pyg/pic_floor02_4@2x.png",
      image_width: "193",
      open_type: "navigate",
      navigator_url: "/pages/goods_list?query=运动鞋"
      },
      {
      name: "冲锋衣系列",
      image_src: "https://api-hmugo-web.itheima.net/pyg/pic_floor02_5@2x.png",
      image_width: "273",
      open_type: "navigate",
      navigator_url: "/pages/goods_list?query=冲锋衣"
      }
      ]
      },
      {
      floor_title: {
      name: "箱包配饰",
      image_src: "https://api-hmugo-web.itheima.net/pyg/pic_floor03_title.png"
      },
      product_list: [
      {
      name: "清新气质",
      image_src: "https://api-hmugo-web.itheima.net/pyg/pic_floor03_1@2x.png",
      image_width: "232",
      open_type: "navigate",
      navigator_url: "/pages/goods_list?query=饰品"
      },
      {
      name: "复古胸针",
      image_src: "https://api-hmugo-web.itheima.net/pyg/pic_floor03_2@2x.png",
      image_width: "263",
      open_type: "navigate",
      navigator_url: "/pages/goods_list?query=胸针"
      },
      {
      name: "韩版手链",
      image_src: "https://api-hmugo-web.itheima.net/pyg/pic_floor03_3@2x.png",
      image_width: "203",
      open_type: "navigate",
      navigator_url: "/pages/goods_list?query=手链"
      },
      {
      name: "水晶项链",
      image_src: "https://api-hmugo-web.itheima.net/pyg/pic_floor03_4@2x.png",
      image_width: "193",
      open_type: "navigate",
      navigator_url: "/pages/goods_list?query=水晶项链"
      },
      {
      name: "情侣表",
      image_src: "https://api-hmugo-web.itheima.net/pyg/pic_floor03_5@2x.png",
      image_width: "273",
      open_type: "navigate",
      navigator_url: "/pages/goods_list?query=情侣表"
      }
      ]
      }
      ],

      // 已发布的数据展示
      goods:[]
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
    const db = wx.cloud.database();
    db.collection('Products').where({
      sold_out_or_not: false,
    })
    .get({
      success: res=> {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data),
        this.setData({
          goods:res.data
        });
        wx.setStorageSync("goods", this.data.goods);
      }
    })

    // 设置本地存储

    // 要把得到的数据展示
    // var reqTask = wx.request({
    //   url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
    //   success: (result) => {
    //     this.setData({swiperList:result.data.message})
    //     // console.log(result)
    //   }

    // });
    // this.getFloorList()
    
  },
  onShow: function (options){
    const db = wx.cloud.database();
    db.collection('Products').where({
      sold_out_or_not: false,
    })
    .get({
      success: res=> {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data),
        this.setData({
          goods:res.data
        });
        wx.setStorageSync("goods", this.data.goods);
      }
    })


  }



  
})
