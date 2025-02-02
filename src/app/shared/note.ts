
import { ApplicationContext } from "../application-context";

//create Interceptor

//-------------------------------------------------------
export class RequestService{

	private _document: RequestDocument = null;

	constructor(protected app:ApplicationContext){

	}
	public setDocument(requestType, data){

	}
	public get document(): RequestDocument{
		return this._document;
	}
	public get isImport():boolean{
    return false;
  }
	public get isRenew():boolean{
    return false;
  }
	public get hasReference():boolean{
    return false;
  }

}
//-------------------------------------------------------
export enum RequestStatus{
	save,	          // คำขอร่าง
  submit,	        // ยื่นแล้ว
  register,	      // รับแล้ว
  inform,	        // ดำเนินการ
  waitPayment,	  // อนุมัติแล้ว
  approve,	      // license
  reject,	        // ปฏิเสธ
  refuse          // ถอดเรื่อง
}
//-------------------------------------------------------
export enum CommandTo{
	save, submit, delete, print, close
}
//-------------------------------------------------------
export enum PaymentMethod{
  Cash = 'C',
  NSW = 'N',
  BillPayment = 'B'
}
//-------------------------------------------------------
export class Person{

}
//-------------------------------------------------------
export class Location{

}
//-------------------------------------------------------
export class RequestLocation{
  public keeping: Array<Location> = null;
  public production: Array<Location> = null;
}
//-------------------------------------------------------
export abstract class RequestDocument{

  constructor(protected app: ApplicationContext){

  }

	public paymentMethod: string;		// ['C', 'N', 'B']
	public hasPermit: boolean;
	public requestCheck: boolean;			// check history of person or place

	public committee: Array<Person>;
	public attorney: Array<Person>;

	public location: RequestLocation;

	public signer: { }
	public concession: [];
	public appendix: [];
	public documentAttachment: [];

  //-----------------------------------------------------
  abstract buildResult(): any;
  abstract validateData(command: CommandTo, withFocusUI: boolean): boolean;
  abstract mappingData(apiData: any)
  //-----------------------------------------------------

}
//-------------------------------------------------------
export enum RequestDocumentType{

	Import_Owner,	Import_OrderWithOwner,	Import_ProductionWithOwner,	Import_ImportWithOwner,
	Export_Yearly,	Export_Special,		Export_CrossBorder,		Export_Sample,

	Renew_Owner,	Renew_Order,		Renew_Production,		Renew_Import
}
//-------------------------------------------------------
// List of Request Document Class
// => Import_Owner
// => Import_OrderWithOwner
// => Import_ProductionWithOwner
// => Import_ImportWithOwner

// => Export_Yearly
// => Export_Special
// => Export_CrossBorder
// => Export_Sample

// => Renew_Owner
// => Renew_Order
// => Renew_Production
// => Renew_Import
//-------------------------------------------------------
//-----------------------------------------------------------
export class Import_Owner extends RequestDocument{

  constructor(protected app: ApplicationContext){
    super(app);
  }
  //-----------------------------------------------------------
  public buildResult() {

  }
  //-----------------------------------------------------------
  public validateData(command: CommandTo, withFocusUI: boolean): boolean {
    return false;
  }
  //-----------------------------------------------------------
  public mappingData(apiData: any) {

  }

}
//-----------------------------------------------------------
//-----------------------------------------------------------
export class Import_OrderWithOwner extends RequestDocument{

  constructor(protected app: ApplicationContext){
    super(app);
  }
  //-----------------------------------------------------------
  public buildResult() {

  }
  //-----------------------------------------------------------
  public validateData(command: CommandTo, withFocusUI: boolean): boolean {
    return false;
  }
  //-----------------------------------------------------------
  public mappingData(apiData: any) {

  }

}
//-----------------------------------------------------------
//-----------------------------------------------------------
export class Import_ProductionWithOwner extends RequestDocument{

  constructor(protected app: ApplicationContext){
    super(app);
  }
  //-----------------------------------------------------------
  public buildResult() {

  }
  //-----------------------------------------------------------
  public validateData(command: CommandTo, withFocusUI: boolean): boolean {
    return false;
  }
  //-----------------------------------------------------------
  public mappingData(apiData: any) {

  }

}
//-----------------------------------------------------------
//-----------------------------------------------------------
export class Import_ImportWithOwner extends RequestDocument{

  constructor(protected app: ApplicationContext){
    super(app);
  }
  //-----------------------------------------------------------
  public buildResult() {

  }
  //-----------------------------------------------------------
  public validateData(command: CommandTo, withFocusUI: boolean): boolean {
    return false;
  }
  //-----------------------------------------------------------
  public mappingData(apiData: any) {

  }

}
//-----------------------------------------------------------
//-----------------------------------------------------------
export class Export_Yearly extends RequestDocument{

  constructor(protected app: ApplicationContext){
    super(app);
  }
  //-----------------------------------------------------------
  public buildResult() {

  }
  //-----------------------------------------------------------
  public validateData(command: CommandTo, withFocusUI: boolean): boolean {
    return false;
  }
  //-----------------------------------------------------------
  public mappingData(apiData: any) {

  }

}
//-----------------------------------------------------------
//-----------------------------------------------------------
export class Export_Special extends RequestDocument{

  constructor(protected app: ApplicationContext){
    super(app);
  }
  //-----------------------------------------------------------
  public buildResult() {

  }
  //-----------------------------------------------------------
  public validateData(command: CommandTo, withFocusUI: boolean): boolean {
    return false;
  }
  //-----------------------------------------------------------
  public mappingData(apiData: any) {

  }

}
//-----------------------------------------------------------
//-----------------------------------------------------------
export class Export_CrossBorder extends RequestDocument{

  constructor(protected app: ApplicationContext){
    super(app);
  }
  //-----------------------------------------------------------
  public buildResult() {

  }
  //-----------------------------------------------------------
  public validateData(command: CommandTo, withFocusUI: boolean): boolean {
    return false;
  }
  //-----------------------------------------------------------
  public mappingData(apiData: any) {

  }

}
//-----------------------------------------------------------
//-----------------------------------------------------------
export class Export_Sample extends RequestDocument{

  constructor(protected app: ApplicationContext){
    super(app);
  }
  //-----------------------------------------------------------
  public buildResult() {

  }
  //-----------------------------------------------------------
  public validateData(command: CommandTo, withFocusUI: boolean): boolean {
    return false;
  }
  //-----------------------------------------------------------
  public mappingData(apiData: any) {

  }

}
//-----------------------------------------------------------
//-----------------------------------------------------------
export class Renew_Owner extends RequestDocument{

  constructor(protected app: ApplicationContext){
    super(app);
  }
  //-----------------------------------------------------------
  public buildResult() {

  }
  //-----------------------------------------------------------
  public validateData(command: CommandTo, withFocusUI: boolean): boolean {
    return false;
  }
  //-----------------------------------------------------------
  public mappingData(apiData: any) {

  }

}
//-----------------------------------------------------------
//-----------------------------------------------------------
export class Renew_Order extends RequestDocument{

  constructor(protected app: ApplicationContext){
    super(app);
  }
  //-----------------------------------------------------------
  public buildResult() {

  }
  //-----------------------------------------------------------
  public validateData(command: CommandTo, withFocusUI: boolean): boolean {
    return false;
  }
  //-----------------------------------------------------------
  public mappingData(apiData: any) {

  }

}
//-----------------------------------------------------------
//-----------------------------------------------------------
export class Renew_Production extends RequestDocument{

  constructor(protected app: ApplicationContext){
    super(app);
  }
  //-----------------------------------------------------------
  public buildResult() {

  }
  //-----------------------------------------------------------
  public validateData(command: CommandTo, withFocusUI: boolean): boolean {
    return false;
  }
  //-----------------------------------------------------------
  public mappingData(apiData: any) {

  }

}
//-----------------------------------------------------------
//-----------------------------------------------------------
export class Renew_Import extends RequestDocument{

  constructor(protected app: ApplicationContext){
    super(app);
  }
  //-----------------------------------------------------------
  public buildResult() {

  }
  //-----------------------------------------------------------
  public validateData(command: CommandTo, withFocusUI: boolean): boolean {
    return false;
  }
  //-----------------------------------------------------------
  public mappingData(apiData: any) {

  }

}
//-----------------------------------------------------------
