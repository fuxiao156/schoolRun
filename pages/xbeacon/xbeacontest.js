var e = getApp();

function t(e) {
    var t = e.slice(7, 13);
    return Array.prototype.map.call(new Uint8Array(t), function(e) {
        return ("00" + e.toString(16)).slice(-2);
    }).join(":").toUpperCase();
}

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "搜索蓝牙"
        },
        navheight: e.globalData.navBarHeight,
        winHeight: e.globalData.windowHeight,
        statusBarHeight: e.globalData.statusBarHeight,
        screenHeight: e.globalData.screenHeight,
        devices: [],
        status: 0,
        openBluetoot: 0,
        startBluetooth: 0,
        getBluetooth: 0,
        punchCardBlueNum: 0,
        deviceIds: []
    },
    clearData: function() {
        this.setData({
            devices: [],
            status: 4,
            openBluetoot: 0,
            startBluetooth: 0,
            getBluetooth: 0,
            punchCardBlueNum: 0,
            deviceIds: []
        });
    },
    openBluetoothAdapter: function() {
        var e = this;
        e.setData({
            status: 1
        }), wx.openBluetoothAdapter({
            success: function(t) {
                console.log("openBluetoothAdapter success", t), wx.startBluetoothDevicesDiscovery({
                    services: [],
                    powerLevel: "high",
                    success: function(e) {
                        console.log("startBluetoothDevicesDiscovery success", e);
                    },
                    fail: function(t) {
                        console.log("startBluetoothDevicesDiscovery fail", t), e.setData({
                            startBluetooth: e.data.startBluetooth + 1
                        }), wx.showToast({
                            title: "开始搜寻蓝牙外围设备失败，请检查微信蓝牙权限设置",
                            icon: "none",
                            duration: 2e3,
                            mask: !0
                        });
                    }
                });
            },
            fail: function(t) {
                e.setData({
                    openBluetoot: e.data.openBluetoot + 1
                }), console.log("openBluetoothAdapter fail" + t.errCode, t), 10001 === t.errCode && wx.onBluetoothAdapterStateChange(function(t) {
                    console.log("onBluetoothAdapterStateChange", t), t.available ? wx.startBluetoothDevicesDiscovery({
                        services: [],
                        powerLevel: "high",
                        success: function(e) {
                            console.log("startBluetoothDevicesDiscovery success", e);
                        },
                        fail: function(t) {
                            console.log("startBluetoothDevicesDiscovery fail", t), e.setData({
                                startBluetooth: e.data.startBluetooth + 1
                            }), wx.showToast({
                                title: "开始搜寻蓝牙外围设备失败，请检查微信蓝牙权限设置",
                                icon: "none",
                                duration: 2e3,
                                mask: !0
                            });
                        }
                    }) : wx.showToast({
                        title: "初始化蓝牙模块失败，请检查微信蓝牙权限设置",
                        icon: "none",
                        duration: 2e3,
                        mask: !0
                    });
                });
            }
        });
    },
    selectxBeacon: function() {
        var e = this;
        e.setData({
            status: 2,
            punchCardBlueNum: e.data.punchCardBlueNum + 1
        }), wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.getBluetoothDevices({
            success: function(o) {
                console.log(o.devices), e.setData({
                    devices: o.devices
                });
                for (var a = 0; a < o.devices.length; a++) if ("xBeacon" == o.devices[a].name && null != o.devices[a].serviceData && null != o.devices[a].serviceData) if (o.devices[a].serviceData.hasOwnProperty("00001529-0000-1000-8000-00805F9B34FB")) {
                    var s = t(o.devices[a].serviceData["00001529-0000-1000-8000-00805F9B34FB"]);
                    console.log(s), e.data.deviceIds.push(s), e.setData({
                        deviceIds: e.data.deviceIds
                    });
                } else if (o.devices[a].serviceData.hasOwnProperty("00002E60-0000-1000-8000-00805F9B34FB")) {
                    s = t(o.devices[a].serviceData["00002E60-0000-1000-8000-00805F9B34FB"]);
                    console.log(s), e.data.deviceIds.push(s), e.setData({
                        deviceIds: e.data.deviceIds
                    });
                } else if (o.devices[a].serviceData.hasOwnProperty("00004160-0000-1000-8000-00805F9B34FB")) {
                    s = t(o.devices[a].serviceData["00004160-0000-1000-8000-00805F9B34FB"]);
                    console.log(s), e.data.deviceIds.push(s), e.setData({
                        deviceIds: e.data.deviceIds
                    });
                }
                wx.hideLoading();
                var i = "站在手动打卡点，重新点击手动打卡" + e.data.punchCardBlueNum + "_" + o.devices.length;
                wx.showToast({
                    title: i,
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                });
            },
            fail: function(t) {
                wx.hideLoading(), console.log("getBluetoothDevices fail", t);
                var o = e.data.getBluetooth + 1;
                e.setData({
                    getBluetooth: o
                });
            }
        });
    },
    onLoad: function(e) {},
    stopBluetooth: function() {
        this.setData({
            status: 3
        }), wx.stopBluetoothDevicesDiscovery({
            success: function(e) {
                wx.closeBluetoothAdapter({
                    success: function(e) {},
                    fail: function(e) {}
                });
            },
            fail: function(e) {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});