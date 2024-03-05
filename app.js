App({
    globalData: {
        userLocationBackground: 1,
        userLocation: !1,
        apiurl: "https://run.csu.edu.cn/",
        datakey: "a966a9ed603bd81d1e311547df205040",
        navBarHeight: 0,
        statusBarHeight: 0,
        windowWidth: 0,
        windowHeight: 0,
        screenHeight: 0,
        brand: "",
        model: "",
        userInfo: {
            avatarUrl: "",
            nickName: "微信用户",
            mileageTarget: 100,
            runTarget: 50,
            realName: "",
            mobileNo: "",
            sex: "1",
            mileage: 0,
            validCount: 0,
            morningRunCount: 0,
            mileagePercent: 0,
            countPercent: 0,
            scorePercent: 0,
            venueRun: 30,
            venueCount: 0,
            venuePercent: 0,
            sportScore: 0,
            runScore: 0,
            ranking: 0,
            ranknum: 0
        },
        userStatus: {
            openid: "",
            userid: "",
            approveStatus: 1,
            isExist: 1,
            studentNo: "",
            userType: 1
        },
        schoolInfo: {
            academicYear: "2122",
            accessType: 0,
            areaList: [],
            areaNo: "",
            indexArea: 0,
            polygonStatus: 0,
            prescription: 0,
            runRegular: 1,
            runScoreStatus: 0,
            runScoreType: 1,
            runType: 0,
            schoolId: "",
            schoolStatus: "2",
            term: 2,
            uniappStatus: 0,
            uniappUrl: "https://csh.ticeyun.com:90"
        },
        venueFlag: 0,
        getHome: 0,
        getVenuedata: 0,
        getPersonaldata: 0,
        runSet: 0,
        getMessageList2: 0,
        messageSize: 0
    },
    onLaunch: function() {
        var t = this, a = this;
        wx.setKeepScreenOn({
            keepScreenOn: !0
        });
        var e = wx.getSystemInfoSync();
        this.globalData.windowWidth = e.windowWidth, this.globalData.windowHeight = e.windowHeight, 
        this.globalData.statusBarHeight = e.statusBarHeight, this.globalData.screenHeight = e.screenHeight;
        var o = wx.getMenuButtonBoundingClientRect();
        this.globalData.navBarHeight = o.bottom, this.globalData.brand = e.brand, this.globalData.model = e.model
        wx.setStorageSync("userStatus", a.globalData.userStatus)
        wx.setStorageSync("openid","oJSYL5g3dTH8mc4n1IFX62V_2ISc")
		wx.setStorageSync("userid", "2022090813435521536") 
		this.globalData.userStatus.openid = wx.getStorageSync("openid")
		this.globalData.userStatus.userid = wx.getStorageSync("userid")
        if (wx.getStorageSync("schoolInfo")) {
            var s = wx.getStorageSync("schoolInfo");
            a.globalData.schoolInfo = s;
        }
        if (wx.getStorageSync("userInfo")) {
            var r = wx.getStorageSync("userInfo");
            a.globalData.userInfo = r;
        }
        wx.getSetting({
            success: function(a) {
                t.globalData.userLocationBackground = a.authSetting["scope.userLocationBackground"], 
                t.globalData.userLocation = a.authSetting["scope.userLocation"];
            }
        });
    }
});