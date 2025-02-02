System.register([], function (exports_1, context_1) {
    "use strict";
    var jQueryHelper;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            jQueryHelper = /** @class */ (function () {
                function jQueryHelper() {
                }
                //---------------------------------------------------
                jQueryHelper.prototype.toDatePicker = function (ele_id, tag, initDate, callbackChange, lang) {
                    if (tag === void 0) { tag = ''; }
                    if (initDate === void 0) { initDate = null; }
                    if (callbackChange === void 0) { callbackChange = null; }
                    if (lang === void 0) { lang = "th"; }
                    var dp = $('#' + ele_id);
                    if (dp == null) {
                        console.log(ele_id + ' not found.');
                        return false;
                    }
                    else {
                        //console.log('found ' + ele_id);
                    }
                    //if (initDate == null || initDate == undefined) initDate = new Date();
                    dp.datepicker({
                        language: lang,
                        autoclose: true,
                        todayHighlight: true
                    }).on('changeDate', function (data) {
                        //console.log('change date to : ', data);
                        var dateResult = moment(data.date).format();
                        //if (callbackChange != null) callbackChange(tag, data.date);
                        if (callbackChange != null)
                            callbackChange(tag, dateResult);
                    });
                    if (initDate != null) {
                        setTimeout(function () { dp.datepicker('setDate', initDate); }, 10);
                    }
                };
                //---------------------------------------------------
                jQueryHelper.prototype.toMonthPicker = function (ele_id, tag, initDate, callbackChange, lang) {
                    if (tag === void 0) { tag = ''; }
                    if (initDate === void 0) { initDate = null; }
                    if (callbackChange === void 0) { callbackChange = null; }
                    if (lang === void 0) { lang = "th"; }
                    var dp = $('#' + ele_id);
                    if (dp == null) {
                        console.log(ele_id + ' not found.');
                        return false;
                    }
                    else {
                        //console.log('found '+ele_id);
                    }
                    dp.datepicker({
                        format: "MM yyyy",
                        startView: "months",
                        minViewMode: "months",
                        language: lang,
                        autoclose: true,
                        todayHighlight: true
                    }).on('changeMonth', function (data) {
                        var dateResult = moment(data.date).format();
                        //if (callbackChange != null) callbackChange(tag, data.date);
                        if (callbackChange != null)
                            callbackChange(tag, dateResult);
                    });
                    if (initDate != null) {
                        setTimeout(function () { dp.datepicker('setDate', initDate); }, 10);
                    }
                };
                //---------------------------------------------------
                jQueryHelper.prototype.toDestroy_DatePicker = function (ele_id) {
                    $('#' + ele_id).datepicker('destroy');
                };
                //---------------------------------------------------
                jQueryHelper.prototype.setDateToDatepicker = function (ele_id, value) {
                    if (value === void 0) { value = null; }
                    if (value == null)
                        value = new Date();
                    //$('#' + ele_id).datepicker().setDate(value);
                    $('#' + ele_id).datepicker('setDate', value);
                };
                return jQueryHelper;
            }());
            exports_1("jQueryHelper", jQueryHelper);
            //https://bootstrap-datepicker.readthedocs.io/en/latest/events.html#changedate
        }
    };
});
//# sourceMappingURL=jquery-helper.js.map