var a = getApp(), t = require("../../2C088A0753E228FF4A6EE200B445E640.js"), e = require("../../83B41FC153E228FFE5D277C6CA15E640.js");

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "用户信息"
        },
        navheight: a.globalData.navBarHeight,
        userInfo: a.globalData.userInfo,
        userStatus: a.globalData.userStatus
    },
    gotoNav: function(a) {
        var t = a.currentTarget.dataset.url;
        wx.navigateTo({
            url: t
        });
    },
    gotoStudentauth: function() {
        0 == a.globalData.userLocationBackground || 0 == a.globalData.userStatus.isExist ? wx.navigateTo({
            url: "/pages/index/profile"
        }) : 0 == this.data.userStatus.approveStatus ? wx.navigateTo({
            url: "/pages/user/studentauth"
        }) : wx.navigateTo({
            url: "/pages/user/authinfo"
        });
    },
    getupdateEvidence: function() {
        var t = {}, e = this;
        t.openid = a.globalData.userStatus.openid, t.userid = a.globalData.userStatus.userid, 
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "f/api/getupdateEvidence",
            data: t,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                wx.hideLoading(), 200 != a.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常runScore500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == a.data.retcode ? e.setData({
                    updateStatus: a.data.updateStatus
                }) : wx.showToast({
                    title: a.data.retmsg,
                    icon: "error",
                    duration: 1e3,
                    mask: !0
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "请求发送失败",
                    icon: "error",
                    duration: 1e3,
                    mask: !0
                });
            }
        });
    },
    onChooseAvatar: function(o) {
        var n = this, s = {};
        s.openid = a.globalData.userStatus.openid, s.headUrl = o.detail.avatarUrl, s.mobileNo = "";
        var r = t.sortKey(s, a.globalData.datakey);
        s.nickName = "", s.sign = e.hexMD5(r), wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "/f/api/updateUser",
            method: "POST",
            data: s,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常updateUser500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode ? (a.globalData.userInfo.avatarUrl = s.headUrl, 
                n.setData({
                    userInfo: a.globalData.userInfo
                }), wx.setStorageSync("userInfo", a.globalData.userInfo)) : wx.showToast({
                    title: t.data.retmsg,
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
    updateUserApi: function() {
        var o = this;
        if ("微信用户" == a.globalData.userInfo.nickName || "" == a.globalData.userInfo.nickName) return wx.showToast({
            title: "请更新微信昵称",
            icon: "none",
            duration: 800,
            mask: !0
        }), !1;
        var n = {};
        n.openid = a.globalData.userStatus.openid, n.headUrl = a.globalData.userInfo.avatarUrl, 
        n.mobileNo = "";
        var s = t.sortKey(n, a.globalData.datakey);
        n.nickName = a.globalData.userInfo.nickName, n.sign = e.hexMD5(s), wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "/f/api/updateUser",
            method: "POST",
            data: n,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                if (wx.hideLoading(), 200 != t.statusCode) wx.showToast({
                    title: "人数过多请稍后重试，服务器异常updateUser500",
                    icon: "none",
                    duration: 1e3
                }); else if ("000000" == t.data.retcode) {
                    a.globalData.userInfo.avatarUrl = n.headUrl, a.globalData.userInfo.nickName = n.nickName, 
                    o.setData({
                        userInfo: a.globalData.userInfo
                    }), wx.setStorageSync("userInfo", a.globalData.userInfo);
                    setTimeout(function() {
                        wx.navigateBack();
                    }, 1e3);
                } else wx.showToast({
                    title: t.data.retmsg,
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
    getUserProfile: function() {
        var o = this;
        wx.getUserProfile({
            desc: "用于完善会员资料",
            success: function(n) {
                var s = o, r = {};
                r.openid = a.globalData.userStatus.openid, r.headUrl = n.userInfo.avatarUrl, r.mobileNo = "";
                var i = t.sortKey(r, a.globalData.datakey);
                r.nickName = n.userInfo.nickName, r.sign = e.hexMD5(i), wx.showLoading({
                    title: "加载中...",
                    mask: !0
                }), wx.request({
                    url: a.globalData.apiurl + "/f/api/updateUser",
                    method: "POST",
                    data: r,
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                            title: "人数过多请稍后重试，服务器异常updateUser500",
                            icon: "none",
                            duration: 1e3
                        }) : "000000" == t.data.retcode ? (a.globalData.userInfo.avatarUrl = r.headUrl, 
                        a.globalData.userInfo.nickName = r.nickName, s.setData({
                            userInfo: a.globalData.userInfo
                        }), wx.setStorageSync("userInfo", a.globalData.userInfo)) : wx.showToast({
                            title: t.data.retmsg,
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
            }
        });
    },
    getPhoneNumber: function(t) {
        var e = this, o = {};
        o.openid = a.globalData.userStatus.openid, o.userid = a.globalData.userStatus.userid, 
        o.code = t.detail.code, wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "/f/wx/getUserPhone",
            method: "POST",
            data: o,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常getUserPhone500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode ? (a.globalData.userInfo.mobileNo = t.data.mobileNo, 
                e.setData({
                    userInfo: a.globalData.userInfo
                })) : wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3,
                    mask: !0
                });
            },
            fail: function(a) {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常getUserPhone",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    onLoad: function() {
        this.setData({
            userInfo: a.globalData.userInfo,
            userStatus: a.globalData.userStatus
        }), this.getupdateEvidence();
    },
    onShow: function() {
        this.setData({
            userInfo: a.globalData.userInfo
        });
    },
    onShareAppMessage: function() {}
});