var t = require("../../2C088A0753E228FF4A6EE200B445E640.js"), a = require("../../83B41FC153E228FFE5D277C6CA15E640.js"), e = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "更改微信绑定"
        },
        navheight: e.globalData.navBarHeight,
        schoollist: [],
        schoolId: "",
        schoolName: "",
        studentNo: "",
        realName: "",
        applyContent: "",
        filePath: "",
        httpfilePath: "",
        applyStatus: 3
    },
    onLoad: function(t) {
        "" != e.globalData.userStatus.userid && null != e.globalData.userStatus.userid || wx.switchTab({
            url: "/pages/index/index"
        }), this.shoollist(), this.getUpdateUserWeChat();
    },
    onReady: function() {},
    onShow: function() {},
    shoollist: function() {
        var t = {}, a = this;
        t.openid = e.globalData.userStatus.openid, t.schoolId = "", t.provinceNo = "", wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: e.globalData.apiurl + "f/api/findSchool",
            data: t,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                if (wx.hideLoading(), 200 != t.statusCode) wx.showToast({
                    title: "人数过多请稍后重试，服务器异常findSchool500",
                    icon: "none",
                    duration: 1e3
                }); else if ("000000" == t.data.retcode) {
                    for (var e = [], o = [], s = 0; s < t.data.schoolList.length; s++) e.push(t.data.schoolList[s].schoolId), 
                    o.push(t.data.schoolList[s].schoolName);
                    a.setData({
                        schoolId: t.data.schoolList[0].schoolId,
                        indexS: 0,
                        schoolIdarray: e,
                        schoolNamearray: o,
                        schooolName: t.data.schoolList[0].schoolName
                    });
                } else wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常findSchool",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    getUpdateUserWeChat: function() {
        var t = {}, a = this;
        t.openid = e.globalData.userStatus.openid, t.userid = e.globalData.userStatus.userid, 
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: e.globalData.apiurl + "f/api/getUpdateUserWeChat",
            data: t,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常getUpdateUserWeChat500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode ? a.setData({
                    applyStatus: t.data.applyStatus,
                    httpfilePath: t.data.fileUrl,
                    realName: t.data.realName,
                    schoolId: t.data.schoolId,
                    schoolName: t.data.schoolName,
                    studentNo: t.data.studentNo,
                    applyContent: t.data.applyContent
                }) : wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3,
                    mask: !0
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常getUpdateUserWeChat",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    bindPickerChange: function(t) {
        var a = t.detail.value, e = this.data.schoolIdarray[a];
        this.setData({
            schoolId: e,
            indexS: a
        });
    },
    inputStudentNo: function(t) {
        var a = t.detail.value;
        if (!/^[A-Za-z0-9]*$/.test(a)) return "";
        this.setData({
            studentNo: a
        });
    },
    inputRealname: function(t) {
        this.setData({
            realName: t.detail.value
        });
    },
    inputApplyContent: function(t) {
        this.setData({
            applyContent: t.detail.value
        });
    },
    uploadimage: function() {
        var o = this;
        return "" == o.data.schoolId ? (wx.showToast({
            title: "请选择学校",
            icon: "none",
            duration: 800,
            mask: !0
        }), !1) : "" == o.data.studentNo || "" == o.data.realName ? (wx.showToast({
            title: "学号和姓名不能为空",
            icon: "none",
            duration: 800,
            mask: !0
        }), !1) : void wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "camera" ],
            success: function(s) {
                var i = s.tempFilePaths[0];
                if (o.setData({
                    filePath: i
                }), "" != o.data.filePath) {
                    var n = {};
                    n.schoolId = o.data.schoolId, n.studentNo = o.data.studentNo;
                    var l = t.sortKey(n, e.globalData.datakey), d = a.hexMD5(l);
                    wx.showLoading({
                        title: "加载中...",
                        mask: !0
                    }), wx.uploadFile({
                        url: e.globalData.apiurl + "f/api/uploadFileByUpdateUser",
                        filePath: o.data.filePath,
                        name: "fileImg",
                        header: {
                            "Content-Type": "multipart/form-data"
                        },
                        formData: {
                            schoolId: o.data.schoolId,
                            studentNo: o.data.studentNo,
                            realName: o.data.realName,
                            sign: d
                        },
                        success: function(t) {
                            wx.hideLoading();
                            var a = JSON.parse(t.data);
                            200 != t.statusCode ? wx.showToast({
                                title: "人数过多请稍后重试，服务器异常uploadFile500",
                                icon: "none",
                                duration: 1e3
                            }) : "000000" == a.retcode ? o.setData({
                                httpfilePath: a.fileUrl
                            }) : wx.showToast({
                                title: a.retmsg,
                                icon: "none",
                                duration: 2e3,
                                mask: !0
                            });
                        },
                        fail: function() {
                            wx.hideLoading(), wx.showToast({
                                title: "人数过多请稍后重试,网络或服务器异常uploadFile",
                                icon: "none",
                                duration: 1e3
                            });
                        }
                    });
                }
            }
        });
    },
    createAuthInfo: function() {
        if ("" == this.data.schoolId) return wx.showToast({
            title: "请选择学校",
            icon: "none",
            duration: 800,
            mask: !0
        }), !1;
        if ("" == this.data.studentNo || "" == this.data.realName) return wx.showToast({
            title: "学号和姓名不能为空",
            icon: "none",
            duration: 800,
            mask: !0
        }), !1;
        if ("" == this.data.httpfilePath) return wx.showToast({
            title: "请上传证明照片",
            icon: "none",
            duration: 800,
            mask: !0
        }), !1;
        if ("" == this.data.applyConten) return wx.showToast({
            title: "请填写申请原因",
            icon: "none",
            duration: 800,
            mask: !0
        }), !1;
        var o = {};
        o.studentNo = this.data.studentNo, f, o.schoolId = this.data.schoolId;
        var s = t.sortKey(o, e.globalData.datakey);
        o.realName = this.data.realName, o.userid = e.globalData.userStatus.userid, o.openid = e.globalData.userStatus.openid, 
        o.applyContent = this.data.applyContent, o.sign = a.hexMD5(s), o.fileUrl = this.data.httpfilePath, 
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: e.globalData.apiurl + "f/api/updateUserWeChat",
            data: o,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                if (wx.hideLoading(), 200 != t.statusCode) wx.showToast({
                    title: "人数过多请稍后重试，服务器异常authUser500",
                    icon: "none",
                    duration: 1e3
                }); else if ("000000" == t.data.retcode) var a = setTimeout(function() {
                    wx.navigateBack(), clearTimeout(a);
                }, 1e3); else wx.showToast({
                    title: t.data.retmsg,
                    icon: "none",
                    duration: 800,
                    mask: !0
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常authUser",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    }
});