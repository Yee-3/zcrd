// pages/components/zonghe/zonghe.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    style:{
      type:String,
      value: ""
    },
    styleT:{
      type:String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isCon:false,
    ind:'1',
    value:'综合排序',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleZong(){
      var con=this.data.isCon
      this.setData({isCon:!con,})
    },
    hidden(){
      this.setData({isCon:false,})
      this.triggerEvent("zongHide")
    },
    toggleZ(e){
        this.setData({
           ind:e.currentTarget.dataset.index
        })
        if(this.data.ind==1){
          this.setData({
            value:'综合排序'
         })
        }else if(this.data.ind==2){
          this.setData({
            value:'最新发布优先'
         })
        }else{
          this.setData({
            value:'距离排序'
         })
        }
        this.triggerEvent("confirm");
    },
  }
})
