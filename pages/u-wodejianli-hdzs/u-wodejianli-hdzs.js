// pages/u-wodejianli-hdzs/u-wodejianli-hdzs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '请选择',
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,
    data_index: '',
    time: '12:01',
    img: '../img/f066.png',
    name_value:'',
    id:'',
    sId:'',
    app: getApp().globalData,
    isToggle:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that=this
    that.setData({
      id:options.id,
    })
    if(options.sId){
     var time = options.time.substring(0, 4) + '年' + options.time.substring(5, 7) + '月' + options.time.substring(8, 10) + '日'
      that.setData({
        name_value:options.name,
        date:time,
        img:options.url,
        sId:options.sId,
        isToggle:true
      })
      console.log(this.data.id)
    }

  },
  // 失去焦点事件
  blur(e) {
    var value = e.detail.value
      this.setData({
        name_value: value
      })
  },
  // 选择图片
  images() {
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
         // tempFilePath可以作为img标签的src属性显示图片
         var webUrl = 'http://123.56.114.88:8088/'
         var baseUrl = 'http://123.56.114.88:8089'
         wx.uploadFile({
           url: baseUrl + '/Other/upload',
           filePath: res.tempFilePaths[0],
           name: 'img',
           header: {
             'content-type': 'multipart/form-data',
             'Authorization': wx.getStorageSync('Authorization')
           },
           success: function (res) {
             var path = JSON.parse(res.data)
             if (res.statusCode == 200) {
               _this.setData({
                img: webUrl + path.rdata
               })
             }
           },
           fail: function (res) {
             console.log(res)
           }
         })
      }
    })
  },
  submit(){
    var that=this,
    date = this.data.date.substring(0, 4) + '/' + this.data.date.substring(5, 7) + '/' + this.data.date.substring(8, 10),
    sId=this.data.sId?this.data.sId:''
    this.data.app.http({
      url:'/resume/saveOrUpdateBook',
      dengl:true,
      method:'POST',
      data:{
        name:that.data.name_value,
        resumeId:that.data.id,
        time:date,
        id:sId,
        url:that.data.img
      },
      success(res){
        if (res.data.code==200) {
          // 及时更新上层页面
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2]; //上一个页面
          prevPage.setData({
            resume: []
          })
          wx.navigateBack({
            success(res) {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
        }
      }
    })
  },
     // 删除
     dele(){
     var id=this.data.sId?this.data.sId:''
      this.data.app.http({
        url: '/resume/delBook',
        dengl: true,
        method:'POST',
        data: {
          id:id
        },
        success(res) {
          console.log(res)
          if (res.data.code == 200) {
            // 及时更新上层页面
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2]; //上一个页面
            // prevPage.setData({
            //   resume: []
            // })
            wx.navigateBack({
              success(res) {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad();
              }
            })
          }
        }
      })
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
    // 选择时间
    bindDateChange: function (e) {
      this.setData({
        datePickerIsShow: true,
        data_index: e.currentTarget.dataset.de
      });
    },
    datePickerOnSureClick: function (e) {
      if (this.data.data_index == 1) {
        this.setData({
          date: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
          datePickerValue: e.detail.value,
          datePickerIsShow: false,
        })
      } else {
        this.setData({
          date1: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
          datePickerValue: e.detail.value,
          datePickerIsShow: false,
        })
      }
    },
})