// pages/x-wodejianli-qzyx/x-wodejianli-qzyx.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ind: 'x',
    ind1: 'x',
    ind2: '',
    array: [1, 2, 3, 4],
    items: [{
      name: '',
      value: ''
    }, ],
    isAdd: false,
    isInd: false,
    isTime: false,
    isTwo: false,
    num: '',
    indexs: '',
    num1: '',
    num2: '',
    num3: '',
    vauee: '请选择您期望的职位',
    type_value: '请选择',
    app: getApp().globalData,
    class_types: [],
    // type: [],
    money: [],
    work_type: [],
    work_time: [],
    time_value: '请选择',
    mapValue: '请选择',
    hangyeInd: '',
    time_index: '',
    zhiList: [],
    ind_three: 'x',
    ping_value: '',
    value_money: '',
    value_type: '',
    id: '',
    posi_id: '',
    type_Id: '',
    sxType: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      id: options.id,
    })
    if (options.type) {
      this.setData({
        sxType: true
      })
    }
    console.log(options)
    // this.data.content=options
    if (options.type_id) {
      this.setData({
        num: options.money,
        indexs: options.type,
        ind2: options.industry,
        num3: options.time,
        mapValue: options.address ? options.address : '',
        ping_value: options.pingjia ? options.pingjia : '',
        posi_id: options.posit,
        type_Id: options.type_id ? options.type_id : ''
      })
    }
    // 职位类别
    this.data.app.http({
      url: '/selects/position',
      dengl: false,
      data: {},
      success(res) {
        var arr = res.data.rdata[0].treeDTOS
        that.setData({
          zhiList: res.data.rdata[0].treeDTOS,
          // time_value: label
        })
        if (options.posit) {
          for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr[i].treeDTOS.length; j++) {
              for (var x = 0; x < arr[i].treeDTOS[j].treeDTOS.length; x++) {
                if (options.posit == arr[i].treeDTOS[j].treeDTOS[x].id) {
                  that.setData({
                    vauee: arr[i].treeDTOS[j].treeDTOS[x].name,
                    ind: i,
                    ind1: j,
                    ind_three: x,
                  })
                  console.log(arr[i].treeDTOS[j].treeDTOS[x].id)
                }

              }
            }
          }
        }
      }
    })
    // 到岗时间
    this.data.app.http({
      url: '/selects/work_time',
      data: {},
      dengl: false,
      success(res) {
        if (options.time) {
          for (var i = 0; i < res.data.rdata.length; i++) {
            if (options.time == res.data.rdata[i].value) {
              var label = res.data.rdata[i].label
              that.setData({
                time_value: label
              })
            }
          }
        }
        that.setData({
          work_time: res.data.rdata,
        })
      }
    })
    // 行业
    this.data.app.http({
      url: '/selects/company_type',
      data: {},
      dengl: false,
      success(res) {
        if (options.industry) {
          for (var i = 0; i < res.data.rdata.length; i++) {
            if (options.industry == res.data.rdata[i].value) {
              var label = res.data.rdata[i].label
              that.setData({
                type_value: label
              })
            }
          }
        }
        that.setData({
          class_types: res.data.rdata,
        })
      }
    })
    // 期望薪资
    this.data.app.http({
        url: '/selects/expect_money',
        dengl: false,
        data: {},
        success(res) {
          if (options.money) {
            for (var i = 0; i < res.data.rdata.length; i++) {
              if (options.money == res.data.rdata[i].value) {
                var label = res.data.rdata[i].label
                that.setData({
                  value_money: label
                })
              }
            }
          }
          that.setData({
            money: res.data.rdata,
          })
        }


      }),
      // 工作类型
      this.data.app.http({
        url: '/selects/work_type',
        dengl: false,
        data: {},
        success(res) {
          if (options.type) {
            for (var i = 0; i < res.data.rdata.length; i++) {
              if (options.type == res.data.rdata[i].value) {
                var label = res.data.rdata[i].label
                that.setData({
                  value_type: label
                })
              }
            }
          }
          console.log(label)
          that.setData({
            work_type: res.data.rdata,
          })
        }


      })

  },
  blur(e) {
    this.setData({
      ping_value: e.detail.value
    })
  },
  tijiao() {
    console.log(this.data.ping_value)
    var that = this
    if (!that.data.num) {
      wx.showToast({
        title: '请选择期望薪资',
        icon: 'none'
      })
    } else if (!that.data.indexs) {
      wx.showToast({
        title: '请选择类型',
        icon: 'none'
      })
    } else if (!that.data.posi_id) {
      wx.showToast({
        title: '请选择职位类别',
        icon: 'none'
      })
    } else if (!(that.data.mapValue != '请选择')) {
      wx.showToast({
        title: '请选择工作地点',
        icon: 'none'
      })
    } else if (!that.data.ind2) {
      wx.showToast({
        title: '请选择行业',
        icon: 'none'
      })
    } else if (!that.data.num3) {
      wx.showToast({
        title: '请选择到岗时间',
        icon: 'none'
      })
    } else if (!(that.data.ping_value != '请输入')) {
      wx.showToast({
        title: '请输入自我评价',
        icon: 'none'
      })
    } else {
      this.data.app.http({
        url: '/resume/saveOrUpdateObjective',
        dengl: true,
        method: 'POST',
        data: {
          address: that.data.mapValue,
          industry: that.data.ind2,
          introduction: that.data.ping_value,
          money: that.data.num,
          position: that.data.posi_id,
          time: that.data.num3,
          type: that.data.indexs,
          resumeId: that.data.id,
          id: that.data.type_Id
        },
        success(res) {
          console.log(res)
          if (res.data.code == 200) {
            // 及时更新上层页面
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2]; //上一个页面
            prevPage.setData({
              resume: []
            })
            wx.navigateBack({
              success(res) {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad();
              }
            })
            if (that.data.sxType) {
              var pag = getCurrentPages();
              var prevPages = pag[pag.length - 3]; //上一个页面
              prevPages.onLoad()
            }
          }
        }
      })
    }
  },
  toggle(e) {
    var two = this.data.isTwo
    var index = e.currentTarget.dataset['index'],
      that = this
    // console.log()
    this.setData({
      ind: e.currentTarget.dataset['index'],
      isTwo: !two,
      ind1: 'x',
      ind_three: 'x'
    })
  },
  toggle1(e) {
    var index = this.data.ind,
      index2 = e.currentTarget.dataset['index'],
      that = this
    this.setData({
      ind1: e.currentTarget.dataset['index'],
      ind_three: 'x'
    })
  },
  toggle_three(e) {
    var index = this.data.ind,
      index2 = this.data.ind1,
      index3 = e.currentTarget.dataset['index'],
      that = this
    this.setData({
      ind_three: e.currentTarget.dataset['index'],
      posi_id: e.currentTarget.dataset['id'],
      value_zhi: that.data.zhiList[index].treeDTOS[index2].treeDTOS[index3].name
    })
  },
  toggle2(e) {
    console.log(e)
    this.setData({
      ind2: e.currentTarget.dataset['indu'],
      hangyeInd: e.currentTarget.dataset['index']
    })
  },
  confirm_zhi() {
    this.setData({
      isAdd: false,
      isTwo: false
    })
  },
  confirm() {
    var index = this.data.hangyeInd
    var that = this
    this.industry()
    this.setData({
      type_value: that.data.class_types[index].label
    })
  },
  checkboxChange: function (e) {
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  active(e) {
    this.setData({
      num: e.currentTarget.dataset.num,
      value_money: e.currentTarget.dataset.value
    })
  },
  activeOne(e) {
    this.setData({
      indexs: e.currentTarget.dataset.index,
      value_type: e.currentTarget.dataset.value
    })
  },
  // activeTwo(e) {
  //   this.setData({
  //     num1: e.currentTarget.dataset.num1
  //   })
  // },
  activeThree(e) {
    this.setData({
      num2: e.currentTarget.dataset.num2
    })
  },
  activeFour(e) {
    this.setData({
      num3: e.currentTarget.dataset.num,
      time_index: e.currentTarget.dataset.index
    })
  },
  zhiwei() {
    // var that=this
    var add = this.data.isAdd
    this.setData({
      isAdd: !add,
    })
  },
  weizhi() {
    wx.navigateTo({
      url: '../b-dingweiq/b-dingwq',
    })
  },
  Ttime() {
    var timer = this.data.isTime
    var that = this
    this.setData({
      isTime: !timer
    })
    // this.data.app.http({
    //   url: '/selects/work_time',
    //   data: {},
    //   dengl: false,
    //   success(res) {
    //     that.setData({
    //       work_time: res.data.rdata
    //     })
    //   }
    // })
  },
  industry() {
    var ind = this.data.isInd
    var that = this
    this.setData({
      isInd: !ind
    })
    // this.data.app.http({
    //   url: '/selects/company_type',
    //   data: {},
    //   dengl: true,
    //   success(res) {
    //     that.setData({
    //       class_types: res.data.rdata
    //     })
    //   }
    // })
  },
  con() {
    // var numb=currentTarget.dataset.num
    this.Ttime()
    var index = this.data.time_index
    this.setData({
      time_value: this.data.work_time[index].label
    })
  },
  dingwei() {
    wx.navigateTo({
      url: '../b-dingweiq/b-dingwq',
    })
  },
  con_zhi() {
    this.zhiwei()
    var index = this.data.ind,
      index2 = this.data.ind1,
      index3 = this.data.ind_three,
      that = this
    this.setData({
      vauee: that.data.zhiList[index].treeDTOS[index2].treeDTOS[index3].name
    })

  },
  hide() {
    var two = this.data.isTwo
    this.setData({
      isTwo: !two
    })
    if (!this.data.isTwo) {
      this.setData({
        ind1: 0,
        ind_three: 0
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