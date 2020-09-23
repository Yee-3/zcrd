// pages/components/toggle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: String,
      // 初始值
      value: '是否切换为招聘官身份'
    },
    title: {
      type: String,
      // 初始值
      value: '身份切换'
    },
    confirmText: {
      type: String,
      value: '跳转'
    },
    cancelText: {
      type: String,
      value: '注册'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show() {
      var show = this.data.isShow
      this.setData({
        isShow: !show
      })
    },
    _cancel() {
      this.triggerEvent("cancel");
    },
    _confirm() {
      //触发成功回调
      this.triggerEvent("confirm");
    }
  },

})