var e = require("../../@babel/runtime/helpers/defineProperty"), a = getApp();

Page({
    data: e(e(e(e(e(e(e({
        navbarData: {
            showCapsule: 1,
            title: "记录详情"
        },
        navheight: a.globalData.navBarHeight,
        winHeight: a.globalData.windowHeight,
        currentData: 0,
        clock: "",
        isLocation: !1,
        latitude: 39.908836,
        longitude: 116.397463,
        zoomRatio: 16,
        markers: [],
        covers: [],
        polyline: [],
        meters: 0,
        time: "0:00:00",
        detailid: "",
        centerLatitude: 0,
        centerLongitude: 0,
        headUrl: "",
        studentNo: "",
        realName: "",
        schoolName: "",
        lineName: "",
        areaName: "",
        averagePace: "",
        actualMileage: "",
        startTime: "",
        endTime: "",
        runTime: "",
        calorie: ""
    }, "averagePace", ""), "averageSpeed", ""), "stepNumber", ""), "averageStep", ""), "averageStride", ""), "runBitmap", ""), "sexNo", 1),
    getAllTrajectory: function() {
        var e = this, t = a.globalData.userStatus.openid, i = e.data.detailid;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "/f/api/getAllTrajectory2?openid=" + t + "&detailId=" + i,
            method: "POST",
            success: function(a) {
                if (wx.hideLoading(), 200 != a.statusCode) wx.showToast({
                    title: "人数过多请稍后重试，服务器异常getAllTrajectory500",
                    icon: "error",
                    duration: 1e3
                }); else if ("000000" == a.data.retcode) {
                    var t = a.data.trailList, i = a.data.deviceList, o = [];
                    (n = {
                        id: 0
                    }).latitude = a.data.startLatitude, n.longitude = a.data.startLongitude, n.iconPath = "/images/qid.png", 
                    n.width = 25, n.height = 25, o.push(n), (n = {
                        id: 1
                    }).latitude = a.data.endLatitude, n.longitude = a.data.endLongitude, n.iconPath = "/images/zdian.png", 
                    n.width = 25, n.height = 25, o.push(n);
                    for (var r = 0; r < i.length; r++) {
                        var n;
                        (n = {}).id = i[r].deviceId, n.latitude = i[r].latitude, n.longitude = i[r].longitude, 
                        1 == i[r].deviceStatus ? n.iconPath = "/images/grey" + i[r].lineOrder + ".png" : n.iconPath = "/images/blue" + i[r].lineOrder + ".png", 
                        n.width = 25, n.height = 25, o.push(n);
                    }
                    var d = [], l = [], s = {};
                    for (r = 0; r < t.length; r++) 1 == t[r].positionFlag ? l.push(t[r]) : 3 == t[r].positionFlag ? (l.length >= 2 && (s.points = l, 
                    s.width = 4, s.color = "#0083ff", d.push(s)), s = {}, (l = []).push(t[r])) : 4 == t[r].positionFlag && (l.push(t[r]), 
                    s.points = l, s.width = 4, s.color = "#000000", s.dottedLine = !0, d.push(s), l = [], 
                    s = {});
                    l.length >= 2 && (s.points = l, s.width = 4, s.color = "#0083ff", d.push(s)), e.setData({
                        zoomRatio: a.data.zoomRatio - 2,
                        polyline: d,
                        latitude: t[0].latitude,
                        longitude: t[0].longitude,
                        markers: o
                    });
                } else wx.showToast({
                    title: a.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常getAllTrajectory",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    getExerciseDetail: function() {
        var e = this, t = a.globalData.userStatus.openid, i = e.data.detailid;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: a.globalData.apiurl + "/f/api/getExerciseDetail?openid=" + t + "&detailId=" + i + "&schoolId=",
            method: "POST",
            success: function(a) {
                wx.hideLoading(), 200 != a.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常getExerciseDetail500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == a.data.retcode ? e.setData({
                    actualMileage: a.data.actualMileage,
                    areaName: a.data.areaName,
                    averagePace: a.data.averagePace,
                    averageSpeed: a.data.averageSpeed,
                    averageStep: a.data.averageStep,
                    averageStride: a.data.averageStride,
                    headUrl: a.data.headUrl,
                    calorie: a.data.calorie,
                    lineName: a.data.lineName,
                    realName: a.data.realName,
                    startTime: a.data.startTime,
                    schoolName: a.data.schoolName,
                    studentNo: a.data.studentNo,
                    stepNumber: a.data.stepNumber,
                    runTime: a.data.runTime,
                    sexNo: a.data.sexNo
                }) : wx.showToast({
                    title: a.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常getExerciseDetail",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    onLoad: function(e) {
        this.setData({
            actualMileage: e.actualmileage,
            averagePace: e.averagepace,
            calorie: e.calorie,
            headUrl: e.headurl,
            detailid: e.detailid,
            realName: e.realname,
            runbitmap: e.runbitmap,
            runTime: e.runtime,
            sexNo: e.sexno,
            startTime: e.starttime,
            schoolName: e.schoolname
        });
    },
    showGuiJi: function(e) {
        var a = [ {
            points: e,
            color: "#0083ff",
            width: 4
        } ];
        this.setData({
            polyline: a
        });
    },
    onReady: function() {},
    onShow: function() {
        this.getAllTrajectory();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});