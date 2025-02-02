System.register([], function (exports_1, context_1) {
    "use strict";
    var TransformCommonData;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            TransformCommonData = /** @class */ (function () {
                function TransformCommonData() {
                }
                //---------------------------------------------------
                TransformCommonData.prototype.typeOfLocation = function (FOR_PRODUCT) {
                    return FOR_PRODUCT ? 'สำหรับการผลิต' : 'สำหรับเก็บ';
                };
                //---------------------------------------------------
                //public addressToString(data:Address):string{
                //    let result = '';
                //    result+='เลขที่'+data.ADDRESS_NO;
                //    if(data.BUILDING_NAME.trim().length>0) result+=' อาคาร'+data.BUILDING_NAME;
                //    result+=' ถนน'+data.STREET;
                //    if (data.PROVINCE_NAME.indexOf('กรุงเทพ')>-1) {
                //        result+=' แขวง'+data.DISTRICT_NAME;
                //        result+=' เขต'+data.SUB_PROVINCE_NAME;
                //    }else{
                //        result+=' ตำบล'+data.DISTRICT_NAME;
                //        result+=' อำเภอ'+data.SUB_PROVINCE_NAME;            
                //    }
                //    result+=' จังหวัด'+data.PROVINCE_NAME+ ' '+data.POSTCODE;
                //    //console.log(result);
                //    return result;
                //}
                TransformCommonData.prototype.addressToString = function (data) {
                    //let result = '';
                    //result += 'เลขที่' + data.ADDRESS_NO;
                    //if (data.BUILDING_NAME.trim().length > 0) result += ' อาคาร' + data.BUILDING_NAME;
                    //result += ' ถนน' + data.STREET;
                    //if (data.PROVINCE_NAME.indexOf('กรุงเทพ') > -1) {
                    //  result += ' แขวง' + data.DISTRICT_NAME;
                    //  result += ' เขต' + data.SUB_PROVINCE_NAME;
                    //} else {
                    //  result += ' ตำบล' + data.DISTRICT_NAME;
                    //  result += ' อำเภอ' + data.SUB_PROVINCE_NAME;
                    //}
                    //result += ' จังหวัด' + data.PROVINCE_NAME + ' ' + data.POSTCODE;
                    ////console.log(result);
                    //return result;
                    var result = '';
                    //-------------------------------------------------------
                    var isBangkokAddress = (data.PROVINCE_NAME == "กรุงเทพมหานคร") ? true : false;
                    var hasData = false;
                    //AddressNo ------------------------------------
                    if (data.ADDRESS_NO.trim().length > 0 && data.ADDRESS_NO.trim() != "-") {
                        result += "เลขที่ " + data.ADDRESS_NO;
                        hasData = true;
                    }
                    //BuildingName ------------------------------------
                    if (data.BUILDING_NAME.trim().length > 0) {
                        if (hasData)
                            result += " ";
                        result += data.BUILDING_NAME;
                        hasData = true;
                    }
                    //Village --------------------------------------------
                    if (data.VILLAGE.trim().length > 0) {
                        if (hasData)
                            result += " ";
                        result += "หมู่บ้าน" + data.VILLAGE;
                        hasData = true;
                    }
                    //Moo --------------------------------------------
                    if (data.MOO.trim().length > 0) {
                        if (hasData)
                            result += " ";
                        result += "หมู่ที่" + data.MOO;
                        hasData = true;
                    }
                    //Soi  --------------------------------------------
                    if (data.SOI.trim().length > 0) {
                        if (hasData)
                            result += " ";
                        result += "ซอย" + data.SOI;
                        hasData = true;
                    }
                    //Street ------------------------------------------
                    if (data.STREET.trim().length > 0) {
                        if (hasData)
                            result += " ";
                        result += "ถนน" + data.STREET;
                        hasData = true;
                    }
                    //DistrictName -----------------------------------
                    if (data.DISTRICT_NAME.trim().length > 0) {
                        if (hasData)
                            result += " ";
                        if (isBangkokAddress) {
                            result += "แขวง" + data.DISTRICT_NAME;
                        }
                        else {
                            result += "ตำบล" + data.DISTRICT_NAME;
                        }
                        hasData = true;
                    }
                    //SubProvinceName --------------------------------
                    if (data.SUB_PROVINCE_NAME.trim().length > 0) {
                        if (hasData)
                            result += " ";
                        if (isBangkokAddress) {
                            result += "เขต" + data.SUB_PROVINCE_NAME;
                        }
                        else {
                            result += "อำเภอ" + data.SUB_PROVINCE_NAME;
                        }
                        hasData = true;
                    }
                    //ProvinceName ------------------------------------
                    if (data.PROVINCE_NAME.trim().length > 0) {
                        if (hasData)
                            result += " ";
                        if (isBangkokAddress) {
                            result += data.PROVINCE_NAME;
                        }
                        else {
                            result += "จังหวัด" + data.PROVINCE_NAME;
                        }
                        hasData = true;
                    }
                    //Postcode ------------------------------------------
                    if (data.POSTCODE.trim().length > 0) {
                        if (hasData)
                            result += " ";
                        result += data.POSTCODE;
                        hasData = true;
                    }
                    //-------------------------------------------------------
                    return result;
                };
                return TransformCommonData;
            }());
            exports_1("TransformCommonData", TransformCommonData);
        }
    };
});
//# sourceMappingURL=transform-common-data.js.map