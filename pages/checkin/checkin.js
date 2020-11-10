// pages/checkin/checkin.js
var util = require('../../utils/util.js');
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    name:'',
    checkintime:'',
    checkouttime:'',
    totaltime:'',
    flag:'',
    latitude:'',
    longitude:'',
    times:0,
    timestamp:0,
    ax:'',
    ay:'',
    bx:'',
    by:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.flag = 1;
    that.data.openid=app.globalData.openid;
    wx.getLocation({
      type:'gcj02',
      isHighAccuracy:'true',
      success(res){
        that.latitude = res.latitude;
        that.longitude = res.longitude;
        console.log(that.latitude);
        console.log(that.longitude);
      }
    })
    console.log(that.data.openid+"aklgjwehgioahweioghaiowehgiheg");

    wx.request({
      url: 'https://class.dlut-elab.com/feedback/dunjiaxuan/getinformation.php',
      data:{
        openid: that.data.openid,
      },
      method:'POST',
      header:
      {
        "Content-type": "application/x-www-form-urlencoded"
      },
      success: function(res){
        that.setData({
          name: res.data[0].name,
          id: res.data[0].id,
          flag: res.data[0].flag,
        })
      }
    })
    wx.request({
      url: 'https://class.dlut-elab.com/feedback/dunjiaxuan/getjwd.php',
      
      success: function (res) {
       /*console.log(res.data[0].ax);
       console.log(res.data[0].bx);
       console.log(res.data[0].ay);
       console.log(res.data[0].byy);
       console.log(12345);*/
       that.setData({
         ax:res.data[0].ax,
         ay:res.data[0].ay,
         bx:res.data[0].bx,
         by:res.data[0].byy
       })
       console.log(that.data.ax);
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
  checkin: function(e){

    var that = this;
    //console.log("签到时间戳" + app.globalData.checkintime);
    if(that.data.flag == 1){
    
    console.log(that.data.bx+'  '+that.data.ax+'  '+that.data.ay+'   '+that.data.by);
    if(that.latitude>=that.data.bx&&that.latitude<=that.data.ax&&that.longitude>=that.data.ay&&that.longitude<=that.data.by){
      var TIME = util.formatTime(new Date());
      var checkintimestamp = Date.parse(new Date());
      app.globalData.checkintime = checkintimestamp / 1000;
      this.setData({
        checkintime: TIME,
      })
    wx.request({
      url: 'https://class.dlut-elab.com/feedback/dunjiaxuan/getinformation.php',
      data:{
        openid: that.data.openid,
      },
      method: 'POST',
      header:
      {
        "Content-type": "application/x-www-form-urlencoded"
      },
      success:function(res){
        console.log('读取次数更新');
        that.setData({
        times: res.data[0].times,
        flag: res.data[0].flag,
        timestamp: res.data[0].timestamp,
        })
        console.log(that.data.timestamp);
        wx.request({
          url: 'https://class.dlut-elab.com/feedback/dunjiaxuan/checkinrecord.php',
          data: {
            checkintime: TIME,
            name: that.data.name,
            openid: that.data.openid,
            id: that.data.id,
            times: that.data.times,
            checkintimestamp:app.globalData.checkintime
          },
          method: 'POST',
          header:
          {
            "Content-type": "application/x-www-form-urlencoded"
          },
          success: function(res){
            that.data.flag=0;
            wx.request({
            url: 'https://class.dlut-elab.com/feedback/dunjiaxuan/updateflag.php',
            data:{
              openid: that.data.openid,
              flag: that.data.flag,
            },
            method:'POST',
            header:
            {
              "Content-type": "application/x-www-form-urlencoded"
            },
            success:function(res){
              console.log("flag更新");
            },
          })
         }
        })
        //console.log(that.data.times);
        
      }
    })
    that.setData({
      checkouttime:'',
    })
  }
    else{
      wx.showToast({
        title: '不在签到范围',
        icon:"none",
        duration:2000
      })
      wx.getLocation({
        type:'gcj02',
        isHighAccuracy:'true',
        success(res){
          that.latitude = res.latitude;
          that.longitude = res.longitude;
          console.log(that.latitude);
          console.log(that.longitude);
        }
      })
    }
  }
  else{
    wx.showToast({
      title: '请勿重复签到',
      icon:"none",
      duration:2000
    })
  }
  },

  checkout: function(e){
    var that = this;
    if(that.data.flag == 0){
      if(that.latitude>=that.data.bx&&that.latitude<=that.data.ax&&that.longitude>=that.data.ay&&that.longitude<=that.data.by){
        wx.request({
          url: 'https://class.dlut-elab.com/feedback/dunjiaxuan/getcheckintimestamp.php',
          data:{
            openid: that.data.openid
          },
          method:'POST',
          header:
          {
            "Content-type": "application/x-www-form-urlencoded"
          },
          success:function(res)
          {
            console.log(res.data[1].checkintimestamp);
            that.setData({
              times:res.data[0].times,
              checkintimestamp:res.data[1].checkintimestamp,
              timestamp:res.data[0].timestamp
            })
            var TIME = util.formatTime(new Date());
        var checkouttime = Date.parse(new Date());
        app.globalData.checkouttime = checkouttime / 1000;
        var tmp=that.data.checkintimestamp-1+1;
        console.log(app.globalData.checkouttime);
        console.log(that.data.checkintimestamp);
        console.log(tmp);
        var time = app.globalData.checkouttime - tmp;
        console.log(time);
        var formatTime = '';
        var allformatTime = '';
        var hour = parseInt(time / 3600);
        var min = parseInt((time % 3600) /60);
        var sec = parseInt(time - hour*3600 - min*60);

        var alltime = that.data.timestamp -1 + 1 + time;
        var allhour = parseInt(alltime / 3600);
        var allmin = parseInt((alltime % 3600) /60);
        var allsec = parseInt(alltime - allhour*3600 - allmin*60);
        formatTime = hour + "小时" + min + "分钟" + sec + "秒";
        allformatTime = allhour + "小时" + allmin + "分钟" + allsec + "秒";
          that.setData({
            checkouttime: TIME,
            totaltime: formatTime,
          })
          wx.request({
            url: 'https://class.dlut-elab.com/feedback/dunjiaxuan/checkoutrecord.php',
            data:{
              openid: that.data.openid,
              checkouttime: TIME,
              totaltime: formatTime,
              times: that.data.times,
            },
            method:'POST',
            header:
            {
              "Content-type": "application/x-www-form-urlencoded"
            },
            success: function(res){
              console.log('签退');
              wx.request({
                url: 'https://class.dlut-elab.com/feedback/dunjiaxuan/updateuser.php',
                data:{
                  openid: that.data.openid,
                  times: that.data.times,
                  totaltime: allformatTime,
                  timestamp: alltime,
                  flag: that.data.flag,
                },
                method:'POST',
                header:
                {
                  "Content-type": "application/x-www-form-urlencoded"
                },
                success:function(res){
                  console.log("用户更新");
                  that.data.flag=1;
                    wx.request({
                    url: 'https://class.dlut-elab.com/feedback/dunjiaxuan/updateflag.php',
                    data:{
                      openid: that.data.openid,
                      flag: that.data.flag,
                    },
                    method:'POST',
                    header:
                    {
                      "Content-type": "application/x-www-form-urlencoded"
                    },
                    success:function(res){
                      console.log("flag更新")
                    },
                  })
                }
              })
            }
          })
        }
        
          }
        )
        
    }
    else{
      wx.showToast({
        title: '不在签退范围',
        icon:"none",
        duration:2000
      })
      wx.getLocation({
        type:'gcj02',
        isHighAccuracy:'true',
        success(res){
          that.latitude = res.latitude;
          that.longitude = res.longitude;
          console.log(that.latitude);
          console.log(that.longitude);
        }
      })
  }
    
  }
  else{
    wx.showToast({
      title: '请勿重复签退',
      icon:"none",
      duration:2000
    })
  }}})
