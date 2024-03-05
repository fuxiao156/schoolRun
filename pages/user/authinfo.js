var e = require("../../@babel/runtime/helpers/defineProperty"), a = (require("../../2C088A0753E228FF4A6EE200B445E640.js"), 
require("../../83B41FC153E228FFE5D277C6CA15E640.js"), getApp());

Page({
    data: e(e(e(e(e(e(e({
        navbarData: {
            showCapsule: 1,
            title: "身份信息"
        },
        navheight: a.globalData.navBarHeight,
        headUrl: "",
        realName: "",
        mobileNo: "",
        userType: 1,
        schoolName: "",
        collegeName: "",
        className: ""
    }, "realName", ""), "studentNo", ""), "evidence", ""), "statusInfo", ""), "schoolId", ""), "sexName", ""), "gradeName", ""),
    queryStudentInfo: function() {
        var t = {}, o = this;
        t.openid = a.globalData.userStatus.openid, wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "f/api/queryStudentInfo",
            data: t,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                wx.hideLoading(), 200 != a.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常queryStudentInfo500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == a.data.retcode ? o.setData(e(e(e(e(e(e(e({
                    headUrl: a.data.headUrl,
                    realName: a.data.realName,
                    mobileNo: a.data.mobileNo,
                    userType: a.data.userType,
                    schoolName: a.data.schoolName,
                    collegeName: a.data.collegeName,
                    className: a.data.className
                }, "realName", a.data.realName), "studentNo", a.data.studentNo), "evidence", a.data.evidence), "statusInfo", a.data.statusInfo), "schoolId", a.data.schoolId), "sexName", a.data.sexName), "gradeName", a.data.gradeName)) : wx.showToast({
                    title: a.data.retmsg,
                    icon: "error",
                    duration: 1e3,
                    mask: !0
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常queryStudentInfo",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    onLoad: function(e) {},
    onShow: function() {
        this.queryStudentInfo();
    },
    onShareAppMessage: function() {}
});