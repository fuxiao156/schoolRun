var a = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "排名"
        },
        navheight: a.globalData.navBarHeight,
        winHeight: a.globalData.windowHeight,
        userType: a.globalData.userStatus.userType,
        currentData: 0,
        cursturank: [],
        wrank: [],
        mrank: [],
        yrank: [],
        ranklist: [],
        dataMark: 1,
        rankType: 1,
        dateType: 3,
        stuArray: []
    },
    changeMark: function(a) {
        var t = a.currentTarget.dataset.datamark;
        this.setData({
            dateType: t
        }), this.initData();
    },
    bindchange: function(a) {
        if (this.data.currentData === a.detail.current) return !1;
        this.setData({
            currentData: a.detail.current
        }), this.setData({
            rankType: parseInt(this.data.currentData) + 1
        }), this.initData();
    },
    checkCurrent: function(a) {
        if (this.data.currentData === a.target.dataset.current) return !1;
        this.setData({
            currentData: a.target.dataset.current,
            rankType: a.target.dataset.current
        }), this.setData({
            rankType: parseInt(this.data.currentData) + 1
        });
    },
    initData: function() {
        var t = this, e = a.globalData.userStatus.userid, r = a.globalData.userStatus.openid, n = t.data.rankType, i = t.data.dateType;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "/f/api/runRank?openid=" + r + "&userid=" + e + "&rankType=" + n + "&dateType=" + i,
            method: "POST",
            success: function(a) {
                if (wx.hideLoading(), 200 != a.statusCode) wx.showToast({
                    title: "人数过多请稍后重试，服务器异常runRank500",
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                }); else if ("000000" == a.data.retcode) {
                    for (var e = a.data.rankDataArray, r = {}, n = 0; n < a.data.stuArray.length; n++) r.realName = a.data.stuArray[n].realName, 
                    r.sexName = a.data.stuArray[n].sexName, r.headUrl = a.data.stuArray[n].headUrl, 
                    r.rank = a.data.stuArray[n].dataRank, r.totalMileage = a.data.stuArray[n].totalMileage, 
                    r.totalCount = a.data.stuArray[n].totalCount;
                    t.setData({
                        ranklist: e,
                        cursturank: r
                    });
                } else wx.showToast({
                    title: a.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常runRank",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    onLoad: function(a) {
        this.initData();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});