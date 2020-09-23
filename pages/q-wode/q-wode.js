// pages/q-wode/q-wode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dianhua: 'display:none',
    app: getApp().globalData,
    kefuPhone: {},
    user: {},
    show: true,
    content: '是否切换为面试官身份',
    users:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      users:wx.getStorageSync('users')
    })
    this.tog = this.selectComponent("#tog");
    var that = this
    const app = getApp().globalData
    var that = this
    app.http({
      url: '/Other/hotline',
      dengl: false,
      data: {},
      success(res) {
        that.setData({
          kefuPhone: res.data.rdata
        })
      }
    })
    app.http({
      url: '/getResumes',
      dengl: true,
      data: {},
      success(res) {
        if (wx.getStorageSync('Authorization')) {
          that.setData({
            user: res.data.rdata.ctrlResume
          })
        }
        console.log(that.data.user,res)
      }
    })

  },

  tanchuang_2: function () {
    var that = this
    this.setData({
      dianhua: 'display:block'
    })

  },
  quxiao2: function () {
    this.setData({
      dianhua: 'display:none'
    })
  },
  create() {
    wx.checkSession({
      success(res) {
        wx.navigateTo({
          url: '../s-wodejianli/s-wodejianli',
        })
      },
      fail() {
        // var that = this;
        wx.navigateTo({
          url: '../login/index',
        })
      }
    })
  },
  tuichu() {
    this.data.app.http({
      url: '/logout',
      dengl: true,
      data: {},
      success(res) {
        if (res.data.code == 200) {
          wx.setStorageSync('Authorization', '')
          // wx.setStorageSync('userInfo','')
          wx.showToast({
            title: '您已退出登录'
          })
          // if (!this.data.user) {
          //刷新当前页面的数据
          getCurrentPages()[getCurrentPages().length - 1].onLoad()
          // }
        }
        // this.onLoad()
      }
    })
  },
  user1() {
    wx.navigateTo({
      url: '../r-wode-bdjl/r-wode-bdjl',
    })
  },
  base() {
    wx.navigateTo({
      url: '../v-wodejianli-jcxx/v-wodejianli-jcxx',
    })
  },
  phone() {
    wx.makePhoneCall({
      phoneNumber: this.data.kefuPhone.phone
    })
  },
  zhaopin() {
    this.tog.show()
    // var that = this
    // this.data.app.http({
    //   url: '/index/queryCompany',
    //   dengl: true,
    //   method: 'POST',
    //   data: {},
    //   success(res) {
    //     if (res.data.code == 200) {
    //     } else {
    //       wx.redirectTo({
    //         url: '../m-qiyezhuce/m-qiyezhuce',
    //       })
    //     }
    //   }

    // })

  },
  cancel() {
    this.tog.show()
    // wx.redirectTo({
    //   url: '../m-qiyezhuce/m-qiyezhuce',
    // })
  },
  confirm() {
    this.tog.show()
    // this.data.app.http({
    //   url: '/logout',
    //   dengl: true,
    //   data: {},
    //   success(res) {
    //     if(res.data.code==200){
    //       wx.setStorageSync('Authorization','')
    //       wx.setStorageSync('userInfo','')
    //     }
    //   }
    // })
    wx.redirectTo({
      url: '../p-qiyeduan/p-qiyeduan',
    })
  },
  about() {
    wx.navigateTo({
      url: '../g-guanyuwomen/g-guanyuwomen',
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