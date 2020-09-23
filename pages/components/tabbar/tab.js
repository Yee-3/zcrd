// pages/components/tabbar/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    tabbar:{},
    curRoute:'pages/p-qiyeduan/p-qiyeduan',
      list: [
        {
          pagePath: "pages/p-qiyeduan/p-qiyeduan",
          text: "简历中心",
          iconPath: "../../img/d1_1.png",
          selectedIconPath: "../../img/d1_11.png"
        },
        {
          pagePath: "pages/h-mianshiguanli-yms/h-mianshiguanli-yms",
          text: "进程管理",
          iconPath: "../../img/d1_2.png",
          selectedIconPath:"../../img/d1_22.png"
        },
        {
          pagePath: "pages/k-qiyezhongxin/k-qiyezhongxin",
          text: "企业中心",
          iconPath: "../../img/d1_3.png",
          selectedIconPath: "../../img/d1_33.png"
        }
      ]
  },

  attached(){
    let pages = getCurrentPages();
    this.data.curRoute = pages[pages.length-1].route;
    this.setData(this.data)

  },
  /**
   * 组件的方法列表
   */
  methods: {
    redirectTo(e){
      let taburl = e.currentTarget.dataset.taburl;
      if(taburl == this.data.curRoute) return
      wx.redirectTo({
        url:"/"+taburl
      })
      this.triggerEvent("toggle");
    },
  }
})