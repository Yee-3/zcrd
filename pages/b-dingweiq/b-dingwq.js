// pages/b-dingwq/b-dingwq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,
    showMap: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.map = this.selectComponent("#map");
    const win = wx.getSystemInfoSync();
    this.setData({
      winHeight: win.windowHeight
    });
    if (options.id == 1) {
      this.setData({
        showMap: false
      })
    } else {
      this.setData({
        showMap: true
      })
    }

  },
  cityTap(e) {
    console.log(e)
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[pages.length - 2];
    var that = this
    //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
    if (e.detail.location) {
      console.log(e.detail)
      prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
        mapValue: e.detail.cityname,
        id_adre: that.map.data.ids ? that.map.data.ids : '',
        location: e.detail.location.lng + ',' + e.detail.location.lat,
        currentPage:1
      })
    } else {
      console.log(prevPage.data.location,3333)
      prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
        mapValue: e.detail.cityname,
        id_adre: that.map.data.ids ? that.map.data.ids : '',
        currentPage:1
        
      })
    }
    var that = this
    const cityName = e.detail.cityname;
    wx.navigateBack({
      success(res) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        if (that.map.data.ids) {
          var data = {
            limit: 10,
            page: prevPage.data.currentPage,
            type: 2,
            name: prevPage.data.name ? prevPage.data.name : '',
            location: prevPage.data.location ? prevPage.data.location : '',
            address: prevPage.data.id_adre ? prevPage.data.id_adre : ''
          }
          prevPage.reword(data)
        } else {
          // page.onLoad();
        }
        // delta = 1
      }
    });


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