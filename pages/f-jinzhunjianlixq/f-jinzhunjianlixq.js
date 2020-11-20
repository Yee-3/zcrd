// pages/f-jinzhunjianlixq/f-jinzhunjianlixq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isF: true,
    isX: true,
    height: '',
    isMask: false,
    datePickerValue: ['', '', '', '', ''],
    datePickerIsShow: false,
    isHz: '',
    isTwo: false,
    app: getApp().globalData,
    content: {},
    date: '',
    resumeId: '',
    positionId: '',
    isXuan: true,
    isF: false,
    isX: false,
    hidd: true,
    hidd1: true,
    itIndex: 'X',
    isZhuce: '',
    isType: '',
    neorong: '您还未注册企业信息，请注册企业信息！',
    kefuPhone: {},
    pushId: '',
    maxHeight: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tog = this.selectComponent("#tog");

    var that = this
    this.setData({
      height: wx.getSystemInfoSync().windowHeight * 0.9,
      id: wx.getStorageSync('companyId'),
      positionId: options.positId,
      pushId: options.pushId
    })
    var id = wx.getStorageSync('companyId'),
      app = getApp().globalData,
      that = this
    this.data.app.http({
      type: true,
      url: '/getCompany',
      dengl: true,
      data: {},
      success(res) {
        if (res.data.rdata.ctrlCompany) {
          that.setData({
            isZhuce: true,
          })
          var type = res.data.rdata.ctrlCompany.audit
          var types = res.data.rdata.ctrlCompany.cooperation
          if (type == 1) {
            that.setData({
              isHz: types == 'Y' ? true : false,
              isType: type,
            })
          }
        } else {
          that.setData({
            isHz: false,
            isZhuce: false
          })
        }

      }
    })
    // this.data.app.http({
    //   type: true,
    //   url: '/company/queryCooperate',
    //   dengl: true,
    //   data: {
    //     companyId: id
    //   },
    //   method: 'POST',
    //   success(res) {
    //     if (res.data.rdata == 'N') {
    //       that.setData({
    //         isHz: false
    //       })
    //     } else {
    //       that.setData({
    //         isHz: true
    //       })
    //     }
    //   }
    // })

    this.data.app.http({
      url: '/indexCom/getResumeDetail',
      dengl: true,
      method: 'POST',
      data: {
        id: options.id
      },
      success(res) {
        if (res.data.rdata) {
          var arr = res.data.rdata.ctrlWorkDTOS
          var arr1 = res.data.rdata.ctrlProjectDTOS
          var arr2 = res.data.rdata.ctrlSchoolDTOS
          var arr3 = res.data.rdata.ctrlBookDTOS
          if (res.data.rdata.ctrlWorkDTOS.length <= 1) {
            that.setData({
              hidd: false,
              isF: true
            })
          } else {
            that.setData({
              hidd: true,
              isF: false
            })
          }
          if (res.data.rdata.ctrlProjectDTOS.length <= 1) {
            that.setData({
              hidd1: false,
              isX: true
            })
          } else {
            that.setData({
              hidd1: true,
              isX: false
            })
          }
          if (arr.length > 0) {
            arr.map(function (val, i) {
              var startTime = val.startTime.substring(0, 7).replace('-', '/')
              var endTime = val.endTime.substring(0, 7).replace('-', '/')
              val.valTime = startTime + '~' + endTime
            })
          }
          if (arr1.length > 0) {
            arr1.map(function (val, i) {
              var startTime = val.startTime.substring(0, 7).replace('-', '/')
              var endTime = val.endTime.substring(0, 7).replace('-', '/')
              val.valTime = startTime + '~' + endTime
            })
          }
          if (arr2.length > 0) {
            arr2.map(function (val, i) {
              var startTime = val.startTime.substring(0, 7).replace('-', '/')
              var endTime = val.endTime.substring(0, 7).replace('-', '/')
              val.valTime = startTime + '~' + endTime
            })
          }
          if (arr3.length > 0) {
            arr3.map(function (val, i) {
              if (val.time) {
                var time = val.time.substring(0, 4) + '年' + val.time.substring(5, 7) + '月'
                val.valTime = time
              }
            })
          }
        }
        that.setData({
          content: res.data.rdata,
          resumeId: res.data.rdata.ctrlResumeDTO.id
        })

      }
    })
    this.data.app.http({
      type: true,
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
  
  change: function (e) {
    var f = this.data.isF
    this.setData({
      isF: !f
    })
  },
  change1: function (e) {
    var x = this.data.isX
    this.setData({
      isX: !x
    })
  },
  invit() {
    var two = this.data.isTwo
    this.setData({
      isTwo: !two
    })
  },
  phone() {
    wx.makePhoneCall({
      phoneNumber: this.data.kefuPhone.phone
    })
  },
  quxiao2: function () {
    this.invit()
  },
  confirm(e) {
    var that = this
    if (!this.data.isZhuce) {
      that.tog.show()
    } else {
      if (this.data.isType != 1) {
        var type = that.data.isType
        var title = type == 0 ? '企业信息审核中' : '企业认证失败'
        wx.showToast({
          title: title,
          icon: "none"
        })
      } else {
        if (this.data.isHz) {
          that.setData({
            datePickerIsShow: true,
            data_index: e.currentTarget.dataset.de
          });
        } else {
          that.invit()
        }

      }

    }
  },
  jujue() {
    var that = this
    this.data.app.http({
      type: true,
      url: '/indexCom/disagreeAccurateResume',
      method: 'POST',
      dengl: true,
      data: {
        pushId: this.data.pushId
      },
      success(res) {
        if (res.data.code == 200) {
          wx.navigateBack({
            success(res) {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
        }
      }
    })
  },
  zhuCancel() {
    this.tog.show()
    // wx.redirectTo({
    //   url: '../m-qiyezhuce/m-qiyezhuce',
    // })
  },
  zhuConfirm() {
    this.tog.show()
    wx.navigateTo({
      url: '../m-qiyezhuce/m-qiyezhuce',
    })
  },
  // 选择时间

  bindDateChange1: function (e) {
    this.setData({
      datePickerIsShow: true,
      data_index: e.currentTarget.dataset.de
    });
  },

  datePickerOnSureClick: function (e) {
    this.setData({
      date: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日${e.detail.value[3]}时${e.detail.value[4]}分`,
      datePickerValue: e.detail.value,
      datePickerIsShow: false,
    })
    if (!this.data.date) {
      wx.showToast({
        title: '请选择面试时间',
        icon: "none"
      })
    } else {
      var that = this
      this.data.app.http({
        type: true,
        url: '/company/invitation',
        dengl: true,
        data: {
          companyId: that.data.id,
          positionId: that.data.positionId,
          time: `${e.detail.value[0]}-${e.detail.value[1]}-${e.detail.value[2]}-${e.detail.value[3]}-${e.detail.value[4]}`,
          resumeId: that.data.resumeId,
          pushId: this.data.pushId
        },
        method: 'POST',
        success(res) {
          if (res.data.code == 200) {
            wx.showToast({
              title: '邀请成功',
            })
          } else {
            wx.showToast({
              title: '已邀请，请勿重复邀请',
              icon: "none"
            })
          }
        }
      })
    }
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