// pages/a-gangweifabu/a-gangweifabu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    natureContent: [],
    style: '',
    zhiValue: '请选择',
    expValue: '请选择',
    eduValue: '请选择',
    salaValue: '请选择',
    nameValue: '请选择',
    numValue: '',
    mapValue: '',
    workValue: '',
    yqValue: '',
    moneyValue: '',
    welValue: '',
    titleValue: '',
    wel_Value: '请选择',
    experContent: [],
    type: '',
    educatContent: [],
    salaContent: [],
    welContent: [],
    ty: '',
    nameContent: [],
    app: getApp().globalData,
    id: '',
    welLi: [],
    swicth: false,
    cityValue: '请选择',
    cityId: '',
    isHidden: true,
    countryId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.spring = this.selectComponent("#spring");
    this.exp = this.selectComponent("#exp");
    this.edu = this.selectComponent("#edu");
    this.sala = this.selectComponent("#sala");
    this.wel = this.selectComponent("#wel");
    this.name = this.selectComponent("#name");
    if (options.id) {
      this.setData({
        id: options.id
      })
    }
    // 职位
    this.data.app.http({
      url: '/selects/position',
      dengl: false,
      data: {},
      success(res) {
        that.setData({
          nameContent: res.data.rdata[0].treeDTOS
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
          natureContent: res.data.rdata
        })
      }
    })
    // 工作经验
    this.data.app.http({
      url: '/selects/work_exe',
      dengl: false,
      data: {},
      success(res) {
        that.setData({
          experContent: res.data.rdata
        })
      }
    })
    // 学历要求
    this.data.app.http({
      url: '/selects/school_record',
      dengl: false,
      data: {},
      success(res) {
        that.setData({
          educatContent: res.data.rdata
        })
      }
    })
    // 薪资要求
    this.data.app.http({
      url: '/selects/expect_money',
      dengl: false,
      data: {},
      success(res) {
        that.setData({
          salaContent: res.data.rdata
        })
      }
    })
    // 职位福利
    this.data.app.http({
      url: '/selects/work_welfare',
      dengl: false,
      data: {},
      success(res) {
        res.data.rdata.map(function (n) {
          n.dandu = false
        })
        that.setData({
          welContent: res.data.rdata
        })
      }
    })
  },
  city() {
    wx.navigateTo({
      url: '../c-dingwei/c-dingw?id=' + this.data.id,
    })
  },
  submit() {
    var that = this
    if (!that.data.titleValue) {
      wx.showToast({
        title: '请输入标题',
        icon: 'none'
      })
    } else if (!that.name.data.id) {
      wx.showToast({
        title: '请选择招聘职位',
        icon: 'none'
      })
    } else if (!that.data.numValue) {
      wx.showToast({
        title: '请输入招聘人数',
        icon: 'none'
      })
    } else if (!that.spring.data.edu) {
      wx.showToast({
        title: '请选择职位性质',
        icon: 'none'
      })
    } else if (!that.exp.data.edu) {
      wx.showToast({
        title: '请选择工作经验',
        icon: 'none'
      })
    } else if (!that.edu.data.edu) {
      wx.showToast({
        title: '请选择学历要求',
        icon: 'none'
      })
    } else if (!that.sala.data.edu) {
      wx.showToast({
        title: '请选择薪资详情',
        icon: 'none'
      })
    } else if (!that.data.cityId) {
      wx.showToast({
        title: '请选择工作地点',
        icon: 'none'
      })
    } else if (!that.data.mapValue) {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none'
      })
    } else if (!that.data.workValue) {
      wx.showToast({
        title: '请输入工作职责',
        icon: 'none'
      })
    } else if (!that.data.ty) {
      wx.showToast({
        title: '请选择服务类型',
        icon: 'none'
      })
    } else {
      this.data.app.http({
        type: true,
        url: '/company/addOrUpdateJobPosition',
        dengl: true,
        method: 'POST',
        data: {
          address: that.data.mapValue,
          companyId: that.data.id,
          describe: that.data.workValue,
          money: that.sala.data.edu,
          num: that.data.numValue,
          positionType: 1,
          schoolRecord: that.edu.data.edu,
          title: that.data.titleValue,
          workExperience: that.exp.data.edu,
          workType: that.spring.data.edu,
          serviceType: that.data.ty,
          requirements: that.data.yqValue ? that.data.yqValue : '',
          structure: that.data.moneyValue ? that.data.moneyValue : '',
          welfare: that.data.welLi ? that.data.welLi : '',
          // first: that.data.swicth,
          name: that.name.data.id,
          district: that.data.cityId,
          city: that.data.countryId,
        },
        success(res) {
          if (res.data.code == 200) {
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2]; //上一个页面
            prevPage.setData({
              id:that.data.id
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
  blur(e) {
    var type = e.currentTarget.dataset.ty,
      that = this,
      value = e.detail.value
    if (type == 1) {
      that.setData({
        titleValue: value
      })
    }
    if (type == 2) {
      that.setData({
        numValue: value
      })
    }
    if (type == 3) {
      that.setData({
        mapValue: value
      })
    }
    if (type == 4) {
      that.setData({
        workValue: value
      })
    }
    if (type == 5) {
      that.setData({
        yqValue: value
      })
    }
    if (type == 6) {
      that.setData({
        moneyValue: value
      })
    }
  },
  switch1Change: function (e) {
    this.setData({
      swicth: e.detail.value
    })
  },
  zhiwei(e) {
    var that = this
    this.spring.show()
    this.setData({
      type: e.currentTarget.dataset.type,
      isHidden: !that.spring.data.isShow
    })
    this.spring.setData({
      style: 'margin-right:17rpx'
    })
  },
  exper(e) {
    this.setData({
      type: e.currentTarget.dataset.type,
      isHidden: false
    })
    this.exp.show()
    this.exp.setData({
      style: 'margin-right:30rpx;min-width:180rpx'
    })
  },
  educat(e) {
    this.setData({
      type: e.currentTarget.dataset.type,
      isHidden: false
    })
    this.edu.show()
    this.edu.setData({
      style: 'margin-right:25rpx;'
    })
  },
  salary(e) {
    this.setData({
      type: e.currentTarget.dataset.type,
      isHidden: false
    })
    this.sala.show()
    this.sala.setData({
      style: 'margin-right:50rpx;min-width:170rpx'
    })
  },
  welfare(e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
    this.wel.show()
    this.wel.setData({
      style: 'margin-right:20rpx;'
    })
  },
  handleConfirm() {
    var that = this
    if (this.data.type == 1) {
      this.spring.show()
      var index = this.spring.data.index
      this.setData({
        zhiValue: this.data.natureContent[index].label,
        isHidden: true
      })
    } else if (this.data.type == 2) {
      this.exp.show()
      var index = this.exp.data.index

      this.setData({
        expValue: this.data.experContent[index].label,
        isHidden: true
      })
    } else if (this.data.type == 3) {
      this.edu.show()
      var index = this.edu.data.index
      this.setData({
        eduValue: this.data.educatContent[index].label,
        isHidden: true
      })
    } else if (this.data.type == 4) {
      this.sala.show()
      var index = this.sala.data.index
      this.setData({
        salaValue: this.data.salaContent[index].label,
        isHidden: true
      })
    } else {
      this.wel.show()
      this.setData({
        welValue: this.wel.data.welList,
        welLi: this.wel.data.valList,
        isHidden: true
      })
    }
  },
  handleCancel() {
    if (this.data.type == 1) {
      this.spring.show()
      var that = this
      this.setData({
        isHidden: true
      })
    } else if (this.data.type == 2) {
      this.exp.show()
      var that = this
      this.setData({
        isHidden: true
      })
    } else if (this.data.type == 3) {
      this.edu.show()
      var that = this
      this.setData({
        isHidden: true
      })
    } else if (this.data.type == 4) {
      this.sala.show()
      var that = this
      this.setData({
        isHidden: true
      })
    } else {
      this.wel.show()
      var that = this
      this.setData({
        isHidden: true
      })
    }
  },
  cancel() {
    var that = this
    this.setData({
      isHidden: true
    })
  },
  confirm() {
    this.name.position()
    var index = this.name.data.ind,
      index2 = this.name.data.ind1,
      index3 = this.name.data.ind2,
      that = this
    this.setData({
      nameValue: that.data.nameContent[index].treeDTOS[index2].treeDTOS[index3].name,
      isHidden: !that.name.data.isAdd
    })
  },
  types(e) {
    this.setData({
      ty: e.currentTarget.dataset.index
    })
  },
  zhiName() {
    this.name.position()
    var that = this
    this.setData({
      isHidden: !that.name.data.isAdd
    })
  },
  naCancel() {
    this.name.setData({
      isAdd: false,
      isTwo: false

    })
  },
  naConfirm() {
    this.name.position()
    var index = this.name.data.ind2
    this.setData({
      nameValue: this.data.sContent[index].item
    })
  },
  welConfirm() {

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