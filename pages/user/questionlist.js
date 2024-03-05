var t = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 2,
            title: "帮助与反馈"
        },
        navheight: t.globalData.navBarHeight,
        questionArray: [],
        venueFlag: 0
    },
    gotoNav: function(t) {
        var a = t.currentTarget.dataset.typeno, e = t.currentTarget.dataset.typename;
        wx.navigateTo({
            url: "/pages/user/questiondetail?typeNo=" + a + "&typeName=" + e
        });
    },
    gotoQuestionSetting: function() {
        wx.navigateTo({
            url: "/pages/user/questionSetting"
        });
    },
    gotofeedbook: function() {
        wx.navigateTo({
            url: "/pages/dating/feedbook"
        });
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        this.setData({
            venueFlag: t.globalData.venueFlag
        }), this.getproblemList();
    },
    onHide: function() {},
    onUnload: function() {},
    getproblemList: function() {
        var a = t.globalData.userStatus.openid, e = t.globalData.userStatus.userid, o = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "/f/api/problemList?openid=" + a + "&userid=" + e,
            method: "POST",
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常problemList500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode ? o.setData({
                    questionArray: t.data.questionArray
                }) : wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3,
                    mask: !0
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常problemList",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    }
});