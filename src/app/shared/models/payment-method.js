System.register([], function (exports_1, context_1) {
    "use strict";
    var PaymentMethod;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            PaymentMethod = /** @class */ (function () {
                function PaymentMethod() {
                    this.client_code = '';
                    this.server_code = '';
                    this.title = '';
                }
                return PaymentMethod;
            }());
            exports_1("PaymentMethod", PaymentMethod);
        }
    };
});
//# sourceMappingURL=payment-method.js.map