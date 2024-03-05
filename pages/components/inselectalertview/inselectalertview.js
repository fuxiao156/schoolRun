Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        title: {
            type: String,
            value: "标题"
        },
        content: {
            type: String,
            value: "内容"
        },
        content1: {
            type: String,
            value: ""
        },
        content2: {
            type: String,
            value: ""
        },
        cancelText: {
            type: String,
            value: ""
        },
        confirmText: {
            type: String,
            value: ""
        }
    },
    data: {
        isShow: !1
    },
    methods: {
        hideAlertView: function() {
            this.setData({
                isShow: !1
            });
        },
        showAlertView: function() {
            this.setData({
                isShow: !0
            });
        },
        _cancelEvent: function() {
            this.triggerEvent("cancelEvent");
        },
        _confirmEvent: function() {
            this.triggerEvent("confirmEvent");
        },
        _closeEvent: function() {
            this.hideAlertView();
        }
    }
});