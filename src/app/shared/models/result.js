System.register([], function (exports_1, context_1) {
    "use strict";
    var ServerResult, EventResult, LookupData, ServerConfig;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            ServerResult = /** @class */ (function () {
                function ServerResult() {
                }
                ServerResult.isServerResult = function (source) {
                    return (source.message !== undefined
                        && source.has_error !== undefined
                        && source.error_code !== undefined
                        && source.data !== undefined);
                };
                return ServerResult;
            }());
            exports_1("ServerResult", ServerResult);
            EventResult = /** @class */ (function () {
                function EventResult(sender, data) {
                    if (sender === void 0) { sender = null; }
                    if (data === void 0) { data = null; }
                    this.sender = sender;
                    this.data = data;
                }
                return EventResult;
            }());
            exports_1("EventResult", EventResult);
            LookupData = /** @class */ (function () {
                function LookupData() {
                }
                return LookupData;
            }());
            exports_1("LookupData", LookupData);
            ServerConfig = /** @class */ (function () {
                function ServerConfig() {
                    this.base_url = "/trader";
                    this.did_url = "/EInternet62/Home/Index";
                    this.profile_url = "/EInternet62/Account/getEProfile";
                    this.jumpto_url = "/EInternet62/Account/FromELicensing";
                    this.download_url = "/api/download/";
                    this.allow_user_refresh_browser = true;
                    this.application_name = "E Licensing for Trader";
                    this.application_version = "";
                    this.upload_file_size = 2048000;
                    this.upload_file_type = "pdf,jpg,jpeg,png,bmp,gif";
                }
                return ServerConfig;
            }());
            exports_1("ServerConfig", ServerConfig);
        }
    };
});
//# sourceMappingURL=result.js.map