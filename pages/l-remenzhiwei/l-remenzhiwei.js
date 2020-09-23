// pages/l-remenzhiwei/l-remenzhiwei.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdd: false,
    isTwo: false,
    isAdd_T: false,
    isAdd_F: false,
    isAdd_S: false,
    ind: 'x',
    ind1: 'x',
    ind2: 'x',
    ind3: '',
    ind4: '',
    ind5: '',
    ind6: '',
    ind7: '',
    array: [{
        name: '综合排序'
      },
      {
        name: ' 最新发布优先'
      }
    ],
    inda: 0,
    m_zong: 1,
    z_val: "综合排序",
    app: getApp().globalData,
    zwList: [],
    gxzList: [],
    ggmList: [],
    mnyList: [],
    expList: [],
    codList: [],
    currentPage: 1,
    loadingType: 0,
    contentText: {
      contentdown: "上拉显示更多",
      contentrefresh: "正在加载...",
      contentnomore: "我也是有底线的~"
    },
    recomList: [],
    gsCom: true,
    moCom: true,
    id: '',
    zwCom: true,
    zhCom: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this,
      data = {
        limit: 10,
        page: that.data.currentPage,
        type: 2,
      }
    this.reword(data)
    // 职位
    this.data.app.http({
      url: '/selects/position',
      dengl: false,
      data: {},
      success(res) {
        that.setData({
          zwList: res.data.rdata[0].treeDTOS
        })
      }
    })
    // 公司性质
    this.data.app.http({
      url: '/selects/company_nature',
      dengl: false,
      data: {},
      success(res) {
        that.setData({
          gxzList: res.data.rdata
        })
      }
    })
    // 公司规模
    this.data.app.http({
      url: '/selects/company_num',
      dengl: false,
      data: {},
      success(res) {
        that.setData({
          ggmList: res.data.rdata
        })
      }
    })
    // 薪资范围
    this.data.app.http({
      url: '/selects/expect_money',
      dengl: false,
      data: {},
      success(res) {
        that.setData({
          mnyList: res.data.rdata
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
          expList: res.data.rdata
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
          codList: res.data.rdata
        })
      }
    })
  },
  // 热门职位
  reword(data) {
    var that = this
    wx.showNavigationBarLoading()
    this.data.app.http({
      url: '/index/getPosition',
      dengl: true,
      method: 'POST',
      data: data,
      success(res) {
        function jiance(x) {
          return x < 10 ? '0' + x : x
        }
        var arr = res.data.rdata
        var myDate = new Date()
        if (arr.length > 0) {
          arr.map(function (val, i) {
            if (val.createTime) {
              var date1 = Date.parse(new Date(val.createTime.replace(/\-/g, "/")))
              var date = Date.parse(new Date())
              var day = parseInt((date - date1) / 1000)
              var value = day < 60 ? day + '秒前' : day >= 60 && (parseInt(day / 60) < 60) ? parseInt(day / 60) + '分钟前' : parseInt(day / 60) > 60 && (parseInt(day / 60 / 60) < 24) ? parseInt(day / 60 / 60) + '小时前' :parseInt(day / 60 / 60) >= 24 && (parseInt(day / 60 / 60 / 24) < 30) ? parseInt(day / 60 / 60 / 24) + '天前' : parseInt(day / 60 / 60 / 24 / 30) + '月前'
              val.timeVal = value
            }
          })
        }
        that.setData({
          recomList: res.data.rdata
        })

        if (res.data.rdata.length < 10) {
          that.setData({
            loadingType: 2
          })
        }else{
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
      url: '/index/getPosition',
      dengl: true,
      method: 'POST',
      data: data,
      success(res) {
        that.setData({
          recomList: that.data.recomList.concat(res.data.rdata)
        })

        function jiance(x) {
          return x < 10 ? '0' + x : x
        }
        var arr = res.data.rdata
        var myDate = new Date()
        if (arr.length > 0) {
          arr.map(function (val, i) {
            var date1 = Date.parse(new Date(val.createTime.replace(/\-/g, "/")))
            var date = Date.parse(new Date())
            var day = parseInt((date - date1) / 1000 / 60 / 60)
            var value = day < 24 ? day + '小时前' : (day >= 24 && ((parseInt(day / 24 / 30)) < 1)) ? parseInt(day / 24) + '天前' : parseInt(day / 24 / 30) + '月前'
            val.timeVal = value
          })
        }
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
  sixChange(e) {
    this.setData({
      m_zong: e.currentTarget.dataset.index
    })
  },
  // 综合确定
  confirm() {
    this.position3()
    if (this.data.m_zong == 1) {
      this.setData({
        z_val: '综合排序',
        currentPage: 1,
        zhCom: false
      })
    } else {
      this.setData({
        z_val: '最新发布优先',
        currentPage: 1,
        zhCom: false
      })
    }
    if (!this.data.zwCom) {
      this.setData({
        ind: 'x',
        ind1: 'x',
        ind2: 'x',
        isTwo: false,
        zwCom: true
      })
    } else if (!this.data.gsCom) {
      this.setData({
        ind3: '',
        ind4: '',
        gsCom: true
      })
    } else if (!this.data.moCom) {
      this.setData({
        ind5: '',
        ind6: '',
        ind7: '',
        moCom: true
      })
    }
    var that = this,
      zong = this.data.m_zong ? this.data.m_zong : ''
    var data = {
      limit: 10,
      page: that.data.currentPage,
      type: 2,
      sort: zong,
    }
    this.reword(data)

  },
  cancel() {
    this.position3()
    var that = this
    if (!this.data.zhCom) {
      this.setData({
        m_zong: 1,
        z_val: '综合排序',
        currentPage: 1,
        zhCom: true
      })
      var data = {
        limit: 10,
        page: that.data.currentPage,
        type: 2,
        sort: '',
      }
      this.reword(data)
    } else {
      this.setData({
        m_zong: 1,
        z_val: '综合排序',
        currentPage: 1
      })
    }
  },
  // 职位
  zConfirm() {
    this.position()
    this.setData({
      currentPage: 1,
      zwCom: false
    })
    if (!this.data.gsCom) {
      this.setData({
        ind3: '',
        ind4: '',
        gsCom: true
      })
    } else if (!this.data.moCom) {
      this.setData({
        ind5: '',
        ind6: '',
        ind7: '',
        moCom: true
      })
    } else if (!this.data.zhCom) {
      this.setData({
        m_zong: '1',
        zhCom: true
      })
    }

    var that = this,
      id = this.data.id ? this.data.id : '',
      data = {
        limit: 10,
        page: that.data.currentPage,
        type: 2,
        positionId: id,
      }
    this.reword(data)
  },
  zCancel() {
    this.position()
    var that = this
    if (!this.data.zwCom) {
      this.setData({
        currentPage: 1,
        zwCom: true,
        ind: 'x',
        ind1: 'x',
        ind2: 'x',
        isTwo: false
      })
      var data = {
        limit: 10,
        page: that.data.currentPage,
        type: 2,
        positionId: ''
      }
      this.reword(data)
    }
  },
  // 公司
  gsConfirm() {
    this.position1()
    this.setData({
      currentPage: 1,
      gsCom: false
    })
    if (!this.data.zwCom) {
      this.setData({
        ind: 'x',
        ind1: 'x',
        ind2: 'x',
        isTwo: false,
        zwCom: true
      })
    } else if (!this.data.moCom) {
      this.setData({
        ind5: '',
        ind6: '',
        ind7: '',
        moCom: true
      })
    } else if (!this.data.zhCom) {
      this.setData({
        m_zong: '1',
        zhCom: true
      })
    }
    var that = this,
      ind3 = this.data.ind3 ? this.data.ind3 : '',
      ind4 = this.data.ind4 ? this.data.ind4 : '',
      data = {
        limit: 10,
        page: that.data.currentPage,
        type: 2,
        omNum: ind4,
        comType: ind3,
      }
    this.reword(data)
  },
  gsCancel() {
    this.position1()
    if (!this.data.gsCom) {
      this.setData({
        currentPage: 1,
        gsCom: true,
        ind3: '',
        ind4: ''
      })
      var that = this,
        data = {
          limit: 10,
          page: that.data.currentPage,
          type: 2,
        }
      this.reword(data)
    } else {
      this.setData({
        ind4: '',
        ind3: '',
      })
    }
  },
  // 更多
  moConfirm() {
    this.position2()
    this.setData({
      currentPage: 1,
      moCom: false
    })
    if (!this.data.zwCom) {
      this.setData({
        ind: 'x',
        ind1: 'x',
        ind2: 'x',
        isTwo: false,
        zwCom: true
      })
    } else if (!this.data.gsCom) {
      this.setData({
        ind3: '',
        ind4: '',
        gsCom: true
      })
    } else if (!this.data.zhCom) {
      this.setData({
        m_zong: '1',
        zhCom: true
      })
    }
    var that = this,
      ind5 = this.data.ind5 ? this.data.ind5 : '',
      ind6 = this.data.ind6 ? this.data.ind6 : '',
      ind7 = this.data.ind7 ? this.data.ind7 : '',
      data = {
        limit: 10,
        page: that.data.currentPage,
        type: 2,
        money: ind5,
        exe: ind6,
        school: ind7,
      }
    this.reword(data)
  },
  moCancel() {
    this.position2()
    if (!this.data.moCom) {
      this.setData({
        currentPage: 1,
        ind5: '',
        ind6: '',
        ind7: '',
        moCom: true,
      })
      var that = this,
        data = {
          limit: 10,
          page: that.data.currentPage,
          type: 2,
        }
      this.reword(data)
    } else {
      this.setData({
        ind5: '',
        ind6: '',
        ind7: ''
      })
    }
  },
  // 更多
  toggle(e) {
    this.setData({
      ind: e.currentTarget.dataset['index']

    })
    var two = this.data.isTwo
    this.setData({
      isTwo: !two
    })
  },
  toggle1(e) {
    this.setData({
      ind1: e.currentTarget.dataset['index']
    })
  },
  toggle2(e) {
    this.setData({
      ind2: e.currentTarget.dataset['index'],
      id: e.currentTarget.dataset['id']
    })
  },
  toggle3(e) {
    this.setData({
      ind3: e.currentTarget.dataset['index']
    })
  },
  toggle4(e) {
    this.setData({
      ind4: e.currentTarget.dataset['index']
    })
  },
  toggle5(e) {
    this.setData({
      ind5: e.currentTarget.dataset['index']
    })
  },
  toggle6(e) {
    this.setData({
      ind6: e.currentTarget.dataset['index']
    })
  },
  toggle7(e) {
    this.setData({
      ind7: e.currentTarget.dataset['index']
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      inda: e.detail.value
    })
  },
  position() {
    var add = this.data.isAdd
    this.setData({
      isAdd: !add
    })
  },
  position1() {
    var add_t = this.data.isAdd_T
    this.setData({
      isAdd_T: !add_t
    })
  },
  position2() {
    var add_f = this.data.isAdd_F
    this.setData({
      isAdd_F: !add_f
    })
  },
  position3() {
    var add_s = this.data.isAdd_S
    this.setData({
      isAdd_S: !add_s
    })
  },

  hide() {
    var two = this.data.isTwo
    this.setData({
      isTwo: !two
    })
  },
  detail(e) {
    wx.navigateTo({
      url: '../zc-zhiweixq/zc-zhiweixq?id=' + e.currentTarget.dataset.id,
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
    var that = this,
      ind4 = this.data.ind4 ? this.data.ind4 : '',
      ind3 = this.data.ind3 ? this.data.ind3 : '',
      ind5 = this.data.ind5 ? this.data.ind5 : '',
      ind6 = this.data.ind6 ? this.data.ind6 : '',
      ind7 = this.data.ind7 ? this.data.ind7 : '',
      id = this.data.id ? this.data.id : '',
      zong = this.data.m_zong ? this.data.m_zong : ''
    //  更多上拉
    if (!this.data.moCom) {
      var dat = {
        limit: 10,
        page: that.data.currentPage+1,
        type: 2,
        money: ind5,
        exe: ind6,
        school: ind7
      }
      this.jiazai(dat)
      // 公司上拉
    } else if (!this.data.gsCom) {
      var dat = {
        limit: 10,
        page: that.data.currentPage+1,
        type: 2,
        comNum: ind4,
        comType: ind3,
      }
      this.jiazha(dat)
    } else if (!this.data.zwCom) {
      data = {
        limit: 10,
        page: that.data.currentPage+1,
        type: 2,
        positionId: id
      }
      this.jiazai(data)
    } else if (!this.data.zhCom) {
      data = {
        limit: 10,
        page: that.data.currentPage+1,
        type: 2,
        sort: zong
      }
    } else {
      var dat = {
        limit: 10,
        page: that.data.currentPage+1,
        type: 2,
      }
      this.jiazai(dat)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})