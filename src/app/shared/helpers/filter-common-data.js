System.register([], function (exports_1, context_1) {
    "use strict";
    var FilterCommonData;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            FilterCommonData = /** @class */ (function () {
                function FilterCommonData() {
                }
                FilterCommonData.prototype.listPerson_Committee = function (datasource) {
                    return datasource.filter(function (item) { return item.PERSON_TYPE == 'C'; });
                };
                FilterCommonData.prototype.listPerson_Attorney = function (datasource) {
                    return datasource.filter(function (item) { return item.PERSON_TYPE == 'A'; });
                };
                FilterCommonData.prototype.listPerson_Trader = function (datasource) {
                    return datasource.filter(function (item) { return item.PERSON_TYPE == 'T'; });
                };
                FilterCommonData.prototype.listPerson_Other = function (datasource) {
                    return datasource.filter(function (item) { return item.PERSON_TYPE == 'O'; });
                };
                return FilterCommonData;
            }());
            exports_1("FilterCommonData", FilterCommonData);
        }
    };
});
//# sourceMappingURL=filter-common-data.js.map