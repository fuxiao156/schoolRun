var a = require("../../2C088A0753E228FF4A6EE200B445E640.js"), t = require("../../83B41FC153E228FFE5D277C6CA15E640.js"), e = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 0,
            title: "授权"
        },
        navheight: e.globalData.navBarHeight,
        canIUseGetUserProfile: !1
    },
    onLoad: function(a) {
        wx.getUserProfile && this.setData({
            canIUseGetUserProfile: !0
        }), this.userlocationalertview = this.selectComponent("#userlocationalertview");
    },
    onShow: function() {
        wx.getSetting({
            success: function(a) {
                e.globalData.userLocationBackground = a.authSetting["scope.userLocationBackground"], 
                e.globalData.userLocation = a.authSetting["scope.userLocation"], 1 == e.globalData.userLocationBackground && 1 == e.globalData.userLocation && e.globalData.userInfo.avatarUrl && wx.navigateBack();
            }
        });
    },
    getUserProfile: function() {
        var o = this;
        wx.getSetting({
            success: function(a) {
                if (e.globalData.userLocationBackground = a.authSetting["scope.userLocationBackground"], 
                e.globalData.userLocation = a.authSetting["scope.userLocation"], 1 != e.globalData.userLocationBackground || 1 != e.globalData.userLocation) return o.userlocationalertview.showAlertView(), 
                !1;
            }
        }), wx.getUserProfile({
            desc: "用于完善会员资料",
            success: function(o) {
                var r = {};
                r.openid = e.globalData.userStatus.openid, r.unionid = "", r.headUrl = o.userInfo.avatarUrl, 
                r.source = "wx";
                var i = a.sortKey(r, e.globalData.datakey);
                r.nickName = o.userInfo.nickName, r.sign = t.hexMD5(i), wx.showLoading({
                    title: "加载中...",
                    mask: !0
                }), wx.request({
                    url: e.globalData.apiurl + "/f/api/registerLogin",
                    method: "POST",
                    data: r,
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(a) {
                        wx.hideLoading(), 200 != a.statusCode ? wx.showToast({
                            title: "人数过多请稍后重试，服务器异常registerLogin500",
                            icon: "none",
                            duration: 1e3
                        }) : "000000" == a.data.retcode ? (e.globalData.userInfo.avatarUrl = r.headUrl, 
                        e.globalData.userInfo.nickName = r.nickName, e.globalData.userStatus.userid = a.data.userid, 
                        e.globalData.userStatus.isExist = 1) : wx.showToast({
                            title: a.data.retmsg,
                            icon: "error",
                            duration: 1e3
                        });
                    },
                    fail: function() {
                        wx.hideLoading(), wx.showToast({
                            title: "人数过多请稍后重试,网络或服务器异常registerLogin",
                            icon: "none",
                            duration: 1e3
                        });
                    }
                });
            }
        }), 1 == e.globalData.userLocationBackground && 1 == e.globalData.userLocation && "" != e.globalData.userInfo.avatarUrl && wx.navigateBack();
    },
    getUserInfo: function(a) {
        var t = this;
        e.globalData.userInfo = a.detail.userInfo, this.setData({
            userInfo: a.detail.userInfo
        }), this.registeruser(), wx.getSetting({
            success: function(a) {
                if (1 != e.globalData.userLocationBackground) return t.userlocationalertview.showAlertView(), 
                !1;
            }
        });
    }
});