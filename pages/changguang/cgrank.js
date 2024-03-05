var a = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "排名"
        },
        navheight: a.globalData.navBarHeight,
        winHeight: a.globalData.winHeight,
        userType: a.globalData.userStatus.userType,
        currentData: 0,
        cursturank: [],
        wrank: [],
        mrank: [],
        yrank: [],
        ranklist: [],
        dataMark: 1,
        rankType: 1,
        dateType: 1,
        stuArray: [],
        venueList: [],
        itemNameArr: [ "全部" ],
        itemNoArr: [ "00" ],
        itemNo: "00",
        index: 0
    },
    bindItemNoSelect: function(a) {
        var t = a.detail.value, e = this.data.itemNoArr[t];
        this.setData({
            itemNo: e,
            index: t
        }), this.venueRank();
    },
    changeMark: function(a) {
        var t = a.currentTarget.dataset.datamark;
        this.setData({
            dateType: t
        }), this.venueRank();
    },
    bindchange: function(a) {
        this.setData({
            currentData: a.detail.current
        }), this.venueRank();
    },
    checkCurrent: function(a) {
        if (this.data.currentData === a.target.dataset.current) return !1;
        this.setData({
            currentData: a.target.dataset.current,
            rankType: a.target.dataset.current
        }), this.data.currentData, this.data.currentData, this.setData({
            rankType: parseInt(this.data.currentData) + 1
        });
    },
    venueRank: function() {
        var t = this, e = a.globalData.userStatus.openid, n = a.globalData.userStatus.userid, r = t.data.rankType, i = t.data.dateType, s = t.data.itemNo;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "/f/api/venueRank?openid=" + e + "&userid=" + n + "&rankType=" + r + "&dateType=" + i + "&itemNo=" + s,
            method: "POST",
            success: function(a) {
                if (wx.hideLoading(), 200 != a.statusCode) wx.showToast({
                    title: "人数过多请稍后重试，服务器异常venueRank500",
                    icon: "none",
                    duration: 1e3
                }); else if ("000000" == a.data.retcode) {
                    for (var e = a.data.rankDataArray, n = {}, r = 0; r < a.data.stuArray.length; r++) n.realName = a.data.stuArray[r].realName, 
                    n.sexName = a.data.stuArray[r].sexName, n.headUrl = a.data.stuArray[r].headUrl, 
                    n.rank = a.data.stuArray[r].dataRank, n.totalMileage = a.data.stuArray[r].totalMileage, 
                    n.totalCount = a.data.stuArray[r].totalCount;
                    t.setData({
                        ranklist: e,
                        cursturank: n
                    });
                } else wx.showToast({
                    title: a.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常venueRank",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    getVenueList: function() {
        var t = this, e = a.globalData.userStatus.openid, n = a.globalData.userStatus.userid;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "/f/api/getVenueList?openid=" + e + "&userid=" + n,
            method: "POST",
            success: function(a) {
                if (wx.hideLoading(), 200 != a.statusCode) wx.showToast({
                    title: "人数过多请稍后重试，服务器异常getVenueList500",
                    icon: "none",
                    duration: 1e3
                }); else if ("000000" == a.data.retcode) {
                    t.setData({
                        venueList: a.data.venueList
                    });
                    for (var e = 0; e < a.data.venueList.length; e++) t.data.itemNameArr.push(a.data.venueList[e].itemName), 
                    t.data.itemNoArr.push(a.data.venueList[e].itemNo);
                    t.setData({
                        itemNo: t.data.itemNo,
                        index: t.data.index,
                        itemNameArr: t.data.itemNameArr,
                        itemNoArr: t.data.itemNoArr
                    });
                } else wx.showToast({
                    title: a.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常authLogin",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    onLoad: function(a) {
        this.getVenueList(), this.venueRank();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});