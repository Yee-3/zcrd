// pages/n-sousuo/n-sousuo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: getApp().globalData,
    searchList: [],
    hisList: [],
    val: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.data.app.http({
      url: '/index/getSearch',
      dengl: true,
      method: 'POST',
      data: {},
      success(res) {
        console.log(res)
        that.setData({
          searchList: res.data.rdata.searchDTO,
          hisList: res.data.rdata.ctrlSearchDTO
        })
      }
    })
  },
  addValue(e) {
    console.log(e)
    this.setData({
      val: e.currentTarget.dataset.value
    })
    this.search_s()
  },

  search(e) {
    this.setData({
      val: e.detail.value
    })
    console.log(this.data.val)
  },
  search_s() {
    wx.navigateTo({
      url: '../o-sousuojieguo-jl/o-sousuojieguo-jl?name=' + this.data.val,
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