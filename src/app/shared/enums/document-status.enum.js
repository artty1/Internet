System.register([], function (exports_1, context_1) {
    "use strict";
    var DocumentStatus;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            (function (DocumentStatus) {
                DocumentStatus[DocumentStatus["NONE"] = -999] = "NONE";
                DocumentStatus[DocumentStatus["Draft"] = -1] = "Draft";
                DocumentStatus[DocumentStatus["Submited"] = 0] = "Submited";
                DocumentStatus[DocumentStatus["Accepted"] = 10] = "Accepted";
                DocumentStatus[DocumentStatus["Inform"] = 20] = "Inform";
                DocumentStatus[DocumentStatus["Approved"] = 30] = "Approved";
                DocumentStatus[DocumentStatus["Complete"] = 40] = "Complete";
                DocumentStatus[DocumentStatus["Cancel"] = -99] = "Cancel";
                DocumentStatus[DocumentStatus["RejectToTrader"] = 15] = "RejectToTrader";
            })(DocumentStatus || (DocumentStatus = {}));
            exports_1("DocumentStatus", DocumentStatus);
        }
    };
});
//# sourceMappingURL=document-status.enum.js.map