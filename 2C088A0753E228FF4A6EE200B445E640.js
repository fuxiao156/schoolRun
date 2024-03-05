function t(t) {
    return t < 10 ? "0" + t : t;
}

function r(t, r, e, n) {
    var a = t * Math.PI / 180, o = e * Math.PI / 180, i = a - o, u = r * Math.PI / 180 - n * Math.PI / 180, f = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(i / 2), 2) + Math.cos(a) * Math.cos(o) * Math.pow(Math.sin(u / 2), 2)));
    return f *= 6378.137, f = Math.round(1e3 * f) / 1e3;
}

module.exports = {
    getDistance: r,
    playYuying: function(t) {
        var r = wx.createInnerAudioContext();
        r.autoplay = !0, r.src = t, r.volume = 1, r.onPlay(function() {}), r.onError(function(t) {});
    },
    date_format: function(r) {
        var e = Math.floor(r / 3600), n = t(Math.floor((r - 3600 * e) / 60));
        return e + ":" + n + ":" + t(r - 3600 * e - 60 * n) + " ";
    },
    getKal: function(t) {
        var r = 1.036 * t * 60;
        return Math.round(10 * r) / 10;
    },
    getUploadDistanceMark: function(t, e, n, a) {
        for (var o = 1e5, i = 0, u = 0; u < t.length; u++) if (0 != t[u].id && 1 != t[u].id && t[u].callout) {
            var f = r(t[u].latitude, t[u].longitude, e, n);
            if (o > f && (o = f, f < a / 1e3 && f > 0)) {
                i = t[u].id;
                break;
            }
        }
        return i;
    },
    getDistanceMark: function(t, e, n, a) {
        for (var o = 1e5, i = 0, u = 0; u < t.length; u++) {
            var f = r(t[u].latitude, t[u].longitude, e, n);
            if (o > f && (o = f, f < a / 1e3 && f > 0)) {
                i = t[u].deviceId;
                break;
            }
        }
        return i;
    },
    getEndDistanceMark: function(t, e, n, a) {
        for (var o = 1e5, i = 0, u = 0; u < t.length; u++) {
            var f = r(t[u].latitude, t[u].longitude, e, n);
            if (o > f && (o = f, f < 2.5 * a / 1e3 && f > 0)) {
                i = t[u].deviceId;
                break;
            }
        }
        return i;
    },
    getDistanceMarkcg: function(t, e, n, a) {
        for (var o = 1e5, i = 0, u = 0; u < t.length; u++) {
            var f = r(t[u].latitude, t[u].longitude, e, n);
            if (o > f && (o = f, f < a / 1e3 + .01 && f > 0)) {
                i = t[u].deviceId;
                break;
            }
        }
        return i;
    },
    sortKey: function(t, r) {
        var e = function(t) {
            var r = [];
            for (var e in t) r.push(e);
            r = r.sort();
            var n = {};
            for (var a in r) {
                var o = r[a];
                n[o] = t[o];
            }
            return n;
        }(t), n = [];
        for (var a in e) "" != e[a] && "0" != e[a] && n.push(a + "=" + e[a]);
        return n.join("&") + "&key=" + r;
    },
    getAvspeed: function(t, r) {
        if (0 == t) return "0'00''";
        var e = Math.ceil(r / t), n = Math.floor(e / 60), a = e % 60;
        return a < 10 && (a = "0" + a), 0 == n ? "0'" + a + "''" : n + "'" + a + "''";
    }
};