// pages/pay/pay.js
import {request} from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime"
import  {getSetting,chooseAddress,openSetting} from "../../utils/asyncWx.js";
/*
1 获取用户的收货地址
  1 绑定点击事件
  2 错误  调用小程序内置的API 获取用户的收获地址 wx.chooseAddress

  2 正确流程
    获取用户对小程序所授予的获取地址的权限状态 scope   authSetting  scope.address
    1 假设用户在一开始点击收货地址的提示框为确定 scope true  直接调用
    2 假设用户从来没有调用过 scope undefined  直接调用收货地址
    3 假设点的 取消 scope false  
      1 诱导用户自己打开 授权设置页面  当用户重新给与获取收货地址的时候  wx.openSetting
      2 获取收货地址
    4 把获取的收货地址 存到本地存储
2 页面加载完毕
onshow
  1 获取本地存储中的地址数据
  2 把数据设置给data中的一个变量
3 onShow 
  0 如果要做成类似淘宝的功能 则要回到商品详情页面手动添加属性
      1 num=1
      2 check
  1 获取缓存中的购物车数组
  2 把这个购物车数据填充到data中
4 点击付款 
  1 有没有收货地址
  2 调用微信支付功能
     1 哪些人 哪些装好 可以实现微信账户
       企业账号 
       并且企业账户的小程序要有白名单
         一个APPID可以绑定多个开发者
         这些开发者可以共用APPID和开发权限
  3 支付按钮
    1 点击支付按钮 判断缓存中有没有用户token 
    2 没有 跳转到授权页面 进行获取
    3 有则进行下一步
    4 创建订单

    
  
*/
Page({
  // 点击 收获地址
  async handleChooseAddress(){
  try {
    // 1 获取 权限状态
    const res1=await getSetting();
    const scopeAddress= res1.authSetting["scope.address"];
    // 2 判断权限状态
    if(scopeAddress===false){
      // 3 用户以前拒绝过授予权限  提示用户打开授权页面
       await openSetting();
    }
    // 4 直接调用获取收货地址的API
    let address=await chooseAddress();
    address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo;
    // 存入缓存
    wx.setStorageSync("address", address);
   } catch (error) {
   console.log(error); 
 }
},
    
   
  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    order_price:0
  },

  /**
   * 生命周期函数
   */
  onShow(){
    // 1 获取缓存中的收货地址信息
    // console.log("111")
    const address=wx.getStorageSync("address");
    // 获取缓存中的购物车数据
    const cart=wx.getStorageSync("cart");
    // 给data赋值
    this.setData({
      address,
      cart
    })
    


  },


  handlePay(e){
    // 获取当前商品价格
    const order_price=e.currentTarget.dataset.price;
    // console.log("111"+order_price);
    this.setData({
      order_price
    })
    // 1 判断收货地址
    const {address}=this.data;
    if(!address.userName){
      // 弹窗提示
      wx.showToast({
        title:"您还没有选择收货地址",
        icon:"none",
        // 防止用户手抖
        mask:true,
      })
    }else{ 
      // 创建一个假订单
      // 先把这个订单存入缓存
      
      let orderList=wx.getStorageSync("order")||[];
      orderList.push(this.data.cart);
      wx.setStorageSync("order",orderList);
      // 还要更新云数据库的数据
      const db = wx.cloud.database();

      db.collection('Products').doc(this.data.cart._id).update({
        // data 传入需要局部更新的数据
        data: {
          // 表示将 done 字段置为 true
          sold_out_or_not: true
        },
        success: function(res) {
          console.log("卖出去啦")
        }
      })
    //  this.data.cart.sold_out_or_not=true;

      // const db = wx.cloud.database();
      //这个时候就可以往你的云数据库中存数据，fileIDs将以数组的形式存进数据库中
      db.collection("Orders").add({
        data:{
          goods_id:this.data.cart._id,
          goods_openid:this.data.cart._openid,
          clicks:0,
          name:this.data.cart.title,
          // 图片
          image:this.data.cart.image, 
          name:this.data.cart.name,
  
          description:this.data.cart.description,
  
          buyer_comment:"",
          owner_id: this.data.cart.owner_id,
           
          // due: new Date(),
  
          type: this.data.cart.type,
  
          price: this.data.cart.price,
  
          sold_out_or_not:true,
          quantity: this.data.cart.quantity,
          deleted:false,
        },
        success: res=> {
          wx.showToast({
            title:"假装付钱啦",
            icon:"success",
            // 防止用户手抖
            mask:true,
          });
        fail: res => {
    
            wx.showToast({
              title:"付款失败",
              icon:"none",
              // 防止用户手抖
              mask:true,
            });
            
        }

        }

      })
      // 返回首页
      wx.switchTab({
        url: "/pages/unused/unused"
      })
    }


  }

  // 点击付款  
  // 这是真正能微信支付的  因为没有企业账号  现在只能写一个创建订单事件模拟一下
  /*async handlePayMoney(e){
    // 获取当前商品价格
    const order_price=e.currentTarget.dataset.price;
    // console.log("111"+order_price);
    this.setData({
      order_price
    })
    // 1 判断收货地址
    const {address}=this.data;
    if(!address.userName){
      // 弹窗提示
      wx.showToast({
        title:"您还没有选择收货地址",
        icon:"none",
        // 防止用户手抖
        mask:true,
      })
    }
    else{
      // 3.2 准备请求体参数
      // 支付
      // 1 判断缓存中有没有token
      const token=wx.getStorageSync("token");
      // 2 判断
      if(!token){
        wx.navigateTo({
          url: '/pages/auth/auth',
        });
        return;
      }
      else{
        // 3 创建订单
        // 3.1 准备请求头参数
        const header = {Authorization:token};
        // 3.2 准备请求体参数
        const order_price=this.data.order_price;
        const consignee_addr=this.data.address.all;
        const cart=this.data.cart;
        let goods=[];
        cart.forEach(v=>goods.push({
          goods_id:v.goods_id,
          goods_number:v.num,
          goods_price:v.goods_price
        }))
        const orderParams={order_price,consignee_addr,goods};
        // 4 准备发送请求 创建订单
        const res=await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/my/orders/create",method:"post",data:orderParams,header:header});



      }
     
    }
  } */
})