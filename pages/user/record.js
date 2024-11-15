var a = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "跑步记录"
        },
        navheight: a.globalData.navBarHeight,
        winHeight: a.globalData.windowHeight,
        schoolInfo: a.globalData.schoolInfo,
        userInfo: a.globalData.userInfo,
        currentData: 0,
        runList: [],
        mileage: 0,
        validCount: 0,
        runScore: {},
        nonedata: !1,
        academicYear: 2021,
        yesmileage: 0,
        mileageTarget: 0,
        runTarget: 0,
        term: 1,
        yesvalidCount: 0,
        scoreCount: 0
    },
    goDetail: function(a) {
        var t = a.currentTarget.dataset.detailid;
        wx.navigateTo({
            url: "/pages/index/guiji?detailid=" + t
        });
    },
    runScore: function() {
        var t = a.globalData.userStatus.openid, e = a.globalData.userStatus.userid, o = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "/f/api/runScore?openid=" + t + "&userid=" + e,
            method: "POST",
            success: function(a) {
                wx.hideLoading(), 200 != a.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常runScore500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == a.data.retcode || "000013" == a.data.retcode ? o.setData({
                    runScore: a.data,
                    academicYear: Number(a.data.academicYear.slice(0, 2)),
                    yesmileage: a.data.mileage,
                    mileageTarget: a.data.mileageTarget,
                    runTarget: a.data.runTarget,
                    term: a.data.term,
                    yesvalidCount: a.data.validCount
                }) : wx.showToast({
                    title: a.data.retmsg,
                    icon: "error",
                    duration: 1e3,
                    mask: !0
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常runScore",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    runtermRecord: function() {
        var t = a.globalData.userStatus.openid, e = a.globalData.userStatus.userid, o = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "/f/api/runtermRecord?openid=" + t + "&userid=" + e + "&runType=0",
            method: "POST",
            success: function(a) {
                if (wx.hideLoading(), 200 != a.statusCode) wx.showToast({
                    title: "人数过多请稍后重试，服务器异常runtermRecord500",
                    icon: "none",
                    duration: 1e3
                }); else if ("000000" == a.data.retcode) {
                    var t = !1;
                    o.setData({
                        runList: a.data.runList,
                        validCount: a.data.validCount,
                        mileage: a.data.mileage,
                        nonedata: t,
                        scoreTotal: a.data.scoreTotal
                    });
                } else {
                    t = !0;
                    o.setData({
                        nonedata: t
                    }), wx.showToast({
                        title: a.data.retmsg,
                        icon: "error",
                        duration: 1e3
                    });
                }
            },
            fail: function() {
                wx.hideLoading();
                o.setData({
                    nonedata: !1
                }), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常runtermRecord",
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
        }), this.data.currentData, this.data.currentData;
    },
    onLoad: function(t) {
        this.setData({
            schoolInfo: a.globalData.schoolInfo,
            userInfo: a.globalData.userInfo
        }), this.runtermRecord();
    },
    onReady: function() {},
    onShow: function() {},
    onShareAppMessage: function() {}
});