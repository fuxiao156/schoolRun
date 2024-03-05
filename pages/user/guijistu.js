var e = require("../../@babel/runtime/helpers/defineProperty"), a = getApp();

Page({
    data: e(e(e(e(e(e(e(e(e({
        navbarData: {
            showCapsule: 1,
            title: "记录详情"
        },
        navheight: a.globalData.navBarHeight,
        winHeight: a.globalData.windowHeight,
        currentData: 0,
        clock: "",
        isLocation: !1,
        latitude: "28.23529",
        longitude: "112.93134",
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
    }, "averagePace", ""), "averageSpeed", ""), "stepNumber", ""), "averageStep", ""), "averageStride", ""), "runBitmap", ""), "sexNo", 1), "openid", ""), "userid", ""),
    getAllTrajectory: function() {
        var e = this, t = e.data.openid, i = e.data.detailid;
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
                    var t = [], i = a.data.trailList, o = a.data.deviceList, d = [];
                    (r = {
                        id: 0
                    }).latitude = a.data.startLatitude, r.longitude = a.data.startLongitude, r.iconPath = "/images/qid.png", 
                    r.width = 25, r.height = 25, d.push(r), (r = {
                        id: 1
                    }).latitude = a.data.endLatitude, r.longitude = a.data.endLongitude, r.iconPath = "/images/zdian.png", 
                    r.width = 25, r.height = 25, d.push(r);
                    for (var n = 0; n < o.length; n++) {
                        (r = {}).id = o[n].deviceId, r.latitude = o[n].latitude, r.longitude = o[n].longitude, 
                        1 == o[n].deviceStatus ? r.iconPath = "/images/dak.png" : r.iconPath = "/images/21_position.png", 
                        r.width = 25, r.height = 25, d.push(r);
                    }
                    for (n = 0; n < i.length; n++) {
                        var r;
                        (r = {}).latitude = parseFloat(i[n].latitude), r.longitude = parseFloat(i[n].longitude), 
                        t.push(r);
                    }
                    var l = [];
                    for (n = 0; n < i.length; n++) {
                        var s = {};
                        i[n].points.length >= 2 && (s.points = i[n].points, s.width = 4, 3 == i[n].type ? (s.color = "#000000", 
                        s.dottedLine = !0) : s.color = "#0083ff", l.push(s));
                    }
                    e.setData({
                        zoomRatio: a.data.zoomRatio - 2,
                        polyline: l,
                        latitude: i[0].points[0].latitude,
                        longitude: i[0].points[0].longitude,
                        markers: d
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
        var e = this, t = e.data.openid, i = e.data.detailid;
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
            detailid: e.detailid,
            openid: e.openid,
            userid: e.userid
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