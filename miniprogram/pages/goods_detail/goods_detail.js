// pages/goods_detail/goods_detail.js
import {request} from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime";
/*
1 发送请求获取数据
2 点击轮播图 预览大图
   1 给轮播图绑定点击事件
   2 调用小程序的API previewImage
3 点击加入购物车
  1 绑定点击事件
  2 获取缓存中的购物车数据  数组格式
  3 先判断当前的商品是否已经存在购物车里面
  4 已经存在 修改商品数据  执行购物车数量++  重新把购物车数组填充回缓存中
  3 不存在于购物车数组中 直接给购物车数组添加一个新元素  带上购物车属性 num 重新填充回缓存
  6 根据当前操作弹出用户提示
4 商品收藏功能
  1 页面onshow的时候 加载缓存中商品收藏的数据
  2 判断当前商品是不是被收藏
    1 是  改变图标
    2 不是 
  3 点击商品收藏按钮
    1 判断商品是否被收藏
    2 已经存在则删除缓存中的数据
    3 没有存在则添加进数组 和缓存
*/
Page({

  /**
   * 页面的初始数据
   */
  data: {

    statusBarHeight: getApp().globalData.statusBarHeight,
    showInput: false, //控制输入栏
    goodsObj:{},
    urls:[],
    isCollect:false,
    comment:"",
    commentObj:{},
    commentList:[],
    goods_id:''

  },
  // 商品详情信息
  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad:function(options){
  //   const {goods_id}=options;
  //   let commentList=wx.getStorageSync("commentList");
  //   for(var i=0;i<commentList.length;i++){
  //     if(commentList[i]._id===goods_id){
  //       this.data.commentList.push(commentList[i])
  //     }
  //   }

  // },
  onShow:function() {
    let curPages =  getCurrentPages();
    let currentPage=curPages[curPages.length-1];
    let options=currentPage.options;
    const {goods_id}=options;
    this.getGoodsDetail(goods_id);
    // 连接云数据库读取商品评论
    const db = wx.cloud.database();
    db.collection('CommentList').where({
      goods_id:this.data.goods_id,
    })
    .get({
      success: res=> {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data),
        this.setData({
          commentList:res.data,
        });
      }
    });
  // wx.setStorageSync("commentList",this.data.commentList)
  //   let commentList=wx.getStorageSync("commentList");
  //   let commentList1=[]
  //   for(var i=0;i<commentList.length;i++){
  //     if(commentList[i]._id===goods_id){
  //       commentList1.push(commentList[i])
  //     }
  //   };
  //   this.setData({
  //     commentList:commentList1
  //   })
  },

  

   getGoodsDetail(goods_id){
    const db = wx.cloud.database();
    db.collection('Products').get({
      success: res=> {
        console.log("得到全部"+res.data)
        this.setData({
          goodsList:res.data
        });
        wx.setStorageSync("allgoods", this.data.goodsList);
      }
    })
    
    const goodsList=wx.getStorageSync("allgoods");
    for(var i=0;i<goodsList.length;i++){
      if(goodsList[i]._id===goods_id){
        this.GoodsInfo=goodsList[i];
        console.log(this.GoodsInfo);
        this.setData({
          goodsObj:{
            goods_name: goodsList[i].name,
            goods_price: goodsList[i].price,
            goods_introduce:goodsList[i].description,
            // goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
            pics: goodsList[i].image,
            sold_out:goodsList[i].sold_out_or_not
            },
          goods_id:goodsList[i]._id,
          urls:goodsList[i].image
        })
      }
    }
    // 1 获取缓存中商品收藏数组
    let collect=wx.getStorageSync("collect")||[];
    // 2判断商品是否被收藏
    let isCollect=collect.some(v=>v._id===this.GoodsInfo._id);
    this.setData({
      isCollect
    })
  },


    // const res=await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",data:{goods_id}});
    // this.GoodsInfo=res.data.message;
    // console.log(res);
    // this.setData({
    //   goodsObj:{
    //     goods_name: res.data.message.goods_name,
    //     goods_price: res.data.message.goods_price,
    //     // iPhone 手机不识别webp图片格式
    //     // 临时自己改 1.webp=>1.jpg
    //     goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
    //     pics: res.data.message.pics
    //     }
    // })

  

  // async getGoodsDetail(goods_id){
  //   const res=await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",data:{goods_id}});
  //   this.GoodsInfo=res.data.message;
  //   console.log(res);
  //   this.setData({
  //     goodsObj:{
  //       goods_name: res.data.message.goods_name,
  //       goods_price: res.data.message.goods_price,
  //       // iPhone 手机不识别webp图片格式
  //       // 临时自己改 1.webp=>1.jpg
  //       goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
  //       pics: res.data.message.pics
  //       }
  //   })

  // },

  // 点击轮播图放大预览
  handlePreViewImage(e){
    // 1 构造要预览的图片数组
    const urls=this.data.urls;
    // 2 接收传递过来的图片的URL
    const current=e.currentTarget.dataset.url;
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },

  // 点击立即购买
  handleBuy(){
    let cart = this.GoodsInfo;
    // cart.push(this.GoodsInfo);
    wx.setStorageSync("cart",cart)
  },

  // 点击加入购物车
  // handleCartAdd(){
  //   // 1 获取缓存中的购物车数组
  //   // 转换一下格式 确保该变量肯定为数组格式
  //   let cart=wx.getStorageSync("cart")||[];
  //   // 2 判断商品对象是否存在购物车数组中
  //   let  index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
  //   if(index===-1){
  //     // 3 不存在 第一次添加
  //     this.GoodsInfo.num=1;
  //     cart.push(this.GoodsInfo)
  //   }else{
  //     // 4 已经存在购物车数组中  num++
  //     cart[index].num++;
  //   }
  //   // 5 把购物车数组重新添加回缓存中
  //   wx.setStorageSync("cart",cart);
  //   // 6 弹窗提示
  //   wx.showToast({
  //     title:"加入成功",
  //     icon:"success",
  //     // 防止用户手抖
  //     mask:true,
  //   })
  // },

  
  // 返回上一层
  goback() {
    wx.navigateBack({
      success(res) {
        console.log("返回成功")
      },
      fail(res) {
        console.log("error")
      }
    })
  },
 
  //点击出现输入框
  showInput: function() {
    this.setData({
      showInput: true
    })
    console.log('show+++++++++++')
  },
  // //隐藏输入框
  // onHideInput: function() {
    
  // },
  bindInputMsg(e){
     // console.log(e);
     const comment = e.detail.value;
     this.setData({
       comment
     })
     
  },

  handlesendTextMsg(){
    const db = wx.cloud.database();
    // console.log("要发送啦哈哈哈哈");
    // let commentList=wx.getStorageSync("commentList")||[];
     this.setData({
       commentObj:{
         _id:this.data.goods_id,
         comment:this.data.comment
       },
      //  commentList
     });
     let commentList1=this.data.commentList;
     commentList1.push(this.data.commentObj);
     this.setData({
       commentList:commentList1
     });
    //  this.data.commentList.push(this.data.commentObj);

     db.collection('CommentList').add({
      data:{
        goods_id:this.data.goods_id,

        comment:this.data.comment
        
      },
      success: res=> {
        wx.showToast({
          mask:true,
          
          icon: 'success',
          
          title: '留言成功'
          
          })
        },
        res:err=>{
          wx.showToast({
            mask:true,
            
            icon: 'none',
            
            title: '留言失败'
            
            })

        }
      
    });
    //  commentList.push(this.data.commentObj);
    //  wx.setStorageSync("commentList",this.data.commentList);
     
     this.setData({
      showInput: false
    })
    console.log('hide+++++++++++')
  },




  handleCollect(){
    let isCollect=false;
    const db = wx.cloud.database();
    
    
    let collect=wx.getStorageSync("collect")||[];
    let index=collect.findIndex(v=>v._id===this.GoodsInfo._id);
    if(index!==-1){
      // 已经收藏
      collect.splice(index,1);
      isCollect=false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true,
      });
    }else{
      collect.push(this.GoodsInfo);
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true,
      });
    }
    // 存入缓存
    wx.setStorageSync("collect",collect);
    // 修改
    this.setData({
      isCollect
    })
  }
 
})
