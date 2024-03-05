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
        polygons: [],
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
            url: a.globalData.apiurl + "/f/api/getAllTrajectory?openid=" + t + "&detailId=" + i,
            method: "POST",
            success: function(a) {
                if (wx.hideLoading(), 200 != a.statusCode) wx.showToast({
                    title: "人数过多请稍后重试，服务器异常getAllTrajectory500",
                    icon: "error",
                    duration: 1e3
                }); else if ("000000" == a.data.retcode) {
                    var t = a.data.trailList, i = a.data.deviceList, o = [], d = {
                        id: 0,
                        latitude: a.data.startLatitude,
                        longitude: a.data.startLongitude,
                        iconPath: "/images/qid.png",
                        width: 25,
                        height: 25
                    };
                    o.push(d);
                    var n = {
                        id: 1,
                        latitude: a.data.endLatitude,
                        longitude: a.data.endLongitude,
                        iconPath: "/images/zdian.png",
                        width: 25,
                        height: 25
                    };
                    o.push(n);
                    for (var r = 0; r < i.length; r++) {
                        var l = {};
                        l.id = i[r].deviceId, l.latitude = i[r].latitude, l.longitude = i[r].longitude, 
                        1 == i[r].deviceStatus ? l.iconPath = "/images/grey" + i[r].lineOrder + ".png" : l.iconPath = "/images/blue" + i[r].lineOrder + ".png", 
                        l.width = 25, l.height = 25, o.push(l);
                    }
                    var s = [], u = [], g = {};
                    for (r = 0; r < t.length; r++) 1 == t[r].positionFlag ? u.push(t[r]) : 3 == t[r].positionFlag ? (u.length >= 2 && (g.points = u, 
                    g.width = 4, g.color = "#0083ff", s.push(g)), g = {}, (u = []).push(t[r])) : 4 == t[r].positionFlag && (u.push(t[r]), 
                    g.points = u, g.width = 4, g.color = "#000000", g.dottedLine = !0, s.push(g), u = [], 
                    g = {});
                    u.length >= 2 && (g.points = u, g.width = 4, g.color = "#0083ff", s.push(g));
                    var c = [ {
                        points: a.data.polygonArray,
                        strokeWidth: 2,
                        strokeColor: "#3875FF",
                        fillColor: "#3875FF30"
                    } ];
                    e.setData({
                        zoomRatio: a.data.zoomRatio - 2,
                        polyline: s,
                        polygons: c,
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
            detailid: e.detailid
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
        this.getAllTrajectory(), this.getExerciseDetail();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});