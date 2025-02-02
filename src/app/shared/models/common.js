System.register([], function (exports_1, context_1) {
    "use strict";
    var Trader, Person, Address;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Trader = /** @class */ (function () {
                function Trader() {
                }
                return Trader;
            }());
            exports_1("Trader", Trader);
            Person = /** @class */ (function () {
                function Person() {
                }
                return Person;
            }());
            exports_1("Person", Person);
            Address = /** @class */ (function () {
                function Address() {
                    this.ID = 0;
                    this.TRADER_ID = 0;
                    this.LOCATION_NO = 0;
                    this.LOCATION_NAME = '';
                    this.ADDRESS_NO = '';
                    this.BUILDING_NAME = '';
                    this.VILLAGE = '';
                    this.MOO = '';
                    this.SOI = '';
                    this.STREET = '';
                    this.DISTRICT_NAME = '';
                    this.SUB_PROVINCE_NAME = '';
                    this.PROVINCE_NAME = '';
                    this.POSTCODE = '';
                    this.PHONE_NO = '';
                    this.FAX_NO = '';
                    this.E_MAIL_ADDRESS = '';
                    this.FOR_PRODUCTION = 0;
                    this.FOR_KEEPING = 0;
                    this.NOTE1 = '';
                    this.IS_ACTIVE = true;
                    this.CREATE_DATE = new Date();
                    this.CREATE_USER = '';
                    this.UPDATE_DATE = new Date();
                    this.UPDATE_USER = '';
                }
                return Address;
            }());
            exports_1("Address", Address);
        }
    };
});
//# sourceMappingURL=common.js.map