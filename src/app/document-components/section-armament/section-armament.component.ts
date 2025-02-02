import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationContext } from '../../application-context';
import { RequestDocumentService } from '../../shared/services/request-document.service';
import { LookupService } from '../../shared/services/lookup.service';
import { BaseSection } from './../../shared/base/base-section';
import { RequestDocument, Armament, ReferenceDocument } from '../../shared/models/request-document';
import { ProductGroup, Product, Unit } from '../../shared/models/lookup';
import { ProductGroupService } from '../../shared/services/lookup/product-group.service';
import { ProductService } from '../../shared/services/lookup/product.service';
import { UnitService } from '../../shared/services/lookup/unit.service';
import { PopupSearchProduct } from '../popup-search-product/popup-search-product.component';
import { EventResult } from '../../shared/models/result';
import { DialogResult } from '../../shared/base/base-modal-dialog';
import { PopupSearchTariff } from '../popup-search-tariff/popup-search-tariff.component';

@Component({
  selector: 'cdss-section-armament',
  templateUrl: './section-armament.component.html',
  styleUrls: ['./section-armament.component.css']
})
export class SectionArmamentComponent extends BaseSection implements OnInit {

  public Document: RequestDocument;
  public Arm: Armament;
  public RefDocument: ReferenceDocument;

  @ViewChild("searchProduct", { static: true }) popupProduct: PopupSearchProduct;
  @ViewChild("searchProductGroup", { static: true }) private popupProductGroup: PopupSearchProduct;
  //private popupTariff: PopupSearchTariff;


  //public CurrentProductGroupID: number = 0;

  constructor(public app: ApplicationContext, public repo: RequestDocumentService, protected pg: ProductGroupService, protected p: ProductService, protected unitRepo:UnitService) {
    super(app, repo);

    this.title = 'รายการยุทธภัณฑ์';

    this.Document = this.repo.currentDocument;
    this.Arm = this.repo.currentDocument.Armament;
    this.RefDocument = this.repo.currentDocument.ReferenceDocument;

    if (!this.pg.hasData) this.pg.refresh();
    if (!this.unitRepo.hasData) this.unitRepo.refresh();



    //console.log(this.repo.currentDocument);
  }
  //------------------------------------------------
  ngOnInit() {
  }
  // ------------------------------------------------------
  public Validate(forSubmit: boolean, isFocusToField: boolean): boolean {

    let doc = this.repo.currentDocument;
    let result: boolean = true;
    let scrollToEL: string = '';


    // console.log(doc);
    // -------- set default  ------------------
    //console.log('QUANTITY : ', doc.Armament.QUANTITY);
    if (doc.Armament.QUANTITY == null) doc.Armament.QUANTITY = 0;
    if (doc.Armament.WEIGHT == null) doc.Armament.WEIGHT = 0;
    if (doc.Armament.PACKAGE == null) doc.Armament.PACKAGE = 0;

    // ----------------------------------------
    if (doc.Armament.PRODUCT_CODE == null || doc.Armament.PRODUCT_CODE.trim().length == 0) {
      result = false;
      this.app.setValidateControl('txtAmamentName', false);
      scrollToEL = 'txtAmamentName';
    }
    //----------------------------------------
    if (forSubmit) {

      // console.log('for submit: ', doc);

      if (doc.Armament.PRODUCT_BRAND_NAME == null || doc.Armament.PRODUCT_BRAND_NAME.trim().length == 0) {
        result = false;
        this.app.setValidateControl('txtAmamentBrand', false);
        scrollToEL = (scrollToEL.length > 0 ? scrollToEL : 'txtAmamentBrand');
      }
      if (doc.Armament.OBJECTIVE == null || doc.Armament.OBJECTIVE.trim().length == 0) {
        result = false;
        this.app.setValidateControl('txtAmamentObject', false);
        scrollToEL = (scrollToEL.length > 0 ? scrollToEL : 'txtAmamentObject');
      }
      if (doc.Armament.QUANTITY_UNIT_ID == null || doc.Armament.QUANTITY_UNIT_ID < 1) {
        result = false;
        this.app.setValidateControl('txtAmamentQTYName', false);
        scrollToEL = (scrollToEL.length > 0 ? scrollToEL : 'txtAmamentQTYName');
      }

      if (doc.Armament.QUANTITY == null || doc.Armament.QUANTITY < 1) {
        // console.log('doc.Armament.QUANTITY : ', doc.Armament.QUANTITY);
        result = false;
        this.app.setValidateControl('txtAmamentQTY', false);
        scrollToEL = (scrollToEL.length > 0 ? scrollToEL : 'txtAmamentQTY');
      }
      if (doc.Armament.WEIGHT != null && doc.Armament.WEIGHT > 0) {
        if (doc.Armament.WEIGHT_UNIT_ID < 1) {
          result = false;
          this.app.setValidateControl('txtAmamentWeightName', false);
          scrollToEL = (scrollToEL.length > 0 ? scrollToEL : 'txtAmamentWeightName');
        }
      }
      if (doc.Armament.PACKAGE != null && doc.Armament.PACKAGE > 0) {
        if (doc.Armament.PACKAGE_UNIT_ID < 1) {
          result = false;
          this.app.setValidateControl('txtAmamentPackageName', false);
          scrollToEL = (scrollToEL.length > 0 ? scrollToEL : 'txtAmamentPackageName');
        }
      }

    }
    // -------------------------------------------------------------
    scrollToEL = 'div-section-armament';    // scroll to section header
    if (!result && isFocusToField) this.app.scrollToElement(scrollToEL);

    // -------------------------------------------------------------
    //console.log('result of armament : ', result);
    return result;

  }
  // ------------------------------------------------------
  // ----------------------------------------

  // ----------------------------------------
  // public initPopup(args: DialogResult) {
  //   if (args.sender.tag == "product") {
  //     this.popupProduct = args.sender;
  //   } else if (args.sender.tag == "product-group") {
  //     this.popupProductGroup = args.sender;
  //   }
  //   //else if (args.sender.tag == "tariff") {
  //   //  this.popupTariff = args.sender;
  //   //}
  // }
  // ------------------------------------------------------
  // private setProductToArmament(product: Product) {
  //   this.clearValidate('txtAmamentName');
  //   this.clearValidate('txtAmamentQTYName');
  //   this.clearValidate('txtAmamentBrand');

  //   this.repo.setProductToArmament(product);
  // }
  // ------------------------------------------------------
  // private setProductToArmament(product: Product) {

  //   if (product == null) {
  //     this.repo.currentDocument.Armament.TARIFF_CODE = "";
  //     this.repo.currentDocument.Armament.STATISTICAL_CODE = "";
  //     this.repo.currentDocument.Armament.PRODUCT_CODE = "";
  //     this.repo.currentDocument.Armament.QUANTITY_UNIT_ID = 0;
  //     this.repo.currentDocument.Armament.WEIGHT_UNIT_ID = 0;
  //     this.repo.currentDocument.Armament.PRODUCT_NAME = "";
  //     this.repo.currentDocument.Armament.PRODUCT_BRAND_NAME = "";

  //   } else {

  //     if (product.TariffCode != null && product.TariffCode.trim().length > 0) this.repo.currentDocument.Armament.TARIFF_CODE = product.TariffCode;
  //     if (product.StatisticCode != null && product.StatisticCode.trim().length > 0) this.repo.currentDocument.Armament.STATISTICAL_CODE = product.StatisticCode;

  //     this.repo.currentDocument.Armament.PRODUCT_CODE = product.Code;
  //     this.repo.currentDocument.Armament.QUANTITY_UNIT_ID = product.QuantityUnitID;
  //     this.repo.currentDocument.Armament.WEIGHT_UNIT_ID = product.WeightUnitID;

  //     this.repo.currentDocument.Armament.PRODUCT_NAME = product.Name;

  //     if (this.repo.currentDocument.Armament.PRODUCT_BRAND_NAME == null || this.repo.currentDocument.Armament.PRODUCT_BRAND_NAME.trim().length == 0) {
  //       this.repo.currentDocument.Armament.PRODUCT_BRAND_NAME = "NO BRAND";
  //       this.clearValidate('txtAmamentBrand');
  //       }

  //   }

  //   this.clearValidate('txtAmamentName');
  //   this.clearValidate('txtAmamentQTYName');
  // }
  // ------------------------------------------------------
  public changeArmament() {
    let product = this.p.getProductDetail(this.Arm.PRODUCT_CODE);

    this.clearValidate('txtAmamentName');
    this.clearValidate('txtAmamentQTYName');
    this.clearValidate('txtAmamentBrand');

    // this.setProductToArmament(product);

    this.repo.SetProductToArmament(product);

  }
// ------------------------------------------------------
  //public clearInvalid(controlID) {
  //  this.app.setValidateControl(controlID, true);
  //  //console.log('Armament : ', this.Arm.QUANTITY);
  //  //console.log('Repo QUANTITY : ', this.repo.currentDocument.Armament.QUANTITY);
  //}
  // ------------------------------------------------------
  public get UnitLookup(): Array<Unit> {
    return this.unitRepo.ListUnit;
  }
  //------------------------------------------------
  public get WeightLookup(): Array<Unit> {
    return this.unitRepo.ListWeight;
  }
  //------------------------------------------------
  public get ProductGroups(): Array<ProductGroup> {
    // return this.pg.datasource;
    return this.repo.ProductGroups;
  }
  //------------------------------------------------
  public get ProductList(): Array<Product> {
    // return this.p.datasource;

    // console.log("ProductGroupID : ", this.repo.currentDocument.Armament.ProductGroupID);

    let pgid = this.repo.currentDocument.Armament.ProductGroupID;

    if(pgid==null || pgid == 0){
      return this.repo.Products;
    }else{
      return this.repo.Products.filter((item: Product)=>{
        return (item.GroupID == pgid);
      });
    }


  }
  //------------------------------------------------
  public get IsProductGroupReady(): boolean {
    return !this.pg.isLoading;
  }
  //------------------------------------------------
  public get IsProductReady(): boolean {
    return !this.p.isLoading;
  }
  //------------------------------------------------
  public refreshProductGroup() {
    this.pg.refresh();
  }
  //------------------------------------------------
  public refreshProduct() {
    this.p.refresh();
  }
  //------------------------------------------------
  public loadProductByGroup() {
    let pGroup = this.pg.getProductGroupDetail(this.repo.currentDocument.Armament.ProductGroupID);

    if (pGroup != null) {
      this.repo.currentDocument.Armament.TARIFF_CODE = pGroup.TariffCode;
      this.repo.currentDocument.Armament.STATISTICAL_CODE = pGroup.StatisticalCode;

      this.p.CurrentGroupID = this.repo.currentDocument.Armament.ProductGroupID;

      this.repo.currentDocument.Armament.PRODUCT_CODE = "";

    }else{

    }



  }
  // ------------------------------------------------------
  public showSearchProduct() {
    this.popupProduct.openDialog();
  }
  // ------------------------------------------------------
  public showSearchProductGroup() {
    this.popupProductGroup.openDialog();
  }
  // ------------------------------------------------------
  //public showSearchTariff() {
  //  this.popupTariff.openDialog();
  //}
  //------------------------------------------------
  public clearCode(clearCode: string = '') {
    if (clearCode == 'P') {
      this.repo.currentDocument.Armament.PRODUCT_CODE = '';
    } else if (clearCode == 'G') {
      this.repo.currentDocument.Armament.ProductGroupID = 0;
    }
  }
  //------------------------------------------------
  public getSearchResult(arg:DialogResult) {

    if (arg.sender.tag == "product-group") {
      this.repo.currentDocument.Armament.ProductGroupID = arg.data;
      this.loadProductByGroup();
    } else if (arg.sender.tag == "product") {

      //console.log(arg.data);

      let product: Product = arg.data;

      this.repo.currentDocument.Armament.ProductGroupID = product.GroupID;
      this.loadProductByGroup();
      this.repo.currentDocument.Armament.PRODUCT_CODE = product.Code;
      this.changeArmament();

      //this.repo.currentDocument.Armament.ProductGroupID = arg.data;

    } else if (arg.sender.tag == "tariff") {

    }

  }
  public packDataToInt(){
    // console.log('PACKAGE : ', this.Arm.PACKAGE);
    this.Arm.PACKAGE = parseInt(this.Arm.PACKAGE.toString());
  }

}
