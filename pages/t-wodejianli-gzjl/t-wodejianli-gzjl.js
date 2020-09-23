// pages/t-wodejianli-gzjl/t-wodejianli-gzjl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date1: '请选择',
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,
    dianhua: 'display:none',
    date: '请选择',
    time: '12:01',
    time1: '12:01',
    types: '',
    value: '请选择',
    isAdd: false,
    isTwo: false,
    isInd: false,
    ind: 'x',
    ind1: 'x',
    ind2: 'x',
    ind3: '0',
    data_index: '',
    app: getApp().globalData,
    zhiList: [],
    value_Zhi: '请选择',
    value_zhi: '',
    type_cont: [],
    comTypeList: [],
    comIndex: '',
    com_value: '请选择',
    com_Type: '',
    dep_Type: '',
    des_Type: '',
    id: '',
    money_Type: '',
    id_ty: '',
    isToggle:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      id: options.id,
      id_ty: options.type_id
    })
    if (options.type_id) {
      that.data.app.http({
        url: '/resume/getResume',
        dengl: true,
        data: {},
        success(res) {
          var list = res.data.rdata.ctrlWorkDTOS
          for (var i = 0; i < list.length; i++) {
            if (options.type_id == list[i].id) {
              var time = list[i].startTime.substring(0, 4) + '年' + list[i].startTime.substring(5, 7) + '月' + list[i].startTime.substring(8, 10) + '日'
              var time1 = list[i].endTime.substring(0, 4) + '年' + list[i].endTime.substring(5, 7) + '月' + list[i].endTime.substring(8, 10) + '日'
              that.setData({
                com_Type: list[i].company,
                date: time,
                date1: time1,
                dep_Type: list[i].department,
                des_Type: list[i].describe,
                value_Zhi: list[i].position,
                com_value: list[i].industry,
                ind3: list[i].industry,
                money_Type: list[i].money,
                types: list[i].type,
                isToggle:true
              })
              for (var i = 0; i < that.data.type_cont.length; i++) {
                if (that.data.types == that.data.type_cont[i].value) {
                  var label = that.data.type_cont[i].label
                }
              }
              that.setData({
                value: label,
              })
            }
          }

        }
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
        })
      }
    })
    // 工作类型
    this.data.app.http({
      url: '/selects/work_type',
      dengl: false,
      data: {},
      success(res) {
        that.setData({
          type_cont: res.data.rdata,
        })
      }
    })
    // 行业弹框
    this.data.app.http({
      url: '/selects/company_type',
      dengl: false,
      data: {},
      success(res) {
        that.setData({
          comTypeList: res.data.rdata
        })
      }
    })
  },
  // 删除
  dele(){
    this.data.app.http({
      url: '/resume/delWork',
      dengl: true,
      method:'POST',
      data: {
        id:this.data.id_ty
      },
      success(res) {
        if (res.data.code == 200) {
          // 及时更新上层页面
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2]; //上一个页面
          // prevPage.setData({
          //   resume: []
          // })
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
  // 职位遮罩层中的函数
  toggle(e) {
    var two = this.data.isTwo
    var index = e.currentTarget.dataset['index'],
      that = this
    this.setData({
      ind: e.currentTarget.dataset['index'],
      isTwo: !two,
      ind1:'x',
      ind2:'x'
    })
  },
  toggle1(e) {
    var index = this.data.ind,
      index2 = e.currentTarget.dataset['index'],
      that = this
    this.setData({
      ind1: e.currentTarget.dataset['index'],
      ind2:'x'
    })
  },
  toggle2(e) {
    var index = this.data.ind,
      index2 = this.data.ind1,
      index3 = e.currentTarget.dataset['index'],
      that = this
    this.setData({
      ind2: e.currentTarget.dataset['index'],
      value_zhi: that.data.zhiList[index].treeDTOS[index2].treeDTOS[index3].name
    })
  },

  // 职位确认
  queren(e) {
    this.position()
    var that = this
    this.setData({
      value_Zhi: that.data.value_zhi
    })
  },
  position() {
    var add = this.data.isAdd
    this.setData({
      isAdd: !add,

    })
  },
  confirm() {
    this.setData({
      isAdd: false,
      isTwo: false
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
        ind2: 0
      })
    }
  },
  zhiDetail() {
    wx.navigateTo({
      url: '../zc-zhiweixq/zc-zhiweixq'
    })
  },
  // --end--
  // 行业遮罩
  industry() {
    var ind = this.data.isInd
    this.setData({
      isInd: !ind
    })
  },
  toggle3(e) {
    this.setData({
      ind3: e.currentTarget.dataset['index'],
      comIndex: e.currentTarget.dataset['id']
    })
  },
  com_confirm() {
    this.industry()
    var index = this.data.comIndex,
      that = this
    this.setData({
      com_value: that.data.comTypeList[index].label
    })
  },
  // --end---

  tanchuang_2: function () {
    this.setData({
      dianhua: 'display:block'
    })
  },
  quxiao2: function () {
    this.setData({
      dianhua: 'display:none'
    })
  },
  type(e) {
    this.setData({
      types: e.currentTarget.dataset['index'],
      value: e.currentTarget.dataset.value
    })
  },
  submit() {
    this.quxiao2()
  },

  blur(e) {
    var type = e.currentTarget.dataset.ty,
      that = this,
      value = e.detail.value
    if (type == 1) {
      that.setData({
        com_Type: value
      })
    }
    if (type == 2) {
      that.setData({
        dep_Type: value
      })
    }
    if (type == 3) {
      that.setData({
        des_Type: value
      })
    }
    if (type == 4) {
      that.setData({
        money_Type: value
      })
    }
  },
  refer() {
    var that = this
    var date = this.data.date.substring(0, 4) + '/' + this.data.date.substring(5, 7) + '/' + this.data.date.substring(8, 10)
    var date1 = this.data.date1.substring(0, 4) + '/' + this.data.date1.substring(5, 7) + '/' + this.data.date.substring(8, 10)
    var id_ty = that.data.id_ty ? that.data.id_ty : ''
    if (!this.data.com_Type) {
      wx.showToast({
        title: '请输入公司名称',
        icon: 'none'
      })
    } else if (!(this.data.date1 != '请选择' && this.data.date != '请选择')) {
      wx.showToast({
        title: '请选择起止时间',
        icon: 'none'
      })
    } else if (!(this.data.value_Zhi != '请选择')) {
      wx.showToast({
        title: '请选择职位',
        icon: 'none'
      })
    } else if (!this.data.types) {
      wx.showToast({
        title: '请选择工作类型',
        icon: 'none'
      })
    } else if (!this.data.ind3) {
      wx.showToast({
        title: '请选择行业',
        icon: 'none'
      })
    } else if (!this.data.dep_Type) {
      wx.showToast({
        title: '请输入部门',
        icon: 'none'
      })
    } else {
      that.data.app.http({
        url: '/resume/saveOrUpdateWork',
        dengl: true,
        method: 'POST',
        data: {
          company: that.data.com_Type,
          department: that.data.dep_Type,
          describe: that.data.des_Type,
          endTime: date1,
          startTime: date,
          industry: that.data.com_value,
          position: that.data.value_Zhi,
          resumeId: that.data.id,
          money: that.data.money_Type,
          type: that.data.types,
          id: id_ty
        },
        success(res) {
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

  },
  // 选择时间
  bindDateChange: function (e) {
    this.setData({
      datePickerIsShow: true,
      data_index: e.currentTarget.dataset.de
    });
  },
  bindDateChange1: function (e) {
    this.setData({
      datePickerIsShow: true,
      data_index: e.currentTarget.dataset.de
    });
  },

  datePickerOnSureClick: function (e) {
    if (this.data.data_index == 1) {
      this.setData({
        date: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
        datePickerValue: e.detail.value,
        datePickerIsShow: false,
      })
    } else {
      this.setData({
        date1: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
        datePickerValue: e.detail.value,
        datePickerIsShow: false,
      })
    }
  },
})