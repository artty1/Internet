System.register([], function (exports_1, context_1) {
    "use strict";
    var RouteDefinition;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            RouteDefinition = /** @class */ (function () {
                function RouteDefinition() {
                    this.pageLicense = 'license';
                    this.pageInit = 'initial';
                    this.pageNew = 'new';
                    this.pageNew_Dashboard = '';
                    this.pageNew_Enter = 'enter';
                    this.pageNew_Import = 'import';
                    this.pageNew_Production = 'production';
                    this.pageNew_Owning = 'owning';
                    this.pageNew_Substiture = 'substitute';
                    this.pageNew_SendSample = 'sendsample';
                    this.pageNew_Export = 'export';
                    this.pageNew_ExportSpecial = 'export-special';
                    this.pageNew_CrossBorder = 'cross-border';
                    this.pageNew_Renewal = 'renewal';
                    this.pageNew_Reject = 'reject';
                    this.pageDashboard = '';
                    this.pageDraft = 'draft';
                    this.pageDraft_Dashboard = '';
                    this.pageSubmit = 'submit';
                    this.pageReceive = 'receive';
                    this.pageReject = 'reject';
                    this.pagePending = 'pending';
                    this.pageApprove = 'approve';
                    this.pageSearch = 'search';
                    this.pageHistory = 'history';
                    this.pageRecycleBin = 'bin';
                    this.pageUnAuthorize = 'un-authorize';
                    //-----------------------------------------------------
                }
                //-----------------------------------------------------
                RouteDefinition.prototype.buildPathWithRoot = function () {
                    var path = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        path[_i] = arguments[_i];
                    }
                    var result = '';
                    path.forEach(function (item) {
                        result += '/' + item;
                    });
                    return result;
                };
                return RouteDefinition;
            }());
            exports_1("default", (new RouteDefinition()));
        }
    };
});
//# sourceMappingURL=route-definition.js.map