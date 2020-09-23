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
    titleCon:{},
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if(options){
      this.setData({
        titleCon:options,
        id:options.id
      })
    }
    wx.showNavigationBarLoading()
    this.data.app.http({
      type: true,
      url: '/indexCom/getAccurateResumeList',
      dengl: true,
      method: 'POST',
      data: {
        limit: 10,
        page: 1,
        // positionId: '842059342b88455bab2c62a22c404ca4'
        positionId:options.id
      },
      success(res) {
        var arr = res.data.rdata==null?arr=[]:res.data.rdata
        if (arr.length > 0) {
          arr.map(function (val, i) {
            var arrs = val.resumeData.ctrlWorkDTOS
            if (arrs.length > 0) {
              arrs.map(function (vals, is) {
                var date1 =Date.parse(new Date(vals.startTime.replace(/\-/g, "/")))
                var date = Date.parse(new Date(vals.endTime.replace(/\-/g, "/")))
                var time=parseInt((date-date1)/ 1000 / 60 / 60 / 24)
                // 天数
                var time1=(time / 365).toString().split(".")
                if(time1[1]){
                  var ti=time1[1].toString().substring(0,1)
                  time1[1]=Math.round(ti*1.2)
                }
                var value = (time1[0] == 0 ? '' : time1[0] + '年') + (time1[1]>0 ? time1[1]+ '个月' : '') 
                vals.timeVal = value
              })
            }
          })
        }
        that.setData({
          conList: res.data.rdata
        })
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
  detail(e) {
    wx.navigateTo({
      url: '../f-jinzhunjianlixq/f-jinzhunjianlixq?id='+e.currentTarget.dataset.id+'&positId='+this.data.titleCon.id+'&pushId='+e.currentTarget.dataset.pushid,
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
      url: '/index/getPosition',
      dengl: true,
      method: 'POST',
      data: {
        limit: 10,
        page: that.data.currentPage,
        positionId: that.data.id
      },
      success(res) {
       
        var arr = res.data.rdata
        var myDate = new Date()
      
        if (arr.length > 0) {
          arr.map(function (val, i) {
            var arrs = val.resumeData.ctrlWorkDTOS
            if (arrs.length > 0) {
              arrs.map(function (vals, is) {
                var date1 = vals.startTime.substring(0, 10)
                var date = vals.endTime.substring(0, 10)
                let start = new Date(date1.replace(/\-/g, "/"));
                let end = new Date(date.replace(/\-/g, "/"));
                let startYear = start.getFullYear();
                let startMonth = start.getMonth();
                let endYear = end.getFullYear();
                let endMonth = end.getMonth();
                let monthCount = (endYear - startYear) * 12 + endMonth - startMonth;
                var val = (monthCount / 12).toString().split(".")
                var value = (val[0] == 0 ? '' : val[0] + '年') + (val[1] ? val[1] + '个月' : '')
                vals.timeVal = value
           
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