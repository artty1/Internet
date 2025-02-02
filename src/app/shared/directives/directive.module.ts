import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlyNumberDirective } from './only-number.directive';
import { OnlyNumberWithCommaDirective } from './only-number-with-comma.directive';
import { FileUploadDirective } from './file-upload.directive';
import { InputModelDirective } from './input-model-directive.directive';


@NgModule({
  declarations: [
    OnlyNumberDirective, OnlyNumberWithCommaDirective, FileUploadDirective, InputModelDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OnlyNumberDirective, OnlyNumberWithCommaDirective, FileUploadDirective, InputModelDirective
  ]
})



export class DirectiveModule { }
