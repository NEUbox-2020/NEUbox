// pages/my_square_xiaoer/my_square_xiaoer.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showData:{},
    // 导航 数组
    list2: {},
    color1: "#000000",
    color2: "#979797",
    color3: "#000000",
    color4: "#000000",

    catesList: []
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
      url: '/pages/my_square_biaobai/my_square_biaobai',
    })
  },
  /*select2: function(e) {
    wx.reLaunch({
      url: "/pages/my_square_xiaoer/my_square_xiaoer",
    })
  },*/
   select3: function (e) {
     wx.reLaunch({
       url: "/pages/square_pinche0/square_pinche0",
     })
   },
  select4: function(e) {
    console.log(this.list2)
    wx.reLaunch({
      url: "/pages/my_square_shiwu/my_square_shiwu",
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    const db = wx.cloud.database()
    db.collection('Wall_waiter').where({
      publisher_id:app.globalData._id
    }).get({
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