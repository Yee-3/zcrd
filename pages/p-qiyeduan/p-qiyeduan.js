// pages/p-qiyeduan/p-qiyeduan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 1,
    loadingType: 0,
    contentText: {
      contentdown: "上拉显示更多",
      contentrefresh: "正在加载...",
      contentnomore: "就这么多了~"
    },
    app: getApp().globalData,
    recomList: [],
    imgList: [],
    companyId: '',
    kefuPhone: {},
    isHz: false,
    maxHeight: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tab = this.selectComponent("#tab");
    var that = this
    if (wx.getStorageSync('companyId')) {
      this.setData({
        companyId: wx.getStorageSync('companyId')
      })
    }
    wx.showNavigationBarLoading()
    this.data.app.http({
      type: false,
      url: '/indexCom/getIndex',
      data: {
        limit: 10,
        page: that.data.currentPage
      },
      dengl: false,
      success(res) {
        var arr = res.data.rdata.ctrlResumeList
        arr.map(function (val, i) {
          if (val.lastLogin) {
            var date1 = Date.parse(new Date(val.lastLogin.replace(/\-/g, "/")))
            var date = Date.parse(new Date())
            var day = parseInt((date - date1) / 1000)
            var value = day < 60 ? '刚刚' : day >= 60 && (parseInt(day / 60) < 60) ? parseInt(day / 60) + '分钟前' : parseInt(day / 60) > 60 && (parseInt(day / 60 / 60) < 24) ? parseInt(day / 60 / 60) + '小时前' : parseInt(day / 60 / 60) >= 24 && (parseInt(day / 60 / 60 / 24) < 30) ? parseInt(day / 60 / 60 / 24) + '天前' : parseInt(day / 60 / 60 / 24 / 30) + '月前'
            val.timeVal = value
          }
          if (val.ctrlWorkDTOS.length > 0) {
            val.ctrlWorkDTOS.map(function (item, index) {
              item.timeVal = that.monthDayDiff(item.startTime, item.endTime)
            })
          }
        })
        if (res.data.rdata.ctrlBannerList.length > 0) {
          var arrs = res.data.rdata.ctrlBannerList
          arrs.map(function (val, i) {
            if (val.url.indexOf('http')==-1) {
              val.url = that.data.app.baseUrl + val.url
            }
          })
        }
        that.setData({
          imgList: res.data.rdata.ctrlBannerList,
          recomList: res.data.rdata.ctrlResumeList,
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
        }).exec();
        if (res.data.rdata.ctrlResumeList.length < 10) {
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
    this.data.app.http({
      url: '/Other/hotline',
      dengl: false,
      data: {},
      type: true,
      success(res) {
        that.setData({
          kefuPhone: res.data.rdata
        })
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
    var result = year == 0 ? month + '个月' : month == 0 ? year + '年' : year + '年' + month + '个月';
    return result
  },
  // more(){
  //   wx.navigateTo({
  //     url: '../d-hailiangrencai/d-hailiangrencai?id=2',
  //   })
  // },
  person() {
    wx.navigateTo({
      url: '../d-hailiangrencai/d-hailiangrencai',
    })
  },
  resume() {
    var id = this.data.companyId,
      that = this
    this.data.app.http({
      type: true,
      url: '/getCompany',
      dengl: true,
      data: {},
      success(res) {
        if (res.data.rdata.ctrlCompany) {
          var type = res.data.rdata.ctrlCompany.audit
          var types = res.data.rdata.ctrlCompany.cooperation
          if (type == 1) {
            if (types == 'Y') {
              wx.navigateTo({
                url: '../e-jinzhunjianli/e-jinzhunjianli?id=' + id,
              })
            } else {
              that.setData({
                isHz: true
              })
            }
          } else {
            that.setData({
              isHz: true
            })
          }
        } else {
          that.setData({
            isHz: true
          })
        }
      }
    })

  },
  phone() {
    wx.makePhoneCall({
      phoneNumber: this.data.kefuPhone.phone
    })
  },
  cancle() {
    this.setData({
      isHz: false
    })
  },
  entry() {
    wx.navigateTo({
      url: '../d-hailiangrencai/d-hailiangrencai?id=' + 1,
    })
  },
  detail(e) {
    wx.navigateTo({
      url: '../c-hailiangjianlixq/c-hailiangjianlixq?id=' + e.currentTarget.dataset.id,
    })
  },
  qyRen() {
    wx.navigateTo({
      url: '../m-qiyezhuce/m-qiyezhuce',
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
      type: true,
      url: '/indexCom/getIndex',
      dengl: false,
      data: data,
      success(res) {
        var arr = res.data.rdata.ctrlResumeList
        arr.map(function (val, i) {
          if (val.lastLogin) {
            var date1 = Date.parse(new Date(val.lastLogin.replace(/\-/g, "/")))
            var date = Date.parse(new Date())
            var day = parseInt((date - date1) / 1000)
            var value = day < 60 ? '刚刚' : day >= 60 && (parseInt(day / 60) < 60) ? parseInt(day / 60) + '分钟前' : parseInt(day / 60) > 60 && (parseInt(day / 60 / 60) < 24) ? parseInt(day / 60 / 60) + '小时前' : parseInt(day / 60 / 60) >= 24 && (parseInt(day / 60 / 60 / 24) < 30) ? parseInt(day / 60 / 60 / 24) + '天前' : parseInt(day / 60 / 60 / 24 / 30) + '月前'
            val.timeVal = value
          }
          if (val.ctrlWorkDTOS.length > 0) {
            val.ctrlWorkDTOS.map(function (item, index) {
              item.timeVal = that.monthDayDiff(item.startTime, item.endTime)
            })
          }
        })
        that.setData({
          recomList: that.data.recomList.concat(res.data.rdata.ctrlResumeList)
        })


        if (res.data.rdata.ctrlResumeList.length < 10) {
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
  showTab() {},
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
      success: function () {},
      fail: function () {},
      complete: function () {},
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
    var that = this,
      data = {
        limit: 10,
        page: that.data.currentPage + 1
      }
    this.jiazai(data)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '职面-用实效做招聘，省去繁琐过程',
      desc: '',
      imageUrl: '../img/share2.jpg', // 可以更换分享的图片
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '分享成功',
          icon: "none"
        });
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '分享失败',
          icon: "none"
        })
      }
    }
  }
})