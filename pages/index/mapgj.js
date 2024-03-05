Object.defineProperty(exports, "__esModule", {
    value: !0
});

getApp();

Page({
    data: {
        gps: [ "108.939087,34.250638", "108.939087,34.240917", "108.932135,34.241095", "108.932006,34.235702", "108.932049,34.230291", "108.931985,34.228233", "108.931942,34.222778", "108.931942,34.218058", "108.939151,34.218236", "108.939055,34.214536", "108.943153,34.214536", "108.946587,34.214478" ],
        searchData: [],
        lineData: [],
        polyline: [],
        markers: [],
        points: [],
        orgId: "",
        token: "",
        codeModel: {},
        choicePersonInfor: {},
        companyData: []
    },
    onLoad: function(t) {
        this.mapCtx = wx.createMapContext("myMap"), this.mapCtx.moveToLocation();
        for (var i = [], a = 0; a < this.data.gps.length; a++) i.push({
            latitude: this.data.gps[a].split(",")[1],
            longitude: this.data.gps[a].split(",")[0]
        });
        var e = [];
        e.push({
            latitude: this.data.gps[0].split(",")[1],
            longitude: this.data.gps[0].split(",")[0],
            id: 20,
            iconPath: "/images/run.png",
            width: "40px",
            height: "60px",
            anchor: {
                x: .5,
                y: .4
            }
        }), e.push({
            id: 1001,
            latitude: this.data.gps[0].split(",")[1],
            longitude: this.data.gps[0].split(",")[0],
            name: "起点",
            iconPath: "/images/qid.png",
            content: "111",
            width: "30px",
            height: "45px"
        }), e.push({
            id: 9001,
            latitude: this.data.gps[this.data.gps.length - 1].split(",")[1],
            longitude: this.data.gps[this.data.gps.length - 1].split(",")[0],
            name: "终点",
            iconPath: "/images/zdian.png",
            content: "111",
            width: "30px",
            height: "45px"
        }), e.push({
            id: 1011,
            latitude: this.data.gps[3].split(",")[1],
            longitude: this.data.gps[3].split(",")[0],
            name: "幸福小区接送点",
            iconPath: "/images/21_position.png",
            width: "34px",
            height: "34px",
            content: "111",
            callout: {
                content: "幸福小区接送点",
                padding: 5,
                fontSize: 12,
                textAlign: "center",
                display: "ALWAYS",
                borderRadius: 5,
                borderWidth: 1,
                bgColor: "#ffffff",
                borderColor: "#c3c3c3"
            }
        }), e.push({
            id: 1012,
            latitude: this.data.gps[6].split(",")[1],
            longitude: this.data.gps[6].split(",")[0],
            name: "幸福小区接送点",
            iconPath: "/images/21_position.png",
            width: "34px",
            height: "34px",
            content: "111",
            callout: {
                content: "雁塔小区接送点",
                padding: 5,
                fontSize: 12,
                textAlign: "center",
                display: "ALWAYS",
                borderRadius: 5,
                borderWidth: 1,
                bgColor: "#ffffff",
                borderColor: "#c3c3c3"
            }
        }), this.setData({
            markers: e,
            polyline: [ {
                points: i,
                color: "#09B988",
                width: 5,
                dottedLine: !1,
                arrowLine: !0,
                borderColor: "#09B988",
                borderWidth: 1
            } ]
        });
        var o = wx.createMapContext("myMap");
        o.includePoints({
            points: i,
            padding: [ 50 ]
        }), o.moveAlong({
            markerId: 20,
            autoRotate: !0,
            path: i,
            duration: 5e4
        });
    }
});