// pages/v-wodejianli-jcxx/v-wodejianli-jcxx.js
var app = getApp().globalData
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date_value: '请选择',
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,
    img: '',
    isMar: false,
    mar: '0',
    valu: '请选择',
    isSix: false,
    six: '0',
    six_val: '请选择',
    isEdu: false,
    edu: 'x',
    valu2: '请选择',
    // 表单数据
    assets: [],
    assetIndex: 0,
    isCostText: '支出',
    date: '',
    amount: null,
    descripition: '',
    // 用来放弹窗内容的，里面的格式应该为[{label: 'sadsa', value: 'dsadsad'}]
    springContent: [],
    type_content: '请选择',
    app: getApp().globalData,
    eduction: [],
    marr: [],
    edu_index: '',
    mar_index: '',
    isYear: false,
    yearValue: '请选择',
    yearList: [],
    year_time: '',
    year_index: '',
    name_value: '',
    home_value: '',
    money_value: '',
    reg_value: '',
    phone_value: '',
    emil_value: '',
    id: '',
    idType: '',
    list: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.spring = this.selectComponent("#spring");
    var that = this
    if (options.id) {
      this.setData({
        idType: 1
      })
    }
    if(!this.data.img){
      this.setData({
       img:wx.getStorageSync('users').avatarUrl
      })
    }
    var list = {}
    this.data.app.http({
      url: '/getResumes',
      dengl: true,
      data: {},
      success(res) {
        if (res.data.rdata.ctrlResume) {
          list = res.data.rdata.ctrlResume
          that.setData({
            list: res.data.rdata.ctrlResume,   
            img: list.url?list.url:wx.getStorageSync('users').avatarUrl,
            name_value: list.name ? list.name : '',
            date_value: list.time ? list.time : '',
            valu2: list.schoolName ? list.schoolName : '请选择',
            phone_value: list.phone ? list.phone : '请输入 （元）',
            edu: list.school ? list.school : '',
            id: list.id,
            // money_value: list.address ? list.address : '',
            home_value: list.address ? list.address : '请输入',  
            mar: list.marriage ? list.marriage : '',
            emil_value: list.email ? list.email : ''
          })
          if (list.sex) {
            var six_val = (list.sex == 0) ? '男' : '女'
            that.setData({
              six_val: six_val,
              six: list.sex
            })
          }
          that.spring.setData({
            mar: list.status ? list.status : ''
          })
        }
        // 求职状态
        that.data.app.http({
          url: '/selects/resume_status',
          dengl: false,
          data: {},
          success(res) {
            that.setData({
              springContent: res.data.rdata
            })
            if (that.data.list.status) {
              res.data.rdata.map(function (val, i) {
                if (val.value == that.data.list.status) {
                  that.setData({
                    type_content: val.label,
                  })
                }
              })
            }
          }
        })
        // 最高学历
        that.data.app.http({
          url: '/selects/school_record',
          dengl: false,
          data: {},
          success(res) {
            that.setData({
              eduction: res.data.rdata
            })
            if (that.data.list.school) {
              res.data.rdata.map(function (val, i) {
                if (val.value == that.data.list.school) {

                  that.setData({
                    valu2: val.label,
                    edu: val.value
                  })
                }
              })
            }
          }
        })
        // 婚姻状况
        that.data.app.http({
          url: '/selects/resume_marriage',
          dengl: false,
          data: {},
          success(res) {
            that.setData({
              marr: res.data.rdata
            })
            if (that.data.list.marriage) {
              res.data.rdata.map(function (val, i) {
                if (val.value == that.data.list.marriage) {
                  that.setData({
                    valu: val.label,
                    mar: val.value
                  })
                }
              })
            }
          }
        })
        // 工作时间
        that.data.app.http({
          url: '/selects/work_exe',
          dengl: false,
          data: {},
          success(res) {
            that.setData({
              yearList: res.data.rdata
            })
            if (that.data.list.workTime) {
              res.data.rdata.map(function (val, i) {
                if (val.value == that.data.list.workTime) {
                  that.setData({
                    yearValue: val.label,
                    year_time: val.value
                  })
                }
              })
            }
          }
        })

      }
    })


  },
  blur(e) {
    var type = e.currentTarget.dataset.ty,
      that = this,
      value = e.detail.value
    if (type == 1) {
      that.setData({
        name_value: value
      })
    }
    if (type == 2) {
      that.setData({
        home_value: value
      })
    }
    if (type == 3) {
      that.setData({
        money_value: value
      })
    }
    if (type == 4) {
      that.setData({
        reg_value: value
      })
    }
    if (type == 5) {
      this.setData({
        phone_value: value
      })


    }
    if (type == 6) {
      this.setData({
        emil_value: value
      })

    }
  },
  submit() {
    var that = this,
      date = this.data.date_value.substring(0, 4) + '/' + this.data.date_value.substring(5, 7) + '/' + this.data.date_value.substring(8, 10)
      var img=this.data.img?this.data.img:wx.getStorageSync('users').avatarUrl
    var data = {
      address: this.data.home_value,
      time: date,
      name: this.data.name_value,
      phone: this.data.phone_value,
      email: this.data.emil_value,
      // money: this.data.money_value,
      url: img,
      status: this.spring.data.mar,
      school: this.data.edu,
      workTime: this.data.year_time,
      marriage: this.data.mar,
      sex: this.data.six,
      id: this.data.id
    }
    console.log(this.data.img)
    if (!this.data.app.checkPhone(that.data.phone_value)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
    } else if (!this.data.app.checkEmail(that.data.emil_value)) {
      wx.showToast({
        title: '请输入正确的邮箱',
        icon: 'none'
      })
    } else {
      this.data.app.http({
        url: '/resume/saveOrUpdateResumes',
        dengl: true,
        method: 'POST',
        data: data,
        success(res) {
          if (res.data.code == 200) {
            wx.showToast({
              title: '上传成功，请确认信息！',
              icon: 'none',
              duration: 2000,
            })
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2];
            prevPage.onLoad();
            wx.navigateTo({
              url: '../r-wode-bdjl/r-wode-bdjl?name=' + that.data.name_value + '&phone=' + that.data.phone_value,
            })
          } else {
            wx.showToast({
              title: '上传失败！',
              icon: "none",
              duration: 2000,
            })
          }
        }
      })
    }

  },
  // 参加工作时间
  yearShow() {
    var year = this.data.isYear
    var that = this
    this.setData({
      isYear: !year
    })
  },
  toggle_year(e) {
    this.setData({
      year_time: e.currentTarget.dataset.year,
      year_index: e.currentTarget.dataset.index
    })
  },
  con_year() {
    this.yearShow()
    var that = this
    var index = this.data.year_index
    this.setData({
      yearValue: that.data.yearList[index].label
    })
  },
  // end
  // 求职状态
  show() {
    var that = this
    this.data.app.http({
      url: '/selects/resume_status',
      dengl: false,
      data: {},
      success(res) {
        that.setData({
          springContent: res.data.rdata
        })
      }
    })
    this.spring.show()

  },
  handleConfirmDialog() {
    this.spring.show()
    var index = this.spring.data.index
    console.log(this.spring.data.index)
    this.setData({
      type_content: this.data.springContent[index].label
    })

  },
  // --end--
  // 婚姻状况弹框
  toggle_marr(e) {
    this.setData({
      mar: e.currentTarget.dataset.mar,
      mar_index: e.currentTarget.dataset.index
    })
  },
  marriage() {
    var mar = this.data.isMar
    var that = this
    this.setData({
      isMar: !mar
    })

  },
  con() {
    this.marriage()
    var that = this
    var index = this.data.mar_index
    this.setData({
      valu: that.data.marr[index].label
    })
  },
  // ---end---
  // 性别
  sixChange(e) {
    this.setData({
      six: e.currentTarget.dataset.index
    })
  },
  con1() {
    this.hidden()
    if (this.data.six == 0) {
      this.setData({
        six_val: '男'
      })
    } else {
      this.setData({
        six_val: '女'
      })
    }
  },
  hidden() {
    var six = this.data.isSix
    this.setData({
      isSix: !six
    })
  },
  // --end--
  // 学历
  toggle(e) {
    this.setData({
      edu: e.currentTarget.dataset.edu,
      edu_index: e.currentTarget.dataset.index,
    })
  },
  educat() {
    var eduu = this.data.isEdu
    var that = this
    this.setData({
      isEdu: !eduu
    })

  },
  con2() {
    var that = this
    var index = this.data.edu_index
    // console.log(this.data.edu_index)
    this.setData({
      valu2: that.data.eduction[index].label
    })
    this.educat()
  },
  // ---end---
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 上传头像
  // 选择图片
  images() {
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        var webUrl = 'http://123.56.114.88:8088/'
        var baseUrl = 'http://123.56.114.88:8089'
        wx.uploadFile({
          url: baseUrl + '/Other/upload',
          filePath: res.tempFilePaths[0],
          name: 'img',
          header: {
            'content-type': 'multipart/form-data',
            'Authorization': wx.getStorageSync('Authorization')
          },
          success: function (res) {
            var path = JSON.parse(res.data)
            if (res.statusCode == 200) {
              _this.setData({
                img: webUrl + path.rdata
              })
            }
          },
          fail: function (res) {
            console.log(res)
          }
        })
      }
    })
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
  showDatePicker: function (e) {
    // this.data.datePicker.show(this);
    this.setData({
      datePickerIsShow: true,
    });
  },

  datePickerOnSureClick: function (e) {
    this.setData({
      date_value: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
      datePickerValue: e.detail.value,
      datePickerIsShow: false,
    });
  },

})