// pages/components/spring/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      // 初始值
      value: '学历'
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isHidden:false,
    mar:'',
    index:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggle(e){
      this.setData({
        mar:e.currentTarget.dataset['val'],
        index:e.currentTarget.dataset['index'],
      })
    },
    show() {
      var show = this.data.isHidden
      this.setData({
        isHidden: !show
      })
    },
    _confirm() {
      //触发成功回调
      this.triggerEvent("confirm");
    }
    // ---end---

  }
})