var a = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "签到记录"
        },
        navheight: a.globalData.navBarHeight,
        title: "",
        cardTotal: "",
        cardValid: "",
        venueArray: [],
        allCount: 0,
        validCount: 0,
        summaryArray: [],
        itemArray: [],
        select: !1,
        selectitemNo: "",
        showModalStatus: !1,
        exerciseTime: 0,
        yxvalidCount: 0,
        invalidCount: 0,
        cardStatus: 0,
        itemImage: "",
        detailsArray: [],
        detailsArrlen: 0,
        seqNo: 1
    },
    showModal: function() {
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        a.translateY(300).step(), this.setData({
            animationData: a.export(),
            showModalStatus: !0
        }), setTimeout(function() {
            a.translateY(0).step(), this.setData({
                animationData: a.export()
            });
        }.bind(this), 200);
    },
    hideModal: function() {
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        a.translateY(300).step(), this.setData({
            animationData: a.export()
        }), setTimeout(function() {
            a.translateY(0).step(), this.setData({
                animationData: a.export(),
                showModalStatus: !1
            });
        }.bind(this), 200);
    },
    lastvenueCardDetails: function() {
        var t = this;
        t.showModal();
        var e = a.globalData.userStatus.openid, i = a.globalData.userStatus.userid, o = t.data.summaryArray[t.data.seqNo - 2].cardid;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "/f/api/venueCardDetails?openid=" + e + "&userid=" + i + "&cardid=" + o,
            method: "POST",
            success: function(a) {
                200 != a.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常venueCardDetails500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == a.data.retcode ? t.setData({
                    exerciseTime: a.data.exerciseTime,
                    yxvalidCount: a.data.validCount,
                    invalidCount: a.data.invalidCount,
                    cardStatus: a.data.cardStatus,
                    itemImage: a.data.itemImage,
                    detailsArray: a.data.detailsArray,
                    seqNo: t.data.seqNo - 1
                }) : wx.showToast({
                    title: a.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常venueCardDetails",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    nextvenueCardDetails: function() {
        var t = this;
        t.showModal();
        var e = a.globalData.userStatus.openid, i = a.globalData.userStatus.userid, o = t.data.summaryArray[t.data.seqNo].cardid;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "/f/api/venueCardDetails?openid=" + e + "&userid=" + i + "&cardid=" + o,
            method: "POST",
            success: function(a) {
                200 != a.statusCode ? (wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试，服务器异常venueCardDetails500",
                    icon: "none",
                    duration: 1e3
                })) : "000000" == a.data.retcode ? (wx.hideLoading(), t.setData({
                    exerciseTime: a.data.exerciseTime,
                    yxvalidCount: a.data.validCount,
                    invalidCount: a.data.invalidCount,
                    cardStatus: a.data.cardStatus,
                    itemImage: a.data.itemImage,
                    detailsArray: a.data.detailsArray,
                    seqNo: t.data.seqNo + 1
                })) : (wx.hideLoading(), wx.showToast({
                    title: a.data.retmsg,
                    icon: "error",
                    duration: 1e3
                }));
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常venueCardDetails",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    venueCardDetails: function(t) {
        this.showModal();
        var e = this;
        e.setData({
            seqNo: t.currentTarget.dataset.seqno
        });
        var i = a.globalData.userStatus.openid, o = a.globalData.userStatus.userid, n = t.currentTarget.dataset.cardid;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "/f/api/venueCardDetails?openid=" + i + "&userid=" + o + "&cardid=" + n,
            method: "POST",
            success: function(a) {
                wx.hideLoading(), 200 != a.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常getVenueList500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == a.data.retcode ? e.setData({
                    exerciseTime: a.data.exerciseTime,
                    yxvalidCount: a.data.validCount,
                    invalidCount: a.data.invalidCount,
                    cardStatus: a.data.cardStatus,
                    itemImage: a.data.itemImage,
                    detailsArray: a.data.detailsArray
                }) : wx.showToast({
                    title: a.data.retmsg,
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
    showitemArray: function() {
        this.setData({
            select: !this.data.select
        });
    },
    selectitemArray: function(a) {
        this.setData({
            selectitemNo: a.currentTarget.dataset.itemno,
            select: !this.data.select
        });
    },
    studentSignRecord: function() {
        var t = this, e = a.globalData.userStatus.openid, i = a.globalData.userStatus.userid;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "/f/api/studentSignRecord?openid=" + e + "&userid=" + i + "&venueId=",
            method: "POST",
            success: function(a) {
                wx.hideLoading(), 200 != a.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常studentSignRecord500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == a.data.retcode ? t.setData({
                    allCount: a.data.allCount,
                    validCount: a.data.validCount,
                    summaryArray: a.data.summaryArray,
                    itemArray: a.data.itemArray,
                    detailsArrlen: a.data.summaryArray.length
                }) : wx.showToast({
                    title: a.data.retmsg,
                    icon: "error",
                    duration: 100
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常studentSignRecord",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    gotoQddetail: function(a) {
        var t = a.currentTarget.dataset.venueid;
        wx.navigateTo({
            url: "/pages/changguang/qddetail?venueId=" + t
        });
    },
    onLoad: function(a) {},
    onReady: function() {},
    onShow: function() {
        this.studentSignRecord();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});