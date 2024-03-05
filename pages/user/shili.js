var t = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "示例"
        },
        navheight: t.globalData.navBarHeight,
        imageList: []
    },
    getImageList: function() {
        var a = this, e = t.globalData.userStatus.openid;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "/f/api/getImageList?openid=" + e + "&imageType=1",
            method: "POST",
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常getImageList500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode ? a.setData({
                    imageList: t.data.imageList
                }) : wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常getImageList",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        this.getImageList();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});