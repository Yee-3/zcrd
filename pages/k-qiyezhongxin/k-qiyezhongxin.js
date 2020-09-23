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
    content: '是否切换为求职身份',
    com_type: '',
    com_cont: '',
    isZhuce:'',
    zhuContent:'请先注册企业信息',
    users:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tog = this.selectComponent("#tog");
    this.zhuce = this.selectComponent("#zhuce");
    const app = getApp().globalData
    var that = this
    this.setData({
      users:wx.getStorageSync('users')
    })
    app.http({
      type: true,
      url: '/getCompany',
      dengl: true,
      data: {},
      success(res) {
        if (res.data.rdata.ctrlCompany) {
          that.setData({
            user: res.data.rdata.ctrlCompany
          })
          var type=res.data.rdata.ctrlCompany.audit
          that.setData({
            com_cont:type=='0'?'审核中':type=='1'?'已认证':'认证失败',
            com_type:type,
            isZhuce:true
          })
        }else{
          that.setData({
            com_cont:'未认证',
            isZhuce:false
          })
        }
        if (res.data.rdata.ctrlMemberinfo) {
          wx.setStorageSync('companyId', res.data.rdata.ctrlMemberinfo.companyId)
        }
      }
    })
    var that = this
    this.data.app.http({
      url: '/Other/hotline',
      dengl: false,
      data: {},
      success(res) {
        that.setData({
          kefuPhone: res.data.rdata
        })
      }
    })

  },
  // auth(){
  //   if(this.data.com_type==0){
  //     wx.showToast({
  //       title: '信息审核中！',
  //       icon:"none"
  //     })
  //   }else{
  //     wx.navigateTo({
  //       url: '../m-qiyezhuce/m-qiyezhuce?id=1',
  //     })
  //   }
  // },
  gangwei(e) {
    var that=this
    if(this.data.isZhuce){
      if(that.data.com_type!=1){
        var type=that.data.com_type
        var title=type==0?'企业信息审核中':'企业认证失败'
        wx.showToast({
          title: title,
          icon:"none"
        })
      }else{
        wx.navigateTo({
          url: '../l-qiyezhongxin-zpgw-shz/l-qiyezhongxin-zpgw-shz?id=' + e.currentTarget.dataset.id,
        })
  
      }
    }else{
      this.zhuce.show()
    }
  
  },
  zhuCancel() {
    this.zhuce.show()
  },
  zhuConfirm() {
    this.zhuce.show()
    wx.redirectTo({
      url: '../m-qiyezhuce/m-qiyezhuce',
    })
  },
  qiuzhi() {
    this.tog.show()
  },
  cancel() {
    this.tog.show()
  },
  confirm() {
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
    wx.switchTab({
      url: '../m-shouye/m-shouye',
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
          wx.setStorageSync('companyId', '')
          wx.removeStorageSync('users')
          wx.showToast({
            title: '您已退出登录'
          })
        }
        // this.onLoad()
      }
    })
  },
  about() {
    wx.navigateTo({
      url: '../b-guanyuwomen/b-guanyuwomen',
    })
  },
  phone() {
    wx.makePhoneCall({
      phoneNumber: this.data.kefuPhone.phone
    })
  },
  tanchuang_2: function () {
    this.setData({
      dianhua: 'display:block'
    })
  },
  quxiao2: function () {
    this.setData({
      dianhua: 'display:none'
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
    wx.hideHomeButton({
      success: function () {
      },
      fail: function () {
      },
      complete: function () {
      },
    });

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