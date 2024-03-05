var t = getApp();

Page({
    data: {
        navbarData: {
            showCapsule: 2,
            title: "权限设置"
        },
        navheight: t.globalData.navBarHeight,
        winHeight: t.globalData.windowHeight
    },
    openDocumentDocHW: function() {
        var o = wx.getStorageSync("HWfilePath") || "";
        "" == o ? (wx.showLoading({
            title: "下载中",
            mask: !0
        }), wx.downloadFile({
            url: t.globalData.apiurl + "/userfiles/doc/SportRun华为权限设置.pdf",
            success: function(t) {
                wx.hideLoading();
                var o = t.tempFilePath;
                wx.openDocument({
                    filePath: o,
                    success: function(t) {
                        wx.setStorageSync("HWfilePath", o);
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "文件打开失败，请联系客服"
                        });
                    }
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "文件不存在，请联系客服"
                });
            }
        })) : wx.openDocument({
            filePath: o,
            success: function(t) {},
            fail: function(o) {
                wx.showLoading({
                    title: "下载中",
                    mask: !0
                }), wx.downloadFile({
                    url: t.globalData.apiurl + "/userfiles/doc/SportRun华为权限设置.pdf",
                    success: function(t) {
                        wx.hideLoading();
                        var o = t.tempFilePath;
                        wx.openDocument({
                            filePath: o,
                            success: function(t) {
                                wx.setStorageSync("HWfilePath", o);
                            },
                            fail: function(t) {
                                wx.showToast({
                                    title: "文件打开失败，请联系客服"
                                });
                            }
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "文件不存在，请联系客服"
                        });
                    }
                });
            }
        });
    },
    openDocumentDocOPPO: function() {
        var o = wx.getStorageSync("OPPOfilePath") || "";
        "" == o ? (wx.showLoading({
            title: "下载中",
            mask: !0
        }), wx.downloadFile({
            url: t.globalData.apiurl + "/userfiles/doc/SportRunOPPO权限设置.pdf",
            success: function(t) {
                wx.hideLoading();
                var o = t.tempFilePath;
                wx.openDocument({
                    filePath: o,
                    success: function(t) {
                        wx.setStorageSync("OPPOfilePath", o);
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "文件打开失败，请联系客服"
                        });
                    }
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "文件不存在，请联系客服"
                });
            }
        })) : wx.openDocument({
            filePath: o,
            success: function(t) {},
            fail: function(o) {
                wx.showLoading({
                    title: "下载中",
                    mask: !0
                }), wx.downloadFile({
                    url: t.globalData.apiurl + "/userfiles/doc/SportRunOPPO权限设置.pdf",
                    success: function(t) {
                        wx.hideLoading();
                        var o = t.tempFilePath;
                        wx.openDocument({
                            filePath: o,
                            success: function(t) {
                                wx.setStorageSync("OPPOfilePath", o);
                            },
                            fail: function(t) {
                                wx.showToast({
                                    title: "文件打开失败，请联系客服"
                                });
                            }
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "文件不存在，请联系客服"
                        });
                    }
                });
            }
        });
    },
    openDocumentDocVIVO: function() {
        var o = wx.getStorageSync("VIVOfilePath") || "";
        "" == o ? (wx.showLoading({
            title: "下载中",
            mask: !0
        }), wx.downloadFile({
            url: t.globalData.apiurl + "/userfiles/doc/SportRunVIVO权限设置.pdf",
            success: function(t) {
                wx.hideLoading();
                var o = t.tempFilePath;
                wx.openDocument({
                    filePath: o,
                    success: function(t) {
                        wx.setStorageSync("VIVOfilePath", o);
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "文件打开失败，请联系客服"
                        });
                    }
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "文件不存在，请联系客服"
                });
            }
        })) : wx.openDocument({
            filePath: o,
            success: function(t) {},
            fail: function(o) {
                wx.showLoading({
                    title: "下载中",
                    mask: !0
                }), wx.downloadFile({
                    url: t.globalData.apiurl + "/userfiles/doc/SportRunVIVO权限设置.pdf",
                    success: function(t) {
                        wx.hideLoading();
                        var o = t.tempFilePath;
                        wx.openDocument({
                            filePath: o,
                            success: function(t) {
                                wx.setStorageSync("VIVOfilePath", o);
                            },
                            fail: function(t) {
                                wx.showToast({
                                    title: "文件打开失败，请联系客服"
                                });
                            }
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "文件不存在，请联系客服"
                        });
                    }
                });
            }
        });
    },
    openDocumentDocIphone: function() {
        var o = wx.getStorageSync("IphonefilePath") || "";
        "" == o ? (wx.showLoading({
            title: "下载中",
            mask: !0
        }), wx.downloadFile({
            url: t.globalData.apiurl + "/userfiles/doc/SportRun苹果权限设置.pdf",
            success: function(t) {
                wx.hideLoading();
                var o = t.tempFilePath;
                wx.openDocument({
                    filePath: o,
                    success: function(t) {
                        wx.setStorageSync("IphonefilePath", o);
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "文件打开失败，请联系客服"
                        });
                    }
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "文件不存在，请联系客服"
                });
            }
        })) : wx.openDocument({
            filePath: o,
            success: function(t) {},
            fail: function(o) {
                wx.showLoading({
                    title: "下载中",
                    mask: !0
                }), wx.downloadFile({
                    url: t.globalData.apiurl + "/userfiles/doc/SportRun苹果权限设置.pdf",
                    success: function(t) {
                        wx.hideLoading();
                        var o = t.tempFilePath;
                        wx.openDocument({
                            filePath: o,
                            success: function(t) {
                                wx.setStorageSync("IphonefilePath", o);
                            },
                            fail: function(t) {
                                wx.showToast({
                                    title: "文件打开失败，请联系客服"
                                });
                            }
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "文件不存在，请联系客服"
                        });
                    }
                });
            }
        });
    },
    openDocumentDocSamsung: function() {
        var o = wx.getStorageSync("SamsungfilePath") || "";
        "" == o ? (wx.showLoading({
            title: "下载中",
            mask: !0
        }), wx.downloadFile({
            url: t.globalData.apiurl + "/userfiles/doc/SportRun三星权限设置.pdf",
            success: function(t) {
                wx.hideLoading();
                var o = t.tempFilePath;
                wx.openDocument({
                    filePath: o,
                    success: function(t) {
                        wx.setStorageSync("SamsungfilePath", o);
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "文件打开失败，请联系客服"
                        });
                    }
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "文件不存在，请联系客服"
                });
            }
        })) : wx.openDocument({
            filePath: o,
            success: function(t) {},
            fail: function(o) {
                wx.showLoading({
                    title: "下载中",
                    mask: !0
                }), wx.downloadFile({
                    url: t.globalData.apiurl + "/userfiles/doc/SportRun三星权限设置.pdf",
                    success: function(t) {
                        wx.hideLoading();
                        var o = t.tempFilePath;
                        wx.openDocument({
                            filePath: o,
                            success: function(t) {
                                wx.setStorageSync("SamsungfilePath", o);
                            },
                            fail: function(t) {
                                wx.showToast({
                                    title: "文件打开失败，请联系客服"
                                });
                            }
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "文件不存在，请联系客服"
                        });
                    }
                });
            }
        });
    },
    openDocumentDocXiaomi: function() {
        var o = wx.getStorageSync("XiaomifilePath") || "";
        "" == o ? (wx.showLoading({
            title: "下载中",
            mask: !0
        }), wx.downloadFile({
            url: t.globalData.apiurl + "/userfiles/doc/SportRun小米权限设置.pdf",
            success: function(t) {
                wx.hideLoading();
                var o = t.tempFilePath;
                wx.openDocument({
                    filePath: o,
                    success: function(t) {
                        wx.setStorageSync("XiaomifilePath", o);
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "文件打开失败，请联系客服"
                        });
                    }
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "文件不存在，请联系客服"
                });
            }
        })) : wx.openDocument({
            filePath: o,
            success: function(t) {},
            fail: function(o) {
                wx.showLoading({
                    title: "下载中",
                    mask: !0
                }), wx.downloadFile({
                    url: t.globalData.apiurl + "/userfiles/doc/SportRun小米权限设置.pdf",
                    success: function(t) {
                        wx.hideLoading();
                        var o = t.tempFilePath;
                        wx.openDocument({
                            filePath: o,
                            success: function(t) {
                                wx.setStorageSync("XiaomifilePath", o);
                            },
                            fail: function(t) {
                                wx.showToast({
                                    title: "文件打开失败，请联系客服"
                                });
                            }
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "文件不存在，请联系客服"
                        });
                    }
                });
            }
        });
    },
    openDocumentDocYijia: function() {
        var o = wx.getStorageSync("YijiafilePath") || "";
        "" == o ? (wx.showLoading({
            title: "下载中",
            mask: !0
        }), wx.downloadFile({
            url: t.globalData.apiurl + "/userfiles/doc/SportRun一加权限设置.pdf",
            success: function(t) {
                wx.hideLoading();
                var o = t.tempFilePath;
                wx.openDocument({
                    filePath: o,
                    success: function(t) {
                        wx.setStorageSync("YijiafilePath", o);
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "文件打开失败，请联系客服"
                        });
                    }
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "文件不存在，请联系客服"
                });
            }
        })) : wx.openDocument({
            filePath: o,
            success: function(t) {},
            fail: function(o) {
                wx.showLoading({
                    title: "下载中",
                    mask: !0
                }), wx.downloadFile({
                    url: t.globalData.apiurl + "/userfiles/doc/SportRun一加权限设置.pdf",
                    success: function(t) {
                        wx.hideLoading();
                        var o = t.tempFilePath;
                        wx.openDocument({
                            filePath: o,
                            success: function(t) {
                                wx.setStorageSync("YijiafilePath", o);
                            },
                            fail: function(t) {
                                wx.showToast({
                                    title: "文件打开失败，请联系客服"
                                });
                            }
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "文件不存在，请联系客服"
                        });
                    }
                });
            }
        });
    }
});