// pages/e-jinzhunjianli/e-jinzhunjianli.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: getApp().globalData,
    jlList: [],
    comId: '',
    currentPage: 1,
    loadingType: 0,
    contentText: {
      contentdown: "上拉显示更多",
      contentrefresh: "正在加载...",
      contentnomore: "没有更多数据了"
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      comId: options.id
    })
    var that = this
    var data = {
      companyId: options.id,
      limit: 10,
      page: that.data.currentPage,
    }
    this.reword(data)
  },
  reword(data) {
    var that = this
    wx.showNavigationBarLoading()
    this.data.app.http({
      url: '/indexCom/getAccurateResume',
      dengl: true,
      method: 'POST',
      data: data,
      success(res) {
        that.setData({
          jlList: res.data.rdata
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
    }
    this.setData({
      loadingType: 1
    })
    wx.showNavigationBarLoading()
    this.data.app.http({
      url: '/indexCom/getAccurateResume',
      dengl: true,
      method: 'POST',
      data: data,
      success(res) {
        that.setData({
          jlList: that.data.jlList.concat(res.data.rdata)
        })
        if (res.data.rdata.length < 10) {
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
  },
  jingzhun(e) {
    wx.navigateTo({
      url: '../g-jinzhunjianli-zwjl/g-jinzhunjianli-zwjl?id=' + e.currentTarget.dataset.id + '&money=' + e.currentTarget.dataset.money + '&name=' + e.currentTarget.dataset.name + '&num=' + e.currentTarget.dataset.num + '&address=' + e.currentTarget.dataset.addr,
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
    var that=this
    var data = {
      companyId: that.data.comId,
      limit: 10,
      page: that.data.currentPage+1,
    }
    this.jiazai(data)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})