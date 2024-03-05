var t = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "帮助"
        },
        navheight: t.globalData.navBarHeight,
        currentData: 0,
        termTarget: "",
        signStandard: "",
        fieldRule: "",
        academicYear: "",
        problemList: []
    },
    problemFAQ: function() {
        var a = t.globalData.userStatus.openid, e = t.globalData.userStatus.userid, o = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "/f/api/problemFAQ?openid=" + a + "&userid=" + e + "&typeNo=5",
            method: "POST",
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常problemFAQ500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode ? o.setData({
                    problemList: t.data.problemList ? t.data.problemList : ""
                }) : wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常problemFAQ",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    termExerciseRule: function() {
        var a = t.globalData.userStatus.openid, e = t.globalData.userStatus.userid, o = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "/f/api/termExerciseRule?openid=" + a + "&userid=" + e,
            method: "POST",
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常termExerciseRule500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode ? o.setData({
                    termTarget: t.data.termTarget,
                    signStandard: t.data.signStandard,
                    fieldRule: t.data.fieldRule,
                    academicYear: t.data.academicYear
                }) : wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常termExerciseRule",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    bindchange: function(t) {
        this.setData({
            currentData: t.detail.current
        });
    },
    checkCurrent: function(t) {
        if (this.data.currentData === t.target.dataset.current) return !1;
        this.setData({
            currentData: t.target.dataset.current
        }), this.data.currentData, this.data.currentData;
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        this.termExerciseRule(), this.problemFAQ();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});