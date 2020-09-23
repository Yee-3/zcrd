// pages/m-qiyezhuce/m-qiyezhuce.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSix: false,
    six: '1',
    six_val: '请选择',
    nameVal:'',
    zhiVal:'',
    emilVal:'',
    phoneVal:'',
    app: getApp().globalData,
    phone:'',
    xiuG:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that=this
    if(options.id){
      this.data.app.http({
        type:true,
        url:'/company/queryCompany',
        dengl:true,
        method:'POST',
        data:{},
        success(res){
          console.log(res.data.rdata)
          var cont=res.data.rdata
          that.setData({
            nameVal:cont.name,
            six:cont.sex,
            six_val:cont.sex==1?'男':'女',
            zhiVal:cont.position,
            emilVal:cont.email,
            phoneVal:cont.phone,
            xiuG:true
          })
        }
      })
    }
    this.data.app.http({
      url:'/Other/hotline',
      dengl:false,
      data:{},
      success(res){
        that.setData({
          phone:res.data.rdata.phone
        })
      }
    })
  },
  // / 性别
  sixChange(e) {
    this.setData({
      six: e.currentTarget.dataset.index
    })
  },
  qzduan() {
    wx.switchTab({
      url: '../m-shouye/m-shouye',
    })
  },
  phone() {
    wx.makePhoneCall({
      phoneNumber: this.data.phone
    })
  },
  con1() {
    this.hidden()
    if (this.data.six == 1) {
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
  blur(e) {
		var type = e.currentTarget.dataset.type,
			that = this,
			value = e.detail.value
		if (type == 1) {
			that.setData({
				nameVal: value
      })
		}
		if (type == 2) {
			that.setData({
				zhiVal: value
			})
    }
    if (type == 3) {  
        that.setData({
          emilVal: value
        })
    }
    if (type ==4) {  
        that.setData({
          phoneVal: value
        })
		}

	},
	
  // --end--
  next() {
    var that=this
    if (!this.data.app.checkEmail(this.data.emilVal)) {
      wx.showToast({
        title: '请输入正确的邮箱',
        icon: 'none'
      })
    }else  if (!this.data.app.checkPhone(this.data.phoneVal)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
    }else{
      wx.navigateTo({
        url: '../o-qiyezhuce/o-qiyezhuce?nameVal='+this.data.nameVal+'&six='+this.data.six+'&zhiVal='+this.data.zhiVal+'&emilVal='+this.data.emilVal+'&phoneVal='+this.data.phoneVal+'&xiuG='+this.data.xiuG,
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
    wx.hideHomeButton({
      success: function () {
      },
      fail: function () {
      },
      complete: function () {
      },
    });
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