// pages/components/citys/city.js
import qqmap from '../../../utils/map.js'
import cityList from './city'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showMap: {
      type: Boolean,
      value: true,
    },
    styles: {
      type: String,
      value: '',
      observer: function (newval, oldval) {
        // 监听改变
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //下面是字母排序
    letter: ["#", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    cityListId: '',
    //下面是城市列表信息，这里只是模拟数据
    citylist: [],
    idn: '',
    idn_nu: '',
    idn_show: '',
    city: [],
    id: '',
    //下面是热门城市数据，模拟数据
    newcity: [],
    locate: [],
    idn1: '',
    idn2: '',
    citySel: '全国',
    locateCity: '',
    hot: '',
    hot1: '',
    hot2: '',
    loacteId: '',
    load2: 'national',
    showMap: true,
    ids: '',
    location: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show(e) {
      var types = e.currentTarget.dataset.types
      var val = e.currentTarget.dataset.val || '',
        // types = e.currentTarget.dataset.types || '',
        Index = e.currentTarget.dataset.index || '',
        that = this;
      var city = this.data.citySel;
      var index = e.currentTarget.dataset.index
      switch (types) {
        case 'national':
          //全国  
          that.setData({
            idn3: index
          })
          city = val;
          break;
        case 'new':
          //热门城市
          that.setData({
            idn2: index
          })
          city = val;
          break;
        case 'list':
          //城市列表
          that.setData({
            idn1: index
          })
          city = val;
          break;
      }
      if (city) {
        wx.setStorage({
          key: 'city',
          data: city
        })
        //点击后给父组件可以通过bindcitytap事件，获取到cityname的值，这是子组件给父组件传值和触发事件的方法
        this.triggerEvent('citytap', {
          cityname: city
        });
      } else {
        this.getLocate();
      }

    },
    cityTap(e) {
      var types = e.currentTarget.dataset.types
      var val = e.currentTarget.dataset.val || '',
        // types = e.currentTarget.dataset.types || '',
        Index = e.currentTarget.dataset.index || '',
        that = this;
      var city = this.data.citySel;
      if (types == 'national') {
        that.setData({
          ids: that.data.loacteId,
        })
      } else {
        that.setData({
          ids: e.target.dataset.index
        })
      }
      // 如果点击的是list
      if (this.data.showMap) {
        if (types == 'list') {
          that.setData({
            idn_nu: e.currentTarget.dataset.nu,
            idn: e.currentTarget.dataset.index,
            id: e.currentTarget.dataset.id,
            hot2: false,
            load2: false,
          })
          // 点击的是hot列表
        } else if (types == 'new') {
          that.setData({
            hot2: e.currentTarget.dataset.types,
            hot: e.currentTarget.dataset.index,
            hot1: e.currentTarget.dataset.id,
            idn_nu: false,
            load2: false,
          })
        } else if (types == 'national') {
          that.getLocate()
          that.setData({
            load2: e.currentTarget.dataset.types,
            idn_nu: false,
            hot2: false
          })
        }
      } else {
        switch (types) {
          case 'locate':
            //定位内容
            break;
          case 'national':
            //全国
            that.getLocate()
            that.setData({
              load2: e.currentTarget.dataset.types,
            })
            city = this.data.locateCity;
            location=this.data.location
            break;
          case 'new':
            //热门城市
            that.setData({
              hot2: e.currentTarget.dataset.types,
              hot: e.currentTarget.dataset.index,
              location: e.target.dataset.loca,
            })
            city = val;
            location =that.data.location;
              break;
          case 'list':
            //城市列表
            that.setData({
              idn_nu: e.currentTarget.dataset.nu,
              idn: e.currentTarget.dataset.index,
              location: e.target.dataset.loca,
            })
            city = val;
            location =that.data.location;
            break;
        }
        if (city) {
          wx.setStorage({
            key: 'city',
            data: city
          })
          //点击后给父组件可以通过bindcitytap事件，获取到cityname的值，这是子组件给父组件传值和触发事件的方法
          this.triggerEvent('citytap', {
            cityname: city,
            location: location
          });
        } else {
          this.getLocate();
        }
      }
    },
    //点击城市字母
    letterTap(e) {
      const Item = e.currentTarget.dataset.item;
      this.setData({
        cityListId: Item //滚动条to指定view
      })
    },
   
    //调用定位
    getLocate() {
      let that = this;
      new qqmap().getLocateInfo().then(function (val) { //这个方法在另一个文件里，下面有贴出代码
        var x = val.address_component.city
        var id = val.ad_info.adcode.substring(0,4)+'00',
        location = val.location
        that.setData({
          location: val.location
        })
        if (x.indexOf('市') !== -1) { //这里是去掉“市”这个字
          val = x.slice(0, x.indexOf('市'));
        }
        that.setData({
          locateCity: val,
        });
        //把获取的定位和获取的时间放到本地存储
        wx.setStorageSync('locatecity', {
          city: val,
          time: new Date().getTime(),
          countryId:id,
          location: location.lng + ',' + location.lat
        });
      });

    },

  },
  ready() {

    let that = this,
      cityOrTime = wx.getStorageSync('locatecity') || {},
      time = new Date().getTime(),
      city = '';
    if (!cityOrTime.time || (time - cityOrTime.time > 1800000)) { //每隔30分钟请求一次定位
      this.getLocate();
    } else { //如果未满30分钟，那么直接从本地缓存里取值
      var arr=cityOrTime.location.split(',')
      that.setData({
        locateCity: cityOrTime.city,
        loacteId:cityOrTime.countryId,
        location:{lat:arr[1],lng:arr[0]}
      })
    }
    var list= wx.getStorageSync('list')
    if(list){
      this.setData({
        citylist:list.citylist,
        newcity:list.newcity,
        locate:list.locate
      })
    }else{
      new qqmap().getCity().then(function (val) {
        var name = that.data.locateCity
        var city = val.result[1]
        var city_coun = val.result[0]
        var city_qu = val.result[2]
        var cityList = []
        var citys = []
        var qita = []
        var hot = []
        var locate = []
        // 将所有市放入列表中
        for (var i = 0; i < city_coun.length; i++) {
          var num = city_coun[i].id.substring(0, 2)
          if (num == 11 || num == 12 || num == 31 || num == 50 || num == 71 || num == 81 || num == 82) {
            cityList.push(city_coun[i])
          }
        }
        for (var i = 0; i < city.length; i++) {
          var num = city[i].id.substring(0, 2)
          if (num != 11 && num != 12 && num != 31 && num != 50 && num != 71 && num != 81 && num != 82) {
            cityList.push(city[i])
          } else {
            qita.push(city[i])
          }
        }
        // 遍历出来结构
        var letter = []
        for (var i = 0; i < cityList.length; i++) {
          var letts = cityList[i].pinyin[0].substring(0, 1)
          letter.push(letts)
        }
        var letters = Array.from(new Set(letter)).sort()
        for (var i = 0; i < letters.length; i++) {
          var obj = {}
          var data = []
          obj.letter = letters[i].toUpperCase()
          obj.data = data
          citys.push(obj)
          // 遍历城市数据信息
          for (var j = 0; j < cityList.length; j++) {
            var da = {}
            var datas = []
            var letts = cityList[j].pinyin[0].substring(0, 1)
            da.id = cityList[j].id
            da.cityName = cityList[j].name
            da.data = datas
            da.location = cityList[j].location
            for (var x = 0; x < city_qu.length; x++) {
              var qu = {}
              qu.id = city_qu[x].id
              qu.name = city_qu[x].fullname
              if (cityList[j].id.substring(0, 4) == city_qu[x].id.substring(0, 4)) {
                da.data.push(qu)
              }
            }
            for (var y = 0; y < qita.length; y++) {
              var qu = {}
              qu.id = qita[y].id
              qu.name = qita[y].fullname
              if (cityList[j].id.substring(0, 2) == qita[y].id.substring(0, 2)) {
                da.data.push(qu)
              }
            }
            if (letters[i] == letts) {
              // 遍历地区数据
              citys[i].data.push(da)
            }
          }
        }
        // 热门城市
        for (var i = 0; i < citys.length; i++) {
          for (var j = 0; j < citys[i].data.length; j++) {
            var x = citys[i].data[j].id
            var y = citys[i].data[j].cityName
            if (x == 110000 || x == 310000 || x == 420100 || x == 440300 || x == 440100) {
              hot.push(citys[i].data[j])
            }
            if (name == y) {
              locate.push(citys[i].data[j].data)
            }
          }
        }
        wx.setStorageSync('list',{
          citylist:citys,
          newcity:hot,
          locate:locate
        })
        that.setData({
          citylist: citys,
          newcity: hot,
          locate: locate
        })
      })
    }
   
    // 判断是否执行
    if (!this.data.showMap) {
      this.setData({
        load2: false,
        idn_nu: false,
        hot2: false
      })
    }
  },

})