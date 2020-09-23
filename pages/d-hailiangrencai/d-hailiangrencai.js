// pages/d-hailiangrencai/d-hailiangrencai.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '综合排序',
    animationCon: {},
    animationData: {},
    animationMor: {},
    style: '',
    zhiList: [],
    moneyList: [],
    expList: [],
    codList: [],
    currentPage: 1,
    loadingType: 0,
    contentText: {
      contentdown: "上拉显示更多",
      contentrefresh: "正在加载...",
      contentnomore: "就这么多了~"
    },
    app: getApp().globalData,
    recomList: [],
    title_type: '',
    morType: false,
    zwType: false,
    url:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = {
      limit: 10,
      page: this.data.currentPage,
      sort: 0
    }
    var that = this
    if (options.id == 1) {
      wx.setNavigationBarTitle({
        title: '即刻入职'
      })
      this.setData({
        url:'/indexCom/getImmediate'
      })
    } else {
      this.setData({
        url:'/indexCom/getTalent'
      })
    }
    this.reword(data)
    this.zhiwei = this.selectComponent("#zhiwei");
    this.zonghe = this.selectComponent("#zonghe");
    this.more = this.selectComponent("#more");
    this.data.app.http({
        url: '/selects/position',
        dengl: false,
        data: {},
        success(res) {
          that.setData({
            zList: res.data.rdata[0].treeDTOS
          })
        }
      }),
      // 薪资
      this.data.app.http({
        url: '/selects/expect_money',
        dengl: false,
        data: {},
        success(res) {
          that.setData({
            moneyList: res.data.rdata
          })
        }
      })
    // 学历
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
  },
  reword(data) {
    var that = this
    wx.showNavigationBarLoading()
    this.data.app.http({
      type: true,
      url: that.data.url,
      dengl: true,
      method: 'POST',
      data: data,
      success(res) {
        function jiance(x) {
          return x < 10 ? '0' + x : x
        }
        var arr = res.data.rdata
        arr.map(function (val, i) {
          if(val.lastLogin){
            var date1 = Date.parse(new Date(val.lastLogin.replace(/\-/g, "/")))
            var date = Date.parse(new Date())
            var day = parseInt((date - date1) / 1000)
            var value = day < 60 ? '刚刚活跃' : day >= 60 && (parseInt(day / 60) < 60) ? parseInt(day / 60) + '分钟前活跃' : parseInt(day / 60) > 60 && (parseInt(day / 60 / 60) < 24) ? parseInt(day / 60 / 60) + '小时前活跃' : parseInt(day / 60 / 60) >= 24 && (parseInt(day / 60 / 60 / 24) < 30) ? parseInt(day / 60 / 60 / 24) + '天前活跃' : parseInt(day / 60 / 60 / 24 / 30) + '月前活跃'
            val.timeVal = value
          }
        })
        // 回到顶部
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300
        })
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
      type: true,
      url: that.data.url,
      dengl: true,
      data: data,
      method: 'POST',
      success(res) {
        var arr = res.data.rdata
        arr.map(function (val, i) {
          if(val.lastLogin){
            var date1 = Date.parse(new Date(val.lastLogin.replace(/\-/g, "/")))
            var date = Date.parse(new Date())
            var day = parseInt((date - date1) / 1000)
            var value = day < 60 ? '刚刚活跃' : day >= 60 && (parseInt(day / 60) < 60) ? parseInt(day / 60) + '分钟前活跃' : parseInt(day / 60) > 60 && (parseInt(day / 60 / 60) < 24) ? parseInt(day / 60 / 60) + '小时前活跃' : parseInt(day / 60 / 60) >= 24 && (parseInt(day / 60 / 60 / 24) < 30) ? parseInt(day / 60 / 60 / 24) + '天前活跃' : parseInt(day / 60 / 60 / 24 / 30) + '月前活跃'
            val.timeVal = value
          }
        })
        that.setData({
          recomList: that.data.recomList.concat(res.data.rdata)
        })

        function jiance(x) {
          return x < 10 ? '0' + x : x
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
  toggleZong(e) {
    if (this.zhiwei.data.isAdd) {
      this.toggleZhi()
    }
    if (this.more.data.isAdd_F) {
      this.toggleMor()
    }
    this.zonghe.toggleZong()
    this.zonghe.setData({
      style: 'top:82rpx',
      styleT: 'top:200rpx'
    })
    var nowShow = this.zonghe.data.isCon;
    //创建动画
    var animation = wx.createAnimation({
      timingFunction: "ease"
    })
    this.animation = animation;
    if (nowShow) {
      animation.rotate(180).step();
      this.setData({
        animationCon: animation.export()
      })
    } else {
      animation.rotate(0).step();
      this.setData({
        animationCon: animation.export()
      })
    }
  },
  // 综合筛选
  togValue() {
    var that = this
    this.setData({
      value: this.zonghe.data.value,
      currentPage: 1,
    })
    if (this.data.zwType) {
      var data = {
        limit: 10,
        page: this.data.currentPage,
        position: this.zhiwei.data.id,
        sort: this.zonghe.data.ind
      }
    } else if (this.data.morType) {
      var data = {
        limit: 10,
        page: this.data.currentPage,
        school: this.more.data.ind7 ? this.more.data.ind7 : '',
        workTime: this.more.data.ind6 ? this.more.data.ind6 : '',
        money: this.more.data.ind5 ? this.more.data.ind5 : '',
        sort: this.zonghe.data.ind
      }
    } else {
      var data = {
        limit: 10,
        page: this.data.currentPage,
        sort: this.zonghe.data.ind
      }

    }
    this.toggleZong()
    this.reword(data)

  },
  toggleZhi() {
    if (this.zonghe.data.isCon) {
      this.toggleZong()
    }
    if (this.more.data.isAdd_F) {
      this.toggleMor()
    }
    this.zhiwei.position()
    this.zhiwei.setData({
      style: 'top:82rpx',
      styleT: 'top:200rpx'
    })
    var nowShow = this.zhiwei.data.isAdd;
    //创建动画
    var animation = wx.createAnimation({
      timingFunction: "ease"
    })
    this.animation = animation;
    if (nowShow) {
      animation.rotate(180).step();
      this.setData({
        animationData: animation.export()
      })
    } else {
      animation.rotate(0).step();
      this.setData({
        animationData: animation.export()
      })
    }
  },
  // 点击遮罩区隐藏
  hidden() {
    var that = this
    var nowShow = this.zhiwei.data.isAdd
    if (!this.zhiwei.isAdd) {
      var animation = wx.createAnimation({
        timingFunction: "ease"
      })
      this.animation = animation;
      if (nowShow) {
        animation.rotate(180).step();
        this.setData({
          animationData: animation.export()
        })
      } else {
        animation.rotate(0).step();
        this.setData({
          animationData: animation.export()
        })
      }
    }
  },
  zongHide() {
    var nowShow = this.zonghe.data.isCon
    if (!this.zonghe.data.isCon) {
      var animation = wx.createAnimation({
        timingFunction: "ease"
      })
      this.animation = animation;
      if (nowShow) {
        animation.rotate(180).step();
        this.setData({
          animationCon: animation.export()
        })
      } else {
        animation.rotate(0).step();
        this.setData({
          animationCon: animation.export()
        })
      }
    }

  },
  moCancel() {
    var nowShow = this.more.data.isAdd_F;
    //创建动画
    var animation = wx.createAnimation({
      timingFunction: "ease"
    })
    this.animation = animation;
    if (nowShow) {
      animation.rotate(180).step();
      this.setData({
        animationMor: animation.export()
      })
    } else {
      animation.rotate(0).step();
      this.setData({
        animationMor: animation.export()
      })
    }
    this.setData({
      currentPage: 1,
    })

    if (this.data.morType) {
      var data = {
        limit: 10,
        page: this.data.currentPage,
        sort: 1
      }
      this.reword(data)
      this.setData({
        zwType:false
      })
    }
  },
  // 职位筛选
  tog() {
    this.setData({
      currentPage: 1,
      zwType: true,
    })
    if (this.data.morType) {
      this.more.setData({
        ind5: '',
        ind6: '',
        ind7: '',
      })
      this.setData({
        morType: false
      })
    }
    var that = this,
      data = {
        limit: 10,
        page: this.data.currentPage,
        position: this.zhiwei.data.id,
        sort: this.zonghe.data.ind
      }
    this.toggleZhi()
    this.reword(data)

  },
  toggleMor() {
    var that=this
    if (this.zhiwei.data.isAdd) {
      that.toggleZhi()
    }
    if (this.zonghe.data.isCon) {
      that.toggleZong()
    }
    this.more.position2()
    this.more.setData({
      style: 'top:82rpx',
      styleT: 'top:200rpx'
    })
    var nowShow = this.more.data.isAdd_F;
    //创建动画
    var animation = wx.createAnimation({
      timingFunction: "ease"
    })
    this.animation = animation;
    if (nowShow) {
      animation.rotate(180).step();
      this.setData({
        animationMor: animation.export()
      })
    } else {
      animation.rotate(0).step();
      this.setData({
        animationMor: animation.export()
      })
    }
  },
  // 更多筛选
  togMore() {
    this.setData({
      currentPage: 1,
      morType: true,
    })
    if (this.data.zwType) {
      this.zhiwei.setData({
        isTwo: false,
        ind1: 'x',
        ind2: 'x',
        ind: 'x',
      })
      this.setData({
        zwType: false
      })
    }

    this.toggleMor()
    var data = {
      limit: 10,
      page: this.data.currentPage,
      school: this.more.data.ind7 ? this.more.data.ind7 : '',
      workTime: this.more.data.ind6 ? this.more.data.ind6 : '',
      money: this.more.data.ind5 ? this.more.data.ind5 : '',
      sort: this.zonghe.data.ind
    }
    this.reword(data)
  },
  detail(e) {
    wx.navigateTo({
      url: '../c-hailiangjianlixq/c-hailiangjianlixq?id='+e.currentTarget.dataset.id,
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
    if (this.data.zwType) {
      var data = {
        limit: 10,
        page: this.data.currentPage+1,
        position: this.zhiwei.data.id,
        sort: this.zonghe.data.ind
      }
      // this.toggleZhi()
      this.jiazai(data)
    } else if (this.data.morType) {
      var data = {
        limit: 10,
        page: this.data.currentPage+1,
        school: this.more.data.ind7 ? this.more.data.ind7 : '',
        workTime: this.more.data.ind6 ? this.more.data.ind6 : '',
        money: this.more.data.ind5 ? this.more.data.ind5 : '',
        sort: this.zonghe.data.ind
      }
      this.jiazai(data)
    }else{
      var that = this,
        data = {
          limit: 10,
          page: that.data.currentPage+1,
          sort: this.zonghe.data.ind
        }
      this.jiazai(data)    
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})