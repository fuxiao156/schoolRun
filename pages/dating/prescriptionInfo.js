var t = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "运动处方"
        },
        navheight: t.globalData.navBarHeight,
        dataList: [],
        dataStatus: 0
    },
    onLoad: function(t) {
        this.queryPrescription(t.schoolYear, t.term);
    },
    queryPrescription: function(a, o) {
        var e = {}, n = this;
        e.userid = t.globalData.userStatus.userid, e.openid = t.globalData.userStatus.openid, 
        e.academicYear = a, e.term = o, wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "f/api/queryPrescription",
            data: e,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常queryPrescription500",
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                }) : "000000" == t.data.retcode ? n.setData({
                    dataList: t.data.dataList,
                    dataStatus: t.data.dataStatus
                }) : wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常queryPrescription",
                    icon: "none",
                    duration: 1e3
                });
            }
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