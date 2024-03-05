var e = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "消息"
        },
        navheight: e.globalData.navBarHeight,
        sysList: [],
        messageList: [],
        noticeList: [],
        schoolName: "大学名称"
    },
    gotoNav: function(e) {
        var t = e.currentTarget.dataset.messagetype;
        wx.navigateTo({
            url: "/pages/message/messagelist?messageType=" + t
        });
    },
    getSysMessage: function() {
        var t = this, s = e.globalData.userStatus.openid, a = e.globalData.userStatus.userid;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: e.globalData.apiurl + "/f/api/getSysMessage?openid=" + s + "&userid=" + a,
            method: "POST",
            success: function(e) {
                if (wx.hideLoading(), 200 != e.statusCode) wx.showToast({
                    title: "人数过多请稍后重试，getSysMessage500",
                    icon: "none",
                    duration: 1e3
                }); else if ("000000" == e.data.retcode) if (t.setData({
                    sysList: e.data.sysList[0],
                    messageList: e.data.messageList[0],
                    noticeList: e.data.noticeList[0],
                    schoolName: e.data.schoolName
                }), t.data.sysList.newCount || t.data.messageList.newCount || t.data.noticeList.newCount) {
                    var s = (t.data.sysList.newCount ? t.data.sysList.newCount : 0) + (t.data.messageList.newCount ? t.data.messageList.newCount : 0) + (t.data.noticeList.newCount ? t.data.noticeList.newCount : 0);
                    wx.setTabBarBadge({
                        index: 2,
                        text: s.toString()
                    });
                } else wx.removeTabBarBadge({
                    index: 2
                }); else wx.showToast({
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
        this.getSysMessage();
    },
    onPullDownRefresh: function() {
        this.getSysMessage(), wx.stopPullDownRefresh();
    },
    onShareAppMessage: function() {}
});