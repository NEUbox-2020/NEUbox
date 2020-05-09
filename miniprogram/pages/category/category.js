// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Cates:[
        {
        cat_id: 1,
        cat_name: "书籍",
        cat_pid: 0,
        cat_level: 0,
        cat_deleted: false,
        cat_icon: "/full/none.jpg",
        children: [
        {
        cat_id: 2,
        cat_name: "计算机类",
        cat_pid: 1,
        cat_level: 1,
        cat_deleted: false,
        cat_icon: "/full/none.jpg",
        children: [
          {
          cat_id: 3,
          cat_name: "编程书籍",
          cat_pid: 3,
          cat_level: 2,
          cat_deleted: false,
          cat_icon: "../../image/jisuanji1.jpg"
          },
          {
          cat_id: 4,
          cat_name: "硬件类书籍",
          cat_pid: 3,
          cat_level: 2,
          cat_deleted: false,
          cat_icon: "../../image/jisuanji2.jpg"
          },
          {
          cat_id: 5,
          cat_name: "数学类书籍",
          cat_pid: 3,
          cat_level: 2,
          cat_deleted: false,
          cat_icon: "../../image/jisuanji4.jpg"
          },
          ]
          },
     {
      cat_id: 6,
      cat_name: "经济类",
      cat_pid: 1,
      cat_level: 1,
      cat_deleted: false,
      cat_icon: "/full/none.jpg",
      children: [
      {
      cat_id: 7,
      cat_name: "经济与贸易",
      cat_pid: 7,
      cat_level: 2,
      cat_deleted: false,
      cat_icon: "../../image/jingji1.jpg"
      },
      {
      cat_id: 8,
      cat_name: "金融学",
      cat_pid: 7,
      cat_level: 2,
      cat_deleted: false,
      cat_icon: "../../image/jingji2.jpg"
      },
      {
      cat_id: 9,
      cat_name: "财经学",
      cat_pid: 7,
      cat_level: 2,
      cat_deleted: false,
      cat_icon: "../../image/jingji3.jpg"
      },
      {
      cat_id: 10,
      cat_name: "经济学",
      cat_pid: 7,
      cat_level: 2,
      cat_deleted: false,
      cat_icon: "../../image/jingji4.jpg"
      },
      ]
      }
    
    ]
  },


  {
    cat_id: 11,
    cat_name: "服饰",
    cat_pid: 0,
    cat_level: 0,
    cat_deleted: false,
    cat_icon: "/full/none.jpg",
    children: [
    {
    cat_id: 12,
    cat_name: "毕业清仓",
    cat_pid: 55,
    cat_level: 1,
    cat_deleted: false,
    cat_icon: "/full/none.jpg",
    children: [
    {
    cat_id: 13,
    cat_name: "上衣",
    cat_pid: 69,
    cat_level: 2,
    cat_deleted: false,
    cat_icon: "../../image/shangyi.jpg"
    },
    {
    cat_id: 14,
    cat_name: "裤子",
    cat_pid: 69,
    cat_level: 2,
    cat_deleted: false,
    cat_icon: "../../image/kuzi.jpg"
    },
    {
    cat_id: 15,
    cat_name: "半身裙",
    cat_pid: 69,
    cat_level: 2,
    cat_deleted: false,
    cat_icon: "../../image/banshenqun1.jpg"
    },  
    {
    cat_id: 16,
    cat_name: "连衣裙",
    cat_pid: 69,
    cat_level: 2,
    cat_deleted: false,
    cat_icon: "../../image/lainyiqun.jpg"
    },
    {
    cat_id: 17,
    cat_name: "鞋帽",
    cat_pid: 69,
    cat_level: 2,
    cat_deleted: false,
    cat_icon: "../../image/yifu1.jpg"
    }
    ]
    },
    {
    cat_id: 18,
    cat_name: "毕业季",
    cat_pid: 55,
    cat_level: 1,
    cat_deleted: false,
    cat_icon: "/full/none.jpg",
    children: [
      {
      cat_id: 19,
      cat_name: "低价甩卖",
      cat_pid: 69,
      cat_level: 2,
      cat_deleted: false,
      cat_icon: "../../image/biyi1.jpg"
      },
      {
      cat_id: 20,
      cat_name: "学习用品大清仓",
      cat_pid: 69,
      cat_level: 2,
      cat_deleted: false,
      cat_icon: "../../image/biyi2.jpg"
      }
    ]
    }
    ]
    },
  {
  cat_id: 21,
  cat_name: "美妆",
  cat_pid: 0,
  cat_level: 0,
  cat_deleted: false,
  cat_icon: "/full/none.jpg",
    children: [
      {
      cat_id: 22,
      cat_name: "国际名牌",
      cat_pid: 71,
      cat_level: 1,
      cat_deleted: false,
      cat_icon: "/full/none.jpg",
      children: [
      {
      cat_id: 23,
      cat_name: "swisse",
      cat_pid: 89,
      cat_level: 2,
      cat_deleted: false,
      cat_icon: "https://api-hmugo-web.itheima.net/full/b16f183fd75dc9ef23040bf1ecb79986961687bc.jpg"
      },
      {
      cat_id: 24,
      cat_name: "巴黎水",
      cat_pid: 89,
      cat_level: 2,
      cat_deleted: false,
      cat_icon: "https://api-hmugo-web.itheima.net/full/cd62542f233606dba918579a8de11e042501eefb.jpg"
      },
      {
      cat_id: 25,
      cat_name: "爱他美",
      cat_pid: 89,
      cat_level: 2,
      cat_deleted: false,
      cat_icon: "https://api-hmugo-web.itheima.net/full/bf88a25a9bf591d91a5a1aab2ddaa3bfd7a43e34.jpg"
      },
      {
      cat_id: 26,
      cat_name: "花王",
      cat_pid: 89,
      cat_level: 2,
      cat_deleted: false,
      cat_icon: "https://api-hmugo-web.itheima.net/full/fa40f059bba735204287f296bd005511084a7c67.jpg"
      },
      {
      cat_id: 27,
      cat_name: "戴森",
      cat_pid: 89,
      cat_level: 2,
      cat_deleted: false,
      cat_icon: "https://api-hmugo-web.itheima.net/full/40c36744b446ee350cd651a2e07c12f0f44af246.jpg"
      },
      {
      cat_id: 28,
      cat_name: "ReFa",
      cat_pid: 89,
      cat_level: 2,
      cat_deleted: false,
      cat_icon: "https://api-hmugo-web.itheima.net/full/2fa6a29fb7fc3b861184d3c9b7203fb6825e708b.jpg"
      },
      {
      cat_id: 29,
      cat_name: "MK",
      cat_pid: 89,
      cat_level: 2,
      cat_deleted: false,
      cat_icon: "https://api-hmugo-web.itheima.net/full/0b4c9e1a708f24902e018da4bd1d88f24a94e2da.jpg"
      }
      ]
      },
      {
      cat_id: 30,
      cat_name: "美妆",
      cat_pid: 71,
      cat_level: 1,
      cat_deleted: false,
      cat_icon: "/full/none.jpg",
      children: [
      {
      cat_id: 31,
      cat_name: "面膜",
      cat_pid: 92,
      cat_level: 2,
      cat_deleted: false,
      cat_icon: "https://api-hmugo-web.itheima.net/full/2579da906e61146322293d2aa5f4a9facbdc2495.jpg"
      },
      {
      cat_id: 31,
      cat_name: "口红",
      cat_pid: 92,
      cat_level: 2,
      cat_deleted: false,
      cat_icon: "https://api-hmugo-web.itheima.net/full/54af1b428dab75fbb19e0f0602db2fb288ae77b9.jpg"
      },
      {
      cat_id: 33,
      cat_name: "彩妆",
      cat_pid: 92,
      cat_level: 2,
      cat_deleted: false,
      cat_icon: "https://api-hmugo-web.itheima.net/full/231f73f37ce5ca9036d1e9d4168efb4523070875.jpg"
      },
      {
      cat_id: 34,
      cat_name: "护肤套装",
      cat_pid: 92,
      cat_level: 2,
      cat_deleted: false,
      cat_icon: "https://api-hmugo-web.itheima.net/full/d2e1fd5c05c143214cd3a235a85b785e464644a1.jpg"
      },
      {
      cat_id: 35,
      cat_name: "香水香氛",
      cat_pid: 92,
      cat_level: 2,
      cat_deleted: false,
      cat_icon: "https://api-hmugo-web.itheima.net/full/cf8ef95a8a4de25738e9b319a147927ef3472796.jpg"
      },
      {
      cat_id: 36,
      cat_name: "洁面仪",
      cat_pid: 92,
      cat_level: 2,
      cat_deleted: false,
      cat_icon: "https://api-hmugo-web.itheima.net/full/2ef285fb3ffbffe1351a074be69a8e4c29837184.jpg"
      },
      {
      cat_id: 37,
      cat_name: "卸妆",
      cat_pid: 92,
      cat_level: 2,
      cat_deleted: false,
      cat_icon: "https://api-hmugo-web.itheima.net/full/e9c82968002a79e1c4aae6d842029d4c01819950.jpg"
      }
      ]
      },
      {
      cat_id: 38,
      cat_name: "个护",
      cat_pid: 71,
      cat_level: 1,
      cat_deleted: false,
      cat_icon: "/full/none.jpg",
      children: [
      {
      cat_id: 39,
      cat_name: "美发护发",
      cat_pid: 111,
      cat_level: 2,
      cat_deleted: false,
      cat_icon: "https://api-hmugo-web.itheima.net/full/2611fb97c4a328f9034a464bcb027ebecadf78b9.jpg"
      },
      {
      cat_id: 40,
      cat_name: "美甲",
      cat_pid: 111,
      cat_level: 2,
      cat_deleted: false,
      cat_icon: "https://api-hmugo-web.itheima.net/full/9e4839859a99de33020b11892c6273b306dce065.jpg"
      }
      ]
      } 
    ]
  }  
 ],
  // 左侧的菜单数据
  leftMenuList:[],
  // 右侧的商品数据
  rightContent:[],
  // 被点击的左侧菜单
  currentIndex:0,
  // 右侧内容滚动条距离顶部
  scrollTop:0,
  // Cates:[],
  
  },
  


/*getCates(){
  var that = this;
  const db = wx.cloud.database();

  // console.log('[数据库] [查询记录] 成功: ', res.data)
  db.collection('Category').doc('aa9f906d5eb26740002744365bfb79b9').get({
    success: function(res) {
      // res.data 包含该记录的数据
      console.log('res.data: ', res.data);
      console.log("111111")
      console.log(JSON.stringify(res.data.Cates));

      // console.log(JSON.stringify(res.data.Cates[0]));
      // console.log(JSON.stringify(res.data.Cates[1]));
      
      const data = JSON.stringify(res.data.Cates)
      var _collections = new Array();
      // _collections = JSON.stringify(res.data);
       
      for (var i = 0; i < res.data.Cates.length; i++) {
      
      // console.log(i, res.data[i])
      console.log("111")
      
      _collections.push(JSON.stringify(res.data.Cates[i]))
      
      }
      
      for (var j = 0; j < _collections.length; j++) {
      
      console.log("_collections["+j+"]="+ _collections[j])
      
      // _collections.push(JSON.parse(res.data[i]))
      
      };
      that.setData({
      
      Cates: _collections,
      in:5
      
      })

      // let {Cates}=res.data;
      // this.data.Cates=res.data
      
    }
   
  })
  // console.log(this.data.Cates)

},*/

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    // this.getCates();
    
    // 先判断一下本地存储中有没有旧数据
    // 没有就数据就发送新请求
    // 有数据并且未过期则使用本地存储数据
    // 1
    // const Cates = wx.getStorageInfoSync("cates");
    // // 2
    // if(!Cates){
      // 不存在
      // 发送新请求
    console.log(this.data.Cates[0]);
    // 构造左侧大菜单数据
    let leftMenuList=this.data.Cates.map(v=>v.cat_name);
    // 构造右侧商品数据
    let rightContent=this.data.Cates[0].children;

    this.setData({
      leftMenuList,
      rightContent
    })
    

  },
  // 左侧菜单的点击事件
  handleItemTap(e){
    // 1.获取被点击的标题上面的索引
    // 2.给data中的currentIndex赋值
    // 3.根据不同的索引渲染右侧的商品内容
    const {index}=e.currentTarget.dataset;

     // 构造右侧商品数据
     let rightContent=this.data.Cates[index].children;
     
     this.setData({
        // 重新设置右侧内容的scroll-view距离顶部的距离
      scrollTop:0,
      currentIndex:index,
      rightContent
    })
   


  }

 })