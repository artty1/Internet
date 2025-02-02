System.register(["../models/request-document"], function (exports_1, context_1) {
    "use strict";
    var request_document_1, ExcelFormatReader, AppendixFormat, ConsessionFormat;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (request_document_1_1) {
                request_document_1 = request_document_1_1;
            }
        ],
        execute: function () {
            ExcelFormatReader = /** @class */ (function () {
                function ExcelFormatReader() {
                }
                ExcelFormatReader.prototype.validateToNumber = function (data, defaultValue) {
                    if (defaultValue === void 0) { defaultValue = 0; }
                    if (data == null || data == undefined || isNaN(data)) {
                        return defaultValue;
                    }
                    else {
                        return data;
                    }
                };
                // ------------
                ExcelFormatReader.prototype.validateToString = function (data, defaultValue) {
                    if (defaultValue === void 0) { defaultValue = ""; }
                    if (data == null || data == undefined) {
                        return defaultValue;
                    }
                    else {
                        return data;
                    }
                };
                // ------------
                ExcelFormatReader.prototype.validateToDate = function (data, defaultValue) {
                    if (defaultValue === void 0) { defaultValue = null; }
                    if (data == null || data == undefined || data.length < 1) {
                        console.log('----------- ', data, ' is not date');
                        return defaultValue;
                    }
                    else {
                        var result = new Date(Date.parse(data));
                        return result;
                    }
                };
                // -----------------------------------------
                ExcelFormatReader.prototype.RawToAppedix = function (data) {
                    var _this = this;
                    var result = data.map(function (item) {
                        var objResult = new AppendixFormat();
                        objResult.name = _this.validateToString(item[0]);
                        objResult.brandname = _this.validateToString(item[1]);
                        objResult.series = _this.validateToString(item[2]);
                        objResult.description = _this.validateToString(item[3]);
                        objResult.qty = _this.validateToNumber(item[4]);
                        objResult.qty_unit_name = _this.validateToString(item[5]);
                        objResult.weight = _this.validateToNumber(item[6]);
                        objResult.weight_unit_name = _this.validateToString(item[7]);
                        objResult.remark = _this.validateToString(item[8]);
                        return objResult;
                    });
                    // remove row header
                    if (result.length > 0)
                        result.shift();
                    //***************
                    return result;
                };
                // -----------------------------------------
                ExcelFormatReader.prototype.RawToConcession = function (data) {
                    var _this = this;
                    console.log('RawToConcession : ', data);
                    var result = data.map(function (item) {
                        var objResult = new ConsessionFormat();
                        objResult.document_no = _this.validateToString(item[0]);
                        objResult.issue_date = _this.validateToDate(item[1]);
                        objResult.remark = _this.validateToString(item[2]);
                        console.log('RawToConcession : ', item[1]);
                        return objResult;
                    });
                    // remove row header
                    if (result.length > 0)
                        result.shift();
                    //***************
                    return result;
                };
                // -----------------------------------------
                ExcelFormatReader.prototype.FormatToAppendix = function (data, only_selected) {
                    if (only_selected === void 0) { only_selected = true; }
                    if (only_selected)
                        data = data.filter(function (item) { return item.is_selected; });
                    var result = data.map(function (item) {
                        var objectResult = new request_document_1.Appendix();
                        objectResult.ID = 0;
                        objectResult.PRODUCT_NAME = item.name;
                        objectResult.PRODUCT_BRAND_NAME = item.brandname;
                        objectResult.PRODUCT_SERIES = item.series;
                        objectResult.PRODUCT_DESCRIPTION = item.description;
                        objectResult.QUANTITY = item.qty;
                        objectResult.QUANTITY_UNIT_ID = item.qty_unit_id;
                        objectResult.WEIGHT = item.weight;
                        objectResult.WEIGHT_UNIT_ID = item.weight_unit_id;
                        objectResult.NOTE1 = item.remark;
                        return objectResult;
                    });
                    return result;
                };
                // -----------------------------------------
                ExcelFormatReader.prototype.FormatToAppendixConsession = function (data, only_selected) {
                    if (only_selected === void 0) { only_selected = true; }
                    if (only_selected)
                        data = data.filter(function (item) { return item.is_selected; });
                    var result = data.map(function (item) {
                        var objectResult = new request_document_1.Consession();
                        objectResult.ID = 0;
                        objectResult.DOCUMENT_NO = item.document_no;
                        objectResult.DOCUMENT_DATE = item.issue_date;
                        objectResult.CONTACT_INFO = item.remark;
                        console.log('objectResult : ', objectResult);
                        console.log('item : ', item);
                        return objectResult;
                    });
                    return result;
                };
                return ExcelFormatReader;
            }());
            exports_1("ExcelFormatReader", ExcelFormatReader);
            // *********************************************************************
            AppendixFormat = /** @class */ (function () {
                function AppendixFormat() {
                    this.is_selected = false;
                    this.name = "";
                    this.brandname = "";
                    this.series = "";
                    this.description = "";
                    this.qty = 0;
                    this.qty_unit_name = "";
                    this.qty_unit_id = 0;
                    this.weight = 0;
                    this.weight_unit_name = "";
                    this.weight_unit_id = 0;
                    this.remark = "";
                    this.is_selected = false;
                }
                return AppendixFormat;
            }());
            exports_1("AppendixFormat", AppendixFormat);
            // -----------------------------------------
            ConsessionFormat = /** @class */ (function () {
                function ConsessionFormat() {
                    this.is_selected = false;
                    this.document_no = "";
                    this.issue_date = null;
                    this.remark = "";
                }
                return ConsessionFormat;
            }());
            exports_1("ConsessionFormat", ConsessionFormat);
            // -----------------------------------------
        }
    };
});
//# sourceMappingURL=excel-format-reader.js.map