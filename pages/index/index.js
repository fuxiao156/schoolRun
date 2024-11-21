var e = getApp(), t = require("../../2C088A0753E228FF4A6EE200B445E640.js"), a = require("../../83B41FC153E228FFE5D277C6CA15E640.js");
var posInfo = require("./data/pos");

Page({
    data: {
        nvabarData: {
            showCapsule: 0,
            title: "运动"
        },
        navheight: e.globalData.navBarHeight,
        winWidth: e.globalData.windowWidth,
        winHeight: e.globalData.windowHeight,
        userInfo: e.globalData.userInfo,
        schoolInfo: e.globalData.schoolInfo,
        userStatus: e.globalData.userStatus,
        currentData: 0,
        deviceId: "",
        runExplain1: "",
        runExplain2: "",
        runExplain3: "",
        columnCanvasData: {
            canvasId: "columnCanvas"
        },
        runType: 0,
        hisdata: {
            datedata: [ "9.21" ],
            kilodata: [ 0 ]
        },
        locationEnabled: !1,
        endcontent: "",
        endcontent1: "",
        endcontent2: "",
        runstatus: 0,
        isBlueOpen: !1,
        venueFlag: 0,
        messageList: [],
        messageIds: "",
        messageSize: 0,
        index: 0,
        noticeStatus: !0,
        dayStartRunStatus: 0,
        timeStartRunStatus: 0,
        timeStatus: 1,
        fileId: 0,
        applyCount: 2,
        suspendStatus: 0,
        areaList: [],
        indexArea: 0,
        areaNo: ""
    },
    bindChangePicker: function(t) {
        var a = t.detail.value;
        e.globalData.schoolInfo.indexArea = a, e.globalData.schoolInfo.areaNo = this.data.areaList[a]?.areaNo, 
        wx.setStorageSync("schoolInfo", e.globalData.schoolInfo), this.setData({
            areaNo: this.data.areaList[a]?.areaNo,
            indexArea: a
        });
    },
    swiperLeft: function() {
        this.setData({
            index: this.data.index - 1
        });
    },
    swiperRight: function() {
        this.setData({
            index: this.data.index + 1
        });
    },
    bindchangeNotice: function(e) {
        this.setData({
            index: e.detail.current
        });
    },
    openLocationAdapter: function() {
        var e = this, t = this.selectComponent("#gpsalertview");
        wx.getSystemInfo({
            success: function(a) {
                if (e.setData({
                    locationEnabled: a.locationEnabled
                }), !e.data.locationEnabled) return t.showAlertView(), !1;
            }
        });
    },
    closeEvent2: function() {
        var e = this.selectComponent("#gpsalertview");
        e.hideAlertView(), this.openLocationAdapter(), this.data.locationEnabled || e.showAlertView();
    },
    openBluetoothAdapter: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    isBlueOpen: t.bluetoothEnabled
                });
                var a = e.selectComponent("#blueView");
                if (!e.data.isBlueOpen) return a.showAlertView(), !1;
            }
        });
    },
    closeBlueEvent: function() {
        this.selectComponent("#blueView").hideAlertView(), this.openBluetoothAdapter();
    },
    getTimeStatus: function() {
        var t = this,
          a = this.selectComponent("#timeview"),
          o = Math.round(new Date().getTime() / 1e3).toString(),
          n = e.globalData.userStatus.userid,
          i = e.globalData.userStatus.openid,
          r = e.globalData.schoolInfo.schoolId,
          s = e.globalData.schoolInfo.runType;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: e.globalData.apiurl + "/f/api/getTimeStatus?mobileTime=" + o + "&userid=" + n + "&openid=" + i + "&schoolId=" + r + "&runType=" + s,
            method: "POST",
            success: function(e) {
                if (wx.hideLoading(), 200 != e.statusCode) wx.showToast({
                    title: "人数过多请稍后重试，服务器异常getTimeStatus500",
                    icon: "none",
                    duration: 1e3
                }); else if (t.setData({
                    timeStatus: e.data.timeStatus,
                    timeStartRunStatus: e.data.timeStartRunStatus
                }), 0 == e.data.timeStatus) return a.showAlertView(), !1;
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常getTimeStatus2",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    closeTimeEvent: function() {
        this.selectComponent("#timeview").hideAlertView(), this.getTimeStatus();
    },
    goTochang: function() {
        var t = this.selectComponent("#blueView"), a = this.selectComponent("#gpsalertview");
        return this.openBluetoothAdapter(), this.data.isBlueOpen ? (this.openLocationAdapter(), 
        this.data.locationEnabled ? 0 == this.data.dayStartRunStatus ? (wx.showToast({
            title: "未在运动日期",
            icon: "error",
            duration: 2e3
        }), !1) : 0 == this.data.timeStartRunStatus ? (wx.showToast({
            title: "未在运动时间",
            icon: "error",
            duration: 1e3,
            mask: !0
        }), !1) : void (e.globalData.userLocationBackground && e.globalData.userLocation && 1 == e.globalData.userStatus.isExist ? wx.navigateTo({
            url: "/pages/changguang/cglist"
        }) : wx.navigateTo({
            url: "/pages/index/profile"
        })) : (a.showAlertView(), !1)) : (t.showAlertView(), !1);
    },
    schoolRun: function() {
        this.alertview.hideAlertView(), wx.navigateTo({
            url: "/pages/index/xianlu?runType=1&suspendStatus=" + this.data.suspendStatus
        });
    },
    freeRun: function() {
        this.alertview.hideAlertView(), wx.navigateTo({
            url: "/pages/index/paobu?runType=2&lineId=0&startType=0&suspendStatus=" + this.data.suspendStatus
        });
    },
    bindchange: function(e) {
        this.setData({
            currentData: e.detail.current
        });
    },
    onLoad: function() {
      console.log('posInfo的值为',posInfo,posInfo.pos.length)
        this.alertview = this.selectComponent("#endalertview"), this.gpsalertview = this.selectComponent("#gpsalertview"), 
        this.userlocationalertview = this.selectComponent("#userlocationalertview"), this.authview = this.selectComponent("#authview"), 
        this.endview = this.selectComponent("#endalertview2"), this.inselectalertview2 = this.selectComponent("#inselectalertview2"), 
        this.inselectalertview3 = this.selectComponent("#inselectalertview3"), this.endalertview = this.selectComponent("#endalertview"), 
        this.endalertview3 = this.selectComponent("#endalertview3"), this.inselectalertview = this.selectComponent("#inselectalertview");
    },
    gotoAuth: function() {
        e.globalData.userLocationBackground && e.globalData.userLocation && 1 == e.globalData.userStatus.isExist ? (this.authview.hideAlertView(), 
        wx.navigateTo({
            url: "/pages/user/studentauth"
        })) : wx.navigateTo({
            url: "/pages/index/profile"
        });
    },
    authLogin: function() {
        wx.login({
            success: function(t) {
                wx.request({
                    url: e.globalData.apiurl + "/f/wx/authLogin?code=" + t.code,
                    success: function(t) {
                        200 != t.statusCode ? wx.showToast({
                            title: "人数过多请稍后重试,服务器异常authLogin500",
                            icon: "none",
                            duration: 2e3
                        }) : "000000" == t.data.retcode ? (e.globalData.userStatus.openid = t.data.openid, 
                        e.globalData.userStatus.userid = t.data.userid, e.globalData.userStatus.approveStatus = t.data.approveStatus, 
                        e.globalData.userStatus.isExist = 1, wx.setStorageSync("userStatus", e.globalData.userStatus), 
                        wx.setStorageSync("openid", t.data.openid), wx.setStorageSync("userid", t.data.userid)) : wx.showToast({
                            title: t.data.retmsg,
                            icon: "error",
                            duration: 2e3,
                            mask: !0
                        });
                    },
                    fail: function(e) {
                        wx.showToast({
                            title: "人数过多请稍后重试,网络或服务器异常authLogin",
                            icon: "none",
                            duration: 2e3
                        });
                    }
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "wx.login方法异常",
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                });
            }
        });
    },
    runSet: function() {
        // var t = e.globalData.userStatus.openid, a = e.globalData.userStatus.userid, o = this;
        var t = wx.getStorageSync("userid"), a = wx.getStorageSync("openid"), o = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: e.globalData.apiurl + "/f/api/runSet?openid=" + a + "&userid=" + t,
            method: "POST",
            success: function(t) {
                if (wx.hideLoading(), 200 != t.statusCode) wx.showToast({
                    title: "人数过多请稍后重试，服务器异常runSet500",
                    icon: "none",
                    duration: 1e3
                }); else if ("000000" == t.data.retcode) {
                    e.globalData.runSet = 1;
                    var a = e.globalData.schoolInfo.indexArea;
                    null != a && 0 != a ? (e.globalData.schoolInfo.areaList = t.data.areaList, o.setData({
                        areaList: t.data.areaList,
                        indexArea: a,
                        areaNo: t.data.areaList[a]?.areaNo
                    })) : (e.globalData.schoolInfo.areaList = t.data.areaList, e.globalData.schoolInfo.indexArea = 0, 
                    e.globalData.schoolInfo.areaNo = t.data.areaList[0]?.areaNo, o.setData({
                        areaList: t.data.areaList,
                        indexArea: a,
                        areaNo: t.data.areaList[0]?.areaNo
                    }));
                } else wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常runSet",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    getHome: function() {
        var t = wx.getStorageSync("userid"), a = wx.getStorageSync("openid"), o = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: e.globalData.apiurl + "f/api/getHome?openid=" + a + "&userid=" + t,
            method: "POST",
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常getHome500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode ? (e.globalData.getHome = 1, e.globalData.userInfo.mileageTarget = t.data.mileageTarget, 
                e.globalData.userInfo.runTarget = t.data.runTarget, e.globalData.userInfo.sportScore = t.data.sportScore, 
                e.globalData.venueFlag = t.data.venueFlag, e.globalData.userInfo.avatarUrl = t.data.headUrl, 
                e.globalData.userInfo.nickName = t.data.nickName, e.globalData.userInfo.realName = t.data.realName, 
                e.globalData.userInfo.mobileNo = t.data.mobileNo, e.globalData.userInfo.sex = t.data.sex, 
                e.globalData.schoolInfo.schoolId = t.data.schoolId, e.globalData.schoolInfo.academicYear = t.data.academicYear, 
                e.globalData.schoolInfo.term = t.data.term, e.globalData.schoolInfo.schoolStatus = t.data.schoolStatus, 
                e.globalData.schoolInfo.runType = t.data.runType, e.globalData.schoolInfo.accessType = t.data.accessType, 
                e.globalData.schoolInfo.prescription = t.data.prescription, e.globalData.schoolInfo.uniappStatus = t.data.uniappStatus, 
                e.globalData.schoolInfo.uniappUrl = t.data.uniappUrl, e.globalData.schoolInfo.runScoreType = t.data.runScoreType, 
                e.globalData.schoolInfo.runScoreStatus = t.data.runScoreStatus, e.globalData.schoolInfo.runRegular = t.data.runRegular || 1, 
                e.globalData.schoolInfo.polygonStatus = t.data.polygonStatus, e.globalData.userStatus.openid = t.data.openid, 
                e.globalData.userStatus.userid = t.data.userid, e.globalData.userStatus.approveStatus = t.data.approveStatus, 
                e.globalData.userStatus.isExist = t.data.isExist, e.globalData.userStatus.studentNo = t.data.studentNo, 
                e.globalData.userStatus.userType = t.data.userType, wx.setStorageSync("userStatus", e.globalData.userStatus), 
                wx.setStorageSync("schoolInfo", e.globalData.schoolInfo), wx.setStorageSync("userInfo", e.globalData.userInfo), 
                wx.setStorageSync("openid", t.data.openid), wx.setStorageSync("userid", t.data.userid), 
                o.setData({
                    userInfo: e.globalData.userInfo,
                    schoolInfo: e.globalData.schoolInfo,
                    runType: t.data.runType,
                    applyCount: t.data.applyCount,
                    runExplain1: t.data.runExplain1,
                    runExplain2: t.data.runExplain2,
                    runExplain3: t.data.runExplain3,
                    venueFlag: t.data.venueFlag,
                    dayStartRunStatus: t.data.dayStartRunStatus,
                    message: t.data.message,
                    suspendStatus: t.data.suspendStatus
                })) : wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常getHome",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    getPersonaldata: function() {
        var t = wx.getStorageSync("userid"), a = wx.getStorageSync("openid"), o = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: e.globalData.apiurl + "/f/api/getPersonaldata?openid=" + a + "&userid=" + t,
            method: "POST",
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常getPersonaldata500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode ? (e.globalData.userInfo.mileage = t.data.mileage, 
                e.globalData.userInfo.validCount = t.data.validCount, e.globalData.userInfo.mileagePercent = t.data.mileagePercent, 
                e.globalData.userInfo.countPercent = t.data.countPercent, e.globalData.userInfo.ranking = t.data.ranking || 0, 
                e.globalData.userInfo.runScore = t.data.runScore, e.globalData.userInfo.scorePercent = t.data.scorePercent, 
                e.globalData.userInfo.morningRunCount = t.data.morningRunCount, e.globalData.getPersonaldata = 1, 
                wx.setStorageSync("userInfo", e.globalData.userInfo), o.setData({
                    userInfo: e.globalData.userInfo
                })) : wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常getPersonaldata",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    removeRun: function() {
        wx.removeStorageSync("detailId"), wx.removeStorageSync("mileage"), wx.removeStorageSync("runstatus"), 
        wx.removeStorageSync("polylinecache"), wx.removeStorageSync("pointscache"), wx.removeStorageSync("runmeters"), 
        wx.removeStorageSync("schoolId"), wx.removeStorageSync("uploadDetailNum"), wx.removeStorageSync("uploadType"), 
        wx.removeStorageSync("runCheckStatus"), wx.removeStorageSync("lastDkDeviceid"), 
        wx.removeStorageSync("runpoints"), wx.removeStorageSync("mileageTarget"), wx.removeStorageSync("maxSpaceTime"), 
        wx.removeStorageSync("maxTime"), wx.removeStorageSync("minTime"), wx.removeStorageSync("deviceType"), 
        wx.removeStorageSync("filePath"), wx.removeStorageSync("startRunDate"), wx.removeStorageSync("runType"), 
        wx.removeStorageSync("startType"), wx.removeStorageSync("initlatitude"), wx.removeStorageSync("initlongitude"), 
        wx.removeStorageSync("lineArray"), wx.removeStorageSync("markers"), wx.removeStorageSync("punchCardSum"), 
        wx.removeStorageSync("runBitmap"), wx.removeStorageSync("timeoutArray"), wx.removeStorageSync("timerunArray"), 
        wx.removeStorageSync("timestopsum"), wx.removeStorageSync("stoppoint"), this.inselectalertview3.hideAlertView();
    },
    getExerciseStatus: function() {
        var t = e.globalData.userStatus.userid, a = e.globalData.userStatus.openid, o = wx.getStorageSync("detailId"), n = this, i = {};
        i.openid = a, i.userid = t, wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: e.globalData.apiurl + "/f/api/getExerciseStatus?openid=" + a + "&detailId=" + o,
            method: "POST",
            success: function(e) {
                if (wx.hideLoading(), 200 != e.statusCode) wx.showToast({
                    title: "人数过多请稍后重试，服务器异常venueCardTotal500",
                    icon: "none",
                    duration: 1e3
                }); else if ("000000" == e.data.retcode) {
                    if (!n.data.locationEnabled) {
                        var t = wx.getStorageSync("positionCount") || 0;
                        wx.setStorageSync("positionCount", t + 1);
                    }
                    if (1 == e.data.runStatus) {
                        var a = wx.getStorageSync("mileage");
                        a = Math.floor(100 * a) / 100, n.setData({
                            endcontent: "此次跑步已结束！您本次跑程距离为",
                            endcontent1: a,
                            endcontent2: "km，防止数据丢失，请截图后！！再结束上次跑步数据？"
                        }), n.inselectalertview3.showAlertView();
                    } else if (2 == e.data.runStatus) {
                        a = wx.getStorageSync("mileage");
                        a = Math.floor(100 * a) / 100, n.setData({
                            endcontent: "暂无运动明细！您本次跑程距离为",
                            endcontent1: a,
                            endcontent2: "km，防止数据丢失，请截图后！！再结束上次跑步数据？"
                        }), n.inselectalertview3.showAlertView();
                    } else {
                        a = wx.getStorageSync("mileage");
                        if ((a = Math.floor(100 * a) / 100) < wx.getStorageSync("mileageTarget")) n.setData({
                            endcontent: "本次跑步里程低于目标里程，若结束将记为",
                            endcontent1: "无效",
                            endcontent2: "，请确认是否结束？"
                        }), n.endview.showAlertView(); else {
                            var o = wx.getStorageSync("startType");
                            0 == o || 1 == o ? (n.setData({
                                endcontent: "您本次跑程距离为",
                                endcontent1: a,
                                endcontent2: "km，您确定要结束吗？"
                            }), n.endview.showAlertView()) : (n.setData({
                                endcontent: "您本次跑程距离为",
                                endcontent1: a,
                                endcontent2: "km，请前往打卡点结束？"
                            }), n.inselectalertview2.showAlertView());
                        }
                    }
                } else wx.showToast({
                    title: e.data.retmsg,
                    icon: "error",
                    duration: 1e3,
                    mask: !0
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试，网络或服务器异常getExerciseStatus",
                    icon: "error",
                    duration: 1e3,
                    mask: !0
                });
            }
        });
    },
    hisData: function() {
        var t = this, a = e.globalData.userStatus.userid, o = e.globalData.userStatus.openid;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: e.globalData.apiurl + "/f/api/getRunsituation?userid=" + a + "&openid=" + o + "&dateDay=",
            method: "POST",
            success: function(e) {
                if (wx.hideLoading(), 200 != e.statusCode) wx.showToast({
                    title: "人数过多请稍后重试，服务器异常venueCardTotal500",
                    icon: "none",
                    duration: 1e3
                }); else if ("000000" == e.data.retcode) {
                    for (var a = [], o = [], n = e.data.detailList, i = 0; i < n.length; i++) a.push(n[i].runDate), 
                    o.push(3 * n[i].mileage);
                    t.setData({
                        hisdata: {
                            datedata: a,
                            kilodata: o
                        }
                    });
                    var r = {};
                    r["columnCanvasData.yAxis.minData"] = 0, r["columnCanvasData.yAxis.maxData"] = 50, 
                    r["columnCanvasData.series"] = [ {
                        data: t.data.hisdata.kilodata
                    } ], r["columnCanvasData.xAxis.data"] = t.data.hisdata.datedata, t.setData(r);
                } else wx.showToast({
                    title: e.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常venueCardTotal",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    closeEvent: function() {
        this.alertview.hideAlertView();
    },
    closeEvent3: function() {
        this.selectComponent("#authview").hideAlertView();
    },
    cancelEvent: function() {
        var e = this.selectComponent("#blueView"), t = this.selectComponent("#gpsalertview");
        return this.openBluetoothAdapter(), this.data.isBlueOpen ? (this.openLocationAdapter(), 
        this.data.locationEnabled ? (this.endalertview3.hideAlertView(), void wx.navigateTo({
            url: "/pages/changguang/cgqiandao"
        })) : (t.showAlertView(), !1)) : (e.showAlertView(), !1);
    },
    venueCardEnd: function(t) {
        var a = this, o = e.globalData.userStatus.openid, n = e.globalData.userStatus.userid, i = wx.getStorageSync("venueId"), r = wx.getStorageSync("cardid"), s = wx.getStorageSync("deviceId"), l = Math.round(new Date().getTime() / 1e3).toString();
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: e.globalData.apiurl + "/f/api/venueCardStart?openid=" + o + "&userid=" + n + "&venueId=" + i + "&cardFlag=2&cardid=" + r + "&deviceId=" + s + "&timestamp=" + l + "&endFlag=1",
            method: "POST",
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常venueCardTotal500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode ? (e.globalData.getVenuedata = 1, wx.hideLoading(), 
                a.stopLocationUpdate(), wx.removeStorageSync("venueType"), wx.removeStorageSync("deviceId"), 
                wx.removeStorageSync("cardid"), wx.removeStorageSync("venueId"), wx.removeStorageSync("venueName"), 
                wx.removeStorageSync("itemName"), wx.removeStorageSync("cardRate"), wx.removeStorageSync("cardRateMax"), 
                wx.removeStorageSync("cardNumber"), wx.removeStorageSync("lastdata"), wx.removeStorageSync("runnewdata"), 
                wx.removeStorageSync("starttime"), wx.removeStorageSync("qiandaoStatus"), wx.removeStorageSync("detailsArray"), 
                wx.removeStorageSync("yxvalidCount"), wx.removeStorageSync("invalidCount"), wx.removeStorageSync("cardArray"), 
                a.endalertview3.hideAlertView()) : (wx.hideLoading(), wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3,
                    mask: !0
                }));
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常venueCardStart",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    getMessageList2: function() {
        var t = this, a = {};
        a.openid = wx.getStorageSync("openid"), a.userid = wx.getStorageSync("userid"), 
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: e.globalData.apiurl + "/f/api/getMessageList2",
            method: "POST",
            data: a,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                wx.hideLoading(), 200 != a.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常getMessageList2500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == a.data.retcode ? (t.setData({
                    messageList: a.data.messageList,
                    messageIds: a.data.messageIds,
                    messageSize: a.data.messageSize
                }), t.data.messageSize > 0 ? wx.setTabBarBadge({
                    index: 1,
                    text: t.data.messageSize.toString()
                }) : wx.removeTabBarBadge({
                    index: 2
                }), e.globalData.getMessageList2 = 1, e.globalData.messageSize = a.data.messageSize) : wx.showToast({
                    title: a.data.retmsg,
                    icon: "error",
                    duration: 1e3,
                    mask: !0
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试，网络或服务器异常getMessageList2",
                    icon: "error",
                    duration: 1e3,
                    mask: !0
                });
            }
        });
    },
    addMessageUser: function() {
        var t = this, a = {};
        a.openid = e.globalData.userStatus.openid, a.userid = e.globalData.userStatus.userid, 
        a.messageId = t.data.messageIds, wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: e.globalData.apiurl + "/f/api/addMessageUser",
            method: "POST",
            data: a,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                wx.hideLoading(), 200 != e.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常addMessageUser2500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == e.data.retcode ? t.setData({
                    messageSize: 0
                }) : wx.showToast({
                    title: e.data.retmsg,
                    icon: "error",
                    duration: 1e3,
                    mask: !0
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试，网络或服务器异常addMessageUser",
                    icon: "error",
                    duration: 1e3,
                    mask: !0
                });
            }
        });
    },
    invenueCardEnd: function(t) {
        var a = this, o = e.globalData.userStatus.openid, n = e.globalData.userStatus.userid, i = wx.getStorageSync("venueId"), r = wx.getStorageSync("cardid"), s = wx.getStorageSync("deviceId"), l = Math.round(new Date().getTime() / 1e3).toString();
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: e.globalData.apiurl + "/f/api/venueCardStart?openid=" + o + "&userid=" + n + "&venueId=" + i + "&cardFlag=2&cardid=" + r + "&deviceId=" + s + "&timestamp=" + l + "&endFlag=2",
            method: "POST",
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常venueCardTotal500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode ? (e.globalData.getVenuedata = 1, a.stopLocationUpdate(), 
                wx.removeStorageSync("venueType"), wx.removeStorageSync("deviceId"), wx.removeStorageSync("cardid"), 
                wx.removeStorageSync("venueId"), wx.removeStorageSync("venueName"), wx.removeStorageSync("itemName"), 
                wx.removeStorageSync("cardRate"), wx.removeStorageSync("cardRateMax"), wx.removeStorageSync("cardNumber"), 
                wx.removeStorageSync("lastdata"), wx.removeStorageSync("runnewdata"), wx.removeStorageSync("starttime"), 
                wx.removeStorageSync("qiandaoStatus"), wx.removeStorageSync("detailsArray"), wx.removeStorageSync("yxvalidCount"), 
                wx.removeStorageSync("invalidCount"), wx.removeStorageSync("cardArray"), a.inselectalertview.hideAlertView()) : wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3,
                    mask: !0
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试，网络或服务器异常venueCardStart",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    onShow: function() {
        var t;
        if (0 == e.globalData.getHome && this.getHome(), 0 == e.globalData.runSet) this.runSet(); else {
            var a = e.globalData.schoolInfo.indexArea;
            this.setData({
                areaList: e.globalData.schoolInfo.areaList,
                indexArea: a,
                areaNo: e.globalData.schoolInfo.areaList[a]?.areaNo
            });
        }
        (0 == e.globalData.getPersonaldata && this.getPersonaldata(), wx.getStorageSync("detailId") && this.getExerciseStatus(), 
        0 == e.globalData.getMessageList2 && this.getMessageList2(), null != wx.getStorageSync("cardid") && "" != wx.getStorageSync("cardid")) && (new Date() - wx.getStorageSync("lastdata") <= 216e5 ? ((t = wx.getStorageSync("yxvalidCount")) < wx.getStorageSync("cardNumber") ? this.setData({
            endcontent: "由于低于打卡有效规定次数，结束将",
            endcontent1: "无效",
            endcontent2: "此次记录。 您确定要结束吗？"
        }) : this.setData({
            endcontent: "您本次有效打卡次数为",
            endcontent1: t,
            endcontent2: "次，您确定要结束吗？"
        }), this.endalertview3.showAlertView()) : ((t = wx.getStorageSync("yxvalidCount")) < wx.getStorageSync("cardNumber") ? this.setData({
            endcontent: "由于低于打卡有效规定次数，结束将",
            endcontent1: "无效",
            endcontent2: "此次记录。 您确定要结束吗？"
        }) : this.setData({
            endcontent: "您本次有效打卡次数为",
            endcontent1: t,
            endcontent2: "次，您确定要结束吗？"
        }), this.inselectalertview.showAlertView()));
        0 == this.data.timeStartRunStatus && this.getTimeStatus();
    },
    writeFile: function() {
        var o = this, n = wx.getFileSystemManager(), i = wx.getStorageSync("detailId");
        n.access({
            path: wx.env.USER_DATA_PATH + "/" + i + ".txt",
            success: function(r) {
                wx.showLoading({
                    title: "加载中...",
                    mask: !0
                });
                var s = new Date().valueOf(), l = {};
                l.openid = wx.getStorageSync("openid"), l.fileType = 2, l.imageType = 1, l.batchNo = s;
                var u = t.sortKey(l, e.globalData.datakey), d = a.hexMD5(u);
                wx.uploadFile({
                    url: e.globalData.apiurl + "f/api/uploadFile",
                    filePath: wx.env.USER_DATA_PATH + "/" + i + ".txt",
                    name: "fileImg",
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    formData: {
                        openid: wx.getStorageSync("openid"),
                        fileType: 2,
                        imageType: 1,
                        schoolId: "",
                        batchNo: s,
                        sign: d,
                        detailId: i,
                        uploadImagetype: ""
                    },
                    success: function(e) {
                        wx.hideLoading(), 200 != e.statusCode ? wx.showToast({
                            title: "人数过多请稍后重试，服务器异常uploadFile500",
                            icon: "none",
                            duration: 1e3
                        }) : "000000" == e.data.retcode ? (o.data.fileId = e.data.fileId, n.unlink({
                            filePath: wx.env.USER_DATA_PATH + "/" + i + ".txt",
                            success: function(e) {},
                            fail: function(e) {}
                        })) : wx.showToast({
                            title: e.data.retmsg,
                            icon: "error",
                            duration: 1e3
                        });
                    },
                    fail: function(e) {
                        wx.hideLoading(), wx.showToast({
                            title: "人数过多请稍后重试,网络或服务器异常uploadFile",
                            icon: "none",
                            duration: 1e3
                        });
                    }
                });
            },
            fail: function(r) {
                if (wx.getStorageSync("runpoints")) {
                    var s = wx.getStorageSync("runpoints").join("\r\n");
                    n.writeFile({
                        filePath: wx.env.USER_DATA_PATH + "/" + i + ".txt",
                        data: s,
                        encoding: "utf8",
                        success: function(r) {
                            wx.showLoading({
                                title: "加载中...",
                                mask: !0
                            });
                            var s = new Date().valueOf(), l = {};
                            l.openid = wx.getStorageSync("openid"), l.fileType = 2, l.imageType = 1, l.batchNo = s;
                            var u = t.sortKey(l, e.globalData.datakey), d = a.hexMD5(u);
                            wx.uploadFile({
                                url: e.globalData.apiurl + "f/api/uploadFile",
                                filePath: wx.env.USER_DATA_PATH + "/" + i + ".txt",
                                name: "fileImg",
                                header: {
                                    "Content-Type": "multipart/form-data"
                                },
                                formData: {
                                    openid: wx.getStorageSync("openid"),
                                    fileType: 2,
                                    imageType: 1,
                                    schoolId: "",
                                    batchNo: s,
                                    sign: d,
                                    detailId: i,
                                    uploadImagetype: ""
                                },
                                success: function(e) {
                                    wx.hideLoading(), 200 != e.statusCode ? wx.showToast({
                                        title: "人数过多请稍后重试，服务器异常uploadFile500",
                                        icon: "none",
                                        duration: 1e3
                                    }) : "000000" == e.data.retcode ? (o.data.fileId = e.data.fileId, n.unlink({
                                        filePath: wx.env.USER_DATA_PATH + "/" + i + ".txt",
                                        success: function(e) {},
                                        fail: function(e) {}
                                    })) : wx.showToast({
                                        title: e.data.retmsg,
                                        icon: "error",
                                        duration: 1e3
                                    });
                                },
                                fail: function(e) {
                                    wx.hideLoading(), wx.showToast({
                                        title: "人数过多请稍后重试,网络或服务器异常uploadFile",
                                        icon: "none",
                                        duration: 1e3
                                    });
                                }
                            });
                        },
                        fail: function(e) {}
                    });
                }
            }
        });
    },
    stopRunBut: function() {
        0 == this.data.fileId && this.writeFile(), 4 == wx.getStorageSync("runType") ? this.apiStopRun() : this.stopRun();
    },
    apiStopRun: function() {
        var o = this;
        o.stopLocationUpdate(), wx.stopBluetoothDevicesDiscovery({
            success: function(e) {
                wx.closeBluetoothAdapter({
                    success: function(e) {}
                });
            }
        });
        var n = {}, i = Date.parse(new Date()) / 1e3, r = wx.getStorageSync("mileage") || 0;
        n.openid = e.globalData.userStatus.openid;
        // n.detailId = wx.getStorageSync("detailId"), 
        n.detailId = "820822011020241102201300819", 
        n.longitude = "112.932691", n.latitude = "28.156226", n.runType = 1, n.endTime = i, 
        n.mileage = r;
        console.log("n的值为",n)
        var s = t.sortKey(n, e.globalData.datakey);
        console.log('s的值为',s);
        n.sign = a.hexMD5(s), n.extentStatus = 1, n.continueCount = wx.getStorageSync("continueCount") || 0, 
        n.positionCount = wx.getStorageSync("positionCount") || 0, n.seqNo = wx.getStorageSync("seqNo") || 0, 
        n.runBitmap = wx.getStorageSync("runBitmap") || "", n.remarks = "999999";
        var l = wx.getStorageSync("timeoutArray") || [], u = wx.getStorageSync("timerunArray") || [], d = wx.getStorageSync("timestopsum") || 0, c = l.length;
        if (c == u.length) n.suspendTime = d / 1e3; else {
            var g = i - l[c - 1];
            n.suspendTime = (d + g) / 1e3;
        }
        n.suspendCount = c, n.searchCard = wx.getStorageSync("searchCard") || 0, n.punchBlueNum = wx.getStorageSync("punchBlueNum") || 0, 
        n.punchDistanceNum = wx.getStorageSync("punchDistanceNum") || 0, wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: e.globalData.apiurl + "/f/api/stopSchoolRun",
            method: "POST",
            data: n,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                wx.hideLoading(), 200 != e.statusCode ? wx.showToast({
                    title: "距离够后截图~联系客服~提供学号和截图。服务器异常stopSchoolRun",
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                }) : "000000" == e.data.retcode ? (o.getPersonaldata(), o.getHome(), wx.removeStorageSync("detailId"), 
                wx.removeStorageSync("mileage"), wx.removeStorageSync("runstatus"), wx.removeStorageSync("polylinecache"), 
                wx.removeStorageSync("pointscache"), wx.removeStorageSync("runmeters"), wx.removeStorageSync("schoolId"), 
                wx.removeStorageSync("uploadDetailNum"), wx.removeStorageSync("uploadType"), wx.removeStorageSync("runCheckStatus"), 
                wx.removeStorageSync("lastDkDeviceid"), wx.removeStorageSync("runpoints"), wx.removeStorageSync("mileageTarget"), 
                wx.removeStorageSync("maxSpaceTime"), wx.removeStorageSync("maxTime"), wx.removeStorageSync("minTime"), 
                wx.removeStorageSync("seqNo"), wx.removeStorageSync("deviceType"), wx.removeStorageSync("filePath"), 
                wx.removeStorageSync("startRunDate"), wx.removeStorageSync("runType"), wx.removeStorageSync("startType"), 
                wx.removeStorageSync("initlatitude"), wx.removeStorageSync("initlongitude"), wx.removeStorageSync("lineArray"), 
                wx.removeStorageSync("markers"), wx.removeStorageSync("punchCardSum"), wx.removeStorageSync("runBitmap"), 
                wx.removeStorageSync("timeoutArray"), wx.removeStorageSync("timerunArray"), wx.removeStorageSync("timestopsum"), 
                wx.removeStorageSync("stoppoint"), wx.removeStorageSync("punchBlueNum"), wx.removeStorageSync("punchDistanceNum"), 
                o.endview.hideAlertView()) : "000015" == e.data.retcode ? wx.showToast({
                    title: e.data.retmsg,
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                }) : wx.showToast({
                    title: "距离够后截图~联系客服~提供学号和截图。网络或服务器异常stopSchoolRun",
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "距离够后截图~联系客服~提供学号和截图。网络或服务器异常stopRun",
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                });
            }
        });
    },
    stopRun: function() {
        var o = this;
        o.stopLocationUpdate();
        var n = {}, i = Date.parse(new Date()), r = wx.getStorageSync("mileage") || 0;
        r = Math.ceil(100 * r) / 100, n.openid = e.globalData.userStatus.openid, n.detailId = wx.getStorageSync("detailId"), 
        n.longitude = "", n.latitude = "", n.endTime = i / 1e3, n.mileage = r, n.runType = wx.getStorageSync("runType");
        var s = t.sortKey(n, e.globalData.datakey);
        n.sign = a.hexMD5(s), n.extentStatus = 1, n.continueCount = wx.getStorageSync("continueCount") || 0, 
        n.positionCount = wx.getStorageSync("positionCount") || 0, n.seqNo = wx.getStorageSync("seqNo") || 0, 
        n.remarks = "999999";
        var l = wx.getStorageSync("timeoutArray") || [], u = wx.getStorageSync("timerunArray") || [], d = wx.getStorageSync("timestopsum") || 0, c = l.length;
        if (c == u.length) n.suspendTime = d / 1e3; else {
            var g = i - l[c - 1];
            n.suspendTime = (d + g) / 1e3;
        }
        n.suspendCount = c, wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: e.globalData.apiurl + "/f/api/stopRun",
            method: "POST",
            data: n,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                wx.hideLoading(), 200 != e.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常2500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == e.data.retcode ? (o.getPersonaldata(), o.getHome(), wx.removeStorageSync("detailId"), 
                wx.removeStorageSync("mileage"), wx.removeStorageSync("runstatus"), wx.removeStorageSync("polylinecache"), 
                wx.removeStorageSync("pointscache"), wx.removeStorageSync("runmeters"), wx.removeStorageSync("schoolId"), 
                wx.removeStorageSync("uploadDetailNum"), wx.removeStorageSync("uploadType"), wx.removeStorageSync("runCheckStatus"), 
                wx.removeStorageSync("lastDkDeviceid"), wx.removeStorageSync("runpoints"), wx.removeStorageSync("mileageTarget"), 
                wx.removeStorageSync("maxSpaceTime"), wx.removeStorageSync("maxTime"), wx.removeStorageSync("minTime"), 
                wx.removeStorageSync("deviceType"), wx.removeStorageSync("filePath"), wx.removeStorageSync("startRunDate"), 
                wx.removeStorageSync("runType"), wx.removeStorageSync("startType"), wx.removeStorageSync("initlatitude"), 
                wx.removeStorageSync("initlongitude"), o.endview.hideAlertView()) : "000015" == e.data.retcode ? wx.showToast({
                    title: e.data.retmsg,
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                }) : wx.showToast({
                    icon: "none",
                    title: e.data.retmsg,
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    icon: "none",
                    title: "人数过多请稍后重试，网络或服务器异常stopRun2",
                    duration: 1e3
                });
            }
        });
    },
    instopRunBut: function() {
        0 == this.data.fileId && this.writeFile(), 4 == wx.getStorageSync("runType") ? this.apiStopRun() : this.instopRun();
    },
    diyStopRun:function(detailId){
        var o = this;
        o.stopLocationUpdate();
        var n = {}, i = Date.parse(new Date()), r = wx.getStorageSync("mileage") || 0;
        r = Math.ceil(100 * r) / 100, n.openid = e.globalData.userStatus.openid, 
        n.detailId = detailId, 
        n.longitude = "", n.latitude = "",  n.endTime = i / 1e3, 
        //n.longitude = "", n.latitude = "", n.endTime = i / 1e3, 
        n.mileage = 1, n.runType = "1"; //n.runType = wx.getStorageSync("runType");
        var s = t.sortKey(n, e.globalData.datakey);
        console.log('s为',s);
        console.log('n为',n);
        console.log('sign为',a.hexMD5(s));
        n.sign = a.hexMD5(s),
        n.extentStatus = 1, n.continueCount = wx.getStorageSync("continueCount") || 0, 
        n.positionCount = wx.getStorageSync("positionCount") || 0, n.seqNo = wx.getStorageSync("seqNo") || 0, 
        n.remarks = "999999";
        var l = wx.getStorageSync("timeoutArray") || [], u = wx.getStorageSync("timerunArray") || [], d = wx.getStorageSync("timestopsum") || 0, c = l.length;
        if (c == u.length) n.suspendTime = d / 1e3; else {
            var g = i - l[c - 1];
            n.suspendTime = (d + g) / 1e3;
        }
        n.suspendCount = c;
         wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: e.globalData.apiurl + "/f/api/stopRun",
            method: "POST",
            data: n,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                wx.hideLoading(), 200 != e.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常stopRun2500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == e.data.retcode ? (o.getPersonaldata(), o.getHome(), wx.removeStorageSync("detailId"), 
                wx.removeStorageSync("mileage"), wx.removeStorageSync("runstatus"), wx.removeStorageSync("polylinecache"), 
                wx.removeStorageSync("pointscache"), wx.removeStorageSync("runmeters"), wx.removeStorageSync("schoolId"), 
                wx.removeStorageSync("uploadDetailNum"), wx.removeStorageSync("uploadType"), wx.removeStorageSync("runCheckStatus"), 
                wx.removeStorageSync("lastDkDeviceid"), wx.removeStorageSync("runpoints"), wx.removeStorageSync("mileageTarget"), 
                wx.removeStorageSync("maxSpaceTime"), wx.removeStorageSync("maxTime"), wx.removeStorageSync("minTime"), 
                wx.removeStorageSync("deviceType"), wx.removeStorageSync("filePath"), wx.removeStorageSync("startRunDate"), 
                wx.removeStorageSync("runType"), wx.removeStorageSync("startType"), wx.removeStorageSync("initlatitude"), 
                wx.removeStorageSync("initlongitude"), o.inselectalertview2.hideAlertView()) : "000015" == e.data.retcode ? wx.showToast({
                    title: e.data.retmsg,
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                }) : wx.showToast({
                    icon: "none",
                    title: e.data.retmsg,
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    icon: "none",
                    title: "人数过多请稍后重试，网络或服务器异常stopRun2",
                    duration: 1e3
                });
            }
        });

    },
    instopRun: function() {
        var o = this;
        o.stopLocationUpdate();
        var n = {}, i = Date.parse(new Date()), r = wx.getStorageSync("mileage") || 0;
        r = Math.ceil(100 * r) / 100, n.openid = e.globalData.userStatus.openid, n.detailId = wx.getStorageSync("detailId"), 
        n.longitude = "", n.latitude = "", n.endTime = i / 1e3, n.mileage = r, n.runType = wx.getStorageSync("runType");
        var s = t.sortKey(n, e.globalData.datakey);
        n.sign = a.hexMD5(s), n.extentStatus = 1, n.continueCount = wx.getStorageSync("continueCount") || 0, 
        n.positionCount = wx.getStorageSync("positionCount") || 0, n.seqNo = wx.getStorageSync("seqNo") || 0, 
        n.remarks = "999999";
        var l = wx.getStorageSync("timeoutArray") || [], u = wx.getStorageSync("timerunArray") || [], d = wx.getStorageSync("timestopsum") || 0, c = l.length;
        if (c == u.length) n.suspendTime = d / 1e3; else {
            var g = i - l[c - 1];
            n.suspendTime = (d + g) / 1e3;
        }
        n.suspendCount = c, wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: e.globalData.apiurl + "/f/api/stopRun",
            method: "POST",
            data: n,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                wx.hideLoading(), 200 != e.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常stopRun2500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == e.data.retcode ? (o.getPersonaldata(), o.getHome(), wx.removeStorageSync("detailId"), 
                wx.removeStorageSync("mileage"), wx.removeStorageSync("runstatus"), wx.removeStorageSync("polylinecache"), 
                wx.removeStorageSync("pointscache"), wx.removeStorageSync("runmeters"), wx.removeStorageSync("schoolId"), 
                wx.removeStorageSync("uploadDetailNum"), wx.removeStorageSync("uploadType"), wx.removeStorageSync("runCheckStatus"), 
                wx.removeStorageSync("lastDkDeviceid"), wx.removeStorageSync("runpoints"), wx.removeStorageSync("mileageTarget"), 
                wx.removeStorageSync("maxSpaceTime"), wx.removeStorageSync("maxTime"), wx.removeStorageSync("minTime"), 
                wx.removeStorageSync("deviceType"), wx.removeStorageSync("filePath"), wx.removeStorageSync("startRunDate"), 
                wx.removeStorageSync("runType"), wx.removeStorageSync("startType"), wx.removeStorageSync("initlatitude"), 
                wx.removeStorageSync("initlongitude"), o.inselectalertview2.hideAlertView()) : "000015" == e.data.retcode ? wx.showToast({
                    title: e.data.retmsg,
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                }) : wx.showToast({
                    icon: "none",
                    title: e.data.retmsg,
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    icon: "none",
                    title: "人数过多请稍后重试，网络或服务器异常stopRun2",
                    duration: 1e3
                });
            }
        });
    },
    stopLocationUpdate: function() {
        wx.offLocationChange(), wx.stopLocationUpdate({
            complete: function(e) {}
        });
    },
    gotoRun: function() {
        var e = this.selectComponent("#blueView"), t = this.selectComponent("#gpsalertview");
        if (this.openBluetoothAdapter(), !this.data.isBlueOpen) return e.showAlertView(), 
        !1;
        if (this.openLocationAdapter(), !this.data.locationEnabled) return t.showAlertView(), 
        !1;
        this.setData({
            runstatus: 1
        });
        var a = wx.getStorageSync("runType"), o = wx.getStorageSync("startType") || 0;
        this.endview.hideAlertView(), wx.navigateTo({
            url: "/pages/index/paobu?runType=" + a + "&startType=" + o + "&suspendStatus=" + this.data.suspendStatus
        });
    },
    ingotoRun: function() {
        var e = this.selectComponent("#blueView"), t = this.selectComponent("#gpsalertview");
        if (this.openBluetoothAdapter(), !this.data.isBlueOpen) return e.showAlertView(), 
        !1;
        if (this.openLocationAdapter(), !this.data.locationEnabled) return t.showAlertView(), 
        !1;
        this.setData({
            runstatus: 1
        });
        var a = wx.getStorageSync("runType"), o = wx.getStorageSync("startType") || 0;
        this.inselectalertview2.hideAlertView(), wx.navigateTo({
            url: "/pages/index/paobu?runType=" + a + "&startType=" + o + "&suspendStatus=" + this.data.suspendStatus
        });
    },
    goToPanbao: function(t) {
        var a = this.selectComponent("#endalertview"), o = this.selectComponent("#authview"), n = this.selectComponent("#blueView"), i = this.selectComponent("#gpsalertview");
        // if (1 == e.globalDaata.userLocationBackground && 1 == e.globalData.userStatus.isExist) {
        if (true) {
            if (0 == e.globalData.userStatus.approveStatus) return o.showAlertView(), !1;
            if (this.openBluetoothAdapter(), !this.data.isBlueOpen) return n.showAlertView(), 
            !1;
            if (this.openLocationAdapter(), !this.data.locationEnabled) return i.showAlertView(), 
            !1;
            if (0 == this.data.dayStartRunStatus) return wx.showToast({
                title: "未在运动日期",
                icon: "error",
                duration: 2e3
            }), !1;
            if (0 == this.data.timeStartRunStatus) return wx.showToast({
                title: "未在运动时间",
                icon: "error",
                duration: 1e3,
                mask: !0
            }), !1;
            if (-1 == this.data.timeStartRunStatus) return wx.showToast({
                title: "已完成当日目标次数",
                icon: "none",
                duration: 1e3,
                mask: !0
            }), !1;
            if (3 == this.data.runType) return a.showAlertView(), !1;
            1 != this.data.runType && 4 != this.data.runType || wx.navigateTo({
                url: "/pages/index/xianlu?runType=" + this.data.runType + "&applyCount=" + this.data.applyCount + "&suspendStatus=" + this.data.suspendStatus
            }), 2 == this.data.runType && wx.navigateTo({
                url: "/pages/index/paobu?runType=" + this.data.runType + "&lineId=0&startType=0&suspendStatus=" + this.data.suspendStatus
            });
        } else wx.navigateTo({
            url: "/pages/index/profile"
        });
    },
    gotoSeting: function() {
        wx.navigateTo({
            url: "/pages/user/setting"
        });
    },
    gotoRank: function() {
        wx.navigateTo({
            url: "/pages/index/rank"
        });
    },
    gotoHelp: function() {
        wx.navigateTo({
            url: "/pages/index/guize?currentData=0"
        });
    },
    gotoRecord: function() {
        wx.navigateTo({
            url: "/pages/user/record?"
        });
    },
    onReady: function(e) {},
    onPullDownRefresh: function() {
        0 == e.globalData.userStatus.isExist && this.authLogin(), 0 == this.data.dayStartRunStatus && this.getHome(), 
        0 == e.globalData.runSet && this.runSet(), 0 == e.globalData.getMessageList2 && this.getMessageList2(), 
        0 != this.data.dayStartRunStatus && 0 != this.data.timeStartRunStatus || this.getTimeStatus(), 
        wx.getStorageSync("detailId") && this.getExerciseStatus(), wx.stopPullDownRefresh();
    },
    onLongPressButton: function(){
      this.goToPanbao();
      // this.diyStopRun("820822011020241121182720231");
    },
});