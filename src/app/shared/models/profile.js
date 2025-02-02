System.register([], function (exports_1, context_1) {
    "use strict";
    var Profile, PermissionOfUser;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Profile = /** @class */ (function () {
                function Profile() {
                    this.permissions = new Array();
                    this.trader_id = 0;
                    this.user_id = 0;
                    this.user_name = "";
                    this.trader_name = "";
                }
                Object.defineProperty(Profile.prototype, "isLogin", {
                    //----------------------------------------------------------
                    get: function () {
                        return (this.trader_id > 0 && this.user_name.trim().length > 1);
                    },
                    enumerable: true,
                    configurable: true
                });
                //----------------------------------------------------------
                Profile.prototype.SetMockup = function () {
                    // has license document (for print) but license expire (for create new)
                    //this.trader_id = 103613;
                    //this.user_id = 0;
                    //this.trader_name = 'บริษัท เอ็กเซดดี้ ฟริคชั่น แมททีเรียล จำกัด';
                    //this.user_name = 'ch008901 : น.ส.ณัฐชนก เมฆมุสิก';
                    //this.token = 'mockup-token';
                    // license not expire
                    this.trader_id = 74;
                    this.user_id = 0;
                    this.trader_name = 'บริษัท ปูนซิเมนต์ไทย (แก่งคอย) จำกัด';
                    this.user_name = 'ex000301 : นวพัฒน์ ชื่นอารมณ์';
                    this.token = 'mockup-token';
                };
                return Profile;
            }());
            exports_1("Profile", Profile);
            PermissionOfUser = /** @class */ (function () {
                function PermissionOfUser(canCreate, canView, canEdit, canDelete, canSubmit, canTakeowner) {
                    this.can_create = false;
                    this.can_view = false;
                    this.can_edit = false;
                    this.can_delete = false;
                    this.can_submit = false;
                    this.can_takeowner = false;
                    this.can_create = canCreate;
                    this.can_view = canView;
                    this.can_edit = canEdit;
                    this.can_delete = canDelete;
                    this.can_submit = canSubmit;
                    this.can_takeowner = canTakeowner;
                }
                Object.defineProperty(PermissionOfUser.prototype, "canCreate", {
                    get: function () {
                        return this.can_create;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PermissionOfUser.prototype, "canView", {
                    get: function () {
                        return this.can_view;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PermissionOfUser.prototype, "canEdit", {
                    get: function () {
                        return this.can_edit;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PermissionOfUser.prototype, "canDelete", {
                    get: function () {
                        return this.can_delete;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PermissionOfUser.prototype, "canSubmit", {
                    get: function () {
                        return this.can_submit;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PermissionOfUser.prototype, "canTakeowner", {
                    get: function () {
                        return this.can_takeowner;
                    },
                    enumerable: true,
                    configurable: true
                });
                return PermissionOfUser;
            }());
            exports_1("PermissionOfUser", PermissionOfUser);
        }
    };
});
//# sourceMappingURL=profile.js.map