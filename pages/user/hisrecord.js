var a = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "历年记录"
        },
        navheight: a.globalData.navBarHeight,
        winHeight: a.globalData.windowHeight,
        indexS: 0,
        schoolYearTermarray: [],
        dataList: [],
        validMileage: 0,
        validCount: 0,
        nonedata: !0
    },
    goHisguiji: function(a) {
        var t = a.currentTarget.dataset.actualmileage, e = a.currentTarget.dataset.averagepace, n = a.currentTarget.dataset.calorie, i = a.currentTarget.dataset.detailid, r = a.currentTarget.dataset.headurl, o = a.currentTarget.dataset.realname, s = a.currentTarget.dataset.runbitmap, d = a.currentTarget.dataset.runtime, u = a.currentTarget.dataset.sexno, l = a.currentTarget.dataset.starttime, c = a.currentTarget.dataset.schoolname;
        wx.navigateTo({
            url: "/pages/user/hisguiji?detailid=" + i + "&actualmileage=" + t + "&averagepace=" + e + "&calorie=" + n + "&headurl=" + r + "&realname=" + o + "&runbitmap=" + s + "&runtime=" + d + "&sexno=" + u + "&starttime=" + l + "&schoolname=" + c
        });
    },
    hisRuntermRecord: function() {
        var t = a.globalData.userStatus.openid, e = a.globalData.userStatus.userid, n = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "/f/api/hisRuntermRecord?openid=" + t + "&userid=" + e,
            method: "POST",
            success: function(a) {
                if (wx.hideLoading(), 200 != a.statusCode) wx.showToast({
                    title: "人数过多请稍后重试，服务器异常runtermRecord500",
                    icon: "none",
                    duration: 1e3
                }); else if ("000000" == a.data.retcode) {
                    for (var t = [], e = 0; e < a.data.runList.length; e++) t.push(a.data.runList[e].schoolYear + "学年 " + a.data.runList[e].schoolTerm + "学期");
                    n.setData({
                        schoolYearTermarray: t,
                        indexS: 0,
                        runList: a.data.runList,
                        validMileage: a.data.runList[0].validMileage,
                        validCount: a.data.runList[0].validCount,
                        dataList: a.data.runList[0].dataList,
                        nonedata: !1
                    });
                } else {
                    n.setData({
                        nonedata: !0
                    }), wx.showToast({
                        title: a.data.retmsg,
                        icon: "error",
                        duration: 1e3
                    });
                }
            },
            fail: function() {
                wx.hideLoading();
                n.setData({
                    nonedata: !0
                }), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常runtermRecord",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    bindPickerChange: function(a) {
        var t = a.detail.value;
        this.setData({
            validMileage: this.data.runList[t].validMileage,
            validCount: this.data.runList[t].validCount,
            dataList: this.data.runList[t].dataList,
            indexS: t
        });
    },
    onLoad: function(t) {
        this.setData({
            schoolInfo: a.globalData.schoolInfo,
            userInfo: a.globalData.userInfo
        }), this.hisRuntermRecord();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});