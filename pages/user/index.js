var a = getApp();

Page({
    data: {
        nvabarData: {
            showCapsule: 2,
            title: "我的"
        },
        navheight: a.globalData.navBarHeight,
        userInfo: a.globalData.userInfo,
        schoolInfo: a.globalData.schoolInfo,
        userStatus: a.globalData.userStatus,
        venueFlag: 0,
        updateStatus: 0,
        applyStatus: 3
    },
    onLoad: function(t) {
        this.setData({
            userInfo: a.globalData.userInfo,
            schoolInfo: a.globalData.schoolInfo,
            userStatus: a.globalData.userStatus,
            "nvabarData.showCapsule": 0 == a.globalData.userStatus.approveStatus ? 0 : 2
        }), this.getupdateEvidence(), 0 == this.data.userStatus.approveStatus && this.getUpdateUserWeChat();
    },
    getupdateEvidence: function() {
        var t = {}, e = this;
        t.openid = a.globalData.userStatus.openid, t.userid = a.globalData.userStatus.userid, 
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "f/api/getupdateEvidence",
            data: t,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                wx.hideLoading(), 200 != a.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常runScore500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == a.data.retcode ? e.setData({
                    updateStatus: a.data.updateStatus
                }) : wx.showToast({
                    title: a.data.retmsg,
                    icon: "error",
                    duration: 1e3,
                    mask: !0
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "请求发送失败",
                    icon: "error",
                    duration: 1e3,
                    mask: !0
                });
            }
        });
    },
    getUpdateUserWeChat: function() {
        var t = {}, e = this;
        t.openid = a.globalData.userStatus.openid, t.userid = a.globalData.userStatus.userid, 
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "f/api/getUpdateUserWeChat",
            data: t,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                wx.hideLoading(), 200 != a.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常getUpdateUserWeChat500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == a.data.retcode ? e.setData({
                    applyStatus: a.data.applyStatus
                }) : wx.showToast({
                    title: a.data.retmsg,
                    icon: "error",
                    duration: 1e3,
                    mask: !0
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常getUpdateUserWeChat",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            userStatus: a.globalData.userStatus,
            userInfo: a.globalData.userInfo,
            schoolInfo: a.globalData.schoolInfo,
            venueFlag: a.globalData.venueFlag,
            "nvabarData.showCapsule": 0 == a.globalData.userStatus.approveStatus ? 0 : 2
        }), 1 == this.data.venueFlag && 0 == a.globalData.getVenuedata && this.getPersonalVenuedata();
    },
    getPersonalVenuedata: function() {
        var t = {}, e = this;
        t.userid = a.globalData.userStatus.userid, t.openid = a.globalData.userStatus.openid, 
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "f/api/getPersonalVenuedata",
            data: t,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常getPersonalVenuedata500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode ? (a.globalData.getVenuedata = 1, a.globalData.userInfo.venueRun = t.data.venueRun, 
                a.globalData.userInfo.venueCount = t.data.venueCount, a.globalData.userInfo.venuePercent = t.data.venuePercent, 
                wx.setStorageSync("schoolInfo", a.globalData.schoolInfo), e.setData({
                    userInfo: a.globalData.userInfo
                })) : wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3,
                    mask: !0
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常getPersonalVenuedata",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    gotoNav: function(a) {
        var t = a.currentTarget.dataset.url;
        wx.navigateTo({
            url: t
        });
    },
    gotoStudentauth: function() {
        0 == a.globalData.userLocationBackground || 0 == a.globalData.userStatus.isExist ? wx.navigateTo({
            url: "/pages/index/profile"
        }) : 0 == this.data.userStatus.approveStatus ? wx.navigateTo({
            url: "/pages/user/studentauth"
        }) : wx.navigateTo({
            url: "/pages/user/authinfo"
        });
    },
    gotoUpdateEvidence: function() {
        0 == a.globalData.userLocationBackground || 0 == a.globalData.userStatus.isExist ? wx.navigateTo({
            url: "/pages/index/profile"
        }) : 0 == this.data.approveStatus ? wx.navigateTo({
            url: "/pages/user/studentauth"
        }) : wx.navigateTo({
            url: "/pages/user/updateEvidence"
        });
    },
    gototongzhi: function() {
        wx.requestSubscribeMessage({
            tmplIds: [ "8mIDFFsR4XRUcmqJvERbgBUILlY09tkNDd501wSI1iM", "skqfNyyvN6GRiCs_4GkZogDxNSouUYfiBmnyjq2tQik" ],
            fail: function(a) {}
        });
    },
    onShareAppMessage: function() {},
    onPullDownRefresh: function() {
        this.getPersonalVenuedata(), this.getupdateEvidence(), wx.stopPullDownRefresh();
    }
});