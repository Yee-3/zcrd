// pages/g-jinzhunjianli-zwjl/g-jinzhunjianli-zwjl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: getApp().globalData,
    conList: [],
    currentPage: 1,
    loadingType: 0,
    contentText: {
      contentdown: "上拉显示更多",
      contentrefresh: "正在加载...",
      contentnomore: "我也是有底线的~"
    },
    titleCon: {},
    id: '',
    maxHeight: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options) {
      this.setData({
        titleCon: options,
        id: options.id
      })
    }
    this.load()
  },
  detail(e) {
    wx.navigateTo({
      url: '../f-jinzhunjianlixq/f-jinzhunjianlixq?id=' + e.currentTarget.dataset.id + '&positId=' + this.data.titleCon.id + '&pushId=' + e.currentTarget.dataset.pushid,
    })
  },
  load() {
    var that = this
    wx.showNavigationBarLoading()
    this.data.app.http({
      type: true,
      url: '/indexCom/getAccurateResumeList',
      dengl: true,
      method: 'POST',
      data: {
        limit: 10,
        page: 1,
        positionId: this.data.id
      },
      success(res) {
        var arr = res.data.rdata == null ? arr = [] : res.data.rdata
        if (arr.length > 0) {
          arr.map(function (val, i) {
            var date1 = Date.parse(new Date(val.lastLogin))
            var date = Date.parse(new Date())
            var day = parseInt((date - date1) / 1000)
            var value = day < 60 ? '刚刚' : day >= 60 && (parseInt(day / 60) < 60) ? parseInt(day / 60) + '分钟前' : parseInt(day / 60) > 60 && (parseInt(day / 60 / 60) < 24) ? parseInt(day / 60 / 60) + '小时前' : parseInt(day / 60 / 60) >= 24 && (parseInt(day / 60 / 60 / 24) < 30) ? parseInt(day / 60 / 60 / 24) + '天前' : parseInt(day / 60 / 60 / 24 / 30) + '月前'
            val.timeVal = value
            if (val.resumeData.ctrlWorkDTOS.length > 0) {
              val.resumeData.ctrlWorkDTOS.map(function (item, index) {
                item.timeVal = that.monthDayDiff(item.startTime, item.endTime)
              })
            }
          })
        }

        that.setData({
          conList: res.data.rdata
        })
        let query = wx.createSelectorQuery();
        query.select('.d_13').boundingClientRect(rect => {
          let clientHeight = rect.height;
          let clientWidth = rect.width;
          let ratio = 750 / clientWidth;
          let height = clientHeight * ratio;
          that.setData({
            maxHeight: height * 2
          })
        }).exec()
        if (arr < 10) {
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
  monthDayDiff(str, end) {
    // this指针
    let _this = this;
    let flag = [1, 3, 5, 7, 8, 10, 12, 4, 6, 9, 11, 2];
    var start = new Date(str.replace(/-/g,'/'));
    var end = new Date(end.replace(/-/g,'/'));
    var year = end.getFullYear() - start.getFullYear();
    var month = end.getMonth() - start.getMonth();
    var day = end.getDate() - start.getDate();
    if (month < 0) {
      year--;
      month = end.getMonth() + (12 - start.getMonth());
    }
    if (day < 0) {
      month--;
      let index = flag.findIndex((temp) => {
        return temp === start.getMonth() + 1
      });
      let monthLength;
      if (index <= 6) {
        monthLength = 31;
      } else if (index > 6 && index <= 10) {
        monthLength = 30;
      } else {
        monthLength = 28;
      }
      day = end.getDate() + (monthLength - start.getDate());

    }
    month = day > 15 ? month + 1 : month
    var result = year==0?`${month}个月`:month==0?`${year}年`:`${year}年${month}个月`;
    return result
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
      url: '/indexCom/getAccurateResumeList',
      dengl: true,
      method: 'POST',
      data: {
        limit: 10,
        page: that.data.currentPage,
        positionId: this.data.id
      },
      success(res) {
        var arr = res.data.rdata
        var myDate = new Date()
        if (arr.length > 0) {
          arr.map(function (val, i) {
            var date1 = Date.parse(new Date(val.lastLogin))
            var date = Date.parse(new Date())
            var day = parseInt((date - date1) / 1000)
            var value = day < 60 ? '刚刚' : day >= 60 && (parseInt(day / 60) < 60) ? parseInt(day / 60) + '分钟前' : parseInt(day / 60) > 60 && (parseInt(day / 60 / 60) < 24) ? parseInt(day / 60 / 60) + '小时前' : parseInt(day / 60 / 60) >= 24 && (parseInt(day / 60 / 60 / 24) < 30) ? parseInt(day / 60 / 60 / 24) + '天前' : parseInt(day / 60 / 60 / 24 / 30) + '月前'
            val.timeVal = value
            if (val.resumeData.ctrlWorkDTOS.length > 0) {
              val.resumeData.ctrlWorkDTOS.map(function (item, index) {
                item.timeVal = that.monthDayDiff(item.startTime, item.endTime)
              })
            }
          })
        }
        that.setData({
          conList: that.data.conList.concat(res.data.rdata)
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