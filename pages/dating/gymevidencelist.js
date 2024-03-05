var t = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "证明照片列表"
        },
        statusBarHeight: t.globalData.statusBarHeight,
        navheight: t.globalData.navBarHeight,
        winHeight: t.globalData.windowHeight,
        studentList: [],
        keyWord: ""
    },
    findUpdateEvidenceListByGymClass: function() {
        var e = this, a = {};
        a.schoolId = t.globalData.schoolInfo.schoolId, a.teacherNo = t.globalData.userStatus.studentNo, 
        a.keyWord = "", wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "/f/api/findUpdateEvidenceListByGymClass",
            data: a,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常findUpdateEvidenceListByGymClass500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode ? e.setData({
                    studentList: t.data.studentList
                }) : wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常findUpdateEvidenceListByGymClass",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    gotoGymevidence: function(t) {
        var e = t.currentTarget.dataset.openid, a = t.currentTarget.dataset.userid, n = t.currentTarget.dataset.studentno, d = t.currentTarget.dataset.realname, s = t.currentTarget.dataset.sex, i = t.currentTarget.dataset.evidence, o = t.currentTarget.dataset.updateevidence, r = t.currentTarget.dataset.updatestatus, u = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/dating/gymevidence?openid=" + e + "&userid=" + a + "&studentNo=" + n + "&realName=" + d + "&sex=" + s + "&evidence=" + i + "&updateEvidence=" + o + "&updateStatus=" + r + "&id=" + u
        });
    },
    onLoad: function(t) {},
    onShow: function() {
        this.findUpdateEvidenceListByGymClass();
    }
});