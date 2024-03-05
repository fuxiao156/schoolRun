var a = require("../../@babel/runtime/helpers/defineProperty"), t = getApp(), e = require("../../2ED09F3053E228FF48B6F737C255E640.js"), n = require("../../2C088A0753E228FF4A6EE200B445E640.js");

function i(a) {
    var t = a.slice(7, 13);
    return Array.prototype.map.call(new Uint8Array(t), function(a) {
        return ("00" + a.toString(16)).slice(-2);
    }).join(":").toUpperCase();
}

Page({
    data: {
        navheight: t.globalData.navBarHeight,
        quyuoff: !1,
        starttime: "00:00",
        runtime: "00:00:00",
        runtimemm: 0,
        runtimess: 0,
        runnewdata: "",
        lastdata: "",
        param1: "",
        gspstatus: 0,
        param2: "",
        navbarData: {
            showCapsule: 1,
            title: "场馆打卡"
        },
        venueId: 1,
        venueName: "场馆名称",
        cardRate: 10,
        cardRateMax: 12,
        cardNumber: 5,
        rangeHour: "",
        deviceList: [],
        yxvalidCount: 0,
        invalidCount: 0,
        cardFlag: 0,
        cardid: "",
        timestamp: "",
        detailsArray: [],
        cardArray: [],
        qiandaoStatus: 0,
        endcontent: "",
        endcontent1: "",
        endcontent2: "",
        latitude: "",
        longitude: "",
        markers: [],
        venueType: "",
        ssnum: 0,
        lanyajsq: 0,
        ksflag: 0,
        deviceId: "",
        qydeviceId: "",
        currentData: 0,
        realName: "张三",
        itemName: "项目名称",
        allCount: 0,
        validCount: 0,
        searchDiam: 30
    },
    showquestion: function() {
        this.showModal();
    },
    showModal: function() {
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        a.translateY(300).step(), this.setData({
            animationData: a.export(),
            showModalStatus: !0
        }), setTimeout(function() {
            a.translateY(0).step(), this.setData({
                animationData: a.export()
            });
        }.bind(this), 200);
    },
    hideModal: function() {
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        a.translateY(300).step(), this.setData({
            animationData: a.export()
        }), setTimeout(function() {
            a.translateY(0).step(), this.setData({
                animationData: a.export(),
                showModalStatus: !1
            });
        }.bind(this), 200);
    },
    checkCurrent: function(a) {
        if (this.data.currentData === a.target.dataset.current) return !1;
        this.setData({
            currentData: a.target.dataset.current
        });
    },
    bindchange: function(a) {
        this.setData({
            currentData: a.detail.current
        });
    },
    sxquyuLocation: function() {
        var a = this;
        if (2 == a.data.venueType) {
            var t = a.data.deviceList;
            wx.getLocation({
                type: "gcj02",
                isHighAccuracy: !0,
                highAccuracyExpireTime: 3e3,
                success: function(e) {
                    n.getDistanceMarkcg(t, e.latitude, e.longitude, a.data.searchDiam) > 0 ? a.setData({
                        quyuoff: !0
                    }) : a.setData({
                        quyuoff: !1
                    });
                },
                fail: function() {
                    return !1;
                },
                complete: function() {}
            });
        } else a.onBluetoothDeviceFound3();
    },
    count_down1: function() {
        var a = this;
        setTimeout(function() {
            a.setData({
                runtimess: a.data.runtimess + 1e3,
                runtime: e.date_format(a.data.runtimess + 1e3)
            }), a.data.runtimess % 6e4 == 0 && a.setData({
                runtimemm: a.data.runtimemm + 1
            }), a.count_down1();
        }, 1e3);
    },
    count_down2: function() {
        var a, t = this;
        a = setTimeout(function() {
            t.setData({
                gspstatus: 2
            });
        }, 6e4 * t.data.cardRateMax), t.setData({
            param2: a
        });
    },
    count_down: function() {
        var a, t = this;
        a = setTimeout(function() {
            t.setData({
                gspstatus: 1
            });
        }, 6e4 * t.data.cardRate), t.setData({
            param1: a
        });
    },
    count_down4: function() {
        var a = this;
        setTimeout(function() {
            a.sxquyuLocation();
        }, 3e3);
    },
    getLocation: function() {
        var a = this;
        wx.getLocation({
            type: "gcj02",
            isHighAccuracy: !0,
            highAccuracyExpireTime: 3e3,
            success: function(t) {
                a.setData({
                    latitude: t.latitude,
                    longitude: t.longitude
                });
            },
            fail: function() {},
            complete: function() {}
        });
    },
    navbackEvent: function() {
        if (0 != this.data.qiandaoStatus) return this.data.yxvalidCount < this.data.cardNumber ? this.setData({
            endcontent: "由于低于打卡有效规定次数，结束将",
            endcontent1: "无效",
            endcontent2: "此次记录。 您确定要结束吗？"
        }) : this.setData({
            endcontent: "您本次有效打卡次数为",
            endcontent1: this.data.yxvalidCount,
            endcontent2: "次，您确定要结束吗？"
        }), this.endalertview.showAlertView(), !1;
        wx.navigateBack();
    },
    endQiandaoShowBox: function() {
        0 != this.data.qiandaoStatus ? (this.data.yxvalidCount < this.data.cardNumber ? this.setData({
            endcontent: "由于低于打卡有效规定次数，结束将",
            endcontent1: "无效",
            endcontent2: "此次记录。 您确定要结束吗？"
        }) : this.setData({
            endcontent: "您本次有效打卡次数为",
            endcontent1: this.data.yxvalidCount,
            endcontent2: "次，您确定要结束吗？"
        }), this.endalertview.showAlertView()) : wx.showToast({
            title: "请开始签到"
        });
    },
    cancelEvent: function() {
        this.endalertview.hideAlertView();
    },
    confirmEvent: function() {
        this.endalertview.hideAlertView();
    },
    startLocationUpdateBackground: function() {
        wx.startLocationUpdateBackground({
            success: function(a) {},
            complete: function(a) {}
        });
    },
    onLocationChange: function() {
        var a = this;
        wx.onLocationChange(function(t) {
            if (1 == a.data.venueType && (Math.round((new Date() - a.data.lastdata) / 1e3) >= 60 * a.data.cardRate && Math.round((new Date() - a.data.lastdata) / 1e3) < 60 * a.data.cardRateMax && (0 != a.data.cardArray.length && a.venueCardBatch(), 
            a.onBluetoothDeviceFound()), Math.round((new Date() - a.data.lastdata) / 1e3) >= 60 * a.data.cardRateMax)) {
                0 != a.data.cardArray.length && a.venueCardBatch(), a.venueCardRegister("");
                var e = new Date();
                a.setData({
                    invalidCount: a.data.invalidCount + 1,
                    quyuoff: !1,
                    lastdata: e
                }), wx.setStorageSync("lastdata", a.data.lastdata), wx.setStorageSync("invalidCount", a.data.invalidCount), 
                wx.stopBluetoothDevicesDiscovery({
                    success: function(a) {
                        wx.closeBluetoothAdapter({
                            success: function(a) {
                                wx.openBluetoothAdapter({
                                    success: function(a) {
                                        wx.startBluetoothDevicesDiscovery({
                                            powerLevel: "high",
                                            success: function(a) {},
                                            fail: function(a) {}
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
            if (2 == a.data.venueType) {
                var i = a.data.deviceList;
                if (Math.round((new Date() - a.data.lastdata) / 1e3) >= 60 * a.data.cardRate && Math.round((new Date() - a.data.lastdata) / 1e3) < 60 * a.data.cardRateMax) {
                    0 != a.data.cardArray.length && a.venueCardBatch();
                    var d = n.getDistanceMarkcg(i, t.latitude, t.longitude, a.data.searchDiam);
                    if (d > 0) {
                        a.venueCardRegister(d);
                        e = new Date();
                        a.setData({
                            lastdata: e,
                            yxvalidCount: a.data.yxvalidCount + 1,
                            quyuoff: !0
                        }), wx.setStorageSync("lastdata", a.data.lastdata), wx.setStorageSync("yxvalidCount", a.data.yxvalidCount);
                    }
                }
                if (Math.round((new Date() - a.data.lastdata) / 1e3) >= 60 * a.data.cardRateMax) {
                    0 != a.data.cardArray.length && a.venueCardBatch(), a.venueCardRegister("");
                    e = new Date();
                    a.setData({
                        lastdata: e,
                        invalidCount: a.data.invalidCount + 1,
                        quyuoff: !1
                    }), wx.setStorageSync("lastdata", a.data.lastdata), wx.setStorageSync("invalidCount", a.data.invalidCount);
                }
            }
        });
    },
    onBluetoothDeviceFound2: function() {
        wx.openBluetoothAdapter({
            success: function(a) {},
            fail: function(a) {}
        });
        wx.startBluetoothDevicesDiscovery({
            powerLevel: "high",
            success: function(a) {},
            fail: function(a) {}
        }), wx.getBluetoothDevices({
            success: function(a) {},
            fail: function(a) {}
        }), wx.startBluetoothDevicesDiscovery({
            powerLevel: "high",
            success: function(a) {},
            fail: function(a) {}
        });
    },
    onBluetoothDeviceFound3: function() {
        var a = this;
        wx.openBluetoothAdapter({
            success: function(t) {
                wx.startBluetoothDevicesDiscovery({
                    powerLevel: "high",
                    success: function(t) {
                        wx.getBluetoothDevices({
                            success: function(t) {
                                0 == t.devices.length && a.setData({
                                    quyuoff: !1
                                });
                                for (var e = 0; e < t.devices.length; e++) if (("xBeacon" == t.devices[e].localName || "xBeacon" == t.devices[e].name) && null != t.devices[e].serviceData && null != t.devices[e].serviceData) if (t.devices[e].serviceData.hasOwnProperty("00001529-0000-1000-8000-00805F9B34FB")) for (var n = 0; n < a.data.deviceList.length; n++) {
                                    var d = i(t.devices[e].serviceData["00001529-0000-1000-8000-00805F9B34FB"]);
                                    if (a.data.deviceList[n].deviceAddress.includes(d)) {
                                        a.setData({
                                            qydeviceId: a.data.deviceList[n].deviceId
                                        });
                                        break;
                                    }
                                } else if (t.devices[e].serviceData.hasOwnProperty("00002E60-0000-1000-8000-00805F9B34FB")) for (n = 0; n < a.data.deviceList.length; n++) {
                                    d = i(t.devices[e].serviceData["00002E60-0000-1000-8000-00805F9B34FB"]);
                                    if (a.data.deviceList[n].deviceAddress.includes(d)) {
                                        a.setData({
                                            qydeviceId: a.data.deviceList[n].deviceId
                                        });
                                        break;
                                    }
                                } else if (t.devices[e].serviceData.hasOwnProperty("00004160-0000-1000-8000-00805F9B34FB")) for (n = 0; n < a.data.deviceList.length; n++) {
                                    d = i(t.devices[e].serviceData["00004160-0000-1000-8000-00805F9B34FB"]);
                                    if (a.data.deviceList[n].deviceAddress.includes(d)) {
                                        a.setData({
                                            qydeviceId: a.data.deviceList[n].deviceId
                                        });
                                        break;
                                    }
                                }
                                a.data.qydeviceId > 0 ? a.setData({
                                    quyuoff: !0,
                                    qydeviceId: ""
                                }) : a.setData({
                                    quyuoff: !1,
                                    qydeviceId: ""
                                });
                            },
                            fail: function(a) {}
                        });
                    },
                    fail: function(a) {}
                });
            },
            fail: function(a) {}
        });
    },
    onBluetoothDeviceFound: function() {
        var a = this;
        wx.getBluetoothDevices({
            success: function(t) {
                for (var e = 0; e < t.devices.length; e++) {
                    var n = 0;
                    if ("xBeacon" == t.devices[e].localName || "xBeacon" == t.devices[e].name) {
                        if (null != t.devices[e].serviceData && null != t.devices[e].serviceData) if (t.devices[e].serviceData.hasOwnProperty("00001529-0000-1000-8000-00805F9B34FB")) for (var d = 0; d < a.data.deviceList.length; d++) {
                            var o = i(t.devices[e].serviceData["00001529-0000-1000-8000-00805F9B34FB"]);
                            if (a.data.deviceList[d].deviceAddress.includes(o)) {
                                a.venueCardRegister(a.data.deviceList[d].deviceId);
                                var s = new Date();
                                a.setData({
                                    lastdata: s,
                                    gspstatus: 0,
                                    yxvalidCount: a.data.yxvalidCount + 1,
                                    quyuoff: !0
                                }), wx.setStorageSync("lastdata", a.data.lastdata), wx.setStorageSync("yxvalidCount", a.data.yxvalidCount), 
                                n = 1, wx.stopBluetoothDevicesDiscovery({
                                    success: function(a) {
                                        wx.closeBluetoothAdapter({
                                            success: function(a) {
                                                wx.openBluetoothAdapter({
                                                    success: function(a) {
                                                        wx.startBluetoothDevicesDiscovery({
                                                            powerLevel: "high",
                                                            success: function(a) {},
                                                            fail: function(a) {}
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                                break;
                            }
                        } else if (t.devices[e].serviceData.hasOwnProperty("00004160-0000-1000-8000-00805F9B34FB")) for (d = 0; d < a.data.deviceList.length; d++) {
                            o = i(t.devices[e].serviceData["00004160-0000-1000-8000-00805F9B34FB"]);
                            if (a.data.deviceList[d].deviceAddress.includes(o)) {
                                a.venueCardRegister(a.data.deviceList[d].deviceId);
                                s = new Date();
                                a.setData({
                                    lastdata: s,
                                    gspstatus: 0,
                                    yxvalidCount: a.data.yxvalidCount + 1,
                                    quyuoff: !0
                                }), wx.setStorageSync("lastdata", a.data.lastdata), wx.setStorageSync("yxvalidCount", a.data.yxvalidCount), 
                                n = 1, wx.stopBluetoothDevicesDiscovery({
                                    success: function(a) {
                                        wx.closeBluetoothAdapter({
                                            success: function(a) {
                                                wx.openBluetoothAdapter({
                                                    success: function(a) {
                                                        wx.startBluetoothDevicesDiscovery({
                                                            powerLevel: "high",
                                                            success: function(a) {},
                                                            fail: function(a) {}
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                                break;
                            }
                        } else if (t.devices[e].serviceData.hasOwnProperty("00002E60-0000-1000-8000-00805F9B34FB")) for (d = 0; d < a.data.deviceList.length; d++) {
                            o = i(t.devices[e].serviceData["00002E60-0000-1000-8000-00805F9B34FB"]);
                            if (a.data.deviceList[d].deviceAddress.includes(o)) {
                                a.venueCardRegister(a.data.deviceList[d].deviceId);
                                s = new Date();
                                a.setData({
                                    lastdata: s,
                                    gspstatus: 0,
                                    yxvalidCount: a.data.yxvalidCount + 1,
                                    quyuoff: !0
                                }), wx.setStorageSync("lastdata", a.data.lastdata), wx.setStorageSync("yxvalidCount", a.data.yxvalidCount), 
                                n = 1, wx.stopBluetoothDevicesDiscovery({
                                    success: function(a) {
                                        wx.closeBluetoothAdapter({
                                            success: function(a) {
                                                wx.openBluetoothAdapter({
                                                    success: function(a) {
                                                        wx.startBluetoothDevicesDiscovery({
                                                            powerLevel: "high",
                                                            success: function(a) {},
                                                            fail: function(a) {}
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                                break;
                            }
                        } else if (t.devices[e].serviceData.hasOwnProperty("00004160-0000-1000-8000-00805F9B34FB")) for (d = 0; d < a.data.deviceList.length; d++) {
                            o = i(t.devices[e].serviceData["00004160-0000-1000-8000-00805F9B34FB"]);
                            if (a.data.deviceList[d].deviceAddress.includes(o)) {
                                a.venueCardRegister(a.data.deviceList[d].deviceId);
                                s = new Date();
                                a.setData({
                                    lastdata: s,
                                    gspstatus: 0,
                                    yxvalidCount: a.data.yxvalidCount + 1,
                                    quyuoff: !0
                                }), wx.setStorageSync("lastdata", a.data.lastdata), wx.setStorageSync("yxvalidCount", a.data.yxvalidCount), 
                                n = 1, wx.stopBluetoothDevicesDiscovery({
                                    success: function(a) {
                                        wx.closeBluetoothAdapter({
                                            success: function(a) {
                                                wx.openBluetoothAdapter({
                                                    success: function(a) {
                                                        wx.startBluetoothDevicesDiscovery({
                                                            powerLevel: "high",
                                                            success: function(a) {},
                                                            fail: function(a) {}
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                                break;
                            }
                        }
                        if (1 == n) break;
                    }
                }
            },
            fail: function(a) {}
        });
    },
    venueCardRegister: function(a) {
        var n = this, i = t.globalData.userStatus.openid, d = t.globalData.userStatus.userid, o = n.data.cardid, s = Math.round(new Date().getTime() / 1e3).toString();
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "/f/api/venueCardRegister?openid=" + i + "&userid=" + d + "&cardid=" + o + "&deviceId=" + a + "&timestamp=" + s,
            method: "POST",
            success: function(t) {
                if (wx.hideLoading(), 200 != t.statusCode) {
                    if ("" != a) var i = {
                        deviceId: a,
                        seqNo: n.data.yxvalidCount + n.data.invalidCount,
                        cardTime: e.formatTime4(new Date()),
                        status: 1,
                        message: "有效",
                        uploadStatus: 1,
                        remarks: ""
                    };
                    if ("" == a) i = {
                        deviceId: a,
                        seqNo: n.data.yxvalidCount + n.data.invalidCount,
                        cardTime: e.formatTime4(new Date()),
                        status: 0,
                        message: "无效",
                        uploadStatus: 1,
                        remarks: ""
                    };
                    n.data.cardArray.push(i), wx.setStorageSync("cardArray", n.data.cardArray), n.data.detailsArray.push(i), 
                    n.setData({
                        detailsArray: n.data.detailsArray
                    }), wx.setStorageSync("detailsArray", n.data.detailsArray), wx.showToast({
                        title: "人数过多请稍后重试，服务器异常venueCardRegister500",
                        icon: "none",
                        duration: 1e3
                    });
                } else if ("000000" == t.data.retcode) wx.setStorageSync("detailsArray", t.data.detailsArray), 
                n.setData({
                    detailsArray: t.data.detailsArray,
                    ksflag: 1
                }); else {
                    if ("" != a) i = {
                        deviceId: a,
                        seqNo: n.data.yxvalidCount + n.data.invalidCount,
                        cardTime: e.formatTime4(new Date()),
                        status: 1,
                        message: "有效",
                        uploadStatus: 1,
                        remarks: ""
                    };
                    if ("" == a) i = {
                        deviceId: a,
                        seqNo: n.data.yxvalidCount + n.data.invalidCount,
                        cardTime: e.formatTime4(new Date()),
                        status: 0,
                        message: "无效",
                        uploadStatus: 1,
                        remarks: ""
                    };
                    n.data.cardArray.push(i), wx.setStorageSync("cardArray", n.data.cardArray), n.data.detailsArray.push(i), 
                    n.setData({
                        detailsArray: n.data.detailsArray
                    }), wx.setStorageSync("detailsArray", n.data.detailsArray), wx.showToast({
                        title: "人数过多请稍后重试,网络或服务器异常venueCardRegister",
                        icon: "none",
                        duration: 1e3
                    });
                }
            },
            fail: function() {
                if (wx.hideLoading(), "" != a) var t = {
                    deviceId: a,
                    seqNo: n.data.yxvalidCount + n.data.invalidCount,
                    cardTime: e.formatTime4(new Date()),
                    status: 1,
                    message: "有效",
                    uploadStatus: 1,
                    remarks: ""
                };
                if ("" == a) t = {
                    deviceId: a,
                    seqNo: n.data.yxvalidCount + n.data.invalidCount,
                    cardTime: e.formatTime4(new Date()),
                    status: 0,
                    message: "无效",
                    uploadStatus: 1,
                    remarks: ""
                };
                n.data.cardArray.push(t), wx.setStorageSync("cardArray", n.data.cardArray), n.data.detailsArray.push(t), 
                n.setData({
                    detailsArray: n.data.detailsArray
                }), wx.setStorageSync("detailsArray", n.data.detailsArray);
            }
        });
    },
    venueCardBatch: function() {
        var a = this, e = {};
        e.openid = t.globalData.userStatus.openid, e.userid = t.globalData.userStatus.userid, 
        e.venueId = a.data.venueId, e.cardid = a.data.cardid, e.timestamp = Math.round(new Date().getTime() / 1e3).toString();
        for (var n = [], i = 0; i < a.data.cardArray.length; i++) {
            var d = JSON.stringify(a.data.cardArray[i]).replace(/,/g, ";");
            n.push(d);
        }
        e.cardArray = n, wx.showLoading({
            title: "加载中",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "/f/api/venueCardBatch",
            method: "POST",
            data: e,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常venueCardBatch500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode ? (wx.showToast({
                    title: "上传成功",
                    none: t.data.retmsg
                }), a.setData({
                    detailsArray: t.data.detailsArray,
                    cardArray: []
                }), wx.setStorageSync("cardArray", a.data.cardArray), wx.setStorageSync("detailsArray", t.data.detailsArray)) : wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function(a) {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常venueCardBatch",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    venueCardStart: function(a) {
        var d = this;
        if (1 == d.data.venueType && wx.openBluetoothAdapter({
            success: function(n) {
                wx.startBluetoothDevicesDiscovery({
                    powerLevel: "high",
                    success: function(n) {
                        wx.getBluetoothDevices({
                            success: function(n) {
                                for (var o = 0; o < n.devices.length; o++) if ("xBeacon" == n.devices[o].localName || "xBeacon" == n.devices[o].name) {
                                    if (null != n.devices[o].serviceData && null != n.devices[o].serviceData) if (n.devices[o].serviceData.hasOwnProperty("00001529-0000-1000-8000-00805F9B34FB")) for (var s = 0; s < d.data.deviceList.length; s++) {
                                        var r = i(n.devices[o].serviceData["00001529-0000-1000-8000-00805F9B34FB"]);
                                        if (d.data.deviceList[s].deviceAddress.includes(r)) {
                                            d.setData({
                                                deviceId: d.data.deviceList[s].deviceId,
                                                ksflag: 1
                                            });
                                            var c = a.currentTarget.dataset.cardflag, u = t.globalData.userStatus.openid, l = t.globalData.userStatus.userid, v = d.data.venueId, w = d.data.cardid, g = d.data.deviceId, y = Math.round(new Date().getTime() / 1e3).toString(), S = 1;
                                            wx.showLoading({
                                                title: "加载中...",
                                                mask: !0
                                            }), wx.request({
                                                url: t.globalData.apiurl + "/f/api/venueCardStart?openid=" + u + "&userid=" + l + "&venueId=" + v + "&cardFlag=" + c + "&cardid=" + w + "&deviceId=" + g + "&timestamp=" + y + "&endFlag=" + S,
                                                method: "POST",
                                                success: function(a) {
                                                    if (wx.hideLoading(), 200 != a.statusCode) wx.showToast({
                                                        title: "人数过多请稍后重试，服务器异常venueCardStart500",
                                                        icon: "none",
                                                        duration: 1e3
                                                    }); else if ("000000" == a.data.retcode) {
                                                        d.count_down1(), d.startLocationUpdateBackground(), d.onLocationChange();
                                                        var t = new Date(), n = new Date(), i = e.formatTimeHM(t);
                                                        wx.setStorageSync("venueType", d.data.venueType), wx.setStorageSync("deviceId", a.data.deviceId), 
                                                        wx.setStorageSync("cardid", a.data.cardid), wx.setStorageSync("venueId", d.data.venueId), 
                                                        wx.setStorageSync("venueName", d.data.venueName), wx.setStorageSync("itemName", d.data.itemName), 
                                                        wx.setStorageSync("cardRate", d.data.cardRate), wx.setStorageSync("cardRateMax", d.data.cardRateMax), 
                                                        wx.setStorageSync("cardNumber", d.data.cardNumber), d.setData({
                                                            runnewdata: t,
                                                            lastdata: n,
                                                            starttime: i,
                                                            cardid: a.data.cardid,
                                                            detailsArray: a.data.detailsArray,
                                                            yxvalidCount: d.data.yxvalidCount + 1,
                                                            qiandaoStatus: 1,
                                                            quyuoff: !0
                                                        }), wx.setStorageSync("lastdata", d.data.lastdata), wx.setStorageSync("runnewdata", d.data.runnewdata), 
                                                        wx.setStorageSync("starttime", d.data.starttime), wx.setStorageSync("qiandaoStatus", d.data.qiandaoStatus), 
                                                        wx.setStorageSync("detailsArray", d.data.detailsArray), wx.setStorageSync("yxvalidCount", d.data.yxvalidCount), 
                                                        wx.setStorageSync("invalidCount", d.data.invalidCount), wx.stopBluetoothDevicesDiscovery({
                                                            success: function(a) {
                                                                wx.closeBluetoothAdapter({
                                                                    success: function(a) {
                                                                        wx.openBluetoothAdapter({
                                                                            success: function(a) {
                                                                                wx.startBluetoothDevicesDiscovery({
                                                                                    powerLevel: "high",
                                                                                    success: function(a) {},
                                                                                    fail: function(a) {}
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    } else wx.showToast({
                                                        title: a.data.retmsg,
                                                        icon: "error",
                                                        duration: 1e3,
                                                        mask: !0
                                                    });
                                                },
                                                fail: function() {
                                                    wx.hideLoading(), wx.showToast({
                                                        title: "人数过多请稍后重试,网络或服务器异常venueCardStart",
                                                        icon: "none",
                                                        duration: 1e3
                                                    });
                                                }
                                            });
                                            break;
                                        }
                                    } else if (n.devices[o].serviceData.hasOwnProperty("00002E60-0000-1000-8000-00805F9B34FB")) for (s = 0; s < d.data.deviceList.length; s++) {
                                        r = i(n.devices[o].serviceData["00002E60-0000-1000-8000-00805F9B34FB"]);
                                        if (d.data.deviceList[s].deviceAddress.includes(r)) {
                                            d.setData({
                                                deviceId: d.data.deviceList[s].deviceId,
                                                ksflag: 1
                                            });
                                            c = a.currentTarget.dataset.cardflag, u = t.globalData.userStatus.openid, l = t.globalData.userStatus.userid, 
                                            v = d.data.venueId, w = d.data.cardid, g = d.data.deviceId, y = Math.round(new Date().getTime() / 1e3).toString(), 
                                            S = 1;
                                            wx.showLoading({
                                                title: "加载中...",
                                                mask: !0
                                            }), wx.request({
                                                url: t.globalData.apiurl + "/f/api/venueCardStart?openid=" + u + "&userid=" + l + "&venueId=" + v + "&cardFlag=" + c + "&cardid=" + w + "&deviceId=" + g + "&timestamp=" + y + "&endFlag=" + S,
                                                method: "POST",
                                                success: function(a) {
                                                    if (wx.hideLoading(), 200 != a.statusCode) wx.showToast({
                                                        title: "人数过多请稍后重试，服务器异常venueCardStart500",
                                                        icon: "none",
                                                        duration: 1e3
                                                    }); else if ("000000" == a.data.retcode) {
                                                        d.count_down1(), d.startLocationUpdateBackground(), d.onLocationChange();
                                                        var t = new Date(), n = new Date(), i = e.formatTimeHM(t);
                                                        wx.setStorageSync("venueType", d.data.venueType), wx.setStorageSync("deviceId", a.data.deviceId), 
                                                        wx.setStorageSync("cardid", a.data.cardid), wx.setStorageSync("venueId", d.data.venueId), 
                                                        wx.setStorageSync("venueName", d.data.venueName), wx.setStorageSync("itemName", d.data.itemName), 
                                                        wx.setStorageSync("cardRate", d.data.cardRate), wx.setStorageSync("cardRateMax", d.data.cardRateMax), 
                                                        wx.setStorageSync("cardNumber", d.data.cardNumber), d.setData({
                                                            runnewdata: t,
                                                            lastdata: n,
                                                            starttime: i,
                                                            cardid: a.data.cardid,
                                                            detailsArray: a.data.detailsArray,
                                                            yxvalidCount: d.data.yxvalidCount + 1,
                                                            qiandaoStatus: 1,
                                                            quyuoff: !0
                                                        }), wx.setStorageSync("lastdata", d.data.lastdata), wx.setStorageSync("runnewdata", d.data.runnewdata), 
                                                        wx.setStorageSync("starttime", d.data.starttime), wx.setStorageSync("qiandaoStatus", d.data.qiandaoStatus), 
                                                        wx.setStorageSync("detailsArray", d.data.detailsArray), wx.setStorageSync("yxvalidCount", d.data.yxvalidCount), 
                                                        wx.setStorageSync("invalidCount", d.data.invalidCount), wx.stopBluetoothDevicesDiscovery({
                                                            success: function(a) {
                                                                wx.closeBluetoothAdapter({
                                                                    success: function(a) {
                                                                        wx.openBluetoothAdapter({
                                                                            success: function(a) {
                                                                                wx.startBluetoothDevicesDiscovery({
                                                                                    powerLevel: "high",
                                                                                    success: function(a) {},
                                                                                    fail: function(a) {}
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    } else wx.showToast({
                                                        title: a.data.retmsg,
                                                        icon: "error",
                                                        duration: 1e3,
                                                        mask: !0
                                                    });
                                                },
                                                fail: function() {
                                                    wx.hideLoading(), wx.showToast({
                                                        title: "人数过多请稍后重试,网络或服务器异常venueCardStart",
                                                        icon: "none",
                                                        duration: 1e3
                                                    });
                                                }
                                            });
                                            break;
                                        }
                                    } else if (n.devices[o].serviceData.hasOwnProperty("00004160-0000-1000-8000-00805F9B34FB")) for (s = 0; s < d.data.deviceList.length; s++) {
                                        r = i(n.devices[o].serviceData["00004160-0000-1000-8000-00805F9B34FB"]);
                                        if (d.data.deviceList[s].deviceAddress.includes(r)) {
                                            d.setData({
                                                deviceId: d.data.deviceList[s].deviceId,
                                                ksflag: 1
                                            });
                                            c = a.currentTarget.dataset.cardflag, u = t.globalData.userStatus.openid, l = t.globalData.userStatus.userid, 
                                            v = d.data.venueId, w = d.data.cardid, g = d.data.deviceId, y = Math.round(new Date().getTime() / 1e3).toString(), 
                                            S = 1;
                                            wx.showLoading({
                                                title: "加载中...",
                                                mask: !0
                                            }), wx.request({
                                                url: t.globalData.apiurl + "/f/api/venueCardStart?openid=" + u + "&userid=" + l + "&venueId=" + v + "&cardFlag=" + c + "&cardid=" + w + "&deviceId=" + g + "&timestamp=" + y + "&endFlag=" + S,
                                                method: "POST",
                                                success: function(a) {
                                                    if (wx.hideLoading(), 200 != a.statusCode) wx.showToast({
                                                        title: "人数过多请稍后重试，服务器异常venueCardStart500",
                                                        icon: "none",
                                                        duration: 1e3
                                                    }); else if ("000000" == a.data.retcode) {
                                                        d.count_down1(), d.startLocationUpdateBackground(), d.onLocationChange();
                                                        var t = new Date(), n = new Date(), i = e.formatTimeHM(t);
                                                        wx.setStorageSync("venueType", d.data.venueType), wx.setStorageSync("deviceId", a.data.deviceId), 
                                                        wx.setStorageSync("cardid", a.data.cardid), wx.setStorageSync("venueId", d.data.venueId), 
                                                        wx.setStorageSync("venueName", d.data.venueName), wx.setStorageSync("itemName", d.data.itemName), 
                                                        wx.setStorageSync("cardRate", d.data.cardRate), wx.setStorageSync("cardRateMax", d.data.cardRateMax), 
                                                        wx.setStorageSync("cardNumber", d.data.cardNumber), d.setData({
                                                            runnewdata: t,
                                                            lastdata: n,
                                                            starttime: i,
                                                            cardid: a.data.cardid,
                                                            detailsArray: a.data.detailsArray,
                                                            yxvalidCount: d.data.yxvalidCount + 1,
                                                            qiandaoStatus: 1,
                                                            quyuoff: !0
                                                        }), wx.setStorageSync("lastdata", d.data.lastdata), wx.setStorageSync("runnewdata", d.data.runnewdata), 
                                                        wx.setStorageSync("starttime", d.data.starttime), wx.setStorageSync("qiandaoStatus", d.data.qiandaoStatus), 
                                                        wx.setStorageSync("detailsArray", d.data.detailsArray), wx.setStorageSync("yxvalidCount", d.data.yxvalidCount), 
                                                        wx.setStorageSync("invalidCount", d.data.invalidCount), wx.stopBluetoothDevicesDiscovery({
                                                            success: function(a) {
                                                                wx.closeBluetoothAdapter({
                                                                    success: function(a) {
                                                                        wx.openBluetoothAdapter({
                                                                            success: function(a) {
                                                                                wx.startBluetoothDevicesDiscovery({
                                                                                    powerLevel: "high",
                                                                                    success: function(a) {},
                                                                                    fail: function(a) {}
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    } else wx.showToast({
                                                        title: a.data.retmsg,
                                                        icon: "error",
                                                        duration: 1e3,
                                                        mask: !0
                                                    });
                                                },
                                                fail: function() {
                                                    wx.hideLoading(), wx.showToast({
                                                        title: "人数过多请稍后重试,网络或服务器异常venueCardStart",
                                                        icon: "none",
                                                        duration: 1e3
                                                    });
                                                }
                                            });
                                            break;
                                        }
                                    }
                                    if (1 == d.data.ksflag) break;
                                }
                            },
                            fail: function(a) {
                                wx.showToast({
                                    title: "发现蓝牙设备失败",
                                    icon: "error",
                                    duration: 1e3
                                });
                            },
                            complete: function(a) {
                                0 == d.data.ksflag && wx.showToast({
                                    title: "未在场馆内",
                                    duration: 1e3
                                });
                            }
                        });
                    },
                    fail: function(a) {
                        wx.showToast({
                            title: "搜寻附近的蓝牙失败",
                            icon: "error",
                            duration: 1e3
                        });
                    }
                });
            },
            fail: function(a) {
                wx.showToast({
                    title: "初始蓝牙模块失败",
                    icon: "error",
                    duration: 1e3
                });
            }
        }), 2 == d.data.venueType) {
            var o = d.data.deviceList;
            wx.getLocation({
                type: "gcj02",
                isHighAccuracy: !0,
                highAccuracyExpireTime: 3e3,
                success: function(i) {
                    var s = n.getDistanceMarkcg(o, i.latitude, i.longitude, d.data.searchDiam);
                    if (d.setData({
                        deviceId: s
                    }), d.data.deviceId > 0) {
                        var r = a.currentTarget.dataset.cardflag, c = t.globalData.userStatus.openid, u = t.globalData.userStatus.userid, l = d.data.venueId, v = d.data.cardid, w = (s = d.data.deviceId, 
                        Math.round(new Date().getTime() / 1e3).toString());
                        wx.showLoading({
                            title: "加载中...",
                            mask: !0
                        }), wx.request({
                            url: t.globalData.apiurl + "/f/api/venueCardStart?openid=" + c + "&userid=" + u + "&venueId=" + l + "&cardFlag=" + r + "&cardid=" + v + "&deviceId=" + s + "&timestamp=" + w + "&endFlag=1",
                            method: "POST",
                            success: function(a) {
                                if (wx.hideLoading(), 200 != a.statusCode) wx.showToast({
                                    title: "人数过多请稍后重试，服务器异常venueCardStart500",
                                    icon: "none",
                                    duration: 1e3
                                }); else if ("000000" == a.data.retcode) {
                                    d.count_down1(), d.startLocationUpdateBackground(), d.onLocationChange(), wx.setStorageSync("venueType", d.data.venueType), 
                                    wx.setStorageSync("deviceId", d.data.deviceId), wx.setStorageSync("cardid", a.data.cardid), 
                                    wx.setStorageSync("venueId", d.data.venueId), wx.setStorageSync("venueName", d.data.venueName), 
                                    wx.setStorageSync("itemName", d.data.itemName), wx.setStorageSync("cardRate", d.data.cardRate), 
                                    wx.setStorageSync("cardRateMax", d.data.cardRateMax), wx.setStorageSync("cardNumber", d.data.cardNumber);
                                    var t = new Date(), n = new Date(), i = e.formatTimeHM(t);
                                    d.setData({
                                        runnewdata: t,
                                        lastdata: n,
                                        starttime: i,
                                        cardid: a.data.cardid,
                                        detailsArray: a.data.detailsArray,
                                        qiandaoStatus: 1,
                                        yxvalidCount: d.data.yxvalidCount + 1,
                                        quyuoff: !0
                                    }), wx.setStorageSync("lastdata", d.data.lastdata), wx.setStorageSync("runnewdata", d.data.runnewdata), 
                                    wx.setStorageSync("starttime", d.data.starttime), wx.setStorageSync("qiandaoStatus", d.data.qiandaoStatus), 
                                    wx.setStorageSync("detailsArray", d.data.detailsArray), wx.setStorageSync("yxvalidCount", d.data.yxvalidCount), 
                                    wx.setStorageSync("invalidCount", d.data.invalidCount);
                                } else wx.showToast({
                                    title: a.data.retmsg,
                                    icon: "error",
                                    duration: 1e3
                                });
                            },
                            fail: function() {
                                wx.hideLoading(), wx.showToast({
                                    title: "人数过多请稍后重试,网络或服务器异常venueCardStart",
                                    icon: "none",
                                    duration: 1e3
                                });
                            }
                        });
                    } else wx.showToast({
                        title: "未在场馆内"
                    });
                },
                fail: function() {
                    wx.showToast({
                        title: "位置获取失败",
                        icon: "error",
                        duration: 1e3
                    });
                }
            });
        }
    },
    venueCardEnd: function(a) {
        var e = this, n = t.globalData.userStatus.openid, i = t.globalData.userStatus.userid, d = e.data.venueId, o = e.data.cardid, s = e.data.deviceId, r = Math.round(new Date().getTime() / 1e3).toString();
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "/f/api/venueCardStart?openid=" + n + "&userid=" + i + "&venueId=" + d + "&cardFlag=2&cardid=" + o + "&deviceId=" + s + "&timestamp=" + r + "&endFlag=1",
            method: "POST",
            success: function(a) {
                wx.hideLoading(), 200 != a.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常venueCardStart500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == a.data.retcode ? (t.globalData.getVenuedata = 1, clearTimeout(e.data.param1), 
                clearTimeout(e.data.param2), wx.setStorageSync("cardid", a.data.cardid), wx.stopBluetoothDevicesDiscovery({
                    success: function(a) {}
                }), wx.closeBluetoothAdapter({
                    success: function(a) {}
                }), e.stopLocationUpdate(), e.setData({
                    cardid: a.data.cardid
                }), wx.removeStorageSync("venueType"), wx.removeStorageSync("deviceId"), wx.removeStorageSync("cardid"), 
                wx.removeStorageSync("venueId"), wx.removeStorageSync("venueName"), wx.removeStorageSync("itemName"), 
                wx.removeStorageSync("cardRate"), wx.removeStorageSync("cardRateMax"), wx.removeStorageSync("cardNumber"), 
                wx.removeStorageSync("lastdata"), wx.removeStorageSync("runnewdata"), wx.removeStorageSync("starttime"), 
                wx.removeStorageSync("qiandaoStatus"), wx.removeStorageSync("detailsArray"), wx.removeStorageSync("yxvalidCount"), 
                wx.removeStorageSync("invalidCount"), wx.removeStorageSync("cardArray"), wx.navigateBack()) : wx.showToast({
                    title: a.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
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
    getVenueDevice: function() {
        var a = this, e = t.globalData.userStatus.openid, n = t.globalData.userStatus.userid, i = a.data.venueId;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: t.globalData.apiurl + "/f/api/getVenueDevice?openid=" + e + "&userid=" + n + "&venueId=" + i,
            method: "POST",
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常getVenueDevice500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode ? (a.setData({
                    realName: t.data.realName,
                    venueType: t.data.venueType,
                    sexName: t.data.sexName,
                    headUrl: t.data.headUrl,
                    deviceList: t.data.deviceList,
                    allCount: t.data.allCount,
                    validCount: t.data.validCount,
                    searchDiam: t.data.searchDiam
                }), a.sxquyuLocation()) : wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常getVenueDevice",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    onLoad: function(t) {
        this.endalertview = this.selectComponent("#endalertview");
        if (null != wx.getStorageSync("cardid") && "" != wx.getStorageSync("cardid")) {
            this.stopLocationUpdate();
            var e = wx.getStorageSync("venueType"), n = wx.getStorageSync("runnewdata"), i = wx.getStorageSync("starttime"), d = wx.getStorageSync("cardid"), o = wx.getStorageSync("venueId"), s = wx.getStorageSync("venueName"), r = wx.getStorageSync("itemName"), c = wx.getStorageSync("cardRate"), u = wx.getStorageSync("cardRateMax"), l = wx.getStorageSync("cardNumber"), v = wx.getStorageSync("rangeHour"), w = (r = wx.getStorageSync("itemName"), 
            wx.getStorageSync("detailsArray") || []), g = wx.getStorageSync("yxvalidCount"), y = wx.getStorageSync("invalidCount"), S = wx.getStorageSync("cardArray") || [], x = wx.getStorageSync("qiandaoStatus"), h = wx.getStorageSync("lastdata");
            this.setData({
                lastdata: h,
                venueType: e,
                runtimess: 1e3 * Math.round((new Date() - n) / 1e3),
                runtimemm: Math.floor((new Date() - n) / 6e4),
                runnewdata: n,
                starttime: i,
                cardid: d,
                qiandaoStatus: x,
                detailsArray: w,
                yxvalidCount: g,
                invalidCount: y,
                cardArray: S
            }), this.count_down1();
        } else o = t.venueId, s = t.venueName, c = t.cardRate, u = t.cardRateMax, l = t.cardNumber, 
        v = t.rangeHour, r = t.itemName;
        this.setData(a(a(a(a(a(a({
            venueId: o,
            venueName: s
        }, "navbarData.title", r), "cardRate", c), "cardRateMax", u), "cardNumber", l), "rangeHour", v), "itemName", r)), 
        this.getLocation();
    },
    onReady: function() {
        if (null != wx.getStorageSync("cardid") && "" != wx.getStorageSync("cardid")) {
            this.startLocationUpdateBackground();
            var a = wx.getStorageSync("detailsArray") || [], t = wx.getStorageSync("yxvalidCount"), e = wx.getStorageSync("invalidCount"), n = wx.getStorageSync("cardArray") || [];
            this.setData({
                detailsArray: a,
                yxvalidCount: t,
                invalidCount: e,
                cardArray: n
            }), this.onLocationChange();
        }
    },
    openLocationAdapter: function() {
        var a = this, t = this.selectComponent("#gpsalertview");
        wx.getSystemInfo({
            success: function(e) {
                if (a.setData({
                    locationEnabled: e.locationEnabled
                }), !a.data.locationEnabled) return t.showAlertView(), !1;
            }
        });
    },
    closeEvent2: function() {
        var a = this.selectComponent("#gpsalertview");
        a.hideAlertView(), this.openLocationAdapter(), this.data.locationEnabled || a.showAlertView(), 
        wx.showTabBar();
    },
    openBluetoothAdapter: function() {
        var a = this;
        wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    isBlueOpen: t.bluetoothEnabled
                });
                var e = a.selectComponent("#blueView");
                if (!a.data.isBlueOpen) return e.showAlertView(), !1;
            }
        });
    },
    closeBlueEvent: function() {
        this.selectComponent("#blueView").hideAlertView(), this.openBluetoothAdapter(), 
        wx.showTabBar();
    },
    onShow: function() {
        if (null != wx.getStorageSync("cardid") && "" != wx.getStorageSync("cardid")) {
            var a = wx.getStorageSync("runnewdata");
            this.setData({
                runtimess: 1e3 * Math.round((new Date() - a) / 1e3),
                runtimemm: Math.floor((new Date() - a) / 6e4)
            });
        }
        this.getVenueDevice(), this.openBluetoothAdapter(), this.openLocationAdapter(), 
        this.count_down4();
    },
    onHide: function() {},
    onUnload: function() {},
    stopLocationUpdate: function() {
        wx.offLocationChange(), wx.stopLocationUpdate({
            complete: function(a) {}
        });
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});