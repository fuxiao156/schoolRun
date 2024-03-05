var e = require("../../@babel/runtime/helpers/defineProperty"), t = getApp();

Page(e(e(e(e(e(e({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "选择锻炼项目"
        },
        navheight: t.globalData.navBarHeight,
        venueList: [],
        partakeNum: "",
        standardNum: "",
        schoolmateNum: "",
        detailsArray: [],
        showModalStatus: !1,
        endcontent: "",
        endcontent1: "",
        endcontent2: "",
        cardid: "",
        isBlueOpen: !1,
        locationEnabled: !1
    },
    openLocationAdapter: function() {
        var e = this, t = this.selectComponent("#gpsalertview");
        wx.getSystemInfo({
            success: function(a) {
                if (e.setData({
                    locationEnabled: a.locationEnabled
                }), !e.data.locationEnabled) return t.showAlertView(), !1;
            }
        });
    },
    closeEvent2: function() {
        var e = this.selectComponent("#gpsalertview");
        e.hideAlertView(), this.openLocationAdapter(), this.data.locationEnabled || e.showAlertView(), 
        wx.showTabBar();
    },
    openBluetoothAdapter: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    isBlueOpen: t.bluetoothEnabled
                });
                var a = e.selectComponent("#blueView");
                if (!e.data.isBlueOpen) return a.showAlertView(), !1;
            }
        });
    },
    closeBlueEvent: function() {
        this.selectComponent("#blueView").hideAlertView(), this.openBluetoothAdapter(), 
        wx.showTabBar();
    },
    gotocgQiandao: function(e) {
        var t = this.selectComponent("#blueView"), a = this.selectComponent("#gpsalertview");
        if (this.openBluetoothAdapter(), !this.data.isBlueOpen) return t.showAlertView(), 
        !1;
        if (this.openLocationAdapter(), !this.data.locationEnabled) return a.showAlertView(), 
        !1;
        var n = e.currentTarget.dataset.venueid, o = e.currentTarget.dataset.venuename, r = e.currentTarget.dataset.cardrate, i = e.currentTarget.dataset.cardratemax, s = e.currentTarget.dataset.cardnumber, d = e.currentTarget.dataset.rangehour, c = e.currentTarget.dataset.itemname;
        wx.removeStorageSync("venueType"), wx.removeStorageSync("deviceId"), wx.removeStorageSync("cardid"), 
        wx.removeStorageSync("venueId"), wx.removeStorageSync("venueName"), wx.removeStorageSync("itemName"), 
        wx.removeStorageSync("cardRate"), wx.removeStorageSync("cardRateMax"), wx.removeStorageSync("cardNumber"), 
        wx.removeStorageSync("lastdata"), wx.removeStorageSync("runnewdata"), wx.removeStorageSync("starttime"), 
        wx.removeStorageSync("qiandaoStatus"), wx.removeStorageSync("detailsArray"), wx.removeStorageSync("yxvalidCount"), 
        wx.removeStorageSync("invalidCount"), wx.removeStorageSync("cardArray"), this.stopLocationUpdate(), 
        wx.redirectTo({
            url: "/pages/changguang/cgqiandao?venueId=" + n + "&venueName=" + o + "&cardRate=" + r + "&cardRateMax=" + i + "&cardNumber=" + s + "&rangeHour=" + d + "&itemName=" + c
        });
    },
    gotoqdlist: function() {
        wx.navigateTo({
            url: "/pages/changguang/qdlist"
        });
    },
    gotoqdtermgoal: function() {
        wx.navigateTo({
            url: "/pages/changguang/qdtermgoal"
        });
    },
    gotoqdguizhe: function() {
        wx.navigateTo({
            url: "/pages/index/guize?currentData=1"
        });
    },
    getVenueList: function() {
        var e = this, a = t.globalData.userStatus.openid, n = t.globalData.userStatus.userid;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "/f/api/getVenueList?openid=" + a + "&userid=" + n,
            method: "POST",
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常getVenueList500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode ? e.setData({
                    venueList: t.data.venueList
                }) : wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常getVenueList",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    onPulling: function(e) {},
    onRestore: function(e) {},
    venueCardTotal: function(e) {
        this.showModal();
        var a = this, n = t.globalData.userStatus.openid, o = t.globalData.userStatus.userid, r = e.currentTarget.dataset.venueid;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "/f/api/venueCardTotal?openid=" + n + "&userid=" + o + "&venueId=" + r,
            method: "POST",
            success: function(e) {
                wx.hideLoading(), 200 != e.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常venueCardTotal500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == e.data.retcode ? a.setData({
                    partakeNum: e.data.partakeNum,
                    standardNum: e.data.standardNum,
                    schoolmateNum: e.data.schoolmateNum,
                    detailsArray: e.data.detailsArray
                }) : wx.showToast({
                    title: e.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常venueCardTotal",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    showModal: function() {
        var e = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        e.translateY(300).step(), this.setData({
            animationData: e.export(),
            showModalStatus: !0
        }), setTimeout(function() {
            e.translateY(0).step(), this.setData({
                animationData: e.export()
            });
        }.bind(this), 200);
    },
    hideModal: function() {
        var e = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        e.translateY(300).step(), this.setData({
            animationData: e.export()
        }), setTimeout(function() {
            e.translateY(0).step(), this.setData({
                animationData: e.export(),
                showModalStatus: !1
            });
        }.bind(this), 200);
    },
    onLoad: function(e) {
        this.gpsalertview = this.selectComponent("#gpsalertview");
        this.getVenueList();
    },
    onReady: function() {},
    onShow: function() {
        this.openBluetoothAdapter(), this.openLocationAdapter(), this.endalertview = this.selectComponent("#endalertview");
        if (null != wx.getStorageSync("cardid") && "" != wx.getStorageSync("cardid")) {
            var e = wx.getStorageSync("yxvalidCount");
            e < wx.getStorageSync("cardNumber") ? this.setData({
                endcontent: "由于低于打卡有效规定次数，结束将",
                endcontent1: "无效",
                endcontent2: "此次记录。 您确定要结束吗？"
            }) : this.setData({
                endcontent: "您本次有效打卡次数为",
                endcontent1: e,
                endcontent2: "次，您确定要结束吗？"
            }), this.endalertview.showAlertView();
        }
    },
    cancelEvent: function() {
        var e = this.selectComponent("#blueView"), t = this.selectComponent("#gpsalertview");
        return this.openBluetoothAdapter(), this.data.isBlueOpen ? (this.openLocationAdapter(), 
        this.data.locationEnabled ? (this.endalertview.hideAlertView(), void wx.navigateTo({
            url: "/pages/changguang/cgqiandao"
        })) : (t.showAlertView(), !1)) : (e.showAlertView(), !1);
    },
    stopLocationUpdate: function() {
        wx.offLocationChange(), wx.stopLocationUpdate({
            complete: function(e) {}
        });
    },
    venueCardEnd: function(e) {
        var a = this, n = t.globalData.userStatus.openid, o = t.globalData.userStatus.userid, r = wx.getStorageSync("venueId"), i = wx.getStorageSync("cardid"), s = wx.getStorageSync("deviceId"), d = Math.round(new Date().getTime() / 1e3).toString();
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "/f/api/venueCardStart?openid=" + n + "&userid=" + o + "&venueId=" + r + "&cardFlag=2&cardid=" + i + "&deviceId=" + s + "&timestamp=" + d + "&endFlag=1",
            method: "POST",
            success: function(e) {
                wx.hideLoading(), 200 != e.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常venueCardStart500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == e.data.retcode ? (t.globalData.getVenuedata = 0, a.stopLocationUpdate(), 
                wx.removeStorageSync("venueType"), wx.removeStorageSync("deviceId"), wx.removeStorageSync("cardid"), 
                wx.removeStorageSync("venueId"), wx.removeStorageSync("venueName"), wx.removeStorageSync("itemName"), 
                wx.removeStorageSync("cardRate"), wx.removeStorageSync("cardRateMax"), wx.removeStorageSync("cardNumber"), 
                wx.removeStorageSync("lastdata"), wx.removeStorageSync("runnewdata"), wx.removeStorageSync("starttime"), 
                wx.removeStorageSync("qiandaoStatus"), wx.removeStorageSync("detailsArray"), wx.removeStorageSync("yxvalidCount"), 
                wx.removeStorageSync("invalidCount"), wx.removeStorageSync("cardArray"), a.endalertview.hideAlertView()) : wx.showToast({
                    title: e.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常venueCardStart",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    }
}, "stopLocationUpdate", function() {
    wx.offLocationChange(), wx.stopLocationUpdate({
        complete: function(e) {}
    });
}), "onHide", function() {}), "onUnload", function() {}), "onPullDownRefresh", function() {}), "onReachBottom", function() {}), "onShareAppMessage", function() {}));