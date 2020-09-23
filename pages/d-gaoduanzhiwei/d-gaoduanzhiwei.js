// pages/d-gaoduanzhiwei/d-gaoduanzhiwei.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clas:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app=getApp().globalData
    var that=this
    app.http({
      url: '/selects/position_highend',
      data: {},
      dengl:false,
      success(res) {
        console.log(res.data.rdata)
        that.setData({
          clas:res.data.rdata
        })
      }
    })
  },
  detail(e) {
    wx.navigateTo({
      url: '../e-gaoduanzhiwei-gqyh/e-gaoduanzhiwei-gqyh?id='+e.currentTarget.dataset.index+'&title='+e.currentTarget.dataset.value,
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