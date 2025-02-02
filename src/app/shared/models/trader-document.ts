export class TraderDocumentFromELicensing
{
  public document_id: number;
	public document_name: string;
	//public have_att": 1,
	public get doc_att_count():number{
		return this.attachments.length;
	}

	public issue_sub_province_name:string;
	public issue_province_name:string;
	public issue_date: Date;
	public expiry_date: Date;

	public attachments: Array<TraderDocumentAttachment>;

	constructor(){
		this.attachments = new Array();

    this.document_id = 0;
    this.document_name = "";

    this.issue_province_name = "";
    this.issue_sub_province_name = "";

    this.issue_date = null;
    this.expiry_date = null;
	}
}
//-----------------------------------------------------------
export class TraderDocumentAttachment
{

  public ui_exception: string;
  public get has_exception():boolean{
    return this.ui_exception.length>0;
  }

	constructor(
		public file_token: string = '',
		public file_fullname: string = '',
		public id: number=0,
		public file_description: string = '',
		public file_extension: string = ''
	){

    this.ui_exception = "";
	}
}
//-----------------------------------------------------------