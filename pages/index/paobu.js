var t, e = require("../../2C088A0753E228FF4A6EE200B445E640.js"), a = require("../../5389A33153E228FF35EFCB360535E640.js"), o = require("../../83B41FC153E228FFE5D277C6CA15E640.js"), i = getApp(),  r = "";
var posInfo = require("./data/pos");

function d(t) {
    var e = t.slice(7, 13);
    return Array.prototype.map.call(new Uint8Array(e), function(t) {
        return ("00" + t.toString(16)).slice(-2);
    }).join(":").toUpperCase();
}

Page({
    data: {
        showSet:true,
        fakeDistance:3.54,
        fakeSpeed:4.1,
        completeStrTime:"",
        needsecondes:60000,
        fakeArr:[],
        navbarData: {
            showCapsule: 0,
            title: "跑步"
        },
        navheight: i.globalData.navBarHeight,
        winHeight: i.globalData.windowHeight,
        screenHeight: i.globalData.screenHeight,
        latitude: "",
        longitude: "",
        seqNo: 0,
        polyline: [],
        points: [],
        cal: 0,
        speed: 0,
        av_speed: "0'00''",
        avSpeedNum: 0,
        mins: 0,
        seconds: 0,
        meters: 0,
        runmeters: 0,
        times: 0,
        time: "00:00:00",
        bgcolor: "#ffffff",
        fontcolor: "#000000",
        layerstyle: 1,
        animationData: "",
        showModalStatus: "",
        runstatus: 0,
        isstop: !1,
        alertview: "",
        modelview: "",
        modeltopview: "",
        array: [ "每2分钟", "每5分钟", "每10分钟", "每15分钟" ],
        btntxt: "暂停",
        runType: 1,
        countDownNum: 3,
        initlatitude: "",
        initlongitude: "",
        detailId: "",
        aniHeigh: 1e3,
        boxheight: 220,
        ispenvido: !0,
        volume: 1,
        markers: [],
        endcontent: "由于跑程距离过短，结束将",
        endcontent1: "不保存",
        endcontent2: "此次记录。 您确定要结束吗？",
        minTime: 3,
        maxTime: 10,
        mileageTarget: "",
        maxSpaceTime: "",
        polylines: [],
        polygons: [],
        polygonArray: [],
        polygonStatus: 0,
        voiceSwitch: 1,
        voiceCount: 1,
        voiceMinute: 5,
        voiceSecond: 300,
        screenSwitch: 1,
        isbackground: !1,
        voiceNumber: 1,
        updatatime: 1,
        isdaojishi: !0,
        lastDkDeviceid: "",
        lineArray: [],
        stopArray: [],
        lineId: 0,
        offyesqy: !0,
        openPageNum: 0,
        searchDiam: 30,
        schoolId: "",
        uploadDetailNum: 0,
        uploadType: 0,
        runCheckStatus: 0,
        batchNo: "",
        fileName: "",
        filePath: "",
        getLocationerr: 0,
        continueCount: 0,
        positionCount: 0,
        fileId: 0,
        deviceType: 2,
        startRunDate: 0,
        punchCardSum: 0,
        punchCardNum: 0,
        startType: 1,
        punchCardArray: [],
        runBitmap: "",
        remarks: "",
        timeoutArray: [],
        timerunArray: [],
        timestopArray: [],
        timestopsum: 0,
        suspendStatus: 0,
        suspendCardArray: [],
        searchCard: 0,
        punchBlueNum: 0,
        punchDistanceNum: 0,
        areaNo: "",
    },
    count_down: function(t) {
        if (1 != t.data.runstatus) {
            var a = (Date.parse(new Date()) - t.data.startRunDate - t.data.timestopsum) / 1e3, o = e.date_format(a);
            if(a>this.data.needsecondes&&a<60000){
                console.log("时间到")
                console.log("经过时间:"+ a)
                console.log("需要时间："+this.data.needsecondes)
                this.writeFile()
                this.apiStopRun()
            }
            var tempmeter =Math.ceil(a/this.data.fakeSpeed*5/3)/100 
            t.setData({
                meters: tempmeter,
                runmeters:tempmeter
            });
            var temp = parseInt(a*993/this.data.needsecondes)
            // console.log('fakeArr is ',this.data.fakeArr)
            if(temp > this.data.fakeArr.length && temp< posInfo.pos.length){
              this.insertFakeData(temp);
            }
            if (0 == t.data.meters) t.setData({
                times: a,
                time: o,
                mins: 0,
                seconds: 0,
                av_speed: "0'00''",
                avSpeedNum: 0
            }); else {
                var i = Math.ceil(a / t.data.meters), n = Math.floor(i / 60), d = i % 60;
                t.setData({
                    times: a,
                    time: o,
                    mins: n,
                    seconds: d,
                    av_speed: n + "'" + d + "''",
                    avSpeedNum: n + d / 100
                });
            }
            a % 5 == 0 && t.openLocationAdapter(), r = setTimeout(function() {
                t.count_down(t);
            }, 1e3);

            var lastMarkTimes = t.data.punchCardSum - t.data.punchCardNum 
            if(lastMarkTimes>0){
                if(a%40 == 5){
                    t.punchFakeChard()
                }
            }
        }
    },
    openBluetoothAdapter: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                t.setData({
                    isBlueOpen: e.bluetoothEnabled
                });
                var a = t.selectComponent("#blueView");
                if (!t.data.isBlueOpen) return a.showAlertView(), !1;
            }
        });
    },
    ab2hext: function(t) {
        return Array.prototype.map.call(new Uint8Array(t), function(t) {
            return ("00" + t.toString(16)).slice(-2);
        }).join("");
    },
    startLocationUpdateBackground: function() {
        wx.startLocationUpdateBackground({
            complete: function(t) {}
        });
    },
    onLocationChange: function() {
        var a = this;
        wx.onLocationChange(function(o) {
            console.log("位置移动")
            if (1 == a.data.runstatus) {
                e.playYuying("/images/goingrun.mp3");
                var i = Date.parse(new Date());
                t.lastlatitude = o.latitude, t.lastlongitude = o.longitude, t.yeslastlatitude = o.latitude, 
                t.yeslastlongitude = o.longitude, t.yeslasttime = i, t.startRun(o.longitude, o.latitude), 
                a.data.timerunArray.push(i);
                var r = a.data.timerunArray.length - 1, d = a.data.timerunArray[r] - a.data.timeoutArray[r];
                a.data.timestopArray.push(d), a.setData({
                    runstatus: 0,
                    latitude: o.latitude,
                    longitude: o.longitude,
                    timestopsum: a.data.timestopsum + d
                }), wx.setStorageSync("timerunArray", a.data.timerunArray), wx.setStorageSync("timestopsum", a.data.timestopsum), 
                wx.setStorageSync("runstatus", 0), a.count_down(a), a.recoveryRun(o.longitude, o.latitude);
            } else {
                t.polygonArray = a.data.polygonArray, t.saveData(o);
                var s = Math.floor(100 * t.runmeters) / 100, u = a.data.punchCardArray;
                if (2 == a.data.runType) ;  else {
                    var l;
                    0 != (l = e.getDistanceMark(u, o.latitude, o.longitude, a.data.searchDiam)) && 1 != l && l != a.data.lastDkDeviceid && a.runPunchCard(l);
                }
                1 == a.data.voiceSwitch && Math.floor(a.data.times / a.data.voiceSecond) == a.data.voiceNumber && (n.textToSpeech({
                    lang: "zh_CN",
                    tts: !0,
                    content: "已运动" + a.data.runmeters + "公里用时" + a.data.voiceNumber * a.data.voiceMinute + "分钟平均配速" + a.data.mins + "分" + a.data.seconds + "秒",
                    success: function(t) {
                        e.playYuying(t.filename);
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "textToSpeech错误",
                            icon: "error",
                            duration: 1e3
                        });
                    }
                }), a.setData({
                    voiceNumber: a.data.voiceNumber + 1
                }));
                var c = e.getKal(s), h = a.data.markers;
                (y = {
                    id: 0
                }).latitude = t.latitude, y.longitude = t.longitude, y.iconPath = "/images/run.png", 
                y.width = 25, y.height = 25;
                for (var p = 0, g = 0; g < h.length; g++) {
                    if (0 == h[g].id) {
                        h[g] = y;
                        break;
                    }
                    p++;
                }
                h.length == p && h.push(y);
                var w = wx.getStorageSync("polylinecache");
                if (w[0]) {
                    var m = w[0].points[0];
                    (y = {
                        id: 1
                    }).latitude = m.latitude, y.longitude = m.longitude, y.iconPath = "/images/qid.png", 
                    y.width = 25, y.height = 25;
                } else {
                    var y;
                    (y = {
                        id: 1
                    }).latitude = a.data.initlatitude, y.longitude = a.data.initlongitude, y.iconPath = "/images/qid.png", 
                    y.width = 25, y.height = 25;
                }
                var S = 0;
                for (g = 0; g < h.length; g++) {
                    if (1 == h[g].id) {
                        h[g] = y;
                        break;
                    }
                    S++;
                }
                h.length == S && h.push(y), a.setData({
                    polylines: t.getPolyline(),
                    longitude: t.longitude,
                    latitude: t.latitude,
                    markers: h,
                    // runmeters: s,
                    // meters: s,
                    cal: c,
                    seqNo: t.seqNo
                }), a.data.offyesqy && a.fromtoMap();
            }
        });
    },
    offyesQuyu: function() {
        this.setData({
            offyesqy: !this.data.offyesqy
        });
    },
    fromtoMap: function() {
        this.mapCtx = wx.createMapContext("myMap"), this.mapCtx.includePoints({
            padding: [ 120, 50, 80, 50 ],
            points: this.data.markers
        });
    },
    startLocationUpdate: function() {
        wx.startLocationUpdate({
            complete: function(t) {}
        });
    },
    stopLocationUpdate: function() {
        wx.offLocationChange(), wx.stopLocationUpdate({
            complete: function(t) {}
        });
    },
    endRun: function() {
      console.log('进入endRun函数')
       this.writeFile(), 4 == this.data.runType ? this.apiStopSchoolRun() : this.apiStopRun();
    },
    apiStopSchoolRun: function() {
		console.log()
    },
    apiStopRun: function() {
        var a = this;
        a.stopLocationUpdate();
        var n = {}, d = Date.parse(new Date());
        n.openid = i.globalData.userStatus.openid, n.detailId = a.data.detailId, n.longitude = "", 
        n.latitude = "", n.runType = a.data.runType, n.endTime = d / 1e3; 
        // n.mileage = Math.ceil(100 * t.runmeters) / 100;
        if(a.data.needsecondes<a.data.times){
            n.mileage = a.data.fakeDistance
        }else{
            n.mileage = a.data.meters
        }
        var s = e.sortKey(n, i.globalData.datakey);
        n.sign = o.hexMD5(s), n.extentStatus = 1, n.continueCount = wx.getStorageSync("continueCount") || 0, 
        // n.positionCount = wx.getStorageSync("positionCount") || 0, n.seqNo = a.data.seqNo, 
        n.positionCount = 993, n.seqNo = 993, 
        n.remarks = a.data.remarks;
        var u = a.data.timeoutArray.length;
        if (u == a.data.timerunArray.length) n.suspendTime = a.data.timestopsum / 1e3; else {
            var l = d - a.data.timeoutArray[u - 1];
            n.suspendTime = (a.data.timestopsum + l) / 1e3;
        }
        console.log('跑步结束，提交的数据为',n)
        n.suspendCount = u, wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: i.globalData.apiurl + "/f/api/stopRun",
            method: "POST",
            data: n,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                wx.hideLoading(), 200 != e.statusCode ? wx.showToast({
                    title: "距离够后截图~联系客服~提供学号和截图。服务器异常stopRun2",
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                }) : "000000" == e.data.retcode ? (i.globalData.getPersonaldata = 0, i.globalData.getHome = 0, 
                clearTimeout(r), t.clearRunCacheData(), a.setData({
                    time: "00:00:00"
                }), wx.switchTab({
                    url: "/pages/index/index"
                })) : "000015" == e.data.retcode ? wx.showToast({
                    title: e.data.retmsg,
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                }) : wx.showToast({
                    title: "距离够后截图~联系客服~提供学号和截图。网络或服务器异常stopRun2",
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "距离够后截图~联系客服~提供学号和截图。网络或服务器异常stopRun2",
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                });
            }
        });
    },
    writeFile: function() {
        var a = this, n = wx.getFileSystemManager();
        n.access({
            path: wx.env.USER_DATA_PATH + "/" + a.data.detailId + ".txt",
            success: function(t) {
                wx.showLoading({
                    title: "加载中...",
                    mask: !0
                });
                var r = new Date().valueOf(), d = {};
                d.openid = wx.getStorageSync("openid"), d.fileType = 2, d.imageType = 1, d.batchNo = r;
                var s = e.sortKey(d, i.globalData.datakey), u = o.hexMD5(s);
                wx.uploadFile({
                    url: i.globalData.apiurl + "f/api/uploadFile",
                    filePath: wx.env.USER_DATA_PATH + "/" + a.data.detailId + ".txt",
                    name: "fileImg",
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    formData: {
                        openid: wx.getStorageSync("openid"),
                        fileType: 2,
                        imageType: 1,
                        schoolId: "",
                        batchNo: r,
                        sign: u,
                        detailId: a.data.detailId,
                        uploadImagetype: ""
                    },
                    success: function(t) {
                        wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                            title: "人数过多请稍后重试，服务器异常uploadFile500",
                            icon: "none",
                            duration: 1e3
                        }) : "000000" == t.data.retcode ? (a.data.fileId = t.data.fileId, n.unlink({
                            filePath: wx.env.USER_DATA_PATH + "/" + a.data.detailId + ".txt",
                            success: function(t) {},
                            fail: function(t) {}
                        })) : wx.showToast({
                            title: t.data.retmsg,
                            icon: "error",
                            duration: 1e3
                        });
                    },
                    fail: function(t) {
                        wx.hideLoading(), wx.showToast({
                            title: "人数过多请稍后重试,网络或服务器异常uploadFile",
                            icon: "none",
                            duration: 1e3
                        });
                    }
                });
            },
            fail: function(r) {
              //这里注入数据
              //TODO:
                // var d = t.runpoints.join("\r\n");
                var fakeData = a.createFakeDataD();
                n.writeFile({
                    filePath: wx.env.USER_DATA_PATH + "/" + a.data.detailId + ".txt",
                    data: fakeData,
                    encoding: "utf8",
                    success: function(t) {
                        wx.showLoading({
                            title: "加载中...",
                            mask: !0
                        });
                        var r = new Date().valueOf(), d = {};
                        d.openid = wx.getStorageSync("openid"), d.fileType = 2, d.imageType = 1, d.batchNo = r;
                        var s = e.sortKey(d, i.globalData.datakey), u = o.hexMD5(s);
                        wx.uploadFile({
                            url: i.globalData.apiurl + "f/api/uploadFile",
                            filePath: wx.env.USER_DATA_PATH + "/" + a.data.detailId + ".txt",
                            name: "fileImg",
                            header: {
                                "Content-Type": "multipart/form-data"
                            },
                            formData: {
                                openid: wx.getStorageSync("openid"),
                                fileType: 2,
                                imageType: 1,
                                schoolId: "",
                                batchNo: r,
                                sign: u,
                                detailId: a.data.detailId,
                                uploadImagetype: ""
                            },
                            success: function(t) {
                                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                                    title: "人数过多请稍后重试，服务器异常uploadFile500",
                                    icon: "none",
                                    duration: 1e3
                                }) : "000000" == t.data.retcode ? (a.data.fileId = t.data.fileId, n.unlink({
                                    filePath: wx.env.USER_DATA_PATH + "/" + a.data.detailId + ".txt",
                                    success: function(t) {},
                                    fail: function(t) {}
                                })) : wx.showToast({
                                    title: t.data.retmsg,
                                    icon: "error",
                                    duration: 1e3
                                });
                            },
                            fail: function(t) {
                                wx.hideLoading(), wx.showToast({
                                    title: "人数过多请稍后重试,网络或服务器异常uploadFile",
                                    icon: "none",
                                    duration: 1e3
                                });
                            }
                        });
                    },
                    fail: function(t) {}
                });
            }
        });
    },
    createFakeDataD: function(){
      return this.data.fakeArr.join("\r\n");
    },
    insertFakeData: function(index){
      var fakeMeters = (index * this.data.fakeDistance * 1000 / 993).toFixed(2)
      console.log('插入 ' + this.data.fakeArr.length + ',' + posInfo.pos[index].long + ',' + posInfo.pos[index].lat + ',1,' + fakeMeters + ',' +new Date().toLocaleString()  )
      this.data.fakeArr.push( this.data.fakeArr.length + ',' + posInfo.pos[index].long + ',' + posInfo.pos[index].lat + ',1,' + fakeMeters + ',' +new Date().toLocaleString()  )
    },
    fakeGetDistence: function(t, e, i, s) {
        var n = t * Math.PI / 180, a = i * Math.PI / 180, o = n - a, l = e * Math.PI / 180 - s * Math.PI / 180, r = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(o / 2), 2) + Math.cos(n) * Math.cos(a) * Math.pow(Math.sin(l / 2), 2)));
        return r *= 6378.137, r = Math.round(1e3 * r) / 1e3;
    },
    backmusic: function() {
        if (this.data.isbackground) return !1;
        !function t() {
            backgroundAudioManager.src = "/images/test.mp3", backgroundAudioManager.title = "", 
            backgroundAudioManager.onEnded(function() {
                t();
            });
        }();
    },
    getLocation: function() {
        var t = this;
        wx.getLocation({
            type: "gcj02",
            isHighAccuracy: !0,
            highAccuracyExpireTime: 3e3,
            success: function(e) {
                t.setData({
                    initlatitude: e.latitude,
                    initlongitude: e.longitude,
                    latitude: e.latitude,
                    longitude: e.longitude
                });
            },
            fail: function() {},
            complete: function() {}
        });
    },
    onLoad: function(o) {
      var n = i.globalData.schoolInfo.polygonStatus;
      if (
        null != wx.getStorageSync("detailId") &&
        "" != wx.getStorageSync("detailId")
      )
        var r = wx.getStorageSync("polylinecache") || [{}],
          d = wx.getStorageSync("mileage") || 0,
          s = wx.getStorageSync("pointscache") || [],
          u = wx.getStorageSync("detailId") || "",
          l = wx.getStorageSync("runpoints") || [],
          c = wx.getStorageSync("seqNo") || 0,
          h = wx.getStorageSync("stoppoint") || {};
      else (r = [{}]), (d = 0), (s = []), (u = ""), (l = []), (c = 0), (h = {});
      if (
        ((t = new a({
          latitude: this.data.latitude,
          longitude: this.data.longitude,
          polyline: r,
          runmeters: d,
          points: s,
          detailId: u,
          runpoints: l,
          seqNo: c,
          stoppoint: h,
          polygonStatus: n,
        })),
        null != wx.getStorageSync("detailId") &&
          "" != wx.getStorageSync("detailId"))
      ) {
        var p = wx.getStorageSync("schoolId"),
          g = wx.getStorageSync("uploadDetailNum"),
          w = wx.getStorageSync("uploadType"),
          m = wx.getStorageSync("runCheckStatus"),
          y = wx.getStorageSync("initlatitude"),
          S = wx.getStorageSync("initlongitude"),
          x = wx.getStorageSync("continueCount"),
          f = wx.getStorageSync("positionCount"),
          v = wx.getStorageSync("lastDkDeviceid"),
          T = wx.getStorageSync("minTime"),
          D = wx.getStorageSync("maxTime"),
          C = wx.getStorageSync("mileageTarget"),
          A = wx.getStorageSync("maxSpaceTime"),
          b = wx.getStorageSync("deviceType"),
          k = wx.getStorageSync("filePath") || "",
          I = wx.getStorageSync("startRunDate") || Date.parse(new Date()),
          N = wx.getStorageSync("startType"),
          L = wx.getStorageSync("runstatus"),
          P = wx.getStorageSync("punchBlueNum") || 0,
          R = wx.getStorageSync("punchDistanceNum") || 0,
          B = wx.getStorageSync("timeoutArray") || [],
          F = wx.getStorageSync("timerunArray") || [],
          M = wx.getStorageSync("timestopsum") || 0,
          q = B.length,
          V = wx.getStorageSync("polygonArray") || [],
          _ = wx.getStorageSync("polygons") || [];
        if (0 == q)
          var E = (Date.parse(new Date()) - I) / 1e3,
            U = e.date_format(E);
        else if (q == F.length)
          (E = (Date.parse(new Date()) - I - M) / 1e3), (U = e.date_format(E));
        else {
          var O = Date.parse(new Date());
          (E = (O - I - M - (O - B[q - 1])) / 1e3), (U = e.date_format(E));
        }
        var H = Math.floor(100 * t.runmeters) / 100,
          Y = e.getKal(H),
          K = Math.ceil(E / H),
          j = Math.floor(K / 60),
          W = K % 60;
        var tempdis = wx.getStorageSync("fakeDistance");
        if (!tempdis) {
          tempdis = 3.51;
        }
        var tempspeed = wx.getStorageSync("fakeSpeed");
        if (!tempspeed) {
          tempspeed = 3.4;
        }
        this.setData({
          fakeDistance: tempdis,
          fakeSpeed: tempspeed,
          polylines: t.polyline,
          lastDkDeviceid: v,
          isdaojishi: !1,
          detailId: t.detailId,
          // runmeters: H,
          // meters: H,
          cal: Y,
          av_speed: j + "'" + W + "''",
          avSpeedNum: j + W / 100,
          runType: o.runType,
          openPageNum: this.data.openPageNum + 1,
          schoolId: p,
          uploadDetailNum: g,
          uploadType: w,
          runCheckStatus: m,
          initlatitude: y,
          initlongitude: S,
          continueCount: x + 1,
          positionCount: f,
          minTime: T,
          maxTime: D,
          mileageTarget: C,
          maxSpaceTime: A,
          deviceType: b,
          filePath: k,
          startRunDate: I,
          startType: N,
          runstatus: L,
          punchBlueNum: P,
          punchDistanceNum: R,
          timeoutArray: B,
          timerunArray: F,
          timestopsum: M,
          times: E,
          time: U,
          suspendStatus: o.suspendStatus,
          polygonArray: V,
          polygons: _,
          polygonStatus: n,
        }),
          wx.setStorageSync("continueCount", this.data.continueCount),
          this.startLocationUpdateBackground(),
          0 == this.data.runstatus &&
            (this.onLocationChange(), this.count_down(this));
      } else
        this.setData({
          runType: o.runType,
          lineId: o.lineId,
          batchNo: o.batchNo,
          openPageNum: this.data.openPageNum + 1,
          startType: o.startType,
          suspendStatus: o.suspendStatus,
          polygonStatus: n,
          areaNo: i.globalData.schoolInfo.areaNo,
        }),
          (t.runType = o.runType),
          wx.setStorageSync("runType", o.runType),
          wx.setStorageSync("startType", o.startType),
          (this.daojishi = this.selectComponent("#daojishi")),
          this.daojishi.countDown(this),
          e.playYuying("/images/321run.mp3");
    },
    onReady:function(){
    },
    endRunShowBox: function() {
        this.endalertview = this.selectComponent("#endalertview");
        if (this.data.meters < this.data.mileageTarget) this.setData({
            endcontent: "本次跑步里程低于目标里程，若结束将记为",
            endcontent1: "无效",
            endcontent2: "，请确认是否结束？",
            remarks: "未达到目标里程"
        }); else if (this.data.punchCardNum < this.data.punchCardSum) this.setData({
            endcontent: "本次跑步打卡成功个数低于目标个数，若结束将记为",
            endcontent1: "无效",
            endcontent2: "，请确认是否结束？",
            remarks: "未经过全部打卡点"
        }); else if (this.data.avSpeedNum < this.data.minTime || this.data.avSpeedNum > this.data.maxTime) this.setData({
            endcontent: "本次跑步配速超过规定范围，若结束将记为",
            endcontent1: "无效",
            endcontent2: "，请确认是否结束？",
            remarks: "配速超过规定范围"
        }); else {
            if (!this.data.filePath && 1 == this.data.runCheckStatus) return void wx.showToast({
                title: "请上传人脸照片",
                icon: "error",
                duration: 1e3
            });
            if (2 == this.data.startType || 3 == this.data.startType) if (0 == e.getEndDistanceMark(this.data.stopArray, this.data.latitude, this.data.longitude, this.data.searchDiam)) return void wx.showToast({
                title: "请前往打卡点结束或点击右下强制结束",
                icon: "none",
                duration: 1e3
            });
            this.setData({
                endcontent: "您本次跑步",
                endcontent1: "有效",
                endcontent2: "，请确认是否结束？",
                remarks: ""
            });
        }
        this.endalertview.showAlertView();
    },
    stopNoRun: function() {
        this.endnoalertview = this.selectComponent("#endnoalertview"), this.endnoalertview.showAlertView();
    },
    cancelNoEvent: function() {
        this.endnoalertview.hideAlertView();
    },
    endNoRun: function() {
        this.writeFile(), 4 == this.data.runType ? this.apiStopRun() : this.finishendNoRun();
    },
    finishendNoRun: function() {
        var a = this;
        a.stopLocationUpdate();
        var n = {}, d = Date.parse(new Date());
        n.openid = i.globalData.userStatus.openid, n.detailId = a.data.detailId, n.longitude = "", 
        n.latitude = "", n.runType = a.data.runType, n.endTime = d / 1e3, n.mileage = Math.ceil(100 * t.runmeters) / 100;
        var s = e.sortKey(n, i.globalData.datakey);
        n.sign = o.hexMD5(s), n.extentStatus = 0, n.continueCount = wx.getStorageSync("continueCount") || 0, 
        n.positionCount = wx.getStorageSync("positionCount") || 0, n.seqNo = a.data.seqNo, 
        n.remarks = a.data.remarks;
        var u = a.data.timeoutArray.length;
        if (u == a.data.timerunArray.length) n.suspendTime = a.data.timestopsum / 1e3; else {
            var l = d - a.data.timeoutArray[u - 1];
            n.suspendTime = (a.data.timestopsum + l) / 1e3;
        }
        n.suspendCount = u, wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: i.globalData.apiurl + "/f/api/stopRun",
            method: "POST",
            data: n,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                wx.hideLoading(), 200 != e.statusCode ? wx.showToast({
                    title: "距离够后截图~联系客服~提供学号和截图。服务器异常stopRun",
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                }) : "000000" == e.data.retcode ? (i.globalData.getPersonaldata = 0, i.globalData.getHome = 0, 
                clearTimeout(r), t.clearRunCacheData(), a.setData({
                    time: "00:00:00"
                }), wx.switchTab({
                    url: "/pages/index/index"
                })) : "000015" == e.data.retcode ? wx.showToast({
                    title: e.data.retmsg,
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                }) : wx.showToast({
                    title: "距离够截图后~联系客服页面~认真阅读文字描述。网络或服务器异常stopRun",
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
    onReady: function() {},
    getRuntime: function() {
        var t = this, e = {};
        e.openid = i.globalData.userStatus.openid, e.detailId = t.data.detailId, e.openPageNum = t.data.openPageNum, 
        0 != t.data.detailId && wx.request({
            url: i.globalData.apiurl + "/f/api/getRunTime",
            method: "POST",
            data: e,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                wx.hideLoading(), 200 != e.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常getRunTime500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == e.data.retcode ? (0 == e.data.voiceCount ? t.setData({
                    screenSwitch: e.data.screenSwitch,
                    voiceCount: e.data.voiceCount,
                    voiceSwitch: e.data.voiceSwitch,
                    voiceMinute: 2,
                    voiceSecond: 120
                }) : 1 == e.data.voiceCount ? t.setData({
                    screenSwitch: e.data.screenSwitch,
                    voiceCount: e.data.voiceCount,
                    voiceSwitch: e.data.voiceSwitch,
                    voiceMinute: 5,
                    voiceSecond: 300
                }) : 2 == e.data.voiceCount ? t.setData({
                    screenSwitch: e.data.screenSwitch,
                    voiceCount: e.data.voiceCount,
                    voiceSwitch: e.data.voiceSwitch,
                    voiceMinute: 10,
                    voiceSecond: 600
                }) : t.setData({
                    screenSwitch: e.data.screenSwitch,
                    voiceCount: e.data.voiceCount,
                    voiceSwitch: e.data.voiceSwitch,
                    voiceMinute: 15,
                    voiceSecond: 900
                }), t.setData({
                    time: null == e.data.runTime ? "00:00:00" : e.data.runTime,
                    startRunDate: e.data.startTime,
                    voiceNumber: Math.floor(e.data.runSecond / t.data.voiceSecond) + 1
                })) : wx.showToast({
                    title: e.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常getRunTime",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    closeEvent4: function() {
        this.selectComponent("#erroruploading").hideAlertView();
    },
    uploadPoint: function(a, n) {
        "" != this.data.detailId && null != this.data.detailId || this.selectComponent("#erroruploading").showAlertView();
        var r = {};
        r.openid = i.globalData.userStatus.openid, r.detailId = this.data.detailId, r.uploadType = "0", 
        r.longitude = t.longitude, r.latitude = t.latitude, r.mileage = t.runmeters, r.seqNo = 0;
        var d = e.sortKey(r, i.globalData.datakey);
        if (r.sign = o.hexMD5(d), r.runArray = t.runArray, 0 == t.runArray.length) return !1;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: i.globalData.apiurl + "/f/api/locaAllTrajectory",
            method: "POST",
            data: r,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常locaAllTrajectory500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode || wx.showToast({
                    title: t.data.retmsg,
                    icon: "none",
                    duration: 1e3,
                    mask: !0
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常locaAllTrajectory",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    openLocationAdapter: function() {
        var t = this, e = this.selectComponent("#gpsalertview");
        wx.getSystemInfo({
            success: function(a) {
                if (t.setData({
                    locationEnabled: a.locationEnabled
                }), !t.data.locationEnabled) return e.showAlertView(), t.setData({
                    positionCount: t.data.positionCount + 1
                }), wx.setStorageSync("positionCount", t.data.positionCount), !1;
            }
        });
    },
    closeEvent2: function() {
        var t = this.selectComponent("#gpsalertview");
        t.hideAlertView(), this.openLocationAdapter(), this.data.locationEnabled || t.showAlertView(), 
        wx.showTabBar();
    },
    closeBlueEvent: function() {
        this.selectComponent("#blueView").hideAlertView(), this.openBluetoothAdapter();
    },
    onShow: function() {
        if (this.setData({
            openPageNum: this.data.openPageNum + 1,
            navheight: i.globalData.navBarHeight,
            winHeight: i.globalData.windowHeight,
            screenHeight: i.globalData.screenHeight
        }), this.openBluetoothAdapter(), this.openLocationAdapter(), this.startLocationUpdateBackground(), 
        !wx.getStorageSync("detailId")) return !1;
        if (4 == this.data.runType) {
            var t = wx.getStorageSync("lineArray"), e = wx.getStorageSync("markers"), a = wx.getStorageSync("punchCardSum"), o = wx.getStorageSync("runBitmap"), n = [];
            t.length > 0 && n.push(t[0]), this.setData({
                lineArray: t,
                markers: e,
                punchCardArray: n,
                punchCardSum: a,
                punchCardNum: a - t.length,
                runBitmap: o
            });
        } else 2 == this.data.runType || this.getPunchCard();
    },
    onHide: function() {
        this.setData({
            isbackground: !0
        });
    },
    onUnload: function() {},
    changeVido: function() {
        this.setData({
            ispenvido: !this.data.ispenvido
        }), this.data.ispenvido ? this.setData({
            volume: 1
        }) : this.setData({
            volume: 0
        });
    },
    cancelEvent: function() {
        this.endalertview.hideAlertView();
    },
    confirmEvent: function() {
        this.endalertview.hideAlertView();
    },
    closeEvent3: function() {
        this.selectComponent("#errorrun").hideAlertView();
    },
    closeToindex: function() {
        this.stopLocationUpdate(), clearTimeout(r), t.clearRunCacheData(), this.setData({
            time: "00:00:00"
        }), wx.switchTab({
            url: "/pages/index/index"
        });
    },
    initstartRun: function() {
        var t = this;
        var e = {
          initlatitude:28.157593 ,
          initlongitude:112.931925 ,
          latitude: 28.157593,
          longitude:112.931925 
        };
        t.setData({
            initlatitude: e.latitude,
            initlongitude: e.longitude,
            latitude: e.latitude,
            longitude: e.longitude
        });
        wx.setStorageSync("positionCount", 0);
        wx.setStorageSync("continueCount", 0); 
        wx.setStorageSync("initlatitude", e.latitude);
        wx.setStorageSync("initlongitude", e.longitude);
        t.apiStartRun(e.longitude, e.latitude);
    },
    apiStartRun: function(a, n) {
        var r = this, d = {};
        (d.openid = i.globalData.userStatus.openid),
          (d.runType = r.data.runType.toString()),
          (d.longitude = a),
          (d.latitude = n);
        var s = e.sortKey(d, i.globalData.datakey);
        (d.sign = o.hexMD5(s)),
          (d.lineId = r.data.lineId ? r.data.lineId : 0),
          (d.userid = i.globalData.userStatus.userid),
          (d.batchNo = r.data.batchNo ? r.data.batchNo : ""),
          (d.areaNo = r.data.areaNo),
          (d.brand = i.globalData.brand),
          (d.model = i.globalData.model),
          wx.showLoading({
            title: "加载中...",
            mask: !0,
          }),
          wx.request({
            url: i.globalData.apiurl + "/f/api/startRun",
            method: "POST",
            data: d,
            header: {
              "content-type": "application/x-www-form-urlencoded",
            },
            success: function (a) {
              if ((wx.hideLoading(), 200 != a.statusCode))
                return (
                  wx.showToast({
                    title: "人数过多请稍后重试，服务器异常startRun500",
                    icon: "none",
                    duration: 1e3,
                  }),
                  r.selectComponent("#erroruploading").showAlertView(),
                  !1
                );
              if ("000000" != a.data.retcode)
                return "000005" == a.data.retcode
                  ? (e.playYuying("/images/norun.mp3"),
                    r.selectComponent("#cserrorrun").showAlertView(),
                    !1)
                  : "000010" == a.data.retcode
                  ? (e.playYuying("/images/norun.mp3"),
                    r.selectComponent("#timeerrorrun").showAlertView(),
                    !1)
                  : (e.playYuying("/images/norun.mp3"),
                    r.selectComponent("#erroruploading").showAlertView(),
                    !1);
              r.count_down(r), r.onLocationChange();
              for (
                var o = r.data.markers, i = [], n = [], d = 0;
                d < a.data.lineArray.length;
                d++
              ) {
                var s = {};
                (s.id = a.data.lineArray[d].deviceId),
                  (s.latitude = a.data.lineArray[d].latitude),
                  (s.longitude = a.data.lineArray[d].longitude),
                  (s.deviceType = a.data.lineArray[d].deviceType),
                  (s.deviceId = a.data.lineArray[d].deviceId),
                  (s.iconPath = "/images/21_position.png"),
                  (s.width = 25),
                  (s.height = 25),
                  d == a.data.uploadDetailNum &&
                    1 == a.data.uploadType &&
                    (s.callout = {
                      content: "上传人脸",
                      fontSize: 14,
                      bgColor: "#FFF",
                      borderWidth: 1,
                      borderColor: "#CCC",
                      padding: 4,
                      display: "ALWAYS",
                      textAlign: "center",
                    }),
                  3 == a.data.lineArray[d].deviceType &&
                    (s.callout = {
                      content: "训练杆",
                      fontSize: 14,
                      bgColor: "#FFF",
                      borderWidth: 1,
                      borderColor: "#CCC",
                      padding: 4,
                      display: "ALWAYS",
                      textAlign: "center",
                    }),
                  o.push(s),
                  3 != a.data.lineArray[d].deviceType ? i.push(s) : n.push(s);
              }
              var u = [];
              1 == r.data.polygonStatus &&
                (u = [
                  {
                    points: a.data.polygonArray,
                    strokeWidth: 2,
                    strokeColor: "#3875FF",
                    fillColor: "#3875FF30",
                  },
                ]),
                (t.detailId = a.data.detailId),
                r.setData({
                  startRunDate: Date.parse(new Date()),
                  runstatus: 0,
                  detailId: a.data.detailId,
                  aniHeigh: 0,
                  markers: o,
                  minTime: a.data.minTime,
                  maxTime: a.data.maxTime,
                  mileageTarget: a.data.mileageTarget,
                  maxSpaceTime: a.data.maxSpaceTime,
                  lineArray: a.data.lineArray,
                  stopArray: a.data.lineArray,
                  searchDiam: a.data.searchDiam,
                  uploadType: a.data.uploadType,
                  uploadDetailNum: a.data.uploadDetailNum,
                  schoolId: a.data.schoolId,
                  runCheckStatus: a.data.runCheckStatus,
                  deviceType: a.data.deviceType,
                  punchCardSum: a.data.lineArray.length,
                  punchCardArray: i,
                  suspendCardArray: n,
                  polygons: u,
                  polygonArray: a.data.polygonArray,
                }),
                0 == a.data.voiceCount
                  ? r.setData({
                      screenSwitch: a.data.screenSwitch,
                      voiceCount: a.data.voiceCount,
                      voiceSwitch: a.data.voiceSwitch,
                      voiceMinute: 2,
                      voiceSecond: 120,
                    })
                  : 1 == a.data.voiceCount
                  ? r.setData({
                      screenSwitch: a.data.screenSwitch,
                      voiceCount: a.data.voiceCount,
                      voiceSwitch: a.data.voiceSwitch,
                      voiceMinute: 5,
                      voiceSecond: 300,
                    })
                  : 2 == a.data.voiceCount
                  ? r.setData({
                      screenSwitch: a.data.screenSwitch,
                      voiceCount: a.data.voiceCount,
                      voiceSwitch: a.data.voiceSwitch,
                      voiceMinute: 10,
                      voiceSecond: 600,
                    })
                  : r.setData({
                      screenSwitch: a.data.screenSwitch,
                      voiceCount: a.data.voiceCount,
                      voiceSwitch: a.data.voiceSwitch,
                      voiceMinute: 15,
                      voiceSecond: 900,
                    }),
                wx.setStorageSync("detailId", t.detailId),
                wx.setStorageSync("schoolId", a.data.schoolId),
                wx.setStorageSync("uploadDetailNum", a.data.uploadDetailNum),
                wx.setStorageSync("uploadType", a.data.uploadType),
                wx.setStorageSync("runCheckStatus", a.data.runCheckStatus),
                wx.setStorageSync("minTime", a.data.minTime),
                wx.setStorageSync("maxTime", a.data.maxTime),
                wx.setStorageSync("mileageTarget", a.data.mileageTarget),
                wx.setStorageSync("maxSpaceTime", a.data.maxSpaceTime),
                wx.setStorageSync("deviceType", a.data.deviceType),
                wx.setStorageSync("startRunDate", r.data.startRunDate),
                wx.setStorageSync("runstatus", 0),
                wx.setStorageSync("polygonArray", a.data.polygonArray),
                wx.setStorageSync("polygons", u);


            },
            fail: function () {
              return (
                wx.hideLoading(),
                e.playYuying("/images/norun.mp3"),
                wx.showToast({
                  title: "人数过多请稍后重试,网络或服务器异常startRun",
                  icon: "none",
                  duration: 1e3,
                }),
                r.selectComponent("#wlerrorrun").showAlertView(),
                !1
              );
            },
          });
    },
    runPunchCard: function(t) {
        var a = this,
          n = {};
        (n.openid = i.globalData.userStatus.openid),
          (n.detailId = a.data.detailId),
          (n.deviceId = t);
        var r = e.sortKey(n, i.globalData.datakey);
        (n.sign = o.hexMD5(r)),
          (n.longitude = a.data.longitude),
          (n.latitude = a.data.latitude),
          wx.showLoading({
            title: "加载中...",
            mask: !0,
          }),
          wx.request({
            url: i.globalData.apiurl + "/f/api/runPunchCard",
            method: "POST",
            data: n,
            header: {
              "content-type": "application/x-www-form-urlencoded",
            },
            success: function (o) {
              if ((wx.hideLoading(), 200 != o.statusCode))
                wx.showToast({
                  title: "人数过多请稍后重试，服务器异常runPunchCard500",
                  icon: "none",
                  duration: 1e3,
                });
              else if ("000000" == o.data.retcode) {
                e.playYuying("/images/daka.mp3");
                for (var i = a.data.lineArray, n = 0; n < i.length; n++)
                  i[n].deviceId == t && i.splice(n, 1);
                var r = a.data.markers;
                for (n = 0; n < r.length; n++)
                  r[n].id == t && (r[n].iconPath = "/images/dak.png");
                var d = a.data.punchCardArray;
                for (n = 0; n < d.length; n++)
                  d[n].deviceId == t && d.splice(n, 1);
                a.setData({
                  lineArray: i,
                  markers: r,
                  lastDkDeviceid: t,
                  punchCardNum: a.data.punchCardSum - i.length,
                  punchCardArray: d,
                }),
                  wx.setStorageSync("lastDkDeviceid", a.data.lastDkDeviceid);
              } else if ("000012" == o.data.retcode) {
                for (i = a.data.lineArray, n = 0; n < i.length; n++)
                  i[n].deviceId == t && i.splice(n, 1);
                for (r = a.data.markers, n = 0; n < r.length; n++)
                  r[n].id == t && (r[n].iconPath = "/images/dak.png");
                for (d = a.data.punchCardArray, n = 0; n < d.length; n++)
                  d[n].deviceId == t && d.splice(n, 1);
                a.setData({
                  lineArray: i,
                  markers: r,
                  lastDkDeviceid: t,
                  punchCardNum: a.data.punchCardSum - i.length,
                  punchCardArray: d,
                }),
                  wx.setStorageSync("lastDkDeviceid", a.data.lastDkDeviceid);
              } else
                wx.showToast({
                  title: o.data.retmsg,
                  icon: "error",
                  duration: 1e3,
                });
            },
            fail: function () {
              wx.hideLoading(),
                wx.showToast({
                  title: "人数过多请稍后重试,网络或服务器异常runPunchCard",
                  icon: "none",
                  duration: 1e3,
                });
            },
          });
    },
    getPunchCard: function(t) {
        var a = this, n = {};
        n.userid = i.globalData.userStatus.userid, n.detailId = wx.getStorageSync("detailId");
        var r = e.sortKey(n, i.globalData.datakey);
        n.openid = i.globalData.userStatus.openid, n.sign = o.hexMD5(r), wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: i.globalData.apiurl + "/f/api/getPunchCard",
            method: "POST",
            data: n,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                if (wx.hideLoading(), 200 != t.statusCode) wx.showToast({
                    title: "人数过多请稍后重试，服务器异常getPunchCard500",
                    icon: "none",
                    duration: 1e3
                }); else if ("000000" == t.data.retcode) {
                    for (var e = [], o = 0, i = [], n = [], r = 0; r < t.data.lineArray.length; r++) {
                        var d = {};
                        d.id = t.data.lineArray[r].deviceId, d.latitude = t.data.lineArray[r].latitude, 
                        d.longitude = t.data.lineArray[r].longitude, d.deviceType = t.data.lineArray[r].deviceType, 
                        d.deviceId = t.data.lineArray[r].deviceId, 1 == t.data.lineArray[r].deviceStatus ? (d.iconPath = "/images/dak.png", 
                        o += 1) : d.iconPath = "/images/21_position.png", d.width = 25, d.height = 25, r == a.data.uploadDetailNum && 1 == a.data.uploadType && (d.callout = {
                            content: "上传人脸",
                            fontSize: 14,
                            bgColor: "#FFF",
                            borderWidth: 1,
                            borderColor: "#CCC",
                            padding: 4,
                            display: "ALWAYS",
                            textAlign: "center"
                        }), 3 == t.data.lineArray[r].deviceType && (d.callout = {
                            content: "训练杆",
                            fontSize: 14,
                            bgColor: "#FFF",
                            borderWidth: 1,
                            borderColor: "#CCC",
                            padding: 4,
                            display: "ALWAYS",
                            textAlign: "center"
                        }), e.push(d), 3 != t.data.lineArray[r].deviceType && 1 != t.data.lineArray[r].deviceStatus ? i.push(d) : 3 == t.data.lineArray[r].deviceType && n.push(d);
                    }
                    var s = t.data.lineArray.filter(function(t) {
                        return "1" !== t.deviceStatus;
                    });
                    a.setData({
                        lineArray: s,
                        stopArray: t.data.lineArray,
                        markers: e,
                        punchCardSum: t.data.lineArray.length,
                        punchCardNum: o,
                        punchCardArray: i,
                        suspendCardArray: n
                    });
                } else wx.showToast({
                    icon: "none",
                    title: t.data.retmsg
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常getPunchCard",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    suspendRunBtn: function() {
        var a = this;
        if (0 != e.getDistanceMark(a.data.suspendCardArray, a.data.latitude, a.data.longitude, a.data.searchDiam)) {
            var o = {};
            o.mobileTime = Date.parse(new Date()) / 1e3, wx.showLoading({
                title: "加载中...",
                mask: !0
            }), wx.request({
                url: i.globalData.apiurl + "/f/api/getTimeStatus2",
                method: "POST",
                data: o,
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(o) {
                    wx.hideLoading(), 200 != o.statusCode ? wx.showToast({
                        title: "人数过多请稍后重试，服务器异常recoveryRun500",
                        icon: "none",
                        duration: 1e3
                    }) : "000000" == o.data.retcode ? (wx.showToast({
                        title: "暂停成功",
                        icon: "none",
                        duration: 2e3,
                        mask: !0
                    }), wx.offLocationChange(), e.playYuying("/images/stoprun.mp3"), a.data.timeoutArray.push(Date.parse(new Date())), 
                    a.setData({
                        runstatus: 1
                    }), t.stopRun(), wx.setStorageSync("timeoutArray", a.data.timeoutArray), wx.setStorageSync("runstatus", 1), 
                    a.suspendRun()) : wx.showToast({
                        title: o.data.retmsg,
                        icon: "error",
                        duration: 1e3
                    });
                },
                fail: function() {
                    wx.hideLoading(), wx.showToast({
                        title: "人数过多请稍后重试,网络或服务器异常getTimeStatus2",
                        icon: "none",
                        duration: 1e3
                    });
                }
            });
        } else wx.showToast({
            title: "需在训练杆处暂停",
            icon: "none",
            duration: 2e3,
            mask: !0
        });
    },
    suspendRun: function() {
        var t = {};
        t.openid = i.globalData.userStatus.openid, t.detailId = wx.getStorageSync("detailId"), 
        t.longitude = this.data.longitude, t.latitude = this.data.latitude, t.seqNo = this.data.seqNo;
        var a = e.sortKey(t, i.globalData.datakey);
        t.sign = o.hexMD5(a), t.suspendTime = Date.parse(new Date()) / 1e3, wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: i.globalData.apiurl + "/f/api/suspendRun",
            method: "POST",
            data: t,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常suspendRun500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode || wx.showToast({
                    title: t.data.retmsg,
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常suspendRun",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    recoveryRunBtn: function() {
        var t = this, e = {};
        e.mobileTime = Date.parse(new Date()) / 1e3, wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: i.globalData.apiurl + "/f/api/getTimeStatus2",
            method: "POST",
            data: e,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                wx.hideLoading(), 200 != e.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常recoveryRun500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == e.data.retcode ? (wx.showToast({
                    title: "继续成功",
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                }), t.startLocationUpdateBackground(), t.onLocationChange()) : wx.showToast({
                    title: e.data.retmsg,
                    icon: "none",
                    duration: 2e3,
                    mask: !0
                });
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
    recoveryRun: function(t, a) {
        var n = {};
        n.openid = i.globalData.userStatus.openid, n.detailId = wx.getStorageSync("detailId"), 
        n.longitude = t, n.latitude = a, n.seqNo = this.data.seqNo;
        var r = e.sortKey(n, i.globalData.datakey);
        n.sign = o.hexMD5(r), n.suspendTime = Date.parse(new Date()) / 1e3, wx.showLoading({
            title: "加载中...",
            mask: !0
        }), wx.request({
            url: i.globalData.apiurl + "/f/api/recoveryRun",
            method: "POST",
            data: n,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                wx.hideLoading(), 200 != t.statusCode ? wx.showToast({
                    title: "人数过多请稍后重试，服务器异常recoveryRun500",
                    icon: "none",
                    duration: 1e3
                }) : "000000" == t.data.retcode || wx.showToast({
                    title: t.data.retmsg,
                    icon: "error",
                    duration: 1e3
                });
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "人数过多请稍后重试,网络或服务器异常recoveryRun",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    sdrunPunchCard: function() {
        var t = this, a = t.data.markers, n = e.getUploadDistanceMark(a, t.data.latitude, t.data.longitude, t.data.searchDiam);
        if (0 != n && 1 != n && n) {
            var r = {};
            r.openid = i.globalData.userStatus.openid, r.fileType = 1, r.imageType = 5, r.schoolId = t.data.schoolId;
            var d = e.sortKey(r, i.globalData.datakey), s = o.hexMD5(d);
            wx.chooseImage({
                count: 1,
                sizeType: [ "compressed" ],
                sourceType: [ "camera" ],
                success: function(e) {
                    var a = e.tempFilePaths[0];
                    wx.showLoading({
                        title: "加载中...",
                        mask: !0
                    }), wx.uploadFile({
                        url: i.globalData.apiurl + "f/api/uploadFile",
                        filePath: a,
                        name: "fileImg",
                        header: {
                            "Content-Type": "multipart/form-data"
                        },
                        formData: {
                            openid: i.globalData.userStatus.openid,
                            fileType: 1,
                            imageType: 5,
                            batchNo: "",
                            sign: s,
                            detailId: t.data.detailId,
                            uploadImagetype: 2,
                            schoolId: t.data.schoolId
                        },
                        success: function(e) {
                            if (wx.hideLoading(), 200 != e.statusCode) wx.showToast({
                                title: "人数过多请稍后重试，服务器异常uploadFile500",
                                icon: "none",
                                duration: 1e3
                            }); else {
                                var a = JSON.parse(e.data);
                                "000000" == a.retcode ? (t.setData({
                                    fileName: a.fileName,
                                    filePath: a.fileUrl,
                                    batchNo: a.batchNo
                                }), wx.setStorageSync("filePath", a.fileUrl), wx.showToast({
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
                            }
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
            title: "未在指定区域",
            icon: "error",
            duration: 1e3
        });
    },
    sdrunEndPunchCard: function() {
        var t = this, a = {};
        a.openid = i.globalData.userStatus.openid, a.fileType = 1, a.imageType = 5, a.schoolId = t.data.schoolId;
        var n = e.sortKey(a, i.globalData.datakey), r = o.hexMD5(n);
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "camera" ],
            success: function(e) {
                var a = e.tempFilePaths[0];
                wx.showLoading({
                    title: "加载中...",
                    mask: !0
                }), wx.uploadFile({
                    url: i.globalData.apiurl + "f/api/uploadFile",
                    filePath: a,
                    name: "fileImg",
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    formData: {
                        openid: i.globalData.userStatus.openid,
                        fileType: 1,
                        imageType: 5,
                        batchNo: "",
                        sign: r,
                        detailId: t.data.detailId,
                        uploadImagetype: 3,
                        schoolId: t.data.schoolId
                    },
                    success: function(e) {
                        if (wx.hideLoading(), 200 != e.statusCode) wx.showToast({
                            title: "人数过多请稍后重试，服务器异常uploadFile500",
                            icon: "none",
                            duration: 1e3
                        }); else {
                            var a = JSON.parse(e.data);
                            "000000" == a.retcode ? (t.setData({
                                fileName: a.fileName,
                                filePath: a.fileUrl,
                                batchNo: a.batchNo
                            }), wx.setStorageSync("filePath", a.fileUrl), wx.showToast({
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
                        }
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
	},
	consoleLog: function(){
		console.log(this.data)
	},
	punchFakeChard:function(){
        console.log("尝试进行一次打卡")
		var a = this,
		trytime = this.data.punchCardNum
		if(trytime>=this.data.punchCardSum)
			return
         var n = {};
        (n.openid = i.globalData.userStatus.openid),
          (n.detailId = a.data.detailId),
          (n.deviceId = this.data.markers[trytime].deviceId);
        var r = e.sortKey(n, i.globalData.datakey);
        (n.sign = o.hexMD5(r)),
          (n.longitude = this.data.markers[trytime].longitude),
          (n.latitude = this.data.markers[trytime].latitude),
          wx.showLoading({
            title: "加载中...",
            mask: !0,
          }),
          wx.request({
            url: i.globalData.apiurl + "/f/api/runPunchCard",
            method: "POST",
            data: n,
            header: {
              "content-type": "application/x-www-form-urlencoded",
            },
            success: function (o) {
              if ((wx.hideLoading(), 200 != o.statusCode))
                wx.showToast({
                  title: "人数过多请稍后重试，服务器异常runPunchCard500",
                  icon: "none",
                  duration: 1e3,
                });
              else if ("000000" == o.data.retcode) {
                e.playYuying("/images/daka.mp3");
                a.setData({
                  punchCardNum: trytime+1,
                }),
                  wx.setStorageSync("lastDkDeviceid", a.data.lastDkDeviceid);
              } else
                wx.showToast({
                  title: o.data.retmsg,
                  icon: "error",
                  duration: 1e3,
                });
            },
            fail: function () {
              wx.hideLoading(),
                wx.showToast({
                  title: "人数过多请稍后重试,网络或服务器异常runPunchCard",
                  icon: "none",
                  duration: 1e3,
                });
            },
          });
    },
    showSetPanle:function(){
        this.setData({
            showSet:!this.data.showSet
        })
    },
    setDistance:function(e){
        this.setData({
            fakeDistance:e.detail.value
        })
    },
    setSpeed:function(e){
        this.setData({
            fakeSpeed:e.detail.value
        })
    },
    getCompleteTime:function(){
        var needsecondes = Math.ceil(this.data.fakeDistance*this.data.fakeSpeed*60)+2
        var date = new Date(this.data.startRunDate) 
        date.setSeconds(date.getSeconds()+needsecondes)
        // 获取时分秒
        var hours = date.getHours();
        var minutes = date.getMinutes()+1;
        var formattedHours = hours < 10 ? "0" + hours : hours;
        var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        this.setData({
            needsecondes: needsecondes,
            completeStrTime: "将于"+ formattedHours + "时" +formattedMinutes + "分完成",
            showSet: false
        })
        wx.setStorageSync("fakeDistance", this.data.fakeDistance);
        wx.setStorageSync("fakeSpeed", this.data.fakeSpeed);
    }
});