var a = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "场馆打卡详情"
        },
        i: 1,
        navheight: a.globalData.navBarHeight,
        venueId: "",
        venueName: "",
        validCount: "",
        invalidCount: "",
        summaryArray: [],
        detailsArray: [],
        isvalid: [ "无效", "有效" ],
        showModalStatus: !1,
        clock: ""
    },
    gotovenueCardDetails: function(t) {
        this.showModal();
        var e = this, n = a.globalData.userStatus.openid, i = a.globalData.userStatus.userid, o = t.currentTarget.dataset.cardid;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "/f/api/venueCardDetails?openid=" + n + "&userid=" + i + "&cardid=" + o,
            method: "POST",
            success: function(a) {
                wx.hideLoading(), 200 != a.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常venueCardDetails500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == a.data.retcode ? e.setData({
                    detailsArray: a.data.detailsArray
                }) : wx.showToast({
                    title: a.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常venueCardDetails",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    venueCardSummary: function() {
        var t = this, e = a.globalData.userStatus.openid, n = a.globalData.userStatus.userid, i = t.data.venueId;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "/f/api/venueCardSummary?openid=" + e + "&userid=" + n + "&venueId=" + i,
            method: "POST",
            success: function(a) {
                200 != a.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常venueCardSummary500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == a.data.retcode ? t.setData({
                    summaryArray: a.data.summaryArray,
                    validCount: a.data.validCount,
                    invalidCount: a.data.invalidCount,
                    venueName: a.data.venueName
                }) : wx.showToast({
                    title: a.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常venueCardSummary",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    showModal: function() {
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        a.translateY(300).step(), this.setData({
            animationData: a.export(),
            showModalStatus: !0
        }), setTimeout(function() {
            a.translateY(0).step(), this.setData({
                animationData: a.export()
            });
        }.bind(this), 200);
    },
    hideModal: function() {
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        a.translateY(300).step(), this.setData({
            animationData: a.export()
        }), setTimeout(function() {
            a.translateY(0).step(), this.setData({
                animationData: a.export(),
                showModalStatus: !1
            });
        }.bind(this), 200);
    },
    onLoad: function(a) {
        var t = a.venueId;
        this.setData({
            venueId: t
        }), this.venueCardSummary();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});