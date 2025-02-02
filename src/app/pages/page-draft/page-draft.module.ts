import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PipesModule } from './../../shared/pipes/pipes.module';

import { ComponentsModule } from './../../components/components.module';
import { DocumentComponentsModule } from './../../document-components/document-components.module';

import { PageDraftRoutingModule } from './page-draft-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


import { EditorComponent } from './editor/editor.component';


@NgModule({
  declarations: [
    DashboardComponent, EditorComponent
  ],
  imports: [
    CommonModule, ComponentsModule, DocumentComponentsModule, PipesModule,
    PageDraftRoutingModule
  ]
})
export class PageDraftModule { }
