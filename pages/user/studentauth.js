var a = require("../../2C088A0753E228FF4A6EE200B445E640.js"), t = require("../../83B41FC153E228FFE5D277C6CA15E640.js"), o = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "身份认证"
        },
        navheight: o.globalData.navBarHeight,
        schoolList: [],
        schoolId: "",
        schooolName: "",
        attestStatus: 0,
        studentNo: "",
        realName: "",
        idCard: "",
        classNo: "",
        className: "选择班级",
        userType: 1,
        collegeName: "选择院系",
        collegeNo: "",
        yxlist: [],
        banlist: [],
        studentlist: [],
        index: 0,
        indexS: 0,
        schoolNamearray: [],
        schoolIdarray: [],
        fileName: "",
        filePath: "",
        xieyi: !1
    },
    binxieyi: function() {
        this.setData({
            xieyi: !this.data.xieyi
        });
    },
    onLoad: function(a) {
        this.shoollist();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    shoollist: function() {
        var a = {}, t = this;
        a.openid = o.globalData.userStatus.openid, a.schoolId = "", a.provinceNo = "", wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: o.globalData.apiurl + "f/api/findSchool",
            data: a,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                if (wx.hideLoading(), 200 != a.statusCode) wx.showToast({
                    title: "人数过多请稍后重试，服务器异常findSchool500",
                    icon: "none",
                    duration: 1e3
                }); else if ("000000" == a.data.retcode) {
                    for (var o = [], e = [], s = 0; s < a.data.schoolList.length; s++) o.push(a.data.schoolList[s].schoolId), 
                    e.push(a.data.schoolList[s].schoolName);
                    t.setData({
                        schoolList: a.data.schoolList,
                        schoolIdarray: o,
                        schoolNamearray: e,
                        indexS: 0,
                        schoolId: a.data.schoolList[0].schoolId,
                        schooolName: a.data.schoolList[0].schoolName,
                        attestStatus: a.data.schoolList[0].attestStatus
                    });
                } else wx.showToast({
                    title: a.data.retmsg,
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
    gotoSelectyuanxi: function() {
        wx.navigateTo({
            url: "/pages/user/selectyuanxi?schoolid=" + this.data.schoolId + "&collegeNo=" + this.data.collegeNo
        });
    },
    gotoSelectbanji: function() {
        return "" == this.data.schoolId ? (wx.showToast({
            title: "请选择学校",
            icon: "none",
            duration: 800,
            mask: !0
        }), !1) : "" == this.data.collegeNo ? (wx.showToast({
            title: "请选择院系",
            icon: "none",
            duration: 800,
            mask: !0
        }), !1) : void wx.navigateTo({
            url: "/pages/user/selectbanji?schoolId=" + this.data.schoolId + "&collegeNo=" + this.data.collegeNo + "&classNo=" + this.data.classNo
        });
    },
    gotoSelectstutentnum: function() {
        return "" == this.data.schoolId ? (wx.showToast({
            title: "请选择学校",
            icon: "none",
            duration: 800,
            mask: !0
        }), !1) : "" == this.data.collegeNo ? (wx.showToast({
            title: "请选择院系",
            icon: "none",
            duration: 800,
            mask: !0
        }), !1) : "" == this.data.classNo ? (wx.showToast({
            title: "请选择班级",
            icon: "none",
            duration: 800,
            mask: !0
        }), !1) : void wx.navigateTo({
            url: "/pages/user/selectstutentnum?schoolId=" + this.data.schoolId + "&studentNo=" + this.data.studentNo + "&classNo=" + this.data.classNo
        });
    },
    gotoShili: function() {
        wx.navigateTo({
            url: "/pages/user/shili"
        });
    },
    bindPickerChange: function(a) {
        var t = a.detail.value;
        this.setData({
            schoolId: this.data.schoolList[t].schoolId,
            schoolName: this.data.schoolList[t].schoolName,
            indexS: t
        });
    },
    updateUserTypetea: function() {
        this.setData({
            userType: 2
        });
    },
    updateUserTypestu: function() {
        this.setData({
            userType: 1
        });
    },
    uploadimage: function() {
        var e = this;
        return "" == e.data.schoolId ? (wx.showToast({
            title: "请先选择学校",
            icon: "none",
            duration: 800,
            mask: !0
        }), !1) : "" == e.data.studentNo || "" == e.data.realName ? (wx.showToast({
            title: "学号和姓名不能为空",
            icon: "none",
            duration: 800,
            mask: !0
        }), !1) : void wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "camera" ],
            success: function(s) {
                var i = {};
                i.openid = o.globalData.userStatus.openid, i.schoolId = e.data.schoolId, i.imageType = 1, 
                i.batchNo = "";
                var n = a.sortKey(i, o.globalData.datakey), l = t.hexMD5(n);
                wx.showLoading({
                    title: "加载中...",
                    mask: !0
                }), wx.uploadFile({
                    url: o.globalData.apiurl + "f/api/uploadImg",
                    filePath: s.tempFilePaths[0],
                    name: "fileImg",
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    formData: {
                        openid: o.globalData.userStatus.openid,
                        schoolId: e.data.schoolId,
                        userType: e.data.userType,
                        studentNo: e.data.studentNo,
                        realName: e.data.realName,
                        imageType: 1,
                        batchNo: "",
                        sign: l
                    },
                    success: function(a) {
                        wx.hideLoading();
                        var t = JSON.parse(a.data);
                        200 != a.statusCode ? wx.showToast({
                            title: "人数过多请稍后重试，服务器异常uploadFile500",
                            icon: "none",
                            duration: 1e3
                        }) : "000000" == t.retcode ? e.setData({
                            fileName: t.fileName,
                            filePath: t.fileUrl
                        }) : wx.showToast({
                            title: t.retmsg,
                            icon: "none",
                            duration: 2e3,
                            mask: !0
                        });
                    },
                    fail: function() {
                        wx.hideLoading(), wx.showToast({
                            title: "uploadFile异常",
                            icon: "none",
                            duration: 1e3
                        });
                    }
                });
            }
        });
    },
    inputStudentNo: function(a) {
        var t = a.detail.value;
        this.setData({
            studentNo: t
        });
    },
    inputRealname: function(a) {
        this.setData({
            realName: a.detail.value
        });
    },
    createAuthInfo: function() {
        var e = this;
        if ("" == e.data.schoolId) return wx.showToast({
            title: "请选择学校",
            icon: "none",
            duration: 800,
            mask: !0
        }), !1;
        if ("" == e.data.studentNo || "" == e.data.realName) return wx.showToast({
            title: "学号和姓名不能为空",
            icon: "none",
            duration: 800,
            mask: !0
        }), !1;
        if (1 == e.data.attestStatus && "" == e.data.filePath) return wx.showToast({
            title: "请上传证明照片",
            icon: "none",
            duration: 800,
            mask: !0
        }), !1;
        if (0 == e.data.xieyi) return wx.showToast({
            title: "请阅读并勾选同意用户协议与隐私政策",
            icon: "none",
            duration: 800,
            mask: !0
        }), !1;
        var s = {};
        s.openid = o.globalData.userStatus.openid, s.studentNo = e.data.studentNo, s.idCard = e.data.idCard, 
        s.schoolId = e.data.schoolId, s.classNo = e.data.classNo, s.userType = e.data.userType;
        var i = a.sortKey(s, o.globalData.datakey);
        s.realName = e.data.realName, s.sign = t.hexMD5(i), s.brand = o.globalData.brand, 
        s.model = o.globalData.model, wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: o.globalData.apiurl + "f/api/authUser",
            data: s,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                if (wx.hideLoading(), 200 != a.statusCode) wx.showToast({
                    title: "人数过多请稍后重试，服务器异常authUser500",
                    icon: "none",
                    duration: 1e3
                }); else if ("000000" == a.data.retcode) {
                    o.globalData.getHome = 0, o.globalData.userStatus.openid = s.openid, o.globalData.schoolInfo.schoolId = s.schoolId, 
                    o.globalData.userStatus.userid = a.data.userid, o.globalData.userStatus.approveStatus = a.data.approveStatus, 
                    o.globalData.userStatus.isExist = 1, o.globalData.userStatus.studentNo = e.data.studentNo, 
                    o.globalData.userStatus.userType = e.data.userType;
                    var t = setTimeout(function() {
                        wx.switchTab({
                            url: "/pages/index/index"
                        }), clearTimeout(t);
                    }, 1e3);
                } else wx.showToast({
                    title: a.data.retmsg,
                    icon: "none",
                    duration: 2e3,
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