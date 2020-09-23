// pages/o-qiyezhuce/o-qiyezhuce.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    natureContent: [],
    classContent: [],
    natValue: '请选择',
    type: '',
    clsValue: '请选择',
    scalValue: '请选择',
    isImg: false,
    img: '',
    imgbox: [],
    zhi_img: '../img/q072.png',
    imgValue: '请上传',
    app: getApp().globalData,
    val: '',
    mapVal: '',
    comVal: '',
    comLogo: '',
    content: {},
    phone: '',
    xiuG: '',
    id: '',
    latitude:'',
    longitude:'',
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.nature = this.selectComponent("#nature");
    this.cls = this.selectComponent("#cls");
    this.scale = this.selectComponent("#scale");
    var that = this
    var that = this
    this.setData({
      content: options
    })
    if (options.xiuG == 'true') {
      this.data.app.http({
        type: true,
        url: '/company/queryCompany',
        dengl: true,
        method: 'POST',
        data: {},
        success(res) {
          var cont = res.data.rdata
          that.setData({
            comVal: cont.companyName,
            comLogo: cont.companyLogo,
            natValue: '',
            mapVal: cont.address,
            imgbox: cont.office.split(','),
            imgValue: cont.companyLogo ? '已上传' : '请上传',
            val: cont.companyDescribe,
            zhi_img: cont.companyUrl,
            xiuG: true,
            id: cont.id
          })
          that.nature.setData({
            edu: cont.companyNature
          })
          that.cls.setData({
            edu: cont.companyType
          })
          that.scale.setData({
            edu: cont.companyNum
          })
        }
      })
    }

    this.data.app.http({
      url: '/Other/hotline',
      dengl: false,
      data: {},
      success(res) {
        that.setData({
          phone: res.data.rdata.phone
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
          natureContent: res.data.rdata
        })
        if (that.nature.data.edu) {
          var arr = res.data.rdata
          arr.map(function (val, i) {
            if (that.nature.data.edu == val.value) {
              that.setData({
                natValue: val.label
              })
            }
          })
        }
      }
    })
    // 工作类型
    this.data.app.http({
      url: '/selects/company_type',
      dengl: false,
      data: {},
      success(res) {
        that.setData({
          classContent: res.data.rdata
        })
        if (that.cls.data.edu) {
          var arr = res.data.rdata
          arr.map(function (val, i) {
            if (that.cls.data.edu == val.value) {
              that.setData({
                clsValue: val.label
              })
            }
          })
        }
      }
    })

    // 企业规模
    this.data.app.http({
      url: '/selects/company_num',
      dengl: false,
      data: {},
      success(res) {
        that.setData({
          numContent: res.data.rdata
        })
        if (that.scale.data.edu) {
          var arr = res.data.rdata
          arr.map(function (val, i) {
            if (that.scale.data.edu == val.value) {
              that.setData({
                scalValue: val.label
              })
            }
          })
        }
      }
    })

  },
  getLocation(e){
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res.address,res)
        console.log(res.latitude)
        console.log(res.longitude)
        console.log(res.name)
        var location = res.address
        that.setData({
          longitude:res.longitude,
          latitude:res.latitude,
          mapVal:res.name
        })
      }
    })
  },
  // 删除图片
  imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });
  },
  // 选择图片
  images(e) {
    var _this = this
    var imgbox = this.data.imgbox
    var picid = e.currentTarget.dataset.pic
    var n = 9
    if (9 > imgbox.length > 0) {
      n = 9 - imgbox.length;
    } else if (imgbox == 9) {
      n = 1
    }
    wx.chooseImage({
      count: n,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        var tempFilePaths = res.tempFilePaths
        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (9 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths)
        } else {
          imgbox[picid] = tempFilePaths[0];
        }
        // console.log(imgbox)
        var webUrl = 'http://123.56.114.88:8088/'
        var baseUrl = 'http://123.56.114.88:8089'
        // tempFilePath可以作为img标签的src属性显示图片
        imgbox.map(function (val, i) {
          wx.uploadFile({
            url: baseUrl + '/Other/upload',
            filePath: val,
            name: 'img',
            header: {
              'content-type': 'multipart/form-data',
              'Authorization': wx.getStorageSync('Authorization')
            },
            success: function (res) {
              var path = JSON.parse(res.data)
              if (res.statusCode == 200) {
                var url = webUrl + path.rdata
                imgbox[i] = url
                _this.setData({
                  imgbox: imgbox
                })
              }
            },
            fail: function (res) {
              console.log(res)
            }
          })
        })
      }
    })
    
  },
  showNat(e) {
    this.nature.show()
    this.nature.setData({
        style: 'margin-right:20rpx;min-width:100rpx;'
      }),
      this.setData({
        type: e.currentTarget.dataset.type
      })
  },
  showClass(e) {
    this.cls.show()
    this.cls.setData({
        style: 'margin-right:20rpx;min-width:100rpx;'
      }),
      this.setData({
        type: e.currentTarget.dataset.type
      })
  },
  showScale(e) {
    this.scale.show()
    this.scale.setData({
        style: 'margin-right:30rpx;min-width:180rpx;'
      }),
      this.setData({
        type: e.currentTarget.dataset.type
      })
  },
  handleConfirm() {
    if (this.data.type == 1) {
      this.nature.show()
      var index = this.nature.data.index
      this.setData({
        natValue: this.data.natureContent[index].label
      })
    } else if (this.data.type == 2) {
      this.cls.show()
      var index = this.cls.data.index
      this.setData({
        clsValue: this.data.classContent[index].label
      })
    } else {
      this.scale.show()
      var index = this.scale.data.index
      this.setData({
        scalValue: this.data.numContent[index].label
      })
    }
  },
  handleCancel() {
    var that = this
    if (this.data.type == 1) {
      this.nature.show()
      that.nature.setData({
        edu: ''
      })
    } else if (this.data.type == 2) {
      this.cls.show()
      this.cls.setData({
        edu: ''
      })
    } else {
      this.scale.show()
      this.scale.setData({
        edu: ''
      })
    }
  },
  phone() {
    wx.makePhoneCall({
      phoneNumber: this.data.phone
    })
  },
  blur(e) {
    var type = e.currentTarget.dataset.type,
      that = this,
      value = e.detail.value
    if (type == 1) {
      that.setData({
        comVal: value
      })
    }
    if (type == 2) {
      that.setData({
        mapVal: value
      })
    }
  },

  qzduan() {
    wx.switchTab({
      url: '../m-shouye/m-shouye',
    })
  },
  desc() {
    wx.navigateTo({
      url: '../n-qiyezhuce-gsms/n-qiyezhuce-gsms?nameVal=' + this.data.content.nameVal + '&six=' + this.data.content.six + '&zhiVal=' + this.data.content.zhiVal + '&emilVal=' + this.data.content.emilVal + '&phoneVal=' + this.data.content.phoneVal+'&desc='+this.data.val,
    })
  },
  zhiZhao() {
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
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
                imgValue: '已上传',
                zhi_img: webUrl + path.rdata
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
  upLoadFile(img) {

  },
  logoImg() {
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
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
                imgValue: '已上传',
                comLogo: webUrl + path.rdata
              })
              console.log(_this.data.comLogo)
            }
          },
          fail: function (res) {
            console.log(res)
          }
        })
      }
    })
  },
  next() {
    var that = this,
      url = this.data.xiuG ? '/company/updateCompany' : '/company/saveCompany'
    if (!this.data.comVal) {
      wx.showToast({
        title: '请输入公司名称',
        icon: 'none'
      })
    } 
    // else if (this.data.imgValue == '请上传') {
    //   wx.showToast({
    //     title: '请上传公司LOGO',
    //     icon: 'none'
    //   })
    // }
     else if (!this.nature.data.edu) {
      wx.showToast({
        title: '请选择公司性质',
        icon: 'none'
      })
    } else if (!this.cls.data.edu) {
      wx.showToast({
        title: '请选择公司类别',
        icon: 'none'
      })
    } else if (!this.data.mapVal) {
      wx.showToast({
        title: '请输入公司地址',
        icon: 'none'
      })
    } else if (!this.data.imgbox) {
      wx.showToast({
        title: '请上传公司环境',
        icon: 'none'
      })
    } else if (!this.scale.data.edu) {
      wx.showToast({
        title: '请选择企业规模',
        icon: 'none'
      })
    } else if (!this.data.val) {
      wx.showToast({
        title: '请输入公司描述',
        icon: 'none'
      })
    } else if (!this.data.zhi_img) {
      wx.showToast({
        title: '请上传营业执照',
        icon: 'none'
      })
    } else {

      this.data.app.http({
        url: url,
        dengl: true,
        method: 'POST',
        data: {
          companyDescribe: that.data.val ? that.data.val : '',
          companyLogo: that.data.comLogo ? that.data.comLogo : wx.getStorageSync('users').avatarUrl,
          companyName: that.data.comVal ? that.data.comVal : '',
          companyNature: this.nature.data.edu ? this.nature.data.edu : '',
          companyType: this.cls.data.edu ? this.cls.data.edu : '',
          companyUrl: that.data.zhi_img ? that.data.zhi_img : '',
          companyNum: this.scale.data.edu ? this.scale.data.edu : '',
          email: that.data.content.emilVal ? that.data.content.emilVal : '',
          id: that.data.id ? that.data.id : '',
          name: that.data.content.nameVal ? that.data.content.nameVal : '',
          office: that.data.imgbox ? that.data.imgbox : '',
          phone: that.data.content.phoneVal ? that.data.content.phoneVal : '',
          position: that.data.content.zhiVal ? that.data.content.zhiVal : '',
          sex: that.data.content.six ? that.data.content.six : '',
          address: that.data.mapVal,
          longitude:that.data.longitude,
          latitude:that.data.latitude,
        },
        success(res) {
          if (res.data.code == 200) {
            wx.reLaunch({
              url: '../p-qiyeduan/p-qiyeduan',
            })
          }
        }
      })
    }
    // wx.switchTab({
    //   url: '../k-qiyezhongxin/k-qiyezhongxin',
    // })
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