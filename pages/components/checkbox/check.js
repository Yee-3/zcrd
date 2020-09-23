// pages/components/spring-box/spring-box.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      // 初始值
      value: ''
    },
    content: {
      type: Array
    },
    confirmText: {
      type: String,
      value: '确定'
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    style: {
      type: String,
      value: "margin-right:17rpx"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    isEdu: false,
    valu: '请选择',
    edu: '',
    value: '',
    index:'',
    welList:[],
    valList:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 添加index
    toggle(e) {
      var that = this
      var index = e.currentTarget.dataset.index
      // var edu = this.data.isEdu
      this.data.content[index].show = !this.data.content[index].show
      var arr = this.data.content
      arr[e.currentTarget.dataset.index].dandu = !arr[e.currentTarget.dataset.index].dandu
      this.setData({
        content: arr,
        index:e.currentTarget.dataset.index
      })
      var xArr = []
      var valList = []
      for (var i = 0; i < this.data.content.length; i++) {
        if (this.data.content[i].dandu) {
          xArr.push(this.data.content[i])
          valList.push(this.data.content[i].value)
        }
      }
      this.setData({
        welList: xArr,
        valList:valList
      })
      
    },
    show() {
      var show = this.data.isShow
      this.setData({
        isShow: !show,
        // style:'margin-right:'+17+'rpx;'
      })
    },
    _cancel() {
      //触发取消回调
      this.triggerEvent("cancel")
    },
    _confirm() {
      //触发成功回调
      this.triggerEvent("confirm");
    }
  }
})