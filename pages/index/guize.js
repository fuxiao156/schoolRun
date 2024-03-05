var a = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "规则"
        },
        navheight: a.globalData.navBarHeight,
        winHeight: a.globalData.windowHeight,
        currentData: 0,
        academicYear: "",
        schoolBegin: "",
        schoolEnd: "",
        schoolTarget: "",
        schoolStandard: "",
        venueFlag: a.globalData.venueFlag
    },
    termExerciseRule: function() {
        var t = a.globalData.userStatus.openid, e = a.globalData.userStatus.userid, o = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "/f/api/termExerciseRule?openid=" + t + "&userid=" + e,
            method: "POST",
            success: function(a) {
                wx.hideLoading(), 200 != a.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常termExerciseRule500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == a.data.retcode ? o.setData({
                    termTarget: a.data.termTarget,
                    signStandard: a.data.signStandard,
                    fieldRule: a.data.fieldRule,
                    academicYear: a.data.academicYear
                }) : wx.showToast({
                    title: a.data.retmsg,
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
    ruleSet: function() {
        var t = a.globalData.userStatus.openid, e = a.globalData.userStatus.userid, o = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "/f/api/ruleSet?openid=" + t + "&userid=" + e,
            method: "POST",
            success: function(a) {
                wx.hideLoading(), 200 != a.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常ruleSet500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == a.data.retcode ? o.setData({
                    schoolStandard: a.data.schoolStandard,
                    academicYear: a.data.academicYear,
                    schoolTarget: a.data.schoolTarget,
                    schoolEnd: a.data.schoolEnd,
                    schoolBegin: a.data.schoolBegin
                }) : wx.showToast({
                    title: a.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,ruleSet网络异常",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    bindchange: function(a) {
        this.setData({
            currentData: a.detail.current
        });
    },
    checkCurrent: function(a) {
        if (this.data.currentData === a.target.dataset.current) return !1;
        this.setData({
            currentData: a.target.dataset.current
        });
    },
    onLoad: function(t) {
        this.setData({
            currentData: t.currentData,
            venueFlag: a.globalData.venueFlag
        });
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            venueFlag: a.globalData.venueFlag
        }), this.ruleSet(), this.termExerciseRule();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});