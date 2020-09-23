// pages/components/zhi-name/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: Array,
      value: ''
    },
    confirmText: {
      type: String,
      value: '确定'
    },
    cancelText: {
      type: String,
      value: '取消'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isAdd: false,
    isTwo: false,
    ind:'x',
    ind1: 'x',
    ind2: 'x',
    id:'',
    isTrue:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggle(e) {
      var two = this.data.isTwo
      var index = e.currentTarget.dataset['index'],
        index2 = 0,
        index3 = 0,
        that = this
      this.setData({
        isTwo: !two,
        ind: e.currentTarget.dataset['index'],
        // zhiValue: that.data.content[index].treeDTOS[index2].treeDTOS[index3].name
        ind1:'x',
        ind2:'x'
      })
    },
    toggle1(e) {
      var index = this.data.ind,
        index2 = e.currentTarget.dataset['index'],
        index3 = 0,
        that = this
      this.setData({
        ind1: e.currentTarget.dataset['index'],
        // zhiValue: that.data.content[index].treeDTOS[index2].treeDTOS[index3].name
        ind2:'x'
      })
    },
    toggle2(e) {
      var index = this.data.ind,
        index2 = this.data.ind1,
        index3 = e.currentTarget.dataset['index'],
        that = this
      this.setData({
        ind2: e.currentTarget.dataset['index'],
        zhiValue: that.data.content[index].treeDTOS[index2].treeDTOS[index3].name,
        id:e.currentTarget.dataset['id'],
      })
    },
    position() {
      var add = this.data.isAdd
      this.setData({
        isAdd: !add
      })
    },
    hide() {
      var two = this.data.isTwo
      this.setData({
        isTwo: !two
      })
      if (!this.data.isTwo) {
        this.setData({
          ind1: 0,
          ind2: 0
        })
      }
    },
    _cancel() {
      //触发取消回调
      this.triggerEvent("cancel")
      this.position()
      var two = this.data.isTwo
      this.setData({
      })
      if (!this.data.isTrue) {
        this.setData({
          isTwo: false,
          ind:'x',
          ind1:'x',
          ind2: 'x'
        })
      }
    },
    _confirm() {
      //触发成功回调
      this.setData({
        isTrue:true
      })
      this.triggerEvent("confirm");
    }
  }
})