var a = require("../../2C088A0753E228FF4A6EE200B445E640.js"), e = require("../../83B41FC153E228FFE5D277C6CA15E640.js"), t = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "更换证件照"
        },
        navheight: t.globalData.navBarHeight,
        updateStatus: 0,
        approveStatus: 0,
        collegeName: "",
        mobileNo: "",
        evidence: "",
        headUrl: "",
        realName: "",
        schoolId: "",
        schoolName: "",
        sexName: "",
        studentNo: "",
        userid: "",
        userType: "",
        updateEvidence: "",
        fileName: "",
        filePath: "",
        batchNo: ""
    },
    queryStudentInfo: function() {
        var a = {}, e = this;
        a.openid = t.globalData.userStatus.openid, wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "f/api/queryStudentInfo",
            data: a,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                wx.hideLoading(), 200 != a.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，createCode500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == a.data.retcode ? e.setData({
                    approveStatus: a.data.approveStatus,
                    className: a.data.className,
                    collegeName: a.data.collegeName ? a.data.collegeName : "",
                    mobileNo: a.data.mobileNo ? a.data.mobileNo : "",
                    evidence: a.data.evidence,
                    headUrl: a.data.headUrl,
                    realName: a.data.realName,
                    schoolId: a.data.schoolId,
                    schoolName: a.data.schoolName,
                    sexName: a.data.sexName,
                    studentNo: a.data.studentNo,
                    userid: a.data.userid,
                    userType: a.data.userType
                }) : wx.showToast({
                    title: a.data.retmsg,
                    icon: "none",
                    duration: 1e3,
                    mask: !0
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常createCode",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    getupdateEvidence: function() {
        var a = {}, e = this;
        a.openid = t.globalData.userStatus.openid, a.userid = t.globalData.userStatus.userid, 
        wx.request({
            url: t.globalData.apiurl + "f/api/getupdateEvidence",
            data: a,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                e.setData({
                    updateStatus: a.data.updateStatus,
                    filePath: a.data.updateEvidence,
                    remarks: a.data.remarks,
                    status: a.data.status
                });
            },
            fail: function() {
                wx.showToast({
                    title: "请求发送失败",
                    icon: "error",
                    duration: 1e3,
                    mask: !0
                });
            }
        });
    },
    uploadimage: function() {
        var o = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "camera" ],
            success: function(d) {
                var s = new Date().valueOf(), i = {};
                i.openid = t.globalData.userStatus.openid, i.schoolId = o.data.schoolId, i.imageType = 2, 
                i.batchNo = s;
                var n = a.sortKey(i, t.globalData.datakey), u = e.hexMD5(n);
                wx.uploadFile({
                    url: t.globalData.apiurl + "f/api/uploadImg",
                    filePath: d.tempFilePaths[0],
                    name: "fileImg",
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    formData: {
                        openid: t.globalData.userStatus.openid,
                        schoolId: o.data.schoolId,
                        userType: o.data.userType,
                        imageType: 2,
                        batchNo: s,
                        sign: u,
                        studentNo: o.data.studentNo,
                        realName: o.data.realName
                    },
                    success: function(a) {
                        wx.hideLoading();
                        var e = JSON.parse(a.data);
                        200 != a.statusCode ? wx.showToast({
                            title: "人数过多请稍后重试，服务器异常uploadFile500",
                            icon: "none",
                            duration: 1e3
                        }) : "000000" == e.retcode ? o.setData({
                            fileName: e.fileName,
                            filePath: e.fileUrl,
                            batchNo: e.batchNo
                        }) : wx.showToast({
                            title: e.retmsg,
                            icon: "none",
                            duration: 1500,
                            mask: !0
                        });
                    }
                });
            }
        });
    },
    updateEvidence: function() {
        var o = this;
        if (o.data.evidence == o.data.filePath || "" == o.data.filePath) return wx.showToast({
            title: "请选择新的证明照片",
            icon: "none",
            duration: 1e3,
            mask: !0
        }), !1;
        var d = {};
        d.openid = t.globalData.userStatus.openid, d.userid = t.globalData.userStatus.userid, 
        d.batchNo = o.data.batchNo;
        var s = a.sortKey(d, t.globalData.datakey);
        d.sign = e.hexMD5(s), d.updateStatus = 1, d.className = o.data.className, d.collegeName = o.data.collegeName, 
        d.mobileNo = o.data.mobileNo, d.evidence = o.data.evidence, d.headUrl = o.data.headUrl, 
        d.realName = o.data.realName, d.schoolId = o.data.schoolId, d.schoolName = o.data.schoolName, 
        d.sexNo = "男" == o.data.sexName ? 1 : 2, d.studentNo = o.data.studentNo, d.userType = o.data.userType, 
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "f/api/updateEvidence",
            data: d,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                wx.hideLoading(), 200 != a.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，updateEvidence500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == a.data.retcode ? (o.setData({
                    updateStatus: 1
                }), wx.showToast({
                    title: a.data.retmsg,
                    icon: "success",
                    duration: 1e3,
                    mask: !0
                })) : wx.showToast({
                    title: a.data.retmsg,
                    icon: "none",
                    duration: 1e3,
                    mask: !0
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常updateEvidence",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    onLoad: function(a) {
        this.queryStudentInfo(), this.getupdateEvidence();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});