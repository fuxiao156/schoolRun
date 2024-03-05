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
        navHeight: "",
        navBarHeight: 0,
        navbarData: {
            showCapsule: 1
        }
    },
    attached: function() {
        this.setData({
            navBarHeight: a.globalData.navBarHeight,
            statusBarHeight: a.globalData.statusBarHeight
        });
    },
    methods: {
        _navbackEvent: function() {
            this.triggerEvent("navbackEvent");
        },
        _navback: function() {},
        bindSearchInput: function() {
            wx.navigateTo({
                url: "/pages/index/search"
            });
        },
        _backhome: function() {
            wx.switchTab({
                url: "/pages/index/index"
            });
        }
    }
});