// pages/goods_list/goods_list.js
/*
1 用户上滑页面 滚动条触底  开始加载下一页数据 
  1 找到滚动条触底事件  
  2 判断还有没有下一页数据
    1 获取总页数 
        2 获取当前的页码  
        3 判断一下当前页码是否是大于等于总页数
  3 假如没有下一页数据 掏出一个提示
  4 假如还有 则加载下一页
    1 当前的页码++  
        2 重新发送请求  
        3 数据请求回来 要对data中的数据进行拼接  而不是替换

2 下拉刷新事件
   1 触发下拉刷新事件  需要在页面的JSon文件中开启一个配置项
      找到书法下拉刷新的逻辑
   2 重置 数据  数组
   3 重置页码 1
   4 重新发送请求
   5 数据请求回来 需要手动关闭刷新等待效果


*/
      
import {request} from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  /**
   * 页面的初始数据
   */

  data: {
    tabs:[
      {
      id:0,
      value:"综合",
      isActive:true,
    },
    {
      id:1,
      value:"销量",
      isActive:false,
    },
    {
      id:2,
      value:"价格",
      isActive:false,
    }


    ],
    goodsList:[]

  },

  // 接口要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  // 全局参数
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        console.log("1111"+options);
        this.QueryParams.cid=options.cid;
        this.getGoodsList();
  },

  // 获取商品列表数据
  async getGoodsList(){
    const res=await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/search",data:this.QueryParams});
    //  获取总条数
    const total=res.data.message.total;
    // 计算总页数
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
    
    this.setData({
      // 拼接的数组
      goodsList:[...this.data.goodsList,...res.data.message.goods]
      // goodsList:res.data.message.goods
    });
    console.log(res);
    // 关闭下拉刷新窗口
    wx.stopPullDownRefresh();
  },

  // 标题的点击事件
  handleItemChange(e){
    // console.log(e);
     // 1 获取被点击的标题索引
    const {index}=e.detail;
    // 2 修改源数组
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 3 赋值到data
    this.setData({tabs})
  },


  onReachBottom(){
    // 判断还有没有下一页
    if(this.QueryParams.pagenum>=this.totalPages){
      // 没有下一页数据
      wx.showToast({
        title: '没有下一页数据',
      });
    }
    else{
      // 还有下一页数据
      this.QueryParams.pagenum++;
      this.getGoodsList();     
    }     
  },

  //  下拉刷新事件
  onPullDownRefresh(){
    // 1 重置数组
    this.setData({
      goodsList:[]
    })
    // 2 重置页码
    this.QueryParams.pagenum=1,
    // 3 重新发送请求
    this.getGoodsList()
  }
})