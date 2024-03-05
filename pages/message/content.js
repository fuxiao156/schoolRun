var e = require("../../@babel/runtime/helpers/defineProperty"), t = getApp();

Page({
    data: e({
        navbarData: {
            showCapsule: 1,
            title: "详情"
        },
        navheight: t.globalData.navBarHeight,
        messageId: "",
        title: "",
        content: "",
        createBy: "",
        createDate: "",
        imageList: ""
    }, "createDate", ""),
    getMessageDetail: function() {
        var e = this, a = t.globalData.userStatus.openid, n = t.globalData.userStatus.userid, i = e.data.messageId;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "/f/api/getMessageDetail?openid=" + a + "&userid=" + n + "&messageId=" + i,
            method: "POST",
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常getMessageDetail500",
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                }) : "000000" == t.data.retcode ? e.setData({
                    createDate: t.data.createDate,
                    content: t.data.content.replace(/↵/g, "\n"),
                    imageList: t.data.imageList,
                    title: t.data.title
                }) : wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常getMessageDetail",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    onLoad: function(e) {
        this.setData({
            messageId: e.messageId
        }), this.getMessageDetail();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});