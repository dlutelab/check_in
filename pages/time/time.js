// pages/query/query.js
var app=getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totaltime:'',
    openid:'',
    timestamp:'',
    formatTime:'',
    termTimeStamp:'',
    totalTermTime:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.data.openid=app.globalData.openid;
    wx.request({
      url: 'https://class.elab-dlut.cn/checkin/getinformation.php',
      data:{
        openid:that.data.openid,
      },
      method:'POST',
      header:
      {
        "Content-type": "application/x-www-form-urlencoded"
      },
      success:function(res){
        that.setData({
          //totaltime:res.data[0].totaltime,
          timestamp:res.data[0].timestamp,
          termTimeStamp:res.data[0].termTimeStamp,
        })
        console.log(res.data);
        var formatTime = '';
        var formatTermTime='';
        var hour = parseInt(that.data.timestamp / 3600);
        var min = parseInt((that.data.timestamp % 3600) /60);
        var sec = parseInt(that.data.timestamp - hour*3600 - min*60);
        var termhour = parseInt(that.data.termTimeStamp / 3600);
        var termmin = parseInt((that.data.termTimeStamp % 3600) /60);
        var termsec = parseInt(that.data.termTimeStamp - termhour*3600 - termmin*60);
        formatTime = hour + "小时" + min + "分钟" + sec + "秒";
        formatTermTime = termhour + "小时" + termmin + "分钟" + termsec + "秒";
        that.setData({
          totaltime:formatTime,
        })
        wx.request({
          url: 'https://class.elab-dlut.cn/checkin/updatetotaltime.php',
          data:{
            openid:that.data.openid,
            formatTime:formatTime,
            formatTermTime:formatTermTime,
          },
          method:'POST',
          header:
          {
            "Content-type": "application/x-www-form-urlencoded"
          },
          success:function(res){
            console.log('总时间更新成功');
            console.log(res.data);
          }
      })
      }
    })

},
      

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
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

  }
})