// pages/mine/mine.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    elements: [
      { title: '我的信息', name: 'information', color: 'brown', icon: 'newsfill' },
      { title: '签到时长', name: 'time', color: 'orange', icon: 'timefill' },
      { title: '在线人员', name: 'online', color: 'green', icon: 'myfill' },
      //{ title: '科中成员', name: 'members', color: 'pink', icon: 'copy' },
    ],
    onlinePeople:'',
    totalPeople:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'https://class.elab-dlut.cn/checkin/getNumber.php',
      success: function(res){
        console.log(res.data);
        that.setData({
          onlinePeople:res.data[0],
          totalPeople:res.data[1],
        })
      }
    })

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
    var that=this;
    wx.request({
      url: 'https://class.elab-dlut.cn/checkin/getNumber.php',
      success: function(res){
        console.log(res.data);
        that.setData({
          onlinePeople:res.data[0],
          totalPeople:res.data[1],
        })
      }
    })

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
    var that=this;
    wx.request({
      url: 'https://class.elab-dlut.cn/checkin/getNumber.php',
      success: function(res){
        console.log(res.data);
        that.setData({
          onlinePeople:res.data[0],
          totalPeople:res.data[1],
        })
      }
    })

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