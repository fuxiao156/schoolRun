var t = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "体测成绩"
        },
        navheight: t.globalData.navBarHeight,
        winHeight: t.globalData.windowHeight,
        schoolInfo: t.globalData.schoolInfo,
        userInfo: t.globalData.userInfo,
        currentData: 0,
        sex: 1,
        listData: {}
    },
    bindchange: function(t) {
        this.setData({
            currentData: t.detail.current
        });
    },
    checkCurrent: function(t) {
        if (this.data.currentData === t.target.dataset.current) return !1;
        this.setData({
            currentData: t.target.dataset.current
        });
    },
    queryHealth: function() {
        var a = this, e = t.globalData.userStatus.openid, r = t.globalData.userStatus.userid;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "/f/api/queryHealth?openid=" + e + "&userid=" + r + "&academicYear=&term=",
            method: "POST",
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常queryHealth500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode ? a.setData({
                    listData: t.data.dataList,
                    sex: t.data.sex
                }) : wx.showToast({
                    icon: "none",
                    title: t.data.retmsg,
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    icon: "none",
                    title: "人数过多请稍后重试，网络或服务器异常queryHealth",
                    duration: 1e3
                });
            }
        });
    },
    runScore: function() {
        var a = t.globalData.userStatus.openid, e = t.globalData.userStatus.userid, r = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "/f/api/runScore?openid=" + a + "&userid=" + e,
            method: "POST",
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常runScore500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode || "000013" == t.data.retcode ? r.setData({
                    runScore: t.data,
                    academicYear: Number(t.data.academicYear.slice(0, 2)),
                    mileage: t.data.mileage,
                    mileageTarget: t.data.mileageTarget,
                    runTarget: t.data.runTarget,
                    term: t.data.term,
                    validCount: t.data.validCount
                }) : wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3,
                    mask: !0
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常runScore",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    onLoad: function(a) {
        this.setData({
            schoolInfo: t.globalData.schoolInfo,
            userInfo: t.globalData.userInfo
        }), this.queryHealth();
    },
    gotoDetail: function(t) {
        var a = t.currentTarget.dataset.sex, e = t.currentTarget.dataset.schoolyear, r = t.currentTarget.dataset.schoolterm, o = t.currentTarget.dataset.healthscore, n = t.currentTarget.dataset.addscore, s = t.currentTarget.dataset.score, i = t.currentTarget.dataset.stature, c = t.currentTarget.dataset.avoirdupois, u = t.currentTarget.dataset.sascore, d = t.currentTarget.dataset.conclusion, l = t.currentTarget.dataset.saconclusion, g = t.currentTarget.dataset.vitalcapacity, h = t.currentTarget.dataset.vitalcapacityscore, T = t.currentTarget.dataset.vitalcapacityconclusion, m = t.currentTarget.dataset.fiftymeter, f = t.currentTarget.dataset.fiftymeterscore, p = t.currentTarget.dataset.fiftymeterconclusion, w = t.currentTarget.dataset.standinglongjump, D = t.currentTarget.dataset.standinglongjumpscore, v = t.currentTarget.dataset.standinglongjumpconclusion, b = t.currentTarget.dataset.bend, x = t.currentTarget.dataset.bendscore, y = t.currentTarget.dataset.bendconclusion, S = t.currentTarget.dataset.lie, k = t.currentTarget.dataset.liescore, H = t.currentTarget.dataset.lieconclusion, I = t.currentTarget.dataset.kilometer, L = t.currentTarget.dataset.kilometerscore, q = t.currentTarget.dataset.kilometerconclusion, j = t.currentTarget.dataset.leftvision, C = t.currentTarget.dataset.rightvision, P = t.currentTarget.dataset.leftmirror, Y = t.currentTarget.dataset.rightmirror, O = t.currentTarget.dataset.leftametropia, A = t.currentTarget.dataset.rightametropia;
        wx.navigateTo({
            url: "/pages/dating/tcdetail?schoolyear=" + e + "&sex=" + a + "&schoolterm=" + r + "&healthscore=" + o + "&addscore=" + n + "&score=" + s + "&stature=" + i + "&avoirdupois=" + c + "&sascore=" + u + "&conclusion=" + d + "&saconclusion=" + l + "&vitalcapacity=" + g + "&vitalcapacityscore=" + h + "&vitalcapacityconclusion=" + T + "&fiftymeter=" + m + "&fiftymeterscore=" + f + "&fiftymeterconclusion=" + p + "&standinglongjump=" + w + "&standinglongjumpscore=" + D + "&standinglongjumpconclusion=" + v + "&bend=" + b + "&bendscore=" + x + "&bendconclusion=" + y + "&lie=" + S + "&liescore=" + k + "&lieconclusion=" + H + "&kilometer=" + I + "&kilometerscore=" + L + "&kilometerconclusion=" + q + "&leftvision=" + j + "&rightvision=" + C + "&leftmirror=" + P + "&rightmirror=" + Y + "&leftametropia=" + O + "&rightametropia=" + A
        });
    }
});