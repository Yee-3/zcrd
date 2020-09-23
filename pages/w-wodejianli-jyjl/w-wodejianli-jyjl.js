// pages/w-wodejianli-jyjl/w-wodejianli-jyjl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '请选择',
    date1: '请选择',
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,
    data_index: '',
    isEdu:false,
    edu:'',
    valu:'请选择',
    app: getApp().globalData,
    schList:[],
    edu_index:'',
    school:'',
    pro_value:'',
    des_value:'',
    shcool_value:'',
    opList:'',
    isToggle:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      opList:options
    })
    var that=this
    if(options.sId){
      var time = options.startTime.substring(0, 4) + '年' + options.startTime.substring(5, 7) + '月' + options.startTime.substring(8, 10) + '日'
      var time1 = options.endTime.substring(0, 4) + '年' + options.endTime.substring(5, 7) + '月' + options.endTime.substring(8, 10) + '日'
      that.setData({
        shcool_value:options.school,
        date:time,
        date1:time1,
        des_value:options.describe?options.describe:'',
        pro_value:options.professional?options.professional:'',
        edu:options.record,
        isToggle:true
      })
      console.log(this.data.shcool_value,this.data.des_value,this.data.pro_value)
    }
    this.data.app.http({
      url:'/selects/school_record',
      dengl:false,
      data:{},
      success(res){
        that.setData({
          schList:res.data.rdata
        })
        if(options.sId){
          for(var i=0;i< res.data.rdata.length;i++){
            if(options.record==res.data.rdata[i].value){
              that.setData({
                valu:res.data.rdata[i].label
              })
            }
          }
        }
        console.log(res.data.rdata)
      }
    })
  },
   // 失去焦点事件
   blur(e) {
     console.log(e)
    var type = e.currentTarget.dataset.ty,
      that = this,
      value = e.detail.value
    if (type == 1) {
      that.setData({
        shcool_value: value
      })
    }
    if (type == 2) {
      that.setData({
        pro_value: value
      })
    }
    if (type == 3) {
      that.setData({
        des_value: value
      })
    }
  },
  // 学历
  toggle(e){
    this.setData({
      edu:e.currentTarget.dataset.edu,
      edu_index:e.currentTarget.dataset.edu,
    })
  },
  educat(){
    var eduu = this.data.isEdu
    this.setData({
      isEdu: !eduu
    })
  },
  con() {
    this.educat()
    var index=this.data.edu_index,
    that=this
    this.setData({
      valu:that.data.schList[index].label
    })
  },
  submit(){
    var that=this,
    date = this.data.date.substring(0, 4) + '/' + this.data.date.substring(5, 7) + '/' + this.data.date.substring(8, 10),
    date1 = this.data.date1.substring(0, 4) + '/' + this.data.date1.substring(5, 7) + '/' + this.data.date1.substring(8, 10),
    id=this.data.opList.sId?this.data.opList.sId:''
    console.log(this.data.shcool_value,this.data.des_value,this.data.pro_value)

    this.data.app.http({
      url:'/resume/saveOrUpdateSchool',
      dengl:true,
      method:'POST',
      data:{
        describe:that.data.des_value,
        startTime:date,
        endTime:date1,
        school:that.data.shcool_value,
        resumeId:that.data.opList.id,
        id:id,
        record:that.data.edu,
        professional:that.data.pro_value,
        status:''
      },
      success(res){
        if (res.data.code==200) {
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
  },
   // 删除
   dele(){
    var id=id=this.data.opList.sId?this.data.opList.sId:''
    this.data.app.http({
      url: '/resume/delSchool',
      dengl: true,
      method:'POST',
      data: {
        id:id
      },
      success(res) {
        console.log(res)
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
  // ---end---
 
  // e-----nd-----
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