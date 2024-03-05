var t = require("../../2C088A0753E228FF4A6EE200B445E640.js"), a = require("../../83B41FC153E228FFE5D277C6CA15E640.js"), e = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "设置"
        },
        navheight: e.globalData.navBarHeight,
        index: 0,
        array: [ "2分钟/次", "5分钟/次", "10分钟/次", "15分钟/次" ],
        areaList: [],
        islongShow: !1,
        openAudio: !1,
        screenSwitch: 0,
        voiceSwitch: 0,
        voiceCount: 0
    },
    bindPickerChange: function(t) {
        this.setData({
            index: t.detail.value
        });
    },
    onLoad: function(t) {},
    runSet: function() {
        var t = e.globalData.userStatus.openid, a = e.globalData.userStatus.userid, o = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: e.globalData.apiurl + "/f/api/runSet?openid=" + t + "&userid=" + a,
            method: "POST",
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常runSet500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode ? o.setData({
                    areaList: t.data.areaList,
                    screenSwitch: t.data.screenSwitch,
                    voiceSwitch: t.data.voiceSwitch,
                    voiceCount: t.data.voiceCount,
                    index: t.data.voiceCount,
                    islongShow: 1 == t.data.screenSwitch,
                    openAudio: 1 == t.data.voiceSwitch
                }) : wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常runSet",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    updateRunset: function() {
        var o = this, i = {};
        i.openid = e.globalData.userStatus.openid, i.voiceCount = o.data.index, i.voiceSwitch = 1 == o.data.openAudio ? 1 : 0, 
        i.screenSwitch = 1 == o.data.islongShow ? 1 : 0;
        var n = t.sortKey(i, e.globalData.datakey);
        i.sign = a.hexMD5(n), wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: e.globalData.apiurl + "/f/api/updateRunset",
            method: "POST",
            data: i,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常updateRunset500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode ? o.setData({
                    areaList: t.data.areaList,
                    screenSwitch: t.data.screenSwitch,
                    voiceSwitch: t.data.voiceSwitch,
                    voiceCount: t.data.voiceCount,
                    index: t.data.voiceCount,
                    islongShow: 1 == t.data.screenSwitch,
                    openAudio: 1 == t.data.voiceSwitch
                }) : wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络异常或服务器updateRunset",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    onReady: function() {},
    openAudio: function() {
        this.setData({
            openAudio: !this.data.openAudio
        });
    },
    setLongShow: function() {
        this.setData({
            islongShow: !this.data.islongShow
        });
    },
    onShow: function() {
        this.runSet();
    },
    onHide: function() {
        this.updateRunset();
    },
    onUnload: function() {
        this.updateRunset();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});