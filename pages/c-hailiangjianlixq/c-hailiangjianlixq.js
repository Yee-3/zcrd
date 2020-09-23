// pages/c-hailiangjianlixq/c-hailiangjianlixq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    isMask: false,
    datePickerValue: ['', '', '','',''],
    datePickerIsShow: false,
    isHz: '',
    isTwo: false,
    detCon: {},
    id: '',
    positionId: '',
    app: getApp().globalData,
    positList: [],
    date: '',
    resumeId: '',
    currentPage: 1,
    loadingType: 0,
    contentText: {
      contentdown: "上拉显示更多",
      contentrefresh: "正在加载...",
      contentnomore: "没有更多数据了"
    },
    isF: false,
    isX: false,
    hidd: true,
    hidd1: true,
    isXuan: true,
    itIndex: 'X',
    isZhuce: '',
    isType: '',
    content: '您还未注册企业信息，请注册企业信息！',
    kefuPhone: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tog = this.selectComponent("#tog");
    this.setData({
      height: wx.getSystemInfoSync().windowHeight * 0.9,
      id: wx.getStorageSync('companyId')
    })
    var app = getApp().globalData,
      that = this,
      id = wx.getStorageSync('companyId')
    app.http({
      type: true,
      url: '/getCompany',
      dengl: true,
      data: {},
      success(res) {
        // 有企业信息
        if (res.data.rdata.ctrlCompany) {
          that.setData({
            isZhuce: true, // 注册信息true
          })
          var type = res.data.rdata.ctrlCompany.audit
          var types = res.data.rdata.ctrlCompany.cooperation
          if (type != 1) {
            that.setData({
              isHz: false
            })
          } else {
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
    // app.http({
    //   type: true,
    //   url: '/company/queryCooperate',
    //   dengl: true,
    //   data: {
    //     companyId: id
    //   },
    //   method: 'POST',
    //   success(res) {
    //     if(res.data.rdata=='N'){
    //       that.setData({
    //         isHz:false
    //       })
    //     }else{
    //       that.setData({
    //         isHz:true
    //       })
    //     }
    //   }
    // })

    app.http({
      url: '/indexCom/getResumeDetail',
      type: true,
      dengl: true,
      method: 'POST',
      data: {
        id: options.id
      },
      success(res) {
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
        that.setData({
          detCon: res.data.rdata,
          resumeId: res.data.rdata.ctrlResumeDTO.id,
        
        })
      }
    })
    app.http({
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
  zhuCancel() {
    this.tog.show()
    // wx.redirectTo({
    //   url: '../m-qiyezhuce/m-qiyezhuce',
    // })
  },
  zhuConfirm() {
    this.tog.show()
    wx.redirectTo({
      url: '../m-qiyezhuce/m-qiyezhuce',
    })
  },
  reword(data) {
    var that = this
    wx.showNavigationBarLoading()
    this.data.app.http({
      type: true,
      url: '/company/queryJobPosition',
      dengl: true,
      method: 'POST',
      data: data,
      success(res) {
        // 回到顶部
        that.setData({
          positList: res.data.rdata
        })
        if (res.data.rdata.length < 10) {
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
      url: '/company/queryJobPosition',
      dengl: true,
      method: 'POST',
      data: data,
      success(res) {
        that.setData({
          positList: that.data.positList.concat(res.data.rdata)
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
  choice(e) {
    var that = this
    this.setData({
      positionId: e.currentTarget.dataset.id,
      itIndex: e.currentTarget.dataset.index
    })

  },
  invit() {
    var that = this
    if (!this.data.isZhuce) {
      this.tog.show()
    } else {
      // com_cont:type=='0'?'审核中':type=='1'?'已认证':'认证失败',
      if (this.data.isType != 1) {
        var type = that.data.isType
        var title = type == 0 ? '企业信息审核中' : '企业认证失败'
        wx.showToast({
          title: title,
          icon: "none"
        })
      } else {
        if (that.data.isHz) {
          var mask = that.data.isMask
          that.setData({
            isMask: !mask,
            currentPage: 1,
            itIndex: 'X'
          })
          var data = {
            companyId: that.data.id,
            limit: 10,
            page: that.data.currentPage,
            status: 1
          }
          that.reword(data)
        } else {
          var two = that.data.isTwo
          that.setData({
            isTwo: !two
          })
        }
      }

    }

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
    if (!this.data.positionId) {
      wx.showToast({
        title: '请选择要招聘的职位',
        icon: "none"
      })
    } else {
      this.invit()
      this.setData({
        datePickerIsShow: true,
        data_index: e.currentTarget.dataset.de
      });

    }
  },
  hidd() {
    var mask = this.data.isMask
    this.setData({
      isMask: !mask,
    })
  },
  scrll() {
    var data = {
      companyId: this.data.id,
      limit: 10,
      page: this.data.currentPage + 1,
      status: 1
    }
    this.jiazai(data)
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
          time:`${e.detail.value[0]}-${e.detail.value[1]}-${e.detail.value[2]} ${e.detail.value[3]}:${e.detail.value[4]}:00`,
          resumeId: that.data.resumeId
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
  
    return {
      title: '职面|求职招聘找工作',
      desc: '',
      imageUrl: '../img/share.jpg', // 可以更换分享的图片
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