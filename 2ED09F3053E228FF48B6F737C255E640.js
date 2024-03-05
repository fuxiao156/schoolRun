function t(t) {
    return t < 10 ? "0" + t : t;
}

var e = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
    formatTime: function(t) {
        var n = t.getFullYear(), r = t.getMonth() + 1, o = t.getDate(), u = t.getHours(), a = t.getMinutes(), i = t.getSeconds();
        return [ n, r, o ].map(e).join("/") + " " + [ u, a, i ].map(e).join(":");
    },
    formatNumberHM: function(t) {
        return [ parseInt(t / 60), t % 60 ].map(e).join(":");
    },
    formatTimeHM: function(t) {
        return [ t.getHours(), t.getMinutes() ].map(e).join(":");
    },
    date_format: function(e) {
        var n = Math.floor(e / 1e3), r = Math.floor(n / 3600), o = t(Math.floor((n - 3600 * r) / 60));
        return r + ":" + o + ":" + t(n - 3600 * r - 60 * o) + " ";
    },
    formatTime2: function(t, n) {
        var r = [ "Y", "M", "D", "h", "m", "s" ], o = [], u = new Date(1e3 * t);
        for (var a in o.push(u.getFullYear()), o.push(e(u.getMonth() + 1)), o.push(e(u.getDate())), 
        o.push(e(u.getHours())), o.push(e(u.getMinutes())), o.push(e(u.getSeconds())), o) n = n.replace(r[a], o[a]);
        return n;
    },
    formatTime3: function(t) {
        return t.getFullYear() + "年" + (t.getMonth() + 1) + "月" + t.getDate() + "日 " + [ t.getHours(), t.getMinutes(), t.getSeconds() ].map(e).join(":");
    },
    formatTime4: function(t) {
        var n = t.getFullYear(), r = t.getMonth() + 1, o = t.getDate(), u = t.getHours(), a = t.getMinutes(), i = t.getSeconds();
        return [ n, r, o ].map(e).join("-") + " " + [ u, a, i ].map(e).join(":");
    }
};