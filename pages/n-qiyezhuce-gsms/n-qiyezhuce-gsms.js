// pages/n-qiyezhuce-gsms/n-qiyezhuce-gsms.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val: '',
    content: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      content: options
    })
    if (options.desc) {
      this.setData({
        val:options.desc
      })
    }
  },
  change(e) {
    console.log(e)
    this.setData({
      val: e.detail.value
    })
  },
  baocun() {
    var that = this
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    console.log(this.data.val)
    prevPage.setData({
      val: that.data.val,
      options: that.data.content
    })
    wx.navigateBack({
      success(res) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        // page.onLoad();
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

  }
})