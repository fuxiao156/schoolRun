var t = require("../../@babel/runtime/helpers/defineProperty"), a = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "帮助与反馈"
        },
        navheight: a.globalData.navBarHeight,
        typeNo: "",
        problemList: []
    },
    onLoad: function(a) {
        var e = a.typeName, o = a.typeNo;
        this.setData(t({
            typeNo: o
        }, "navbarData.title", e));
    },
    onReady: function() {},
    onShow: function() {
        this.problemFAQ();
    },
    onHide: function() {},
    onUnload: function() {},
    problemFAQ: function() {
        var t = a.globalData.userStatus.openid, e = a.globalData.userStatus.userid, o = this.data.typeNo, i = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "/f/api/problemFAQ?openid=" + t + "&userid=" + e + "&typeNo=" + o,
            method: "POST",
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常problemFAQ500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode ? i.setData({
                    problemList: t.data.problemList
                }) : wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3,
                    mask: !0
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
    }
});