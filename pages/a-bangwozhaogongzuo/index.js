// pages/shangjia/shangjia.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    ind: 'x',
    ind1: 'x',
    array: [1, 2, 3, 4],
    items: [{
      name: '',
      value: ''
    }, ],
    isAdd: false,
    isTwo: false,
    num: '',
    indexs: '',
    num1: '',
    num2: '',
    classValue: '请选择',
    mapValue: '请选择',
    money: [],
    status: [],
    work_time: [],
    work_type: [],
    zhiList: [],
    ind_three: 'x',
    app: getApp().globalData,
    phoneValue: '',
    nameValue: '',
    id: '',
    workId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp().globalData
    var that = this
    if(options){
    this.setData({
      workId: options.id,
      nameValue: options.name ? options.name : '',
      mapValue: options.address ? options.address : '请选择',
      phoneValue: options.phone ? options.phone : '',
      num: options.money ? options.money : '',
      indexs: options.workType ? options.workType : '',
      num1: options.status ? options.status : '',
      num2: options.time ? options.time : '',
    })
  }
    // 期望薪资
    app.http({
      url: '/selects/expect_money',
      dengl: false,
      data: {},
      success(res) {
        that.setData({
          money: res.data.rdata
        })

      }
    })
    // 求职状态
    app.http({
      url: '/selects/resume_status',
      dengl: false,
      data: {},
      success(res) {
        that.setData({
          status: res.data.rdata
        })
      }
    })
    // 职位
    app.http({
      url: '/selects/position',
      dengl: false,
      data: {},
      success(res) {
        that.setData({
          zhiList: res.data.rdata[0].treeDTOS
        })
        if (options.position) {
          res.data.rdata[0].treeDTOS.map(function (val, i) {
            var arr = val
            arr.treeDTOS.map(function (vals, is) {
              var arrs = vals
              arrs.treeDTOS.map(function (va, ii) {
                if (options.position == va.id) {
                  that.setData({
                    ind_three: ii,
                    classValue: va.name
                  })
                }
              })

            })
          })
        }
      }
    })
    // 到岗时间
    app.http({
      url: '/selects/work_time',
      data: {},
      dengl: false,
      success(res) {
        that.setData({
          work_time: res.data.rdata
        })
      }
    })
    // 类型
    app.http({
      url: '/selects/work_type',
      dengl: false,
      data: {},
      success(res) {
        that.setData({
          work_type: res.data.rdata
        })
      }
    })
  },
  // 校验手机号
  jiaoyan(e) {
    this.setData({
      phoneValue: e.detail.value
    })
  },
  hide() {
    var two = this.data.isTwo
    this.setData({
      isTwo: !two
    })
    if (!this.data.isTwo) {
      this.setData({
        ind1: 'x',
        ind_three: 'x'
      })
    }
  },
  toggle(e) {
    var two = this.data.isTwo
    this.setData({
      ind: e.currentTarget.dataset['index'],
      isTwo: !two,
    })
  },
  toggle1(e) {
    this.setData({
      ind1: e.currentTarget.dataset['index'],
      ind_three: 'x'
    })
  },
  toggle_three(e) {
    this.setData({
      ind_three: e.currentTarget.dataset['index'],
      posi_id: e.currentTarget.dataset['id'],
    })
  },
  // 确定
  con_zhi(e) {
    this.zhiwei()
    var index = this.data.ind,
      index2 = this.data.ind1,
      index3 = this.data.ind_three,
      that = this
    this.setData({
      classValue: that.data.zhiList[index].treeDTOS[index2].treeDTOS[index3].name,
      id: that.data.posi_id
    })

  },
  confirm_zhi() {
    this.zhiwei()
    this.setData({
      ind: 0,
      ind1: 0,
      ind_three: 0
    })
  },

  checkboxChange: function (e) {
  },
  active(e) {
    this.setData({
      num: e.currentTarget.dataset.num
    })
  },
  activeOne(e) {
    this.setData({
      indexs: e.currentTarget.dataset.index
    })
  },
  activeTwo(e) {
    this.setData({
      num1: e.currentTarget.dataset.num1
    })
  },
  activeThree(e) {
    this.setData({
      num2: e.currentTarget.dataset.num2
    })
  },
  zhiwei() {
    var add = this.data.isAdd
    this.setData({
      isAdd: !add
    })
  },
  weizhi() {
    wx.navigateTo({
      url: '../b-dingweiq/b-dingwq',
    })
    // this.map.show()
  },
  confirm() {
    this.zhiwei()
    var index = this.data.ind1
    this.setData({
      classValue: this.data.classContent[index].name
    })
  },
  name(e) {
    this.setData({
      nameValue: e.detail.value
    })
  },
  submit() {
    if (!this.data.app.checkPhone(this.data.phoneValue)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
    } else {
      var that = this
      this.data.app.http({
        url: '/index/lookingWork',
        dengl: true,
        method: 'POST',
        data: {
          address: that.data.mapValue ? that.data.mapValue : '',
          money: that.data.num ? that.data.num : '',
          name: that.data.nameValue ? that.data.nameValue : '',
          position: that.data.id ? that.data.id : '',
          status: that.data.num1 ? that.data.num1 : '',
          time: that.data.num2 ? that.data.num2 : '',
          workType: that.data.indexs ? that.data.indexs : '',
          phone: that.data.phoneValue ? that.data.phoneValue : '',
          id: that.data.workId ? that.data.workId : ''
        },
        success(res) {
          if (res.data.code == 200) {
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2];
            prevPage.setData({
              val: that.data.val
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

  }
})