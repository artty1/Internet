import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestNewRoutingModule } from './page-new-routing.module';


import { ComponentsModule } from '../../components/components.module';
import { DocumentComponentsModule } from '../../document-components/document-components.module';


import { MainComponent } from './main.component';

import { NewComponent } from './new/new.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { PipesModule } from '../../shared/pipes/pipes.module';
//import { GuardsModule } from './../../shared/guards/guards.module';
import { RenewComponent } from './renew/renew.component';



//import { IsTraderExpiredGuard } from './../../shared/guards/is-trader-expired.guard';

@NgModule({
  declarations: [
    NewComponent, MainComponent, DashboardComponent, RenewComponent
  ],
  imports: [
    CommonModule, ComponentsModule, DocumentComponentsModule, PipesModule, 
    RequestNewRoutingModule
  ],
  bootstrap: [MainComponent],
  providers: [
    //GuardsModule
  ],
})
export class PageNewModule { }
