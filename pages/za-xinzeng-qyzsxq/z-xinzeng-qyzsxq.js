// pages/z-xinzeng-qyzsxq/z-xinzeng-qyzsxq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: getApp().globalData,
    company:{},
    img:[],
    // 地图
    latitude: "",
    longitude: "",
    scale: 14,
    markers: [],
    //controls控件 是左下角圆圈小图标,用户无论放大多少,点这里可以立刻回到当前定位(控件（更新一下,即将废弃，建议使用 cover-view 代替）)
    controls: [{
      id: 1,
      iconPath: '../img/f030.png',
      position: {
        left: 15,
        top: 185 - 50,
        width: 30,
        height: 30
      },
      clickable: true
    }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
     //获取当前的地理位置、速度
    // 获取当前位置地图
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        //赋值经纬度
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
 
        })
      }
    })

    this.data.app.http({
      url: '/index/ctrlCompany',
      dengl: true,
      method: 'POST',
      data: {
        id: options.id
      },
      success(res) {
        console.log(res)
        that.setData({
          company:res.data.rdata,
          img:res.data.rdata.office.split(',')
        })
        console.log(res.data.rdata.office.split(','))
      }
    })
  },
  bindcontroltap(e) {
    var that = this;
    if (e.controlId == 1) {
      that.setData({
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        scale: 15,
      })
    }
  },
  //导航
  onGuideTap: function (event) {
    var lat = Number(event.currentTarget.dataset.latitude);
    var lon = Number(event.currentTarget.dataset.longitude);
    var bankName = event.currentTarget.dataset.bankname;
    console.log(lat);
    console.log(lon);
    wx.openLocation({
      type: 'gcj02',
      latitude: lat,
      longitude: lon,
      name: bankName,
      scale: 28
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

  }
})