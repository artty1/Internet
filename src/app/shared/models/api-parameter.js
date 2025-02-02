System.register([], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var API_UserReference, API_Document, API_RequestDocumentDetail, API_DocumentRequestReference, API_LookupFilter, API_LookupFilterSet;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            //export class ApiParameter {
            //  public trader_id: number=0;
            //  public user_code: string='';
            //  public doc_id: number=0;
            //  public flag_something: boolean = false;
            //  //public data: any;
            //}
            //-------------------------------------
            API_UserReference = /** @class */ (function () {
                function API_UserReference() {
                }
                return API_UserReference;
            }());
            exports_1("API_UserReference", API_UserReference);
            //-------------------------------------
            API_Document = /** @class */ (function (_super) {
                __extends(API_Document, _super);
                function API_Document() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return API_Document;
            }(API_UserReference));
            exports_1("API_Document", API_Document);
            API_RequestDocumentDetail = /** @class */ (function (_super) {
                __extends(API_RequestDocumentDetail, _super);
                function API_RequestDocumentDetail() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return API_RequestDocumentDetail;
            }(API_UserReference));
            exports_1("API_RequestDocumentDetail", API_RequestDocumentDetail);
            API_DocumentRequestReference = /** @class */ (function (_super) {
                __extends(API_DocumentRequestReference, _super);
                function API_DocumentRequestReference() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return API_DocumentRequestReference;
            }(API_UserReference));
            exports_1("API_DocumentRequestReference", API_DocumentRequestReference);
            API_LookupFilter = /** @class */ (function (_super) {
                __extends(API_LookupFilter, _super);
                function API_LookupFilter() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return API_LookupFilter;
            }(API_UserReference));
            exports_1("API_LookupFilter", API_LookupFilter);
            API_LookupFilterSet = /** @class */ (function (_super) {
                __extends(API_LookupFilterSet, _super);
                function API_LookupFilterSet() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return API_LookupFilterSet;
            }(API_UserReference));
            exports_1("API_LookupFilterSet", API_LookupFilterSet);
        }
    };
});
//# sourceMappingURL=api-parameter.js.map