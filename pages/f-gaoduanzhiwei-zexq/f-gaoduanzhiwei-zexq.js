// pages/f-gaoduanzhiwei-zexq/f-gaoduanzhiwei-zexq.js
Page({

	/**
	 * 页面的初始数据
	 */
	// 存放数据
	data: {
		style: 'display:none',
		xinxibaom: 'display:none',
		dianhua: 'display:none',
		app: getApp().globalData,
		detailCont: {},
		date: '',
		name: '',
		phone: '',
		id: '',
		isBao:true
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this
		this.setData({
			id: options.id
		})
		this.data.app.http({
			url: '/position/heightInfo',
			dengl: true,
			method: 'POST',
			data: {
				id: options.id
			},
			success(res) {
				that.setData({
					detailCont: res.data.rdata,
					date: res.data.rdata.createTime.substring(0, 10)
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
				name: value
			})
		}
		if (type == 2) {
			that.setData({
				phone: value
			})
		}

	},
	submit() {
		var that = this
		if (this.data.app.checkPhone(this.data.phone)) {
			that.data.app.http({
				url: '/position/signUp',
				dengl: true,
				method: 'POST',
				data: {
					name: that.data.name,
					phone: that.data.phone,
					position: that.data.id
				},
				success(res) {
					if (res.data.code == 200) {
						that.setData({
							style: 'display:none',
							xinxibaom: 'display:none',
							isBao:false
						})
					}else{
						that.setData({
							style: 'display:none',
							xinxibaom: 'display:none',
							isBao:false
						})
						wx.showToast({
							title: '您已报过名！',
							icon: 'success',
							duration: 2000,
						})
					}
				}
			})
		} else {
			wx.showToast({
				title: '请输入正确的手机号',
				icon: 'none'
			})
		}
	},
	tanchuang: function () {
		this.setData({
			style: 'display:block'
		})
	},
	tanchuang_1: function () {
		this.setData({
			xinxibaom: 'display:block'
		})
	},
	tanchuang_2: function () {
		this.setData({
			dianhua: 'display:block',
			style: 'display:none'
		})
	},

	quxiao: function () {
		this.setData({
			style: 'display:none'
		})
	},
	quxiao1: function () {
		this.setData({
			xinxibaom: 'display:none'
		})
	},
	quxiao2: function () {
		this.setData({
			dianhua: 'display:none',
			style: 'display:block'
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

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {
		return {
      // desc: this.data.des,
      title: this.data.detailCont.title,

      imageUrl: '../img/share.jpg',
      // 可以更换分享的图片
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