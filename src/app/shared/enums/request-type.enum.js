//export enum RequestType {
//  Enter = 'ENT'
//  , Import = 'IMP'
//  , Production = 'PDT'
//  , Owning = 'OWN'
//  , Renewal = 'RNW'
//  , Substitute = 'STT'
//  , SendSample = 'SSP'
//  , Export = 'EXP'
//  , ExportSpecial = 'EXS'
//  , CrossBorder = 'CSB'
System.register([], function (exports_1, context_1) {
    "use strict";
    var LicenseType, PermissionMode, RequestDocumentType;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {//export enum RequestType {
            //  Enter = 'ENT'
            //  , Import = 'IMP'
            //  , Production = 'PDT'
            //  , Owning = 'OWN'
            //  , Renewal = 'RNW'
            //  , Substitute = 'STT'
            //  , SendSample = 'SSP'
            //  , Export = 'EXP'
            //  , ExportSpecial = 'EXS'
            //  , CrossBorder = 'CSB'
            //}
            //export enum RequestType {
            //  NONE = 0,
            //  Enter = 1,
            //  Import = 2,
            //  Production = 3,
            //  Owning = 4,
            //  Renewal = 5,
            //  Substitute = 6,
            //  SendSample = 7,
            //  Export = 8,
            //  ExportSpecial = 9,
            //  CrossBorder = 10
            //}
            (function (LicenseType) {
                LicenseType[LicenseType["NONE"] = 0] = "NONE";
                LicenseType[LicenseType["Enter"] = 2] = "Enter";
                LicenseType[LicenseType["Import"] = 3] = "Import";
                LicenseType[LicenseType["Production"] = 4] = "Production";
                LicenseType[LicenseType["Owning"] = 5] = "Owning";
                // unknown type
                LicenseType[LicenseType["TYPE_8"] = 8] = "TYPE_8";
                LicenseType[LicenseType["TYPE_9"] = 9] = "TYPE_9";
                LicenseType[LicenseType["TYPE_18"] = 18] = "TYPE_18";
                LicenseType[LicenseType["TYPE_19"] = 19] = "TYPE_19";
                LicenseType[LicenseType["TYPE_20"] = 20] = "TYPE_20";
            })(LicenseType || (LicenseType = {}));
            exports_1("LicenseType", LicenseType);
            (function (PermissionMode) {
                PermissionMode["CREATE"] = "C";
                PermissionMode["EDIT"] = "E";
                PermissionMode["VIEW"] = "V";
                PermissionMode["DELETE"] = "D";
                PermissionMode["SUBMIT"] = "P";
                PermissionMode["TAKEOWNER"] = "T";
            })(PermissionMode || (PermissionMode = {}));
            exports_1("PermissionMode", PermissionMode);
            //for replace RequestType
            (function (RequestDocumentType) {
                RequestDocumentType[RequestDocumentType["NONE"] = 0] = "NONE";
                RequestDocumentType[RequestDocumentType["Owner"] = 5] = "Owner";
                // --------------------------
                RequestDocumentType[RequestDocumentType["Enter"] = 100] = "Enter";
                RequestDocumentType[RequestDocumentType["EnterWithOwner"] = 105] = "EnterWithOwner";
                RequestDocumentType[RequestDocumentType["Import"] = 200] = "Import";
                RequestDocumentType[RequestDocumentType["ImportWithOwner"] = 205] = "ImportWithOwner";
                RequestDocumentType[RequestDocumentType["Production"] = 300] = "Production";
                RequestDocumentType[RequestDocumentType["ProductionWithOwner"] = 305] = "ProductionWithOwner";
                RequestDocumentType[RequestDocumentType["SendSample"] = 400] = "SendSample";
                RequestDocumentType[RequestDocumentType["SendSampleWithOwner"] = 405] = "SendSampleWithOwner";
                RequestDocumentType[RequestDocumentType["Export"] = 500] = "Export";
                //ExportWithOwner = 505,
                RequestDocumentType[RequestDocumentType["ExportSpecial"] = 600] = "ExportSpecial";
                //ExportSpecialWithOwner = 605,
                RequestDocumentType[RequestDocumentType["CrossBorder"] = 700] = "CrossBorder";
                RequestDocumentType[RequestDocumentType["CrossBorderWithOwner"] = 705] = "CrossBorderWithOwner";
                // ------------------------------------------
                RequestDocumentType[RequestDocumentType["Renewal"] = 10000] = "Renewal";
                RequestDocumentType[RequestDocumentType["Renewal_Owner"] = 10005] = "Renewal_Owner";
                RequestDocumentType[RequestDocumentType["Renewal_Enter"] = 10100] = "Renewal_Enter";
                RequestDocumentType[RequestDocumentType["Renewal_EnterWithOwner"] = 10105] = "Renewal_EnterWithOwner";
                RequestDocumentType[RequestDocumentType["Renewal_Import"] = 10200] = "Renewal_Import";
                RequestDocumentType[RequestDocumentType["Renewal_ImportWithOwner"] = 10205] = "Renewal_ImportWithOwner";
                RequestDocumentType[RequestDocumentType["Renewal_Production"] = 10300] = "Renewal_Production";
                RequestDocumentType[RequestDocumentType["Renewal_ProductionWithOwner"] = 10305] = "Renewal_ProductionWithOwner";
                RequestDocumentType[RequestDocumentType["Renewal_SendSample"] = 10400] = "Renewal_SendSample";
                RequestDocumentType[RequestDocumentType["Renewal_SendSampleWithOwner"] = 10405] = "Renewal_SendSampleWithOwner";
                RequestDocumentType[RequestDocumentType["Renewal_Export"] = 10500] = "Renewal_Export";
                RequestDocumentType[RequestDocumentType["Renewal_ExportWithOwner"] = 10505] = "Renewal_ExportWithOwner";
                RequestDocumentType[RequestDocumentType["Renewal_ExportSpecial"] = 10600] = "Renewal_ExportSpecial";
                RequestDocumentType[RequestDocumentType["Renewal_ExportSpecialWithOwner"] = 10605] = "Renewal_ExportSpecialWithOwner";
                RequestDocumentType[RequestDocumentType["Renewal_CrossBorder"] = 10700] = "Renewal_CrossBorder";
                RequestDocumentType[RequestDocumentType["Renewal_CrossBorderWithOwner"] = 10705] = "Renewal_CrossBorderWithOwner";
                // ------------------------------------------
                RequestDocumentType[RequestDocumentType["Substitute"] = 20000] = "Substitute";
                RequestDocumentType[RequestDocumentType["Substitute_Owner"] = 20005] = "Substitute_Owner";
                RequestDocumentType[RequestDocumentType["Substitute_Enter"] = 20100] = "Substitute_Enter";
                RequestDocumentType[RequestDocumentType["Substitute_EnterWithOwner"] = 20105] = "Substitute_EnterWithOwner";
                RequestDocumentType[RequestDocumentType["Substitute_Import"] = 20200] = "Substitute_Import";
                RequestDocumentType[RequestDocumentType["Substitute_ImportWithOwner"] = 20205] = "Substitute_ImportWithOwner";
                RequestDocumentType[RequestDocumentType["Substitute_Production"] = 20300] = "Substitute_Production";
                RequestDocumentType[RequestDocumentType["Substitute_ProductionWithOwner"] = 20305] = "Substitute_ProductionWithOwner";
                RequestDocumentType[RequestDocumentType["Substitute_SendSample"] = 20400] = "Substitute_SendSample";
                RequestDocumentType[RequestDocumentType["Substitute_SendSampleWithOwner"] = 20405] = "Substitute_SendSampleWithOwner";
                RequestDocumentType[RequestDocumentType["Substitute_Export"] = 20500] = "Substitute_Export";
                RequestDocumentType[RequestDocumentType["Substitute_ExportWithOwner"] = 20505] = "Substitute_ExportWithOwner";
                RequestDocumentType[RequestDocumentType["Substitute_ExportSpecial"] = 20600] = "Substitute_ExportSpecial";
                RequestDocumentType[RequestDocumentType["Substitute_ExportSpecialWithOwner"] = 20605] = "Substitute_ExportSpecialWithOwner";
                RequestDocumentType[RequestDocumentType["Substitute_CrossBorder"] = 20700] = "Substitute_CrossBorder";
                RequestDocumentType[RequestDocumentType["Substitute_CrossBorderWithOwner"] = 20705] = "Substitute_CrossBorderWithOwner";
            })(RequestDocumentType || (RequestDocumentType = {}));
            exports_1("RequestDocumentType", RequestDocumentType);
        }
    };
});
//# sourceMappingURL=request-type.enum.js.map