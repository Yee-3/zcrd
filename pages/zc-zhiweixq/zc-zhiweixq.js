// pages/zc-zhiweixq/zc-zhiweixq.js
var canvas = ""
var leftMargin = "" //文字距离左边边距
var topMargin = "" //文字距离右边边距
Page({
  /**
   * 页面的初始数据
   */
  data: {
    style: 'display:none',
    app: getApp().globalData,
    detaCont: {},
    isShow: true,

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
    isTou: false,
    title: '',
    des: '',
    windowW: '',
    windowH: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
      that.setData({
       //设置宽高为屏幕宽，高为屏幕高的80%，因为文档比例为5:4
       windowW: res.windowWidth,
       windowH: res.windowWidth * 0.8
      })
      leftMargin = res.windowWidth
      topMargin = res.windowWidth * 0.8
      }
    })
    this.data.app.http({
      url: '/index/getPosition',
      dengl: true,
      method: 'POST',
      data: {
        id: options.id,
        limit: 10,
        page: 1,
        type: 2
      },
      success(res) {
        var des = res.data.rdata[0].cityName + '|' + res.data.rdata[0].schoolRecordName + '|' + res.data.rdata[0].workExperienceName
        console.log(res.data.rdata)
        that.setData({
          detaCont: res.data.rdata[0],
          isTou: res.data.rdata[0].signUp,
          title: res.data.rdata[0].title,
          des: res.data.rdata[0].cityName + '|' + res.data.rdata[0].schoolRecordName + '|' + res.data.rdata[0].workExperienceName,
        })
        canvas = wx.createCanvasContext('canvas')
        that.addImage()
        // this.tempFilePath()
    

      }
    })

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

  },
  //画背景图
 addImage: function () {
  var context = wx.createContext();
  var that = this;
  var path = "../img/f021.png";
  //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
  //不知道是什么原因，手机环境能正常显示
  canvas.drawImage(path, 0, 0, this.data.windowW, this.data.windowH);
  this.addTitle()
  this.addDesc()
  canvas.draw()
  },
  addTitle(){
    // 职位
    canvas.setFillStyle('#fff') //文字颜色：默认黑色
    canvas.setFontSize(19) //设置字体大小，默认10
    canvas.fillText(this.data.title,leftMargin * 0.2, topMargin * 0.4) //绘制文本
  },
  addDesc(){
    canvas.font = 'normal bold 20px sans-serif';
    canvas.setFillStyle('#fff') //文字颜色：默认黑色
    canvas.setFontSize(14) //设置字体大小，默认10
    canvas.fillText(this.data.des, leftMargin * 0.2, topMargin * 0.5) //绘制文本
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
    wx.openLocation({
      type: 'gcj02',
      latitude: lat,
      longitude: lon,
      name: bankName,
      scale: 28
    })
  },

  detail(e) {
    wx.navigateTo({
      url: '../za-xinzeng-qyzsxq/z-xinzeng-qyzsxq?id=' + e.currentTarget.dataset.comid,
    })
  },
  tanchuang: function () {
    if (!this.data.isTou) {
      var that = this
      this.data.app.http({
        url: '/index/getResumes',
        dengl: true,
        method: 'POST',
        success(res) {
          if (res.data.rdata == true) {
            that.data.app.http({
              url: '/index/sendResumes',
              dengl: true,
              method: 'POST',
              data: {
                company: that.data.detaCont.companyId,
                position: that.data.detaCont.id
              },
              success(res) {
                if (res.data.code == 200) {
                  wx.showToast({
                    title: '投递成功'
                  })
                  that.setData({
                    isTou: true
                  })
                }
              }
            })
          } else {
            that.setData({
              style: 'display:block'
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '您已投递成功！'
      })
    }
  },
  quxiao1: function () {
    this.setData({
      style: 'display:none'
    })
  },
  buquan() {
    wx.navigateTo({
      url: '../s-wodejianli/s-wodejianli',
    })
  },
  show() {
    this.setData({
      isShow: false
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
    var that = this
    setTimeout(() => {
      let query = wx.createSelectorQuery();
      query.select('.content').boundingClientRect(rect => {
        let clientHeight = rect.height;
        let clientWidth = rect.width;
        let ratio = 750 / clientWidth;
        let height = parseInt(clientHeight * ratio);
        if (height < 197) {
          that.setData({
            isShow: false
          })
        }
      }).exec();
    }, 300)
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
  onShareAppMessage: function (res) {
    var that = this,
    company=this.data.detaCont.companyName
    return {
      // desc: this.data.des,
      title: company+'正在招聘'+this.data.detaCont.title,

      imageUrl: '../img/share.jpg',
      // 可以更换分享的图片
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '分享成功',
          icon: "none"
        });
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '分享失败',
          icon: "none"
        })
      }
    }
  }
})