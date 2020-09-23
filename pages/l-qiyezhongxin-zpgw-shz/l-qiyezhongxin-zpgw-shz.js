// pages/l-qiyezhongxin-zpgw-shz/l-qiyezhongxin-zpgw-shz.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idn: 1,
    id: '',
    currentPage: 1,
    loadingType: 0,
    contentText: {
      contentdown: "上拉显示更多",
      contentrefresh: "正在加载...",
      contentnomore: "就这么多了~"
    },
    app: getApp().globalData,
    recomList: [],
    passList: [],
    isHz:false,
    kefuPhone: {},
    isHz_Type:''
    
    // isTwo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options){
      this.setData({
        companyId:options.id
      })
    }
    var that = this
    this.data.app.http({
      type: true,
      url: '/company/queryCooperate',
      dengl: true,
      data: {
        companyId: that.data.companyId
      },
      method: 'POST',
      success(res) {
          that.setData({
            isHz_Type:res.data.rdata
          })
      }
    })
    this.setData({
      id: that.data.companyId
    })
    var status = this.data.idn == 1 ? 1 : this.data.idn == 2 ? 0 : 2
    var data = {
      companyId: that.data.id,
      limit: 10,
      page: this.data.currentPage,
      status: status
    }
    this.reword(data)
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
  reword(data) {
    var that = this
    wx.showNavigationBarLoading()
    this.data.app.http({
      type: true,
      url: '/company/queryJobPosition',
      dengl: true,
      method: 'POST',
      data: data,
      success(res) {
        var arr = res.data.rdata
        if (arr.length > 0) {
          arr.map(function (val, i) {
            if (val.welfare) {
              val.wel = JSON.parse(val.welfare)
            }
          })
        }
        that.setData({
          recomList: res.data.rdata
        })

        if (res.data.rdata.length < 10) {
          that.setData({
            loadingType: 2
          })
        }else{
          that.setData({
            loadingType: 0
          })
        }
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
      }
    })
  },
  jiazai(data) {
    var that = this
    this.setData({
      currentPage: that.data.currentPage + 1
    })
    if (this.data.loadingType != 0) {
      //loadingType!=0;直接返回
      return false;
    }else{
      this.setData({
        loadingType: 1
      })
      wx.showNavigationBarLoading()
      this.data.app.http({
        type: true,
        url: '/company/queryJobPosition',
        dengl: true,
        data: data,
        method: 'POST',
        success(res) {
          var arr = res.data.rdata
          if (arr.length > 0) {
            arr.map(function (val, i) {
              if (val.welfare) {
                val.wel = JSON.parse(val.welfare)
              }
            })
          }
          that.setData({
            recomList: that.data.recomList.concat(res.data.rdata)
          })
          if (res.data.rdata.length <10) {
            that.setData({
              loadingType: 2
            })
            wx.hideNavigationBarLoading()
          } else {
            that.setData({
              loadingType: 0
            })
          }
          wx.hideNavigationBarLoading()
        }
      })
    }
   
  },
  release() {
    if(this.data.isHz_Type=='Y'){
      wx.navigateTo({
        url: '../a-gangweifabu/a-gangweifabu?id=' + this.data.id,
      })
    }else{
      this.setData({
        isHz:true
      })
    }
  },
  toggleShen(e) {
    var that = this
    this.setData({
      idn: e.currentTarget.dataset.index
    })
    if (this.data.idn == 1) {
      this.setData({
        currentPage: 1
      })
      var data = {
        companyId: that.data.id,
        limit: 10,
        page: this.data.currentPage,
        status: 1
      }
      this.reword(data)
    } else if (this.data.idn == 2) {
      this.setData({
        currentPage: 1
      })
      var data = {
        companyId: that.data.id,
        limit: 10,
        page: this.data.currentPage,
        status: 0
      }
      this.reword(data)
    } else {
      this.setData({
        currentPage: 1
      })
      var data = {
        companyId: that.data.id,
        limit: 10,
        page: this.data.currentPage,
        status: 2
      }
      this.reword(data)
    }
  },
  phone() {
    wx.makePhoneCall({
      phoneNumber: this.data.kefuPhone.phone
    })
  },
  quxiao2: function () {
    this.setData({
      isHz:false
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
    var that = this,
      status = this.data.idn == 1 ? 1 : this.data.idn == 2 ? 0 : 2,
      data = {
        companyId: that.data.id,
        limit: 10,
        page: that.data.currentPage+1,
        status: status
      }
    this.jiazai(data)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})