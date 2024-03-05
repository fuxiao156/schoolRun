var t = require("@babel/runtime/helpers/classCallCheck.js"), e = require("@babel/runtime/helpers/createClass.js"), i = function() {
    function i(e) {
        t(this, i), this.lastlatitude = e.latitude, this.lastlongitude = e.longitude, this.yeslastlongitude = e.longitude, 
        this.yeslastlatitude = e.latitude, this.yeslasttime = e.lasttime, this.lasttime = e.lasttime, 
        this.latitude = e.latitude, this.longitude = e.longitude, this.speed = 0, this.runpoints = e.runpoints, 
        this.cacherunpoints = [], this.runArray = [], this.sendnum = 0, this.polyline = e.polyline, 
        this.points = e.points, this.status = 0, this.stoppoint = e.stoppoint, this.runmeters = e.runmeters, 
        this.detailId = e.detailId, this.runstatus = 0, this.runType = 0, this.seqNo = e.seqNo, 
        this.polygonArray = [], this.polygonStatus = e.polygonStatus;
    }
    return e(i, [ {
        key: "saveData",
        value: function(t) {
            var e = {};
            if (e.latitude = t.latitude, e.longitude = t.longitude, e.flag = 0, this.latitude = t.latitude, 
            this.longitude = t.longitude, this.speed = t.speed, this.filterData(t)) if (this.filterData2(t)) {
                if (e.numid = this.runpoints.length, this.seqNo = e.numid, this.seqNo <= 3600 && this.runpoints.push(e.numid + "," + e.longitude + "," + e.latitude + ",1," + this.runmeters + "," + new Date().toLocaleString()), 
                wx.setStorageSync("runpoints", this.runpoints), 0 == this.status) {
                    var i = {};
                    i.longitude = e.longitude, i.latitude = e.latitude, (this.filterData3(t) || "" == this.yeslastlatitude && "" == this.yeslastlongitude) && (this.setRunmeters(e.latitude, e.longitude), 
                    this.setPolyline(i, 0), this.yeslastlatitude = e.latitude, this.yeslastlongitude = e.longitude, 
                    this.yeslasttime = Date.parse(new Date()));
                }
                this.lastlatitude = e.latitude, this.lastlongitude = e.longitude, this.lasttime = Date.parse(new Date()), 
                wx.setStorageSync("seqNo", this.seqNo);
            } else this.lastlatitude = e.latitude, this.lastlongitude = e.longitude, this.lasttime = Date.parse(new Date()); else this.lasttime = Date.parse(new Date());
        }
    }, {
        key: "setRunmeters",
        value: function(t, e) {
            if ("" != this.yeslastlatitude && "" != this.yeslastlongitude && 0 != this.yeslastlatitude && 0 != this.yeslastlongitude) var i = this.getDistance(t, e, this.yeslastlatitude, this.yeslastlongitude); else i = 0;
            if (this.yeslastlatitude = t, this.yeslastlongitude = e, 0 == this.polygonStatus) this.runmeters += i; else if (this.IsPtInPoly(t, e, this.polygonArray)) this.runmeters += i; else if (this.sendnum++, 
            this.sendnum % 20 == 0) {
                this.sendnum = 0;
                var s = wx.createInnerAudioContext();
                s.autoplay = !0, s.src = "/images/nopolygon.mp3", s.volume = 1, s.onPlay(function() {}), 
                s.onError(function(t) {});
            }
            wx.setStorageSync("mileage", this.runmeters);
        }
    }, {
        key: "getRunmeters",
        value: function() {
            return this.runmeters;
        }
    }, {
        key: "stopRun",
        value: function() {
            this.status = 1, this.setStoppoint();
        }
    }, {
        key: "setStoppoint",
        value: function() {
            this.stoppoint.longitude = this.longitude, this.stoppoint.latitude = this.latitude, 
            wx.setStorageSync("stoppoint", this.stoppoint);
            var t = this.runpoints.length;
            this.runpoints.push(t + "," + this.longitude + "," + this.latitude + ",3," + this.runmeters + "," + new Date().toLocaleString()), 
            wx.setStorageSync("runpoints", this.runpoints);
        }
    }, {
        key: "startRun",
        value: function(t, e) {
            this.status = 0, this.setStartpoint(t, e);
        }
    }, {
        key: "setStartpoint",
        value: function(t, e) {
            var i = this.runpoints.length;
            this.runpoints.push(i + "," + t + "," + e + ",4," + this.runmeters + "," + new Date().toLocaleString()), 
            wx.setStorageSync("runpoints", this.runpoints);
        }
    }, {
        key: "doneData",
        value: function() {
            this.runArray = [];
            for (var t = 0; t < this.cacherunpoints.length; t++) 0 == this.cacherunpoints[t].flag && (this.cacherunpoints[t].flag = 1, 
            this.runArray.push(this.cacherunpoints[t].longitude + "_" + this.cacherunpoints[t].latitude + "_" + this.cacherunpoints[t].numid));
        }
    }, {
        key: "setPolyline",
        value: function(t) {
            var e = Object.keys(this.stoppoint);
            if (e.length > 0) {
                var i = [];
                i.push(this.stoppoint);
                var s = {};
                s.latitude = parseFloat(this.latitude), s.longitude = parseFloat(this.longitude), 
                i.push(s);
                var n = {
                    points: i,
                    color: "#000000",
                    width: 4,
                    dottedLine: !0
                }, a = this.polyline;
                a.push(n), this.polyline = a, this.stoppoint = {}, this.points = [], wx.setStorageSync("stoppoint", this.stoppoint);
            } else if (this.polyline.length > 1) if (0 == this.points.length) this.polyline.push({}), 
            this.points.push(t); else {
                var o = this.polyline.length - 1;
                this.points.push(t), this.polyline[o] = {
                    points: this.points,
                    color: "#0083ff",
                    width: 4
                };
            } else this.points.push(t), this.polyline = [ {
                points: this.points,
                color: "#0083ff",
                width: 4
            } ];
            wx.setStorageSync("polylinecache", this.polyline), wx.setStorageSync("pointscache", this.points);
        }
    }, {
        key: "getPolyline",
        value: function() {
            return this.polyline;
        }
    }, {
        key: "clearCacheData",
        value: function(t) {
            for (var e = 0; e < t.length; e++) this.removeData(t[e]);
        }
    }, {
        key: "removeData",
        value: function(t) {
            for (var e = 0; e < this.cacherunpoints.length; e++) this.cacherunpoints[e].numid == t && (this.cacherunpoints.splice(e, 1), 
            e--);
        }
    }, {
        key: "filterData",
        value: function(t) {
            return this.lastlongitude != t.longitude || this.lastlatitude != t.latitude;
        }
    }, {
        key: "filterData2",
        value: function(t) {
            if ("" == this.lastlatitude || "" == this.lastlongitude || 0 == this.lastlongitude) return !1;
            var e = this.getDistance(t.latitude, t.longitude, this.lastlatitude, this.lastlongitude), i = (Date.parse(new Date()) - this.lasttime) / 1e3;
            return i <= 1 && 1e3 * e <= 15 || !(1e3 * e / i > 15);
        }
    }, {
        key: "filterData3",
        value: function(t) {
            if ("" == this.yeslastlatitude || "" == this.yeslastlongitude || 0 == this.yeslastlatitude) return !1;
            var e = this.getDistance(t.latitude, t.longitude, this.yeslastlatitude, this.yeslastlongitude), i = (Date.parse(new Date()) - this.yeslasttime) / 1e3;
            return i <= 1 && 1e3 * e <= 15 || !(1e3 * e / i > 15);
        }
    }, {
        key: "clearRunCacheData",
        value: function() {
            wx.removeStorageSync("detailId"), wx.removeStorageSync("mileage"), wx.removeStorageSync("runstatus"), 
            wx.removeStorageSync("polylinecache"), wx.removeStorageSync("pointscache"), wx.removeStorageSync("runmeters"), 
            wx.removeStorageSync("schoolId"), wx.removeStorageSync("uploadDetailNum"), wx.removeStorageSync("uploadType"), 
            wx.removeStorageSync("runCheckStatus"), wx.removeStorageSync("lastDkDeviceid"), 
            wx.removeStorageSync("runpoints"), wx.removeStorageSync("mileageTarget"), wx.removeStorageSync("maxSpaceTime"), 
            wx.removeStorageSync("maxTime"), wx.removeStorageSync("minTime"), wx.removeStorageSync("seqNo"), 
            wx.removeStorageSync("deviceType"), wx.removeStorageSync("filePath"), wx.removeStorageSync("startRunDate"), 
            wx.removeStorageSync("runType"), wx.removeStorageSync("startType"), wx.removeStorageSync("initlatitude"), 
            wx.removeStorageSync("initlongitude"), wx.removeStorageSync("lineArray"), wx.removeStorageSync("markers"), 
            wx.removeStorageSync("punchCardSum"), wx.removeStorageSync("runBitmap"), wx.removeStorageSync("timeoutArray"), 
            wx.removeStorageSync("timerunArray"), wx.removeStorageSync("timestopsum"), wx.removeStorageSync("stoppoint"), 
            wx.removeStorageSync("punchBlueNum"), wx.removeStorageSync("punchDistanceNum");
        }
    }, {
        key: "getDistance",
        value: function(t, e, i, s) {
            var n = t * Math.PI / 180, a = i * Math.PI / 180, o = n - a, l = e * Math.PI / 180 - s * Math.PI / 180, r = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(o / 2), 2) + Math.cos(n) * Math.cos(a) * Math.pow(Math.sin(l / 2), 2)));
            return r *= 6378.137, r = Math.round(1e3 * r) / 1e3;
        }
    }, {
        key: "IsPtInPoly",
        value: function(t, e, i) {
            var s = 0, n = i.length;
            if (n < 3) return !1;
            for (var a = t, o = e, l = 0; l < n; l++) {
                var r = i[l].latitude, u = i[l].longitude;
                if (l == n - 1) var h = i[0].latitude, p = i[0].longitude; else h = i[l + 1].latitude, 
                p = i[l + 1].longitude;
                if (a >= r && a < h || a >= h && a < r) if (Math.abs(r - h) > 0) u - (u - p) * (r - a) / (r - h) < o && (s += 1);
            }
            return s % 2 != 0;
        }
    } ]), i;
}();

module.exports = i;