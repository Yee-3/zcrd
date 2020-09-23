// pages/components/zhiwei/zhiwei.js
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
    zhiList: {
      type: Array,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isAdd: false,
    isTwo: false,
    ind1: 'x',
    ind2: 'x',
    ind: 'x',
    id: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggle(e) {
      this.setData({
        ind: e.currentTarget.dataset['index']
      })
      var two = this.data.isTwo
      this.setData({
        isTwo: !two
      })
    },
    toggle1(e) {
      this.setData({
        ind1: e.currentTarget.dataset['index']
      })
    },
    toggle2(e) {
      this.setData({
        ind2: e.currentTarget.dataset['index'],
        id: e.currentTarget.dataset['id'],
      })
      // this.position()
      this.triggerEvent("confirm");
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
    },
    hidden() {
      var that=this
      if(this.data.ind2=='x'){
      this.setData({
        isAdd: false,
        isTwo:false,
        ind1: 'x',
        ind2: 'x',
        ind: 'x',
      })
    }else{
      this.setData({
        isAdd: false,

      })
    }
      this.triggerEvent("hidden");
   
    },
  }

})