var e = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "审核证明照片"
        },
        navheight: e.globalData.navBarHeight,
        openid: "",
        userid: "",
        studentNo: "",
        realName: "",
        sex: "",
        evidence: "",
        updateEvidence: "",
        updateStatus: "",
        remarks: "",
        id: ""
    },
    onLoad: function(e) {
        this.setData({
            openid: e.openid,
            userid: e.userid,
            studentNo: e.studentNo,
            realName: e.realName,
            sex: e.sex,
            evidence: e.evidence,
            updateEvidence: e.updateEvidence,
            updateStatus: e.updateStatus,
            id: e.id
        });
    },
    getInputRemarks: function(e) {
        this.setData({
            remarks: e.detail.value
        });
    },
    trueUpdateEvidence: function() {
        var t = this, a = {};
        a.schoolId = e.globalData.schoolInfo.schoolId, a.teacherNo = e.globalData.userStatus.studentNo, 
        a.userid = t.data.userid, a.updateStatus = 2, a.remarks = t.data.remarks, a.id = t.data.id, 
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: e.globalData.apiurl + "/f/api/teacherUpdateEvidence",
            data: a,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                wx.hideLoading(), 200 != e.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常teacherUpdateEvidence500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == e.data.retcode ? t.setData({
                    updateStatus: 2
                }) : wx.showToast({
                    title: e.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常teacherUpdateEvidence ",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    falseUpdateEvidence: function() {
        var t = this, a = {};
        a.schoolId = e.globalData.schoolInfo.schoolId, a.teacherNo = e.globalData.userStatus.studentNo, 
        a.userid = t.data.userid, a.updateStatus = 3, a.remarks = t.data.remarks, a.id = t.data.id, 
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: e.globalData.apiurl + "/f/api/teacherUpdateEvidence",
            data: a,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                wx.hideLoading(), 200 != e.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常teacherUpdateEvidence500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == e.data.retcode ? t.setData({
                    updateStatus: 3
                }) : wx.showToast({
                    title: e.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常teacherUpdateEvidence ",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    }
});