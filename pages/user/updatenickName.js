var a = require("../../2C088A0753E228FF4A6EE200B445E640.js"), e = require("../../83B41FC153E228FFE5D277C6CA15E640.js"), t = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "更换昵称"
        },
        navheight: t.globalData.navBarHeight,
        userInfo: t.globalData.userInfo,
        nickName: ""
    },
    inputRealname: function(a) {
        this.setData({
            nickName: a.detail.value
        });
    },
    formSubmit: function(o) {
        var n = this, i = o.detail.value.nickName;
        if ("微信用户" == i || "" == i) return wx.showToast({
            title: "请更新微信昵称",
            icon: "none",
            duration: 800,
            mask: !0
        }), !1;
        var s = {};
        s.openid = t.globalData.userStatus.openid, s.headUrl = t.globalData.userInfo.avatarUrl, 
        s.mobileNo = "";
        var r = a.sortKey(s, t.globalData.datakey);
        s.nickName = i, s.sign = e.hexMD5(r), wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "/f/api/updateUser",
            method: "POST",
            data: s,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                if (wx.hideLoading(), 200 != a.statusCode) wx.showToast({
                    title: "人数过多请稍后重试，服务器异常updateUser500",
                    icon: "none",
                    duration: 1e3
                }); else if ("000000" == a.data.retcode) {
                    t.globalData.userInfo.avatarUrl = s.headUrl, t.globalData.userInfo.nickName = s.nickName, 
                    n.setData({
                        userInfo: t.globalData.userInfo
                    }), wx.setStorageSync("userInfo", t.globalData.userInfo);
                    setTimeout(function() {
                        wx.navigateBack();
                    }, 1e3);
                } else wx.showToast({
                    title: a.data.retmsg,
                    icon: "error",
                    duration: 2e3,
                    mask: !0
                });
            },
            fail: function(a) {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常updateUser",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    onLoad: function(a) {
        this.setData({
            userInfo: t.globalData.userInfo
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