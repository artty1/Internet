export class CurrentDataOfLicense
{
    public operation_move: Array<LicenseOperationMonthly>;
    public license_id:number;
    public license_qty:number;

    public spend_qty:number;

    public remaining_qty:number;
    public remaining_date:Date;

    public unit_name:string;
    //public req_id:number;
    // public req_dtl_id:number;


    constructor(){
      this.operation_move = new Array();

      this.license_id = 0;
      this.license_qty = 0;
      this.remaining_qty = 0;
      this.spend_qty = 0;

      this.remaining_date = new Date();

    }
}

export class LicenseOperationMonthly{
    public period: string;
    public month_no: number;
    public year_no: number;
    public summary: number;
    public operation_type: string;

    public item_no: number;
    public period_date: Date;

    public remain_qty: number;

    constructor(){
      this.period = "";
      this.month_no = 0;
      this.year_no = 0;
      this.summary = 0;
      this.operation_type = "";
      this.item_no = 0;
      this.period_date = new Date();

      this.remain_qty = 0;
    }
    // public unit_name:string;
}

