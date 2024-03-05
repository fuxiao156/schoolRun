var t = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 0,
            title: "大厅"
        },
        navheight: t.globalData.navBarHeight,
        uniappStatus: t.globalData.schoolInfo.uniappStatus,
        accessType: t.globalData.schoolInfo.accessType,
        runScoreStatus: t.globalData.schoolInfo.runScoreStatus,
        userType: t.globalData.userStatus.userType,
        approveStatus: t.globalData.userStatus.approveStatus,
        messageSize: t.globalData.messageSize,
        urlList: []
    },
    gotoStudentauth: function() {
        0 == t.globalData.userLocationBackground || 0 == t.globalData.userStatus.isExist ? wx.navigateTo({
            url: "/pages/index/profile"
        }) : wx.navigateTo({
            url: "/pages/user/studentauth"
        });
    },
    gotoWebView: function(t) {
        var a = t.currentTarget.dataset.weburl, e = t.currentTarget.dataset.title;
        wx.navigateTo({
            url: "/pages/dating/webview?weburl=" + encodeURIComponent(a) + "&title=" + e
        });
    },
    gotoWebView2: function(t) {
        wx.navigateTo({
            url: "/pages/dating/webviewlogin"
        });
    },
    gotoNav: function(t) {
        var a = t.currentTarget.dataset.url;
        wx.navigateTo({
            url: a
        });
    },
    gotoMessage: function() {
        wx.navigateTo({
            url: "/pages/message/index"
        });
    },
    getOtherUrl: function() {
        var a = t.globalData.userStatus.openid, e = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "/f/api/getOtherUrl?openid=" + a,
            method: "POST",
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常getOtherUrl500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode ? e.setData({
                    urlList: t.data.urlList
                }) : wx.showToast({
                    icon: "none",
                    title: t.data.retmsg,
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    icon: "none",
                    title: "人数过多请稍后重试，网络或服务器异常getOtherUrl",
                    duration: 1e3
                });
            }
        });
    },
    getSysMessage: function() {
        var a = this, e = t.globalData.userStatus.openid, s = t.globalData.userStatus.userid;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "/f/api/getSysMessage?openid=" + e + "&userid=" + s,
            method: "POST",
            success: function(t) {
                if (wx.hideLoading(), 200 != t.statusCode) wx.showToast({
                    title: "人数过多请稍后重试，getSysMessage500",
                    icon: "none",
                    duration: 1e3
                }); else if ("000000" == t.data.retcode) if (a.setData({
                    sysList: t.data.sysList[0],
                    messageList: t.data.messageList[0],
                    noticeList: t.data.noticeList[0],
                    schoolName: t.data.schoolName
                }), a.data.sysList.newCount || a.data.messageList.newCount || a.data.noticeList.newCount) {
                    var e = (a.data.sysList.newCount ? a.data.sysList.newCount : 0) + (a.data.messageList.newCount ? a.data.messageList.newCount : 0) + (a.data.noticeList.newCount ? a.data.noticeList.newCount : 0);
                    wx.setTabBarBadge({
                        index: 1,
                        text: e.toString()
                    });
                } else wx.removeTabBarBadge({
                    index: 2
                }); else wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3,
                    mask: !0
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常getSysMessage",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    onLoad: function(t) {
        this.data.accessType && this.getOtherUrl();
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            uniappStatus: t.globalData.schoolInfo.uniappStatus,
            accessType: t.globalData.schoolInfo.accessType,
            runScoreStatus: t.globalData.schoolInfo.runScoreStatus,
            userType: t.globalData.userStatus.userType,
            approveStatus: t.globalData.userStatus.approveStatus,
            messageSize: t.globalData.messageSize
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});