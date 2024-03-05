var o = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 1,
            title: "成绩详情"
        },
        navheight: o.globalData.navBarHeight,
        prescription: o.globalData.schoolInfo.prescription,
        sex: 1,
        schoolYear: 2122,
        schoolTerm: 1,
        healthScore: 0,
        addScore: 0,
        score: 0,
        conclusion: "",
        stature: 0,
        avoirdupois: 0,
        saScore: 0,
        saConclusion: "",
        vitalCapacityScore: 0,
        vitalCapacityConclusion: "",
        fiftyMeter: 0,
        fiftyMeterScore: 0,
        fiftyMeterConclusion: "",
        standingLongJump: 0,
        standingLongJumpScore: 0,
        standingLongJumpConclusion: "",
        bend: -1,
        bendScore: 0,
        bendConclusion: "",
        lie: -100,
        lieScore: 0,
        lieConclusion: "",
        kiloMeter: 0,
        kiloMeterScore: 0,
        kiloMeterConclusion: "",
        leftVision: 0,
        rightVision: 0,
        leftMirror: 0,
        rightMirror: 0,
        leftAmetropia: 0,
        rightAmetropia: 0
    },
    onLoad: function(e) {
        this.setData({
            sex: e.sex,
            schoolYear: e.schoolyear,
            schoolTerm: e.schoolterm,
            healthScore: e.healthscore,
            addScore: e.addscore,
            score: e.score,
            conclusion: e.conclusion,
            stature: e.stature,
            avoirdupois: e.avoirdupois,
            saScore: e.sascore,
            saConclusion: "undefined" != e.saconclusion ? e.saconclusion : "",
            vitalCapacity: e.vitalcapacity,
            vitalCapacityScore: e.vitalcapacityscore,
            vitalCapacityConclusion: "undefined" != e.vitalcapacityconclusion ? e.vitalcapacityconclusion : "",
            fiftyMeter: e.fiftymeter,
            fiftyMeterScore: e.fiftymeterscore,
            fiftyMeterConclusion: "undefined" != e.fiftymeterconclusion ? e.fiftymeterconclusion : "",
            standingLongJump: e.standinglongjump,
            standingLongJumpScore: e.standinglongjumpscore,
            standingLongJumpConclusion: "undefined" != e.standinglongjumpconclusion ? e.standinglongjumpconclusion : "",
            bend: e.bend,
            bendScore: e.bendscore,
            bendConclusion: "undefined" != e.bendconclusion ? e.bendconclusion : "",
            lie: e.lie,
            lieScore: e.liescore,
            lieConclusion: "undefined" != e.lieconclusion ? e.lieconclusion : "",
            kiloMeter: e.kilometer,
            kiloMeterScore: e.kilometerscore,
            kiloMeterConclusion: "undefined" != e.kilometerconclusion ? e.kilometerconclusion : "",
            leftVision: e.leftvision,
            rightVision: e.rightvision,
            leftMirror: e.leftmirror,
            rightMirror: e.rightmirror,
            leftAmetropia: e.leftametropia,
            rightAmetropia: e.rightametropia,
            prescription: o.globalData.schoolInfo.prescription
        });
    },
    gotoPrescriptionInfo: function(o) {
        var e = o.currentTarget.dataset.schoolyear, i = o.currentTarget.dataset.schoolterm;
        wx.navigateTo({
            url: "/pages/dating/prescriptionInfo?term=" + i + "&schoolYear=" + e
        });
    }
});