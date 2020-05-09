// pages/publish/publish.js
Page({

  data: {
    titleCount: 0, //标题字数
    contentCount: 0, //正文字数
    title: '', //标题内容
    content: '', //正文内容
    images: [], //用于存储 选中的临时图片地址，可以直接在image标签中src引入使用
    price: 0,
    type: " ",
    fileIDs:[]   //上传到云存储中的地址
  },

  onLoad(options) {
    // $init(this)
  },

  handlePriceInput(e) {
    const value = e.detail.value;
    this.setData({
     price:value
    })
  },

  handleTypeInput(e){
    const value = e.detail.value;
    this.setData({
     type:value
    })

  },

  handleTitleInput(e) {
    // console.log(e);
    const value = e.detail.value;
    this.setData({
      title:value,
      titleCount:value.length
    })
  },

  handleContentInput(e) {
    const value = e.detail.value;
    // this.data.content = value;
    // this.data.contentCount = value.length ; //计算已输入的正文字数
    this.setData({
      content:value,
      contentCount:value.length
    })
  },



// 选择图片
  chooseImage(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
       
        console.log(images);


        // 限制最多只能留下6张照片
        const images1 = images.length <= 6 ? images : images.slice(0, 6)
        this.setData({
          images: images1
        })
      }
    })
  },

  // 移除图片
  removeImage(e) {
    var that = this;
    var images = that.data.images;
    // 获取要删除的第几张图片的下标
    const idx = e.currentTarget.dataset.idx
    // splice  第一个参数是下标值  第二个参数是删除的数量
    images.splice(idx,1)
    this.setData({
      images: images
    })
  },
 
  // 点击放大预览图片
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx],  //当前预览的图片
      urls: images,  //所有要预览的图片
    })
  },


  
    








  submitForm(e){
    if(!this.data.title.length){
      wx.showToast({

        mask:true,
    
        icon: 'none',
        
        title: '您还没有添加标题'
        
        });
    }else if(!this.data.content.length){
      wx.showToast({
        mask:true,
    
        icon: 'none',
        
        title: '您还没有添加商品描述'
        
        });

    }else if (!this.data.images.length) {
    
    wx.showToast({
    mask:true,
    
    icon: 'none',
    
    title: '您还没有上传图片'
    
    });
    
    }else if (!this.data.price.length) {
    
      wx.showToast({
      mask:true,
      
      icon: 'none',
      
      title: '您还没有设置价格'
      
      });
      
      }else if(!this.data.type.length) {
    
        wx.showToast({
        mask:true,
        
        icon: 'none',
        
        title: '您还没有设置物品类型'
        
        });
        
        }else {
    
    //上传图片到云存储
    
    wx.showLoading({
    
    title: '图片正在上传',
    
    })
    
    let promiseArr = [];//创建一个数组来存储一会的promise操作
    
    for (let i = 0; i < this.data.images.length; i++) {    //遍历选中的图片 let e6知识  用let定义变量会形成一个闭包,在该作用域执行完之前 变量的值不会发生改变 ，防止异步导致 变量发生变化可以用let定义变量,有兴趣的同学学下es6的知识
    
    promiseArr.push(new Promise((reslove, reject) => {     //往数据中push promise 操作
    
    let item = this.data.images[i];  //一个一个取出图片数组的临时地址
    let suffix = /\.\w+$/.exec(item)[0];//利用正则表达式取出图片的后缀名
    wx.cloud.uploadFile({
    cloudPath: new Date().getTime() + suffix, // 上传云存储的图片名称  利用时间戳给图片新起一个名字
    filePath: item, // 图片临时地址赋值

    success: res=>{
    console.log(res)
    this.setData({
      fileIDs: this.data.fileIDs.concat(res.fileID)     //执行的成功的把 将返回的云存储张图片的地址 一个一个拼接到 data的fileIDs数组中 一会这个就是插入到云数据库中的字段
    });
    
    console.log(res.fileID)//输出上传后图片的返回地址
    
    reslove();//如果执行成功  就将执行成功的回调函数
    
    wx.hideLoading();  //隐藏之前的正在上传的提示
    
    wx.showToast({
    
    title: "图片上传成功",      //给前台提示上传成功
    
    })
    
    },
    
    fail: res => {
    
    wx.hideLoading();
    
    wx.showToast({
    
    title: "图片上传失败",
    
  })
    
}

})

}));

}
    

    Promise.all(promiseArr).then(res => {   //等promose数组都做完后做then方法
    //  连接数据库
    const db = wx.cloud.database();
    //这个时候就可以往你的云数据库中存数据，fileIDs将以数组的形式存进数据库中
    db.collection("Products").add({
        data: {

        clicks:0,
        name:this.data.title,
        // 图片
        image:this.data.fileIDs, 

        description:this.data.content,

        // buyer_comment:"",
        owner_id: 0,
         
        // due: new Date(),

        type: this.data.type,

        price: this.data.price,

        sold_out_or_not:false,

        quantity: 1,
         
        },
         
        success: res=> {
         
        console.log(res._id)
        wx.showToast({
          mask:true,
          
          icon: 'success',
          
          title: '发布成功'
          
          });
          wx.switchTab({
            url: "/pages/page2/page2"
          })

         
        },
        fail: res => {
    
          console.log("失败")
          
      }
     })
    
    
    })
    
    }
    
    },
    
     


  // 提交函数
  submitForm1(e) {
    const title = this.data.title
    const content = this.data.content
    const db = wx.cloud.database({});
 
    if (!this.data.images.length) {

      wx.showToast({
      
      icon: 'none',
      
      title: '您还未添加图片'
      
      });
    }
    else {

      //上传图片到云存储
      wx.showLoading({
        title: '正在发布...',
        mask: true
      
      })
    }
      let promiseArr = [];//创建一个数组来存储一会的promise操作
      for (let i = 0; i < this.daaimages.length; i++) { 
      }
       
    
    const Products = db.collection('Products');
   
    if (title && content) {
      wx.showLoading({
        title: '正在创建...',
        mask: true
      })

      // 将选择的图片组成一个Promise数组，准备进行并行上传
      const arr = this.data.images.map(path => {
        return wx.uploadFile({
          url: config.urls.question + '/image/upload',
          filePath: path,
          name: 'img',
        })
      })

      console.log(arr);

      // 
      
        


      // 开始并行上传图片
      Promise.all(arr).then(res => {
        // 上传成功，获取这些图片在服务器上的地址，组成一个数组
        return res.map(item => JSON.parse(item.data).url)
      }).catch(err => {
        console.log(">>>> upload images error:", err)
      }).then(urls => {
        // 调用保存问题的后端接口
        return createQuestion({
          title: title,
          content: content,
          images: urls
        })
      })
    }
  }

})