import { Component, OnInit, Input } from '@angular/core';
import { ApplicationContext } from '../../application-context';
import { RequestDocumentService } from '../../shared/services/request-document.service';
import { LookupService } from '../../shared/services/lookup.service';

import { PopupEditorLocation } from '../popup-editor-location/popup-editor-location.component';
import { BaseSection } from './../../shared/base/base-section';
import { RequestDocument, Location } from '../../shared/models/request-document';
import { DialogResult } from '../../shared/base/base-modal-dialog';
import { TransformCommonData } from '../../shared/helpers/transform-common-data';
import { RequestDocumentType } from 'src/app/shared/enums/request-type.enum';
//import { Event } from '@angular/router';

@Component({
  selector: 'cdss-section-stock-location',
  templateUrl: './section-stock-location.component.html',
  styleUrls: ['./section-stock-location.component.css']
})
export class SectionStockLocationComponent extends BaseSection implements OnInit {

  public transform = new TransformCommonData();

  private locationEditor: PopupEditorLocation;

  private is_show_list:boolean;
  private for_production: boolean=true;


  //-------------------------------------------
  constructor(public app: ApplicationContext, public repo: RequestDocumentService) {
    super(app, repo);

  }
  //-------------------------------------------
  ngOnInit() {

  }
  // ------------------------------------------------------
  public Validate(forSubmit: boolean, isFocusToField: boolean): boolean {

    if (!forSubmit) return true;
    // --------------------------------------
    let result: boolean = true;
    let doc = this.repo.currentDocument;

    // const isProductionRequest = ((doc.LogicOfDocument.requestType == RequestDocumentType.Production) || (doc.LogicOfDocument.requestType == RequestDocumentType.ProductionWithOwner));
    const stockProduction = doc.Locations.filter((item: Location) => { return item.FOR_PRODUCTION; });
    const stockIn = doc.Locations.filter((item: Location) => { return item.FOR_KEEPING; });

    // if(isProductionRequest){
    //   result = (stockProduction.length>0) && (stockIn.length>0);
    // }else{
    //   result = (stockIn.length>0);
    // }

    if(this.ForProduction){
      result = (stockProduction.length>0);
    }else{
      result = (stockIn.length>0);
    }

    if(!result){
      this.app.setValidateControl(this.TableName, false);
      this.app.setValidateControl(this.ButtonName, false);

      if (isFocusToField) {
        this.app.scrollToElement(this.SectionName);
      }

    }
    // if (doc.Locations.length == 0) {

    //   result = false;

    //     this.app.setValidateControl(this.TableName, false);
    //     this.app.setValidateControl(this.ButtonName, false);


    //   if (isFocusToField) {
    //     this.app.scrollToElement(this.SectionName);
    //   }

    // }

    //---------------------------------------
    return result;
  }
  //-------------------------------------------
  // ----------------------------------------

  // ----------------------------------------
  @Input("ForProduction")
  public get ForProduction(): boolean {
    return this.for_production;
  }
  public set ForProduction(value: boolean) {
    this.for_production = value;
  }
  //-------------------------------------------
  public initAddNewLocationEditor(args: DialogResult) {
    this.locationEditor = args.sender;
  }
  //-------------------------------------------
  public get getLocations(): Array<Location> {

    if (this.for_production) {
      return this.repo.LocationForProduction;
    } else {
      return this.repo.LocationForStock;
    }

  }
  //-------------------------------------------
  public get SectionName(): string {
    if (this.for_production) {
      return "div-section-location_production";
    } else {
      return "div-section-location_stock";
    }
  }
  //-------------------------------------------
  public get TableName(): string {
    if (this.for_production) {
      return "tbLocation_Production";
    } else {
      return "tbLocation_Stock";
    }
  }
  //-------------------------------------------
  public get ButtonName(): string {
    if (this.for_production) {
      return "cmdNewLocation_Production";
    } else {
      return "cmdNewLocation_Stock";
    }
  }
  //-------------------------------------------
  public addNewLocation() {

    this.app.setValidateControl(this.ButtonName, true);
    this.app.setValidateControl(this.TableName, true);

    this.locationEditor.openForNew((is_ok) => {

      if (is_ok.data==true) {
        let newLocation: Location = this.locationEditor.addressToLocation(this.locationEditor.address);

        newLocation.FOR_PRODUCTION = this.for_production ? 1 : 0;
        newLocation.FOR_KEEPING = this.for_production ? 0 : 1;

        this.repo.currentDocument.Locations.push(newLocation);

      }
    });
  }
  //-------------------------------------------
  public editLocation(item: Location) {

    this.locationEditor.openForEdit(this.locationEditor.locationToAddress(item), (result: DialogResult) => {
      if (result.data == true) {
        let addr = this.locationEditor.addressToLocation(this.locationEditor.address);

        let index = this.repo.currentDocument.Locations.indexOf(item);

        if (index > -1) {
          this.repo.currentDocument.Locations[index] = addr;
        }

      }
    });

  }
  //-------------------------------------------
  public removeLocation(item: Location) {
    this.repo.currentDocument.Locations = this.repo.currentDocument.Locations.filter(loc => {
      return (loc !== item);
    });
  }
  //-------------------------------------------
  public get canAddLocation():boolean {
    return (this.getLocations.length == 0);
  }
  //-------------------------------------------
}
