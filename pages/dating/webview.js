var a = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: ""
        },
        navheight: a.globalData.navBarHeight,
        weburl: ""
    },
    onLoad: function(a) {
        var t = this.data.navbarData;
        t.title = a.title;
        var n = Date.parse(new Date());
        this.setData({
            weburl: decodeURIComponent(a.weburl) + "&t=" + n,
            navbarData: t
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});