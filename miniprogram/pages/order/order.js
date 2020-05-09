// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[],
    address:{},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const address=wx.getStorageSync("address");
    // const orderList=wx.getStorageSync("order");
    // this.setData({
    //   orderList,
    //   address
    // })
    const db = wx.cloud.database();
    db.collection('Products').where({
      sold_out_or_not: true,
    })
    .get({
      success: res=> {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data),
        this.setData({
          orderList:res.data
        });
        // wx.setStorageSync("goods", this.data.goods);
      }
    })
  },

  handleDelete(e){
    const id=e.currentTarget.dataset.id;
    const orderList = wx.getStorageSync("order");
    for(var i=0;i<orderList.length;i++){
      if(orderList[i]._id===id){
        orderList.splice(i,1)
      }
    }
    wx.setStorageSync("order", orderList);
    wx.showToast({
      title:"删除成功，请刷新后查看",
      icon:"success",
      // 防止用户手抖
      mask:true,
    });
    this.setData({
      orderList
    })
  },

  //  下拉刷新事件
  onPullDownRefresh(){
    const address=wx.getStorageSync("address");
    const orderList=wx.getStorageSync("order");
    this.setData({
      orderList,
      address
    })
  }
 
  

 
})