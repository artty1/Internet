import { Component, OnInit } from "@angular/core";

import { ApplicationContext } from "../../application-context";
import { LookupService } from "../../shared/services/lookup.service";
import { RequestDocumentService } from "../../shared/services/request-document.service";
import { Trader } from "../../shared/models/common";
import { BaseSection } from "./../../shared/base/base-section";

@Component({
  selector: "cdss-section-armament-information",
  templateUrl: "./section-armament-information.component.html",
  styleUrls: ["./section-armament-information.component.css"],
})
export class SectionArmamentInformationComponent
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

  // ----------------------------------------
  public datasource(): Trader {
    return this.app.traderInformation;
  }
}
