// import { Appendix } from "src/app/shared/models/request-document";
// import { UnitService } from "src/app/shared/services/lookup/unit.service";

import { Appendix } from "src/app/shared/models/request-document";
import { UnitService } from "src/app/shared/services/lookup/unit.service";

// export class AppendixWithUnit extends Appendix{

//     public WEIGHT_UNIT_NAME: string = "";
//     public QUANTITY_UNIT_NAME: string = "";


//     public toAppendix(): Appendix{
//         const result = new Appendix();

//         result.ID = this.ID;
//         result.LICENSE_REQ_DTL_ID = this.LICENSE_REQ_DTL_ID
//         result.ITEM_NO = this.ITEM_NO;
//         result.PRODUCT_NAME = this.PRODUCT_NAME;
//         result.PRODUCT_BRAND_NAME = this.PRODUCT_BRAND_NAME;
//         result.PRODUCT_SERIES = this.PRODUCT_SERIES;
//         result.PRODUCT_DESCRIPTION = this.PRODUCT_DESCRIPTION;
//         result.TARIFF_CODE = this.TARIFF_CODE;
//         result.STATISTICAL_CODE = this.STATISTICAL_CODE;
//         result.QUANTITY = this.QUANTITY;
//         result.QUANTITY_UNIT_ID = this.QUANTITY_UNIT_ID;
//         result.CUSTOMS_QUANTITY_UNIT_CODE = this.CUSTOMS_QUANTITY_UNIT_CODE;
//         result.WEIGHT = this.WEIGHT;
//         result.WEIGHT_UNIT_ID = this.WEIGHT_UNIT_ID;
//         result.CUSTOMS_WEIGHT_UNIT_CODE = this.CUSTOMS_QUANTITY_UNIT_CODE;
//         result.UNIT_PRICE = this.UNIT_PRICE;
//         result.TOTAL_PRICE = this.TOTAL_PRICE;
//         result.NOTE1 = this.NOTE1;

//         return result;
//     }

//     public fromAppendix(app: Appendix, unit: UnitService){
//         this.ID = app.ID;
//         this.LICENSE_REQ_DTL_ID = app.LICENSE_REQ_DTL_ID
//         this.ITEM_NO = app.ITEM_NO;
//         this.PRODUCT_NAME = app.PRODUCT_NAME;
//         this.PRODUCT_BRAND_NAME = app.PRODUCT_BRAND_NAME;
//         this.PRODUCT_SERIES = app.PRODUCT_SERIES;
//         this.PRODUCT_DESCRIPTION = app.PRODUCT_DESCRIPTION;
//         this.TARIFF_CODE = app.TARIFF_CODE;
//         this.STATISTICAL_CODE = app.STATISTICAL_CODE;
//         this.QUANTITY = app.QUANTITY;
//         this.QUANTITY_UNIT_ID = app.QUANTITY_UNIT_ID;
//         this.CUSTOMS_QUANTITY_UNIT_CODE = app.CUSTOMS_QUANTITY_UNIT_CODE;
//         this.WEIGHT = app.WEIGHT;
//         this.WEIGHT_UNIT_ID = app.WEIGHT_UNIT_ID;
//         this.CUSTOMS_WEIGHT_UNIT_CODE = app.CUSTOMS_QUANTITY_UNIT_CODE;
//         this.UNIT_PRICE = app.UNIT_PRICE;
//         this.TOTAL_PRICE = app.TOTAL_PRICE;
//         this.NOTE1 = app.NOTE1;

//         this.WEIGHT_UNIT_NAME = unit.getUnitNameFromUnitID(this.WEIGHT_UNIT_ID, "-");
//         this.QUANTITY_UNIT_NAME = unit.getUnitNameFromUnitID(this.QUANTITY_UNIT_ID, "-");
//     }

// }

export class AppendixUnit{
    constructor(
        public Appendix: Appendix, 
        public WEIGHT_UNIT_NAME: string = '',
        public QUANTITY_UNIT_NAME: string = ''
    ){

    }

    public updateUnit(unit: UnitService){
        this.WEIGHT_UNIT_NAME = unit.getUnitNameFromUnitID(this.Appendix.WEIGHT_UNIT_ID, "-");
        this.QUANTITY_UNIT_NAME = unit.getUnitNameFromUnitID(this.Appendix.QUANTITY_UNIT_ID, "-");
    }

    // public get toText():string{
    //     if()
    // }
}