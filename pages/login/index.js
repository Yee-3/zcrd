// pages/login/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		//登录状态 及其信息
		SessionKey: '',
		OpenId: '',
		nickName: '',
		avatarUrl: '../img/logo.png',
		code: null,
		isCanUse: wx.getStorageSync('isCanUse') || true, //默认为true,
		//parentId
		parentId: '',

		//在哪来的 ；  目前只有区分是否来自于分享
		from: 'login',
		//分享的课程ID
		ID: '',
		path: '',
		iv: '',
		encryptedData: '',
		img: '../img/f051.png',
		type: 1,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		if (options.type == 2) {
			this.setData({
				type: 2
			})
		}
	},
	//不登陆
	getPhoneNumber(e) {
		console.log(e.detail.errMsg)
		console.log(e.detail.iv)
		console.log(e.detail.encryptedData)
	},

	noLogin() {
		if (this.data.type == 1) {
			wx.reLaunch({
				url: '/pages/m-shouye/m-shouye'
			})
		} else {
			wx.reLaunch({
				url: '../p-qiyeduan/p-qiyeduan'
			})
		}
	},

	//拿到用户信息
	//登录
	getPerson(options) {
		let _this = this;
		const app = getApp().globalData
		// wx.showLoading({
		//   title: '登录中...',
		//   mask: true,
		// });
		// 1.wx获取登录用户code
		wx.login({
			success(res) {
				console.log(res,77777)
				var code = res.code
				wx.showModal({
					title: '温馨提示',
					content: '亲，授权微信登录后才能正常使用小程序功能',
					success(result) {
						console.log(result)
						if (result.confirm) {
							wx.getUserProfile({
								desc: '用于完善会员资料',
								success: function(res) {
									if (code) {
										_this.setData({
											nickName: res.userInfo.nickName,
											avatarUrl: res.userInfo.avatarUrl,
											// iv: res.iv,
											// encryptedData: res.encryptedData
										})
										wx.setStorageSync('users', {
											'nickName': res.userInfo.nickName,
											'avatarUrl': res.userInfo.avatarUrl
										})
										app.http({
											url: '/oauth/login',
											method: 'POST',
											dengl: false,
											header: true,
											data: JSON.stringify({
												code: code,
												encryptedData: res.encryptedData,
												iv: res.iv,
												type: _this.data
													.type
											}),
											success(resd) {
												console.log(resd, 2222222,res)
												if (resd.data.code == 200) {
													console.log(res)
													wx.setStorageSync('Authorization',resd.data.rdata.ctrlToken.token)
													wx.showToast({
														title: '登录成功'
													})
													if (_this.data.type ==1) {
														setTimeout(
															function() {
																wx.reLaunch({
																	url: '../m-shouye/m-shouye'
																})
															}, 200)
													} else {
														setTimeout(
															function() {
																wx.reLaunch({
																	url: '../p-qiyeduan/p-qiyeduan'
																})
															}, 200)
													}
												} else {
													// console.log(res)
												}
											}
										})
									}
								},
								fail: function(err) {
									console.log(err, 8888)
								}
							})
							// console.log(res)

						} else if (result.cancel) {
							//如果用户点击了取消按钮
							console.log(3);
							wx.showToast({
								title: '您拒绝了请求,部分功能将不能使用',
								icon: 'none',
								duration: 2000
							});
							return;
						}
					}
				})

			}

		});
	},
	getPhoneNumber(e) {
		console.log(e.detail.errMsg)
		console.log(e.detail.iv)
		console.log(e.detail.encryptedData)
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
