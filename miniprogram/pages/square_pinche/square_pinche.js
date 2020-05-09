// pages/index-new/index-new.js
const time = require("../../utils/util.js");//根据自己项目的位置而定
const db = wx.cloud.database();//初始化数据库
const p_collection= db.collection('Message_car')
Page({

  /**
   * 页面的初始数据
   */
   data: {
    showData:{},
    // 导航 数组
    list2: {},
    color1: "#000000",
    color2: "#000000",
    color3: "#979797",
    color4: "#000000",

    searchVal: "",
    //搜索过后商品列表
    
    goodList:[],

    catesList: [],
    list: [{
      face_url: "/images/add.png",
      username: "哆啦B梦",
      send_time: "2019-7-6 11:11:11",
      content: "asadshfjdaljfkdlakfldalf",
      total_likes: 99
    },
    {
      face_url: "/images/nice.png",
      username: "哆啦C梦",
      send_time: "2019-7-6 11:11:11",
      content: "asadshfjdaljfkdlakfldalf",
      total_likes: 99
    },
    {
      face_url: "/images/nice_true.png",
      username: "哆啦D梦",
      send_time: "2019-7-6 11:11:11",
      content: "asadshfjdaljfkdlakfldalf",
      total_likes: 99
    },
    {
      face_url: "/images/nice.png",
      username: "哆啦C梦",
      send_time: "2019-7-6 11:11:11",
      content: "asadshfjdaljfkdlakfldalf",
      total_likes: 99
    },
    {
      face_url: "/images/nice_true.png",
      username: "哆啦D梦",
      send_time: "2019-7-6 11:11:11",
      content: "asadshfjdaljfkdlakfldalf",
      total_likes: 99
    }
    ]
  },
  do_likes:function(e){
    //获取当前点赞数 
    //对当前点赞数+1
  },
  searchtap:function(e){
    console.log("search")
    wx.navigateTo({
    url: '/pages/search_car/search_car',
  })
  },
  input(e) {
    this.setData({
      searchVal: e.detail.value
    })
    console.log(e.detail.value)
  },
  clear: function () {
    this.setData({
      searchVal: ""
    })
  },
  //商品关键字模糊搜索
  search: function () {
    var that=this
    wx: wx.showLoading({
      title: '加载中',
      mask: true,
      success: function (res) { },
      fail: function (res) { 
        wx.hideLoading();
        console.log("失败");
      },
      complete: function (res) { },
    })
    //重新给数组赋值为空
    that.setData({
      'goodList': []
    })
    // 数据库正则对象
    //const _ = db.command
    p_collection.where({
      message: db.RegExp({
        regexp: that.data.searchVal,//做为关键字进行匹配
        options: 'i',//不区分大小写
      })
    })
    .get().then(res => {
      console.log(res.data)
      if( res.data.length<1){
        wx.hideLoading();
        wx.showModal({
          title: '温馨提示：',
          content:'没有找到您要搜索的内容哦',
          showCancel:false
        })
      }
      for (var i = 0; i < res.data.length; i++) {
        var title = "goodList[" + i + "].title"
        var id = "goodList[" + i + "].id"
        var image = "goodList[" + i + "].image"
        var time = "goodList[" + i + "].time"
       // var rmb = "goodList[" + i + "].rmb"
       // var content = "goodList["+ i +"].content"
       that.setData({
        [title]: res.data[i].message,
        [id]: res.data[i]._id,
        [image]: res.data[i].image[0],
        [time]:res.data[i].timestamp,
         // [rmb]: res.data[i].price,
         //[content]: res.data[i].description,
       })
       console.log(that.data.goodList[i].content)
       wx.hideLoading();
     }
   }).catch(err => {
    console.error(err)
    wx.hideLoading();
  })
 },
 navigateToDetail:function(event){
  wx.navigateTo({
    url: '../page1/page1',
  })
},
getCateList() {
  request({
    url: "/home/catitems"
  })
  .then(result => {
    this.setData({
      catesList: result
    })
  })
},
select1: function(e) {
  wx.reLaunch({
    url: '/pages/square_biaobai/square_biaobai',
  })
},
select2: function(e) {
  wx.reLaunch({
    url: "/pages/square_xiaoer/square_xiaoer",
  })
},
  // select3: function (e) {
  //   wx.redirectTo({
  //     url: "/pages/square_pinche/square_pinche",
  //   })
  // },
  select4: function(e) {
    console.log(this.list2)
    wx.reLaunch({
      url: "/pages/square_shiwu/square_shiwu",
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function(options) {
    var that = this
    const db = wx.cloud.database()
     db.collection('Message_car').orderBy('timestamp', 'desc').get({
      success: function(res) {
        // res.data 包含该记录的数据   
        console.log(res)
        console.log(res.data)
        that.setData({
          showData : res.data
        })


        console.log(that.data.showData)
      },
      complete: function(res) {


        console.log("222")
      },
      failed(res) {
        wx.showModal({
          title: '提示',
          content: '网络好像开小差了',
          showCancel: false,

        })
      }
    })

    // console.log(that.list2.data)

  },



})