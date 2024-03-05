var t = getApp();

Component({
    properties: {},
    data: {
        winHeight: t.globalData.winHeight,
        countDownNum: 3,
        animationData: "",
        isShow: !0
    },
    methods: {
        countDown: function(t) {
            var a = this, n = a.data.countDownNum;
            a.setData({
                timer: setInterval(function() {
                    var i = wx.createAnimation({
                        duration: 300,
                        timingFunction: "ease",
                        delay: 0,
                        transformOrigin: "50% 50%"
                    });
                    i.opacity(1).scale(2, 2).step().opacity(0).scale(0, 0).step(), a.setData({
                        countDownNum: n,
                        animationData: i.export()
                    }), --n <= 0 && (t.initstartRun(), setTimeout(function() {
                        a.setData({
                            isShow: !1
                        });
                        var t = wx.createAnimation({
                            duration: 300,
                            timingFunction: "ease",
                            delay: 0,
                            transformOrigin: "50% 50%"
                        });
                        t.opacity(0).step(), a.setData({
                            animationData1: t.export()
                        });
                    }, 600), clearInterval(a.data.timer));
                }, 900)
            });
        }
    }
});