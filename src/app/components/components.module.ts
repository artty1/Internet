import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModuleHeaderComponent } from './module-header/module-header.component';
import { DocumentCommandBarComponent } from './document-command-bar/document-command-bar.component';
import { DatagridComponent } from './datagrid/datagrid.component';
import { DropdownFilterComponent } from './dropdown-filter/dropdown-filter.component';
import { DatagridPaginationComponent } from './datagrid-pagination/datagrid-pagination.component';
import { DgComponent } from './dg/dg.component';
import { LoadingComponent } from './loading/loading.component';
import { XlsFileReaderComponent } from './xls-file-reader/xls-file-reader.component';

import { MessageDialog } from './message-dialog/message-dialog.component';
import { ConfirmDialog } from './confirm-dialog/confirm-dialog.component';
import { WaitingDialog } from './waiting-dialog/waiting-dialog.component';
import { ErrorDialog } from './error-dialog/error-dialog.component';

import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { FloatingScrollToComponent } from './floating-scroll-to/floating-scroll-to.component';


@NgModule({
  declarations: [
    ModuleHeaderComponent, DocumentCommandBarComponent, DatagridComponent, DropdownFilterComponent, DatagridPaginationComponent, DgComponent, LoadingComponent,
    XlsFileReaderComponent,
    MessageDialog, ConfirmDialog, WaitingDialog, ErrorDialog,
    FileUploaderComponent, ImageDialogComponent, FloatingScrollToComponent
  ],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [
    ModuleHeaderComponent, DocumentCommandBarComponent, DatagridComponent, DropdownFilterComponent, DatagridPaginationComponent, DgComponent, LoadingComponent,
    XlsFileReaderComponent,
    MessageDialog, ConfirmDialog, WaitingDialog, ErrorDialog,
    FileUploaderComponent, ImageDialogComponent, FloatingScrollToComponent
  ],
})
export class ComponentsModule { }
