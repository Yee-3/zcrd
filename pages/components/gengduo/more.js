// pages/components/gengduo/more.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    style: {
      type: String,
      value: ""
    },
    styleT: {
      type: String,
      value: ""
    },
    moneyList: {
      type: Array,
      value: ''
    },
    expList: {
      type: Array,
      value: ''
    },
    codList: {
      type: Array,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isAdd_F: false,
    ind5: '',
    ind6: '',
    ind7: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggle5(e) {
      this.setData({
        ind5: e.currentTarget.dataset['index']
      })
    },
    toggle6(e) {
      this.setData({
        ind6: e.currentTarget.dataset['index']
      })
    },
    toggle7(e) {
      this.setData({
        ind7: e.currentTarget.dataset['index']
      })
    },
    position2() {
      var add_f = this.data.isAdd_F
      this.setData({
        isAdd_F: !add_f
      })
    },
    cancel() {
      this.setData({
        ind5:'',
        ind6:'',
        ind7:'',
        isAdd_F:false
      })
      this.triggerEvent("cancel");
    },
    confirm() {
      this.triggerEvent("confirm");
    }
  }
})