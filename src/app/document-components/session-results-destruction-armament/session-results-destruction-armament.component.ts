import { Component, OnInit } from "@angular/core";

import { ApplicationContext } from "../../application-context";
import { LookupService } from "../../shared/services/lookup.service";
import { RequestDocumentService } from "../../shared/services/request-document.service";
import { BaseSection } from "./../../shared/base/base-section";
import { Trader } from "../../shared/models/common";

@Component({
  selector: "cdss-session-results-destruction-armament",
  templateUrl: "./session-results-destruction-armament.component.html",
  styleUrls: ["./session-results-destruction-armament.component.css"],
})
export class SessionResultsDestructionArmamentComponent
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
