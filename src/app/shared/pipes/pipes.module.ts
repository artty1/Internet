import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ToDateStringPipe, ToDateStringDashPipe } from './to-date-string.pipe'
// import { ToNameOfDocumentStatusPipe } from './to-name-of-document-status.pipe'
import { ToNameOfRequestStatusPipe } from './to-name-of-request-status.pipe'
//import { ToNameOfRequestTypePipe } from './to-name-of-request-type.pipe'

import { ToNameOfLicenseTypePipe } from './to-name-of-license-type.pipe';
import { ToNameOfLicenseStatusPipe } from './to-name-of-license-status.pipe';
import { ToChannelNamePipe } from './to-channel-name.pipe';
import { ToFullNamePipe } from './to-full-name.pipe';
import { ToFullAddressPipe } from './to-full-address.pipe';
import { ToNameOfRequestDocumentTypePipe } from './to-name-of-request-document-type.pipe';

import { ToMonthPeriodPipe } from './to-month-period.pipe';
import { ToQTYPipe, ToMoneyPipe, ToWeightPipe } from './data-format.pipe';
import { ToAgePipe } from './to-age.pipe';



@NgModule({
  declarations: [
    //ToDateStringPipe, ToNameOfDocumentStatusPipe, ToNameOfLicenseTypePipe, ToNameOfRequestStatusPipe, ToNameOfRequestTypePipe, ToNameOfLicenseStatusPipe, ToChannelNamePipe, ToFullNamePipe, ToFullAddressPipe, ToNameOfRequestDocumentTypePipe
    ToDateStringPipe, ToDateStringDashPipe,
    ToNameOfLicenseTypePipe, ToNameOfRequestStatusPipe, ToNameOfLicenseStatusPipe, ToChannelNamePipe, ToFullNamePipe, ToFullAddressPipe, ToNameOfRequestDocumentTypePipe, ToMonthPeriodPipe,
    ToQTYPipe, ToMoneyPipe, ToAgePipe, ToWeightPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToDateStringPipe, ToDateStringDashPipe,
    ToNameOfLicenseTypePipe, ToNameOfRequestStatusPipe, ToNameOfLicenseStatusPipe, ToChannelNamePipe, ToFullNamePipe, ToFullAddressPipe, ToNameOfRequestDocumentTypePipe, ToMonthPeriodPipe,
    ToQTYPipe, ToMoneyPipe, ToAgePipe, ToWeightPipe
  ]
})
export class PipesModule { }
