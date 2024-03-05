var a = getApp();

Component({
    properties: {
        navbarData: {
            type: Object,
            value: {},
            observer: function(a, t) {}
        }
    },
    data: {
        height: "",
        titleHeight: "",
        navBarHeight: a.globalData.navBarHeight,
        statusBarHeight: a.globalData.statusBarHeight,
        navbarData: {
            showCapsule: 1
        }
    },
    attached: function() {},
    methods: {
        _navback: function() {
            wx.navigateBack();
        },
        _backhome: function() {
            wx.switchTab({
                url: "/pages/index/index"
            });
        }
    }
});