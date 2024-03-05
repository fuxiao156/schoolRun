var a = require("../../@babel/runtime/helpers/defineProperty"), t = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "体育班"
        },
        statusBarHeight: t.globalData.statusBarHeight,
        navheight: t.globalData.navBarHeight,
        winHeight: t.globalData.windowHeight,
        userInfo: t.globalData.userInfo,
        userStatus: t.globalData.userStatus,
        schoolInfo: t.globalData.schoolInfo,
        gymClassNo: "",
        GymStudentList: [],
        name: ""
    },
    gotoRecordstu: function(a) {
        var t = a.currentTarget.dataset.openid, e = a.currentTarget.dataset.userid, o = a.currentTarget.dataset.name;
        wx.navigateTo({
            url: "/pages/user/recordstu?openid=" + t + "&userid=" + e + "&name=" + o
        });
    },
    inpuName: function(a) {
        this.setData({
            name: a.detail.value
        });
    },
    onLoad: function(t) {
        this.setData(a(a({}, "navbarData.title", t.gymClassName), "gymClassNo", t.gymClassNo)), 
        this.loadInitData();
    },
    loadInitData: function() {
        var a = this, e = {};
        e.openid = t.globalData.userStatus.openid, e.userid = t.globalData.userStatus.userid, 
        e.schoolId = t.globalData.schoolInfo.schoolId, e.gymClassNo = this.data.gymClassNo, 
        e.studentNo = "", e.name = a.data.name, wx.request({
            url: t.globalData.apiurl + "/f/api/findGymStudent",
            data: e,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                a.setData({
                    GymStudentList: t.data.studentList
                });
            },
            fail: function() {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});