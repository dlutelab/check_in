var app = getApp()
// pages/admin/adminInf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group:'',
    id:'',
    name:'',
    openid:'',
    flag:'',
    totaltime:'',
    index:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
     this.data.openid=app.globalData.openid;
     console.log(this.data.openid);

      var name = wx.getStorageSync('name1');
      var id = wx.getStorageSync('id1');
      var group = wx.getStorageSync('group1');
      //console.log(name);
      if (name) {
        this.setData({ name: name });
      }
      if (group) {
        this.setData({ group: group });
      }
      if(id){
        this.setData({id: id});
      }

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


  bindTextAreaBlur1: function (e) {
    this.data.name = e.detail.value;
    
  },
  bindTextAreaBlur2: function (e) {
    this.data.group = e.detail.value;
    

  },
  bindTextAreaBlur0: function(e){
    this.data.id = e.detail.value;
    //console.log(this.data.id)
  },

  finish: function () {
    var that = this;
      wx.request({
        url: 'https://class.dlut-elab.com/feedback/dunjiaxuan/user.php',
        data: {
          name: that.data.name,
          openid: that.data.openid,
          id: that.data.id,
        },
        method: 'POST',
        header:
        {
          "Content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          if (res.data.status == 0) {
            console.log("not found");
          }
          else {
            console.log("found the resolution");
            console.log(res.data)
          }
        }
        
      })
      wx.showModal({
        content: '提交成功'
      })
      wx.setStorageSync('name1', this.data.name);     //本地缓存
      wx.setStorageSync('group1', this.data.group);
      wx.setStorageSync('id1', this.data.id);
    }
  
})