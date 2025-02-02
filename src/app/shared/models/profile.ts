
export class Profile {
  public permissions: Array<PermissionOfUser>;

  public trader_id: number;
  public user_id: number;
  public user_code: string;
  public trader_name: string;
  public user_name: string;
  public token: string;

  constructor() {
    this.permissions = new Array();

    this.trader_id = 0;
    this.user_id = 0;
    this.user_name = "";
    this.trader_name = "";
  }
  //----------------------------------------------------------
  public get isLogin(): boolean {
    return (this.trader_id > 0 && this.user_name.trim().length > 1);
  }
  //----------------------------------------------------------
  public SetMockup(mockup_config:any) {

    // console.log('user_mockup : ', mockup_config);
    // console.log(mockup_config.user_id, mockup_config.user_code, mockup_config.user_name, mockup_config.trader_id, mockup_config.trader_name);


    if(
        mockup_config.user_id != undefined && 
        mockup_config.user_code != undefined && 
        mockup_config.user_name != undefined && 
        mockup_config.trader_id != undefined && 
        mockup_config.trader_name != undefined
      ){
      
      this.trader_id = mockup_config.trader_id;
      this.user_id = mockup_config.user_id;
      this.user_code = mockup_config.user_code;
      this.user_name = mockup_config.user_name;
      this.trader_name = mockup_config.trader_name;

    }else{
      alert('Mockup Error');
      console.error('mockup of user => Error !!!');
    }

  }
  //----------------------------------------------------------
  public SetUserFromDID(user:any){
    this.trader_id = user.trader_id;
    this.user_id = 0;
    this.user_code = user.user_id;
    this.user_name = user.user_name;
    this.trader_name = user.trader_name;
  }
  //----------------------------------------------------------
}

export class PermissionOfUser {

  private can_create: boolean = false;
  private can_view: boolean = false;
  private can_edit: boolean = false;
  private can_delete: boolean = false;
  private can_submit: boolean = false;
  private can_takeowner: boolean = false;


  constructor(canCreate: boolean, canView: boolean, canEdit: boolean, canDelete: boolean, canSubmit: boolean, canTakeowner: boolean) {
    this.can_create = canCreate;
    this.can_view = canView;
    this.can_edit = canEdit;
    this.can_delete = canDelete;
    this.can_submit = canSubmit;
    this.can_takeowner = canTakeowner;
  }

  public get canCreate(): boolean {
    return this.can_create;
  }
  public get canView(): boolean {
    return this.can_view;
  }
  public get canEdit(): boolean {
    return this.can_edit;
  }
  public get canDelete(): boolean {
    return this.can_delete;
  }
  public get canSubmit(): boolean {
    return this.can_submit;
  }
  public get canTakeowner(): boolean {
    return this.can_takeowner;
  }
}
