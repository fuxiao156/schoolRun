var a = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: a.globalData.userInfo.realName
        },
        statusBarHeight: a.globalData.statusBarHeight,
        navheight: a.globalData.navBarHeight,
        winHeight: a.globalData.windowHeight,
        userInfo: a.globalData.userInfo,
        userStatus: a.globalData.userStatus,
        gymClassList: [],
        gymClassName: ""
    },
    inputgymClassName: function(a) {
        this.setData({
            gymClassName: a.detail.value
        });
    },
    gotoGymstudent: function(a) {
        var t = a.currentTarget.dataset.gymclassno, s = a.currentTarget.dataset.gymclassname;
        wx.navigateTo({
            url: "/pages/user/selectgymstudent?gymClassNo=" + t + "&gymClassName=" + s
        });
    },
    loadInitData: function() {
        var t = this, s = {};
        s.openid = a.globalData.userStatus.openid, s.userid = a.globalData.userStatus.userid, 
        s.schoolId = a.globalData.schoolInfo.schoolId, s.teacherNo = a.globalData.userStatus.studentNo, 
        s.gymClassNo = "", s.gymClassName = t.data.gymClassName, wx.request({
            url: a.globalData.apiurl + "/f/api/findGymClass",
            data: s,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                t.setData({
                    gymClassList: a.data.gymClassList
                });
            },
            fail: function() {}
        });
    },
    onLoad: function(t) {
        this.setData({
            navheight: a.globalData.navBarHeight,
            winHeight: a.globalData.windowHeight
        }), this.loadInitData();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});