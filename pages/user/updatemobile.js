var a = require("../../2C088A0753E228FF4A6EE200B445E640.js"), e = require("../../83B41FC153E228FFE5D277C6CA15E640.js"), o = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "更换手机号码"
        },
        navheight: o.globalData.navBarHeight,
        userInfo: o.globalData.userInfo,
        mobileNo: ""
    },
    inputmobileNo: function(a) {
        this.setData({
            mobileNo: a.detail.value
        });
    },
    formSubmit: function(t) {
        var n = this, i = t.detail.value.mobileNo;
        if ("" == i || !/^1[345789]\d{9}$/.test(i || 11 != phone.length)) return wx.showToast({
            title: "请输入正确的号码",
            icon: "none",
            duration: 1e3,
            mask: !0
        }), !1;
        var s = {};
        s.openid = o.globalData.userStatus.openid, s.headUrl = o.globalData.userInfo.avatarUrl, 
        s.mobileNo = i;
        var l = a.sortKey(s, o.globalData.datakey);
        s.nickName = o.globalData.userInfo.nickName, s.sign = e.hexMD5(l), wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: o.globalData.apiurl + "/f/api/updateUser",
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
                    o.globalData.userInfo.avatarUrl = s.headUrl, o.globalData.userInfo.nickName = s.nickName, 
                    o.globalData.userInfo.mobileNo = s.mobileNo, n.setData({
                        userInfo: o.globalData.userInfo
                    }), wx.setStorageSync("userInfo", o.globalData.userInfo);
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
            userInfo: o.globalData.userInfo
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