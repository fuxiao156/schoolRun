var a = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: ""
        },
        navheight: a.globalData.navBarHeight,
        weburl: "https://tyllks.csu.edu.cn",
        username: ""
    },
    onLoad: function() {
        this.setData({
            weburl: a.globalData.schoolInfo.uniappUrl,
            username: a.globalData.userStatus.studentNo
        }), "" != this.data.username && null != this.data.username && this.getToken();
    },
    getToken: function() {
        var n = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "f/SsoLogin/getToken?username=" + n.data.username,
            method: "POST",
            success: function(a) {
                wx.hideLoading();
                var t = a.data.token;
                n.setData({
                    weburl: n.data.weburl + "/app/#/pages/sys/login/ssoLogin/?username=" + n.data.username + "&token=" + t
                });
            }
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