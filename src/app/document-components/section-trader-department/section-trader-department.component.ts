import { Component, OnInit } from "@angular/core";

//import { CorporationModel } from '../../shared/models/corporation';
import { ApplicationContext } from "../../application-context";

//import { baseSectionComponent } from './../request-document/base-section-component/base-section-component.component';
import { LookupService } from "../../shared/services/lookup.service";
import { RequestDocumentService } from "../../shared/services/request-document.service";
import { Trader } from "../../shared/models/common";
import { BaseSection } from "./../../shared/base/base-section";

@Component({
  selector: "cdss-section-trader-department",
  templateUrl: "./section-trader-department.component.html",
  styleUrls: ["./section-trader-department.component.css"],
})
export class SectionTraderDepartmentComponent
  extends BaseSection
  implements OnInit
{
  constructor(
    public app: ApplicationContext,
    public repo: RequestDocumentService,
    protected lookup: LookupService
  ) {
    //super(app, repo, lookup);
    super(app, repo);

    //this.is_hidden = false;
  }
  //-------------------------------------------
  ngOnInit() {}
  //-------------------------------------------
  ngAfterViewInit(): void {
    //this.swapMode(this._isEditMode);
  }
  // ------------------------------------------------------
  public Validate(forSubmit: boolean, isFocusToField: boolean): boolean {
    return true;
  }
  // ------------------------------------------------------
  // ----------------------------------------

  // ----------------------------------------
  public datasource(): Trader {
    return this.app.traderInformation;
  }

  public get NameOfTraderType(): string {
    return this.IsPerson ? "บุคคลธรรมดา" : "นิติบุคคล";
  }
  //-------------------------------------------
  public get IsPerson(): boolean {
    return this.app.traderInformation.TRADER_TYPE == 1;
  }
  //-------------------------------------------
  public get registerPlace(): string {
    return (
      this.app.traderInformation.REGISTER_SUB_PROVINCE_NAME +
      " " +
      this.app.traderInformation.REGISTER_PROVINCE_NAME
    );
  }
}
