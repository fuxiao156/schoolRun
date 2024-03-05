var t = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "锻炼目标"
        },
        navheight: t.globalData.navBarHeight,
        targetCount: 0,
        validCount: 0,
        invalidCount: 0,
        needCount: 0,
        isStandard: 0,
        remarks: ""
    },
    termExerciseTarget: function() {
        var a = this, e = t.globalData.userStatus.openid, n = t.globalData.userStatus.userid;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "/f/api/termExerciseTarget?openid=" + e + "&userid=" + n,
            method: "POST",
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常termExerciseTarget500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode ? a.setData({
                    targetCount: t.data.targetCount,
                    validCount: t.data.validCount,
                    invalidCount: t.data.invalidCount,
                    needCount: t.data.needCount,
                    isStandard: t.data.isStandard,
                    remarks: t.data.remarks
                }) : wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常termExerciseTarget",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    onLoad: function(t) {
        this.termExerciseTarget();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});