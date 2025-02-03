import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PipesModule } from './../shared/pipes/pipes.module';
import { ComponentsModule } from './../components/components.module';
import { DirectiveModule } from './../shared/directives/directive.module';

import { RequestDocumentComponent } from './request-document/request-document.component';

import { SectionHeaderComponent } from './section-header/section-header.component';
import { SectionPaymentTypeComponent } from './section-payment-type/section-payment-type.component';
import { SectionTraderProfileComponent } from './section-trader-profile/section-trader-profile.component';
import { SectionCommitteeComponent } from './section-committee/section-committee.component';
import { SectionAttorneyComponent } from './section-attorney/section-attorney.component';
//import { SectionDocumentReferenceComponent } from './section-document-reference/section-document-reference.component';
import { SectionArmamentComponent } from './section-armament/section-armament.component';
import { SectionStockLocationComponent } from './section-stock-location/section-stock-location.component';
import { SectionDomesticOrderingComponent } from './section-domestic-ordering/section-domestic-ordering.component';
import { SectionAppendixComponent } from './section-appendix/section-appendix.component';
import { SectionNoteComponent } from './section-note/section-note.component';
import { SectionCrossBorderComponent } from './section-cross-border/section-cross-border.component';
import { SectionMonthlyInventoryComponent } from './section-monthly-inventory/section-monthly-inventory.component';
import { SectionPermissionProductionComponent } from './section-permission-production/section-permission-production.component';
import { SectionSourceOfEnterComponent } from './section-source-of-enter/section-source-of-enter.component';
import { SectionAdjustQtyComponent } from './section-adjust-qty/section-adjust-qty.component';
import { SectionAppendixConcessionComponent } from './section-appendix-concession/section-appendix-concession.component';
import { SectionProductionDetailComponent } from './section-production-detail/section-production-detail.component';
import { SectionReasonOfSubstituteComponent } from './section-reason-of-substitute/section-reason-of-substitute.component';
import { SectionDetailOfExportComponent } from './section-detail-of-export/section-detail-of-export.component';
import { SectionTraderCommentComponent } from './section-trader-comment/section-trader-comment.component';

import { SectionFileInclude } from './section-file-include/section-file-include.component';
import { SectionPrintInclude } from './section-print-include/section-print-include.component';
//import { EditorLocationDialog } from './editor-location-dialog/editor-location-dialog.component';
import { PopupListLocation } from './popup-list-location/popup-list-location.component';
import { PopupEditorLocation } from './popup-editor-location/popup-editor-location.component';
import { PopupEditorAppendixConcession } from './popup-editor-appendix-concession/popup-editor-appendix-concession.component';
import { PopupEditorAppendix } from './popup-editor-appendix/popup-editor-appendix.component';


import { PopupSearchProductGroup } from './popup-search-product-group/popup-search-product-group.component';
import { PopupSearchProduct } from './popup-search-product/popup-search-product.component';
import { PopupSearchTariff } from './popup-search-tariff/popup-search-tariff.component';
import { PopupUploadExcel } from './popup-upload-excel/popup-upload-excel.component';
import { DialogRenewAllDoc } from './dialog-renew-all-doc/dialog-renew-all-doc.component';
import { PopupSearchRefLicense } from './popup-search-ref-license/popup-search-ref-license.component';
import { PopupListExcelAppendix } from './popup-list-excel-appendix/popup-list-excel-appendix.component';
import { PopupListExcelAppendixConsession } from './popup-list-excel-appendix-consession/popup-list-excel-appendix-consession.component';

import { PopupFileUploadComponent } from './popup-file-upload/popup-file-upload.component';
import { SectionDocumentReferenceComponent } from './section-document-reference/section-document-reference.component';
import { PopupTraderDocument } from './popup-trader-document/popup-trader-document.component';
import { SectionTraderDepartmentComponent } from './section-trader-department/section-trader-department.component';
import { SectionArmamentInformationComponent } from './section-armament-information/section-armament-information.component';
import { SectionUseComponent } from './section-use/section-use.component';
import { SectionCoordinatorComponent } from './section-coordinator/section-coordinator.component';



// import { SectionDetailOfEnterComponent } from './section-detail-of-enter/section-detail-of-enter.component';   >> Remove !!!


@NgModule({
  declarations: [
    RequestDocumentComponent, SectionHeaderComponent, SectionPaymentTypeComponent, SectionTraderProfileComponent, SectionCommitteeComponent, SectionAttorneyComponent, SectionArmamentComponent, SectionStockLocationComponent, SectionDomesticOrderingComponent, SectionAppendixComponent, SectionNoteComponent, SectionCrossBorderComponent, SectionMonthlyInventoryComponent, SectionPermissionProductionComponent, SectionSourceOfEnterComponent, SectionAdjustQtyComponent, SectionAppendixConcessionComponent, SectionProductionDetailComponent, SectionReasonOfSubstituteComponent, SectionDetailOfExportComponent
    , PopupListLocation, PopupEditorLocation, PopupEditorAppendixConcession, PopupEditorAppendix, SectionTraderCommentComponent, PopupSearchProductGroup, PopupSearchProduct, PopupSearchTariff, PopupUploadExcel, DialogRenewAllDoc, PopupSearchRefLicense, PopupListExcelAppendix, PopupListExcelAppendixConsession, SectionFileInclude, PopupFileUploadComponent, SectionPrintInclude, SectionDocumentReferenceComponent, PopupTraderDocument, SectionTraderDepartmentComponent, SectionArmamentInformationComponent, SectionUseComponent, SectionCoordinatorComponent
  ],
  imports: [
    CommonModule, FormsModule, ComponentsModule, PipesModule, DirectiveModule
  ],
  exports: [
    RequestDocumentComponent, SectionHeaderComponent, SectionPaymentTypeComponent, SectionTraderProfileComponent, SectionCommitteeComponent, SectionAttorneyComponent, SectionArmamentComponent, SectionStockLocationComponent, SectionDomesticOrderingComponent, SectionAppendixComponent, SectionNoteComponent, SectionCrossBorderComponent, SectionMonthlyInventoryComponent, SectionPermissionProductionComponent, SectionSourceOfEnterComponent, SectionAdjustQtyComponent, SectionAppendixConcessionComponent, SectionProductionDetailComponent, SectionReasonOfSubstituteComponent, SectionDetailOfExportComponent
    , PopupListLocation, PopupEditorLocation, PopupEditorAppendixConcession, PopupEditorAppendix, SectionTraderCommentComponent, PopupSearchProductGroup, PopupSearchProduct, PopupSearchTariff, PopupUploadExcel, DialogRenewAllDoc, PopupSearchRefLicense, PopupListExcelAppendix, PopupListExcelAppendixConsession, SectionFileInclude, PopupFileUploadComponent, SectionPrintInclude, SectionDocumentReferenceComponent, PopupTraderDocument
    ]
})

export class DocumentComponentsModule { }
