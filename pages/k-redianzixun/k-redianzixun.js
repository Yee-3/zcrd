// pages/k-redianzixun/k-redianzixun.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: getApp().globalData,
    hotList: [],
    currentPage: 1,
    loadingType: 0,
    contentText: {
      contentdown: "上拉显示更多",
      contentrefresh: "正在加载...",
      contentnomore: "我也是有底线的~"
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showNavigationBarLoading()
    this.data.app.http({
      url: '/info/informationList',
      dengl: true,
      method: 'POST',
      data: {
        limit: 10,
        page: that.data.currentPage
      },
      success(res) {
        console.log(res.data.rdata)
        that.setData({
          hotList: res.data.rdata
        })
        if (res.data.rdata.length < 10) {
          wx.showToast({
            title: '已是最新',
            duration: 2000
          });
          that.setData({
            loadingType: 2
          })
        } else {
          that.setData({
            loadingType: 0
          })
        }
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
      }
    })
  },
  detail(e){
    console.log(e)
    var ind=e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../zd-zixunxq/zd-zixunxq?id='+e.currentTarget.dataset.id,
    })
    var arr=this.data.hotList
    arr[ind].view=1+ parseInt(arr[ind].view)
    this.setData({hotList:arr})
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
    var that = this
    that.setData({
      currentPage: that.data.currentPage + 1
    })
    if (this.data.loadingType != 0) { //loadingType!=0;直接返回
      return false;
    }
    that.setData({
      loadingType: 1
    })
    wx.showNavigationBarLoading()
    this.data.app.http({
      url: '/info/informationList',
      dengl: true,
      method: 'POST',
      data: {
        limit: 10,
        page: that.data.currentPage
      },
      success(res) {
        console.log(res.data.rdata)
        that.setData({
          hotList: that.data.hotList.concat(res.data.rdata)
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})