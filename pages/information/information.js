import WxValidate from '../../utils/WxValidate.js'
var app = getApp()
// pages/admin/adminInf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      //group:'',
      id:'',
      name:'',
      //tel: '',
      grade:'',
      //email:'',
      //imgs:'',
    },
    index:null,
    imgList: [],
    openid:'',
    flag:'',
    totaltime:'',
    picker: ['2017级', '2018级', '2019级','2020级','2021级','2022级','2023级'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate();
    var that=this;
     this.data.openid=app.globalData.openid;
     console.log(this.data.openid);

     //开始时读取数据库填写



      //console.log(name);
      wx.request({
        url: 'https://class.elab-dlut.cn/checkin/getinformation.php',
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
  },
  /*ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
         {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },

  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
    console.log(this.data.imgList[0])
  },
  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },*/


  initValidate: function(){
    const rules = {
      name: {
        required: true,
        rangelength: [2,4]
      },
      id: {
        required: true,
        digits: true,
        rangelength: [9,15],
      },
      /*tel: {
        required: true,
        tel: true,
      },
      email:{
        required: true,
        email: true,
      },*/
      grade:{
        required: true,
      },
      group:{
        required: true,
      },
    }

    const messages = {
      name: {
        required: '请输入姓名',
        rangelength: '你在干啥？'
      },
      id: {
        required: '请输入学号',
        digits: '谁学号是字符？',
        rangelength: '别乱写',
      },
     /* tel: {
        required: '请输入电话号码',
        tel: '严肃点',
      },
      email: {
        required: '请输入邮箱',
        email: '格式总得对吧',
      },*/
      grade:{
        required: '请选择年级',
      },
      group:{
        required: '请选择组别',
      },
    }
    this.WxValidate = new WxValidate(rules, messages);
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
    this.data.form.name = e.detail.value;
    console.log(this.data.form.name)
    
  },
  bindTextAreaBlur2: function (e) {
    this.data.form.tel = e.detail.value;
    console.log(this.data.form.tel)
  },
  bindTextAreaBlur0: function(e){
    this.data.form.id = e.detail.value;
    console.log(this.data.form.id)
  },
  bindTextAreaBlur3: function(e){
    this.data.form.email = e.detail.value;
    console.log(this.data.form.email)
  },

  formSubmit: function (e) {
    console.log('提交携带的数据为：', e.detail.value);
    const params = e.detail.value;

    if(!this.WxValidate.checkForm(params)){
      const error = this.WxValidate.errorList[0];
      wx.showToast({
        title: error.msg,
        icon: 'none'
      })
      return false
    }
    else{
      //php后台处理表单
      wx.request({
        url: 'https://class.elab-dlut.cn/checkin/userlist.php',
        data:{
          name:params.name,
          openid:this.data.openid,
          id: params.id,
          //tel:params.tel,
          grade:params.grade,
          group:params.group,
         // email:params.email,
        },
        method: 'POST',
        header:
        {
            "Content-type": "application/x-www-form-urlencoded"
        },
        success: function(res){
          console.log(res.data);
          wx.showToast({
            title: '提交成功',
          })
        }
      })
    }
    },

    PickerChange(e) {
      this.setData({
        index: e.detail.value
      })
      this.data.form.grade = this.data.picker[e.detail.value]
      console.log(this.data.form.grade)
    },

    changeGroup(e){
      this.data.form.group = e.detail.value;
      console.log(this.data.form.group)
    }
  
})