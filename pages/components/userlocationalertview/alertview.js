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
            value: "取消"
        },
        confirmText: {
            type: String,
            value: "确定"
        }
    },
    data: {
        isShow: !1
    },
    methods: {
        hideAlertView: function() {
            this.setData({
                isShow: !this.data.isShow
            });
        },
        showAlertView: function() {
            this.setData({
                isShow: !this.data.isShow
            });
        },
        changeModalCancel: function() {
            this.hideAlertView();
        },
        _cancelEvent: function() {
            this.hideAlertView();
        },
        _confirmEvent: function() {
            this.triggerEvent("confirmEvent");
        },
        _closeEvent: function() {
            this.hideAlertView();
        }
    }
});