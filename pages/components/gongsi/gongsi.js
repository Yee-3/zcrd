// pages/components/gongsi/gongsi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    comList: {
      type: Array,
      value: ''
    },
    scaleList: {
      type: Array,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isAdd_T: false,
    ind3: '',
    ind4: '',

  },

  /**
   * 组件的方法列表
   */
  methods: {
    position1() {
      var add_t = this.data.isAdd_T
      this.setData({
        isAdd_T: !add_t
      })
    },
    toggle3(e) {
      this.setData({
        ind3: e.currentTarget.dataset['index']
      })
    },
    toggle4(e) {
      this.setData({
        ind4: e.currentTarget.dataset['index']
      })
    },
    cancel() {
      this.triggerEvent("cancel");
    },
    confirm() {
      this.triggerEvent("confirm");
    }
  }
})