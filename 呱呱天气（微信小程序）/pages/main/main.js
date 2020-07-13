Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: "",
    today: {},
    future: {},
    pollution: "",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  loadInfo: function () {
    var page = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log(latitude, longitude);
        page.loadCity(latitude, longitude)
      }
    })
  },
  loadCity: function (latitude, longitude) {
    var page = this;
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=FtGBlYBUpRhhAGkoMAwZhO7Hc74vseHD&location=' + latitude + ',' + longitude + '&output=json',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        var city = res.data.result.addressComponent.city;
        city = city.replace("市", "")
        page.setData({ city: city });
        page.loadWeather(city);
      }

    });
  },
  loadWeather: function (city) {
    var page = this;
    wx.request({
      url: 'http://wthrcdn.etouch.cn/weather_mini?city=' + city,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {

        console.log(res)
        var now = new Date();
        var month = now.getMonth() + 1 + '月';
        var future = res.data.data.forecast;
        var todayInfo = future.shift();
        var today = res.data.data;
        var today_todayInfo = today.todayInfo;
        today_todayInfo = todayInfo;
        today_todayInfo.date = month + todayInfo.date;
        today.todayInfo = today_todayInfo;
        page.setData({ today: today, future: future })


      }
    });
  }
})