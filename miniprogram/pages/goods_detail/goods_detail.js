data: {

    statusBarHeight: getApp().globalData.statusBarHeight,
    showInput: false, //控制输入栏
    goodsObj:{},
    urls:[],
    isCollect:false,
    comment:"",
    commentObj:{},
    commentList:[],
    goods_id:'',
    goods_info:[]

  },
  // 商品详情信息
  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onShow:function() {
    const that = this; //把page对象赋值给新建的对象
    let curPages =  getCurrentPages();
    let currentPage=curPages[curPages.length-1];
    let options=currentPage.options;
    const {goods_id}=options;
    this.setData({
      goods_id
    })
    console.log("我想看到的"+" "+goods_id)
    const goods=[];
    const db = wx.cloud.database();
    db.collection('Products').where({
      _id:goods_id

    }). get({
      success: res=> {
        that.setData({
          goods_info:res.data,
          goodsObj:res.data[0]

        })
        console.log("想看看111   "+that.data.goodsObj._id)
        // wx.setStorageSync("allgoods",res.data);
      }
    })

    console.log("想看看   "+this.data.goodsObj._id)
    // this.getGoodsDetail(goods_id);
    let collect=wx.getStorageSync("collect")||[];
    // 2判断商品是否被收藏
    let isCollect=collect.some(v=>v._id===this.data.goodsObj._id);
    this.setData({
      isCollect
    })




    // 连接云数据库读取商品评论
    // const db = wx.cloud.database();
    db.collection('CommentList').where({
      goods_id:this.data.goods_id,
    })
    .get({
      success: res=> {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data),
        that.setData({
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