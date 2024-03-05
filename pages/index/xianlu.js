var e = require("../../@babel/runtime/helpers/defineProperty"), t = getApp(), a = new (require("../../EC4725B553E228FF8A214DB22B25E640.js"))({
    key: "AT6BZ-AHKKU-4GFVL-2NJGZ-DM4HQ-3AFLV"
}), o = require("../../2C088A0753E228FF4A6EE200B445E640.js"), i = require("../../83B41FC153E228FFE5D277C6CA15E640.js");

function n(e) {
    var t = e.slice(7, 13);
    return Array.prototype.map.call(new Uint8Array(t), function(e) {
        return ("00" + e.toString(16)).slice(-2);
    }).join(":").toUpperCase();
}

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "线路"
        },
        navheight: t.globalData.navBarHeight,
        winHeight: t.globalData.windowHeight,
        statusBarHeight: t.globalData.statusBarHeight,
        screenHeight: t.globalData.screenHeight,
        latitude: "",
        longitude: "",
        initlatitude: "",
        initlongitude: "",
        polyline: [],
        polygons: [],
        polygonStatus: 0,
        markers: [],
        lineArray: [],
        from: {
            latitude: "",
            longitude: ""
        },
        to: {
            latitude: "",
            longitude: ""
        },
        extendType: 0,
        runType: 1,
        applyCount: 2,
        lineId: 0,
        deviceId: 0,
        distance: 0,
        duration: 0,
        inregion: 0,
        startType: 5,
        fileName: "",
        filePath: "",
        batchNo: "",
        schoolId: "",
        runCheckStatus: 0,
        uploadType: 0,
        deviceType: 2,
        fileId: 0,
        suspendStatus: 0,
        areaList: [],
        indexArea: 0,
        areaNo: ""
    },
    stopBluetooth: function() {
        wx.stopBluetoothDevicesDiscovery({
            success: function(e) {
                wx.closeBluetoothAdapter({
                    success: function(e) {},
                    fail: function(e) {}
                });
            },
            fail: function(e) {}
        });
    },
    gotoXbeacontest: function() {
        wx.navigateTo({
            url: "/pages/index/xbeacontest"
        });
    },
    runPaobu: function(e) {
        var t = this;
        if (5 != t.data.startType) if (t.data.filePath || 1 != t.data.runCheckStatus || 2 != t.data.uploadType) {
            if (wx.getSystemInfo({
                success: function(e) {
                    t.setData({
                        locationEnabled: e.locationEnabled,
                        isBlueOpen: e.bluetoothEnabled
                    });
                },
                fail: function(e) {}
            }), !t.data.locationEnabled) return t.selectComponent("#gpsalertview").showAlertView(), 
            !1;
            if (!t.data.isBlueOpen) return t.selectComponent("#blueView").showAlertView(), !1;
			t.setData({
				inregion: 1
			}), t.stopLocationUpdate(), t.stopBluetooth(), wx.hideLoading(), wx.redirectTo({
				url: "/pages/index/paobu?runType=" + t.data.runType + "&lineId=" + t.data.lineId + "&batchNo=" + t.data.batchNo + "&startType=" + t.data.startType + "&suspendStatus=" + t.data.suspendStatus
			});
        } else wx.showToast({
            title: "请上传人脸照片",
            icon: "error",
            duration: 1e3
        }); else wx.showToast({
            title: "点击右下获取线路，多次长按跑步",
            icon: "none",
            duration: 3e3
        });
    },
    getLocation: function() {
        var e = this;
        wx.getLocation({
            type: "gcj02",
            success: function(t) {
                e.setData({
                    latitude: t.latitude,
                    longitude: t.longitude,
                    initlatitude: t.latitude,
                    initlongitude: t.longitude
                });
            },
            fail: function(e) {
                wx.showToast({
                    icon: "none",
                    title: "getLocation错误"
                });
            }
        });
    },
    sdrunPunchCard: function() {
        var e = this;
        if (1 == e.data.deviceType) wx.getBluetoothDevices({
            success: function(a) {
                for (var d = 0; d < a.devices.length; d++) if (("xBeacon" == a.devices[d].localName || "xBeacon" == a.devices[d].name) && null != a.devices[d].serviceData && null != a.devices[d].serviceData) {
                    if (a.devices[d].serviceData.hasOwnProperty("00001529-0000-1000-8000-00805F9B34FB")) {
                        for (var s = function() {
                            if (l = n(a.devices[d].serviceData["00001529-0000-1000-8000-00805F9B34FB"]), e.data.lineArray[r].deviceAddress.includes(l)) {
                                if (e.setData({
                                    inregion: 1,
                                    deviceId: e.data.lineArray[r].deviceId
                                }), e.data.deviceId > 0 && 1 == e.data.startType || 0 == e.data.startType) {
                                    u = {};
                                    var s = new Date().valueOf();
                                    u.openid = t.globalData.userStatus.openid, u.fileType = 1, u.imageType = 5, u.schoolId = e.data.schoolId, 
                                    u.batchNo = s;
                                    var p = o.sortKey(u, t.globalData.datakey);
                                    c = i.hexMD5(p), wx.chooseImage({
                                        count: 1,
                                        sizeType: [ "compressed" ],
                                        sourceType: [ "camera" ],
                                        success: function(a) {
                                            var o = a.tempFilePaths[0];
                                            wx.uploadFile({
                                                url: t.globalData.apiurl + "f/api/uploadFile",
                                                filePath: o,
                                                name: "fileImg",
                                                header: {
                                                    "Content-Type": "multipart/form-data"
                                                },
                                                formData: {
                                                    openid: t.globalData.userStatus.openid,
                                                    fileType: 1,
                                                    schoolId: e.data.schoolId,
                                                    imageType: 5,
                                                    batchNo: s,
                                                    sign: c,
                                                    detailId: e.data.detailId,
                                                    uploadImagetype: 1
                                                },
                                                success: function(t) {
                                                    var a = JSON.parse(t.data);
                                                    "000000" == a.retcode ? (e.setData({
                                                        fileName: a.fileName,
                                                        filePath: a.fileUrl,
                                                        batchNo: a.batchNo
                                                    }), wx.showToast({
                                                        title: "上传成功",
                                                        icon: "true",
                                                        duration: 1e3,
                                                        mask: !0
                                                    })) : wx.showToast({
                                                        title: "上传失败",
                                                        icon: "true",
                                                        duration: 1e3,
                                                        mask: !0
                                                    });
                                                },
                                                fail: function() {
                                                    wx.showToast({
                                                        title: "网络异常",
                                                        icon: "error",
                                                        duration: 1e3
                                                    });
                                                }
                                            });
                                        },
                                        fail: function() {
                                            wx.showToast({
                                                title: "照片拍摄失败",
                                                icon: "error",
                                                duration: 1e3
                                            });
                                        }
                                    });
                                }
                                return 1;
                            }
                        }, r = 0; r < e.data.lineArray.length && !s(); r++) ;
                        if (1 == e.data.inregion) {
                            e.setData({
                                inregion: 0
                            });
                            break;
                        }
                    } else if (a.devices[d].serviceData.hasOwnProperty("00002E60-0000-1000-8000-00805F9B34FB")) {
                        var l, u, c, p = function() {
                            if (l = n(a.devices[d].serviceData["00002E60-0000-1000-8000-00805F9B34FB"]), e.data.lineArray[r].deviceAddress.includes(l)) {
                                if (e.setData({
                                    inregion: 1,
                                    deviceId: e.data.lineArray[r].deviceId
                                }), e.data.deviceId > 0 && 1 == e.data.startType || 0 == e.data.startType) {
                                    u = {};
                                    var s = new Date().valueOf();
                                    u.openid = t.globalData.userStatus.openid, u.fileType = 1, u.imageType = 5, u.schoolId = e.data.schoolId, 
                                    u.batchNo = s;
                                    var p = o.sortKey(u, t.globalData.datakey);
                                    c = i.hexMD5(p), wx.chooseImage({
                                        count: 1,
                                        sizeType: [ "compressed" ],
                                        sourceType: [ "camera" ],
                                        success: function(a) {
                                            var o = a.tempFilePaths[0];
                                            wx.uploadFile({
                                                url: t.globalData.apiurl + "f/api/uploadFile",
                                                filePath: o,
                                                name: "fileImg",
                                                header: {
                                                    "Content-Type": "multipart/form-data"
                                                },
                                                formData: {
                                                    openid: t.globalData.userStatus.openid,
                                                    fileType: 1,
                                                    schoolId: e.data.schoolId,
                                                    imageType: 5,
                                                    batchNo: s,
                                                    sign: c,
                                                    detailId: e.data.detailId,
                                                    uploadImagetype: 1
                                                },
                                                success: function(t) {
                                                    var a = JSON.parse(t.data);
                                                    "000000" == a.retcode ? (e.setData({
                                                        fileName: a.fileName,
                                                        filePath: a.fileUrl,
                                                        batchNo: a.batchNo
                                                    }), wx.showToast({
                                                        title: "上传成功",
                                                        icon: "true",
                                                        duration: 1e3,
                                                        mask: !0
                                                    })) : wx.showToast({
                                                        title: "上传失败",
                                                        icon: "true",
                                                        duration: 1e3,
                                                        mask: !0
                                                    });
                                                },
                                                fail: function() {
                                                    wx.showToast({
                                                        title: "网络异常",
                                                        icon: "error",
                                                        duration: 1e3
                                                    });
                                                }
                                            });
                                        },
                                        fail: function() {
                                            wx.showToast({
                                                title: "照片拍摄失败",
                                                icon: "error",
                                                duration: 1e3
                                            });
                                        }
                                    });
                                }
                                return 1;
                            }
                        };
                        for (r = 0; r < e.data.lineArray.length && !p(); r++) ;
                        if (1 == e.data.inregion) {
                            e.setData({
                                inregion: 0
                            });
                            break;
                        }
                    }
                    0 == e.data.inregion && wx.showToast({
                        title: "请前往指定区域",
                        icon: "error",
                        duration: 3e3
                    });
                }
            },
            fail: function(e) {}
        }); else {
            var a = e.data.lineArray;
            if (o.getDistanceMark(a, e.data.latitude, e.data.longitude, e.data.searchDiam) > 0 && 1 == e.data.startType || 0 == e.data.startType) {
                var d = {}, s = new Date().valueOf();
                d.openid = t.globalData.userStatus.openid, d.fileType = 1, d.imageType = 5, d.schoolId = e.data.schoolId, 
                d.batchNo = s;
                var r = o.sortKey(d, t.globalData.datakey), l = i.hexMD5(r);
                wx.chooseImage({
                    count: 1,
                    sizeType: [ "compressed" ],
                    sourceType: [ "camera" ],
                    success: function(a) {
                        var o = a.tempFilePaths[0];
                        wx.uploadFile({
                            url: t.globalData.apiurl + "f/api/uploadFile",
                            filePath: o,
                            name: "fileImg",
                            header: {
                                "Content-Type": "multipart/form-data"
                            },
                            formData: {
                                openid: t.globalData.userStatus.openid,
                                fileType: 1,
                                schoolId: e.data.schoolId,
                                imageType: 5,
                                batchNo: s,
                                sign: l,
                                detailId: "",
                                uploadImagetype: 1
                            },
                            success: function(t) {
                                var a = JSON.parse(t.data);
                                "000000" == a.retcode ? (e.setData({
                                    fileName: a.fileName,
                                    filePath: a.fileUrl,
                                    batchNo: a.batchNo
                                }), wx.showToast({
                                    title: "上传成功",
                                    icon: "true",
                                    duration: 1e3,
                                    mask: !0
                                })) : wx.showToast({
                                    title: "上传失败",
                                    icon: "true",
                                    duration: 1e3,
                                    mask: !0
                                });
                            },
                            fail: function() {
                                wx.showToast({
                                    title: "网络异常",
                                    icon: "error",
                                    duration: 1e3
                                });
                            }
                        });
                    },
                    fail: function() {
                        wx.showToast({
                            title: "照片拍摄失败",
                            icon: "error",
                            duration: 1e3
                        });
                    }
                });
            } else wx.showToast({
                title: "请前往指定区域",
                icon: "error",
                duration: 3e3
            });
        }
    },
    fromtoMap: function() {
        this.mapCtx.includePoints({
            padding: [ 80, 50, 80, 50 ],
            points: this.data.markers
        });
    },
    getSchoolRunLine: function() {
        var a = this, o = {};
        o.openid = t.globalData.userStatus.openid, o.longitude = a.data.longitude, o.latitude = a.data.latitude, 
        o.extendType = a.data.extendType, o.applyCount = a.data.applyCount, o.areaNo = a.data.areaNo, 
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "/f/api/getSchoolRunLine",
            method: "POST",
            data: o,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                if (wx.hideLoading(), 200 != t.statusCode) wx.showToast({
                    title: "人数过多请稍后重试，服务器异常getSchoolRunLine500",
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                }); else if ("000000" == t.data.retcode) {
                    var o;
                    1 == t.data.deviceType && wx.openBluetoothAdapter({
                        success: function(e) {
                            wx.startBluetoothDevicesDiscovery({
                                services: [],
                                powerLevel: "high",
                                success: function(e) {},
                                fail: function(e) {
                                    wx.showToast({
                                        title: "开始搜寻蓝牙外围设备失败，请检查微信蓝牙权限设置",
                                        icon: "none",
                                        duration: 2e3,
                                        mask: !0
                                    });
                                }
                            });
                        },
                        fail: function(e) {
                            wx.showToast({
                                title: "初始化蓝牙模块失败，请检查微信蓝牙权限设置",
                                icon: "none",
                                duration: 2e3,
                                mask: !0
                            });
                        }
                    });
                    var i = [], n = [], d = {
                        id: 0
                    };
                    d.latitude = a.data.latitude, d.longitude = a.data.longitude, d.iconPath = "/images/run.png", 
                    d.width = 25, d.height = 25, i.push(d);
                    var s = {};
                    s.id = t.data.deviceId, s.deviceId = t.data.deviceId, s.latitude = t.data.latitude, 
                    s.longitude = t.data.longitude, s.deviceAddress = t.data.deviceAddress, s.iconPath = "/images/21_position.png", 
                    s.width = 25, s.height = 25, i.push(s), n.push(s);
                    var r = [];
                    1 == a.data.polygonStatus && (r = [ {
                        points: t.data.polygonArray,
                        strokeWidth: 2,
                        strokeColor: "#3875FF",
                        fillColor: "#3875FF30"
                    } ]), a.setData((e(e(e(e(e(e(e(e(e(e(o = {
                        polygons: r
                    }, "from.latitude", a.data.latitude), "from.longitude", a.data.longitude), "to.latitude", t.data.latitude), "to.longitude", t.data.longitude), "startType", t.data.startType), "lineId", t.data.lineId), "deviceType", t.data.deviceType), "deviceAddress", t.data.deviceAddress), "searchDiam", t.data.searchDiam), "lineArray", n), 
                    e(e(e(e(o, "markers", i), "schoolId", t.data.schoolId), "runCheckStatus", t.data.runCheckStatus), "uploadType", t.data.uploadType))), 
                    a.direction(), a.fromtoMap();
                } else wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常getSchoolRunLine",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    getRunLineBtn: function() {
        var e = this;
        return wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    locationEnabled: t.locationEnabled,
                    isBlueOpen: t.bluetoothEnabled
                });
            },
            fail: function(e) {}
        }), e.data.locationEnabled ? e.data.isBlueOpen ? void (4 == e.data.runType ? e.getSchoolRunLine() : e.getRunLine()) : (e.selectComponent("#blueView").showAlertView(), 
        !1) : (e.selectComponent("#gpsalertview").showAlertView(), !1);
    },
    getRunLine: function() {
        var a = this, o = {};
        o.openid = t.globalData.userStatus.openid, o.longitude = a.data.longitude, o.latitude = a.data.latitude, 
        o.extendType = a.data.extendType, o.applyCount = a.data.applyCount, o.areaNo = a.data.areaNo, 
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "/f/api/getRunLine",
            method: "POST",
            data: o,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                if (wx.hideLoading(), 200 != t.statusCode) wx.showToast({
                    title: "人数过多请稍后重试，服务器异常getRunLine500",
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                }); else if ("000000" == t.data.retcode) {
                    var o;
                    1 == t.data.deviceType && wx.openBluetoothAdapter({
                        success: function(e) {
                            wx.startBluetoothDevicesDiscovery({
                                services: [],
                                powerLevel: "high",
                                success: function(e) {},
                                fail: function() {
                                    wx.showToast({
                                        title: "开始搜寻蓝牙外围设备失败，请检查微信蓝牙权限设置",
                                        icon: "none",
                                        duration: 2e3,
                                        mask: !0
                                    });
                                }
                            });
                        },
                        fail: function() {
                            wx.showToast({
                                title: "初始化蓝牙模块失败，请检查微信蓝牙权限设置",
                                icon: "none",
                                duration: 2e3,
                                mask: !0
                            });
                        }
                    });
                    var i = [], n = {
                        id: 0
                    };
                    n.latitude = a.data.latitude, n.longitude = a.data.longitude, n.iconPath = "/images/run.png", 
                    n.width = 25, n.height = 25, i.push(n);
                    for (var d = 0; d < t.data.lineArray.length; d++) {
                        var s = {};
                        s.id = t.data.lineArray[d].deviceId, s.latitude = t.data.lineArray[d].latitude, 
                        s.longitude = t.data.lineArray[d].longitude, s.iconPath = "/images/21_position.png", 
                        3 == t.data.lineArray[d].deviceType && (s.callout = {
                            content: "训练杆",
                            fontSize: 14,
                            bgColor: "#FFF",
                            borderWidth: 1,
                            borderColor: "#CCC",
                            padding: 4,
                            display: "ALWAYS",
                            textAlign: "center"
                        }), s.width = 25, s.height = 25, i.push(s);
                    }
                    var r = [];
                    1 == a.data.polygonStatus && (r = [ {
                        points: t.data.polygonArray,
                        strokeWidth: 2,
                        strokeColor: "#3875FF",
                        fillColor: "#3875FF30"
                    } ]), a.setData((e(e(e(e(e(e(e(e(e(e(o = {}, "from.latitude", a.data.latitude), "from.longitude", a.data.longitude), "to.latitude", t.data.latitude), "to.longitude", t.data.longitude), "startType", t.data.startType), "lineId", t.data.lineId), "deviceType", t.data.deviceType), "deviceAddress", t.data.deviceAddress), "searchDiam", t.data.searchDiam), "lineArray", t.data.lineArray), 
                    e(e(e(e(e(o, "markers", i), "schoolId", t.data.schoolId), "runCheckStatus", t.data.runCheckStatus), "uploadType", t.data.uploadType), "polygons", r))), 
                    a.direction(), a.fromtoMap();
                } else wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常getRunLine",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    direction: function() {
        var e = this;
        a.direction({
            mode: "walking",
            from: e.data.from,
            to: e.data.to,
            success: function(t) {
                for (var a = t, o = a.result.routes[0].polyline, i = [], n = 2; n < o.length; n++) o[n] = Number(o[n - 2]) + Number(o[n]) / 1e6;
                for (n = 0; n < o.length; n += 2) i.push({
                    latitude: o[n],
                    longitude: o[n + 1]
                });
                e.setData({
                    distance: a.result.routes[0].distance,
                    duration: a.result.routes[0].duration,
                    latitude: i[0].latitude,
                    longitude: i[0].longitude,
                    polyline: [ {
                        points: i,
                        color: "#427CFF",
                        width: 6,
                        style: "1",
                        arrowLine: !0
                    } ]
                });
            },
            fail: function(e) {},
            complete: function(e) {}
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
        e.hideAlertView(), this.openLocationAdapter(), this.data.locationEnabled || e.showAlertView(), 
        wx.showTabBar();
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
    startLocationUpdate: function() {
        var e = this;
        wx.startLocationUpdate({
            success: function(t) {
                wx.onLocationChange(function(t) {
                    e.setData({
                        latitude: t.latitude,
                        longitude: t.longitude
                    });
                });
            }
        });
    },
    stopLocationUpdate: function() {
        wx.offLocationChange(), wx.stopLocationUpdate();
    },
    onLoad: function(e) {
        this.setData({
            navheight: t.globalData.navBarHeight,
            winHeight: t.globalData.windowHeight,
            statusBarHeight: t.globalData.statusBarHeight,
            screenHeight: t.globalData.screenHeight,
            runType: e.runType,
            applyCount: e.applyCount,
            suspendStatus: e.suspendStatus,
            areaList: t.globalData.schoolInfo.areaList,
            indexArea: t.globalData.schoolInfo.indexArea,
            areaNo: t.globalData.schoolInfo.areaNo,
            polygonStatus: t.globalData.schoolInfo.polygonStatus
        }), this.getLocation(), this.startLocationUpdate(), this.endview = this.selectComponent("#endalertview2"), 
        this.mapCtx = wx.createMapContext("map");
    },
    onReady: function() {},
    onShow: function() {
        this.openBluetoothAdapter(), this.openLocationAdapter();
    },
    onHide: function() {},
    onUnload: function() {
        this.stopLocationUpdate();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});