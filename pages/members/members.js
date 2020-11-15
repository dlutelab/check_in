// pages/personal/personal.js
var app=getApp();
var stocklist;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    doctor_information:[{
      img:'',
      name:'',
      describe:'',
    }],
    isShow:false,
    myname:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var i;
    that.data.openid=app.globalData.openid;
    console.log(that.data.openid);
    wx.request({
      url: 'https://class.elab-dlut.cn/checkin/getAllMembers.php',
      success:function(res){
        for(let i = 0;i < res.data.length;i++){
          var doctorlist = 'doctor_information['+i+']';
          stocklist = res.data[i];
          that.setData({
            [doctorlist]:{
              //img:stocklist.img,
              name:stocklist.name,
              describe:stocklist.description,
            }
          })
      }
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
})