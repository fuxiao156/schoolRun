var e = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "消息"
        },
        navheight: e.globalData.navBarHeight,
        messageType: "",
        title: "",
        nodata: !0,
        pageSize: 10,
        pageNo: 1,
        messageList: []
    },
    gotoNavDedeil: function(e) {
        var a = e.currentTarget.dataset.messageid;
        wx.navigateTo({
            url: "/pages/message/content?messageId=" + a
        });
    },
    getMessageList: function() {
        var a = this, t = e.globalData.userStatus.openid, s = e.globalData.userStatus.userid, o = a.data.pageSize, i = a.data.pageNo, n = a.data.messageType;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: e.globalData.apiurl + "/f/api/getMessageList?openid=" + t + "&userid=" + s + "&pageNo=" + i + "&pageSize=" + o + "&messageType=" + n,
            method: "POST",
            success: function(e) {
                wx.hideLoading(), 200 != e.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，getSysMessage500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == e.data.retcode ? a.setData({
                    messageList: e.data.messageList,
                    nodata: !(e.data.messageList.length > 0)
                }) : wx.showToast({
                    title: e.data.retmsg,
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
    onLoad: function(e) {
        var a = "";
        1 == e.messageType && (a = "学校公告"), 2 == e.messageType && (a = "系统消息"), 3 == e.messageType && (a = "班级通知"), 
        this.setData({
            messageType: e.messageType,
            title: a
        }), wx.setNavigationBarTitle({
            title: a
        });
    },
    onReady: function() {},
    onShow: function() {
        this.getMessageList();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});