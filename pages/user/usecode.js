var t = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "二维码"
        },
        navheight: t.globalData.navBarHeight,
        winWidth: t.globalData.windowWidth,
        realName: "",
        sex: "",
        studentNo: "",
        ercode: "",
        idcard: "",
        codeUrl: "",
        evidence: "",
        isnight: !1,
        ismax: !0
    },
    initData: function() {
        var a = t.globalData.userStatus.userid, e = t.globalData.userStatus.openid, i = this, o = {};
        o.openid = e, o.userid = a, wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "/f/api/createCode?openid=" + e + "&userid=" + a,
            method: "POST",
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，createCode500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode ? i.setData({
                    codeUrl: t.data.codeUrl,
                    realName: t.data.realName,
                    sex: t.data.sexName,
                    studentNo: t.data.studentNo,
                    evidence: t.data.evidence
                }) : wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3,
                    mask: !0
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常createCode",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    changeNight: function() {
        this.setData({
            isnight: !this.data.isnight
        }), this.data.isnight ? this.setData({
            layerstyle: 3
        }) : this.setData({
            layerstyle: 1
        });
    },
    changeZoom: function() {
        this.setData({
            ismax: !this.data.ismax
        }), this.data.ismax ? this.setData({
            volume: 1
        }) : this.setData({
            volume: 0
        });
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        this.initData();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});