System.register([], function (exports_1, context_1) {
    "use strict";
    var UploadFileType;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            (function (UploadFileType) {
                UploadFileType["TypePDF"] = "doc";
                UploadFileType["TypeImage"] = "img";
                UploadFileType["Unknowed"] = "unknowed";
            })(UploadFileType || (UploadFileType = {}));
            exports_1("UploadFileType", UploadFileType);
        }
    };
});
//# sourceMappingURL=file-type.js.map