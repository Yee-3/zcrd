// pages/y-wodejianli-xmjl/y-wodejianli-xmjl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '请选择',
    date1: '请选择',
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,
    data_index: '',
    com_value: '',
    name_value: '',
    int_value: '',
    app: getApp().globalData,
    idL:{},
    isToggle:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log(options)
    this.setData({
      idL:options
    })
    if(options.sId){
      var time = options.startTime.substring(0, 4) + '年' + options.startTime.substring(5, 7) + '月' + options.startTime.substring(8, 10) + '日'
      var time1 = options.endTime.substring(0, 4) + '年' + options.endTime.substring(5, 7) + '月' + options.endTime.substring(8, 10) + '日'
      that.setData({
        com_value:options.work,
        name_value:options.name,
        int_value:options.describe,
        date:time,
        date1:time1,
        isToggle:true
      })
      console.log()
    }

  },
  // 失去焦点事件
  blur(e) {
    var type = e.currentTarget.dataset.ty,
      that = this,
      value = e.detail.value
    if (type == 1) {
      that.setData({
        com_value: value
      })
    }
    if (type == 2) {
      that.setData({
        name_value: value
      })
    }
    if (type == 3) {
      that.setData({
        int_value: value
      })
    }
  },
  //  提交事件
  submit() {
    var that = this,
      date = this.data.date.substring(0, 4) + '/' + this.data.date.substring(5, 7) + '/' + this.data.date.substring(8, 10),
      date1 = this.data.date1.substring(0, 4) + '/' + this.data.date1.substring(5, 7) + '/' + this.data.date1.substring(8, 10)
      var id=that.data.idL.sId?that.data.idL.sId:''
    this.data.app.http({
      url: '/resume/saveOrUpdateProject',
      dengl: true,
      method: 'POST',
      data: {
        describe: that.data.int_value,
        startTime:date,
        endTime:date1,
        work:that.data.com_value,
        name:that.data.name_value,
        resumeId:that.data.idL.id,
        id:id
      },
      success(res) {
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
    var id=this.data.idL.sId?this.data.idL.sId:''
    this.data.app.http({
      url: '/resume/delProject',
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
  bindDateChange1: function (e) {
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