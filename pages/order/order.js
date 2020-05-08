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
    // const address=wx.getStorageSync("address");
    // const orderList=wx.getStorageSync("order");
    // this.setData({
    //   orderList,
    //   address
    // })
    const db = wx.cloud.database();
    db.collection('Orders').where({
      deleted: false
    })
    .get({
      success: res=> {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data),
        this.setData({
          orderList:res.data
        });
        // wx.setStorageSync("orderList", res.data.good);
      }
    })
  },

  handleDelete(e){
    const id=e.currentTarget.dataset.id;
    // for(var i=0;i<this.data.orderList.length;i++){
    //   if(this.data.orderList.goods_id===id)
    // }
    const db = wx.cloud.database();
    db.collection('Orders').doc(id).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        deleted: true
      },
      success: res=> {
        wx.showToast({
          title:"删除成功",
          icon:"success",
          // 防止用户手抖
          mask:true,
        });
      fail:err=>{
        wx.showToast({
          title:"删除失败",
          icon:"none",
          // 防止用户手抖
          mask:true,
        });
      }
      }
    })
    
    // const id=e.currentTarget.dataset.id;
    // const orderList = wx.getStorageSync("order");
    // for(var i=0;i<orderList.length;i++){
    //   if(orderList[i]._id===id){
    //     orderList.splice(i,1)
    //   }
    // }
    // wx.setStorageSync("order", orderList);
    // this.setData({
    //   orderList
    // })
    // wx.showToast({
    //   title:"删除成功",
    //   icon:"success",
    //   // 防止用户手抖
    //   mask:true,
    // });
  },

  //  下拉刷新事件
  onPullDownRefresh(){
    // const address=wx.getStorageSync("address");
    // const orderList=wx.getStorageSync("order");
    // this.setData({
    //   orderList,
    //   address
    // })
    const db = wx.cloud.database();
    db.collection('Orders').where({
      deleted: false
    })
    .get({
      success: res=> {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data),
        this.setData({
          orderList:res.data
        });
        // wx.setStorageSync("orderList", res.data.good);
      }
    })
  }
 
  

 
})