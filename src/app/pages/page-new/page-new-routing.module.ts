import { NgModule } from "@angular/core";
import { Routes, RouterModule, CanActivate } from "@angular/router";

// import { MainComponent } from './main.component';

import { NewComponent } from "./new/new.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

import { RequestDocumentType } from "../../shared/enums/request-type.enum";

//-----------------------------------------------------------------
// import { RenewComponent } from './renew/renew.component';
//-----------------------------------------------------------------
// import routeDef from '../../shared/data/route-definition';

//-----------------------------------------------------------------
const routes: Routes = [
  { path: "", component: DashboardComponent },

  {
    path: "enter",
    component: NewComponent,
    data: { reqType: RequestDocumentType.EnterWithOwner },
  },
  {
    path: "import",
    component: NewComponent,
    data: { reqType: RequestDocumentType.ImportWithOwner },
  },
  {
    path: "production",
    component: NewComponent,
    data: { reqType: RequestDocumentType.ProductionWithOwner },
  },
  {
    path: "owning",
    component: NewComponent,
    data: { reqType: RequestDocumentType.Owner },
  },
  {
    path: "substitute/:license_id",
    component: NewComponent,
    data: { reqType: RequestDocumentType.Substitute },
  },
  {
    path: "sendsample",
    component: NewComponent,
    data: { reqType: RequestDocumentType.SendSample },
  },
  {
    path: "export",
    component: NewComponent,
    data: { reqType: RequestDocumentType.Export },
  },
  {
    path: "export-special",
    component: NewComponent,
    data: { reqType: RequestDocumentType.ExportSpecial },
  },
  {
    path: "cross-border",
    component: NewComponent,
    data: { reqType: RequestDocumentType.CrossBorder },
  },
  {
    path: "artty",
    component: NewComponent,
    data: { reqType: RequestDocumentType.Artty },
  },
  {
    path: "destroy-armament",
    component: NewComponent,
    data: { reqType: RequestDocumentType.DestroyArmament },
  },
  //{ path: 'renewal', component: NewComponent, data: { reqType: RequestDocumentType.Renewal } },

  //{ path: 'renewal' + '/:type/:id', component: RenewComponent },   // navigate from ApplicationContext only
  //{ path: 'renewal' + '/request/:id', component: RenewComponent },   // navigate from ApplicationContext only
  {
    path: "renewal" + "/:type/:id",
    component: NewComponent,
    data: { reqType: RequestDocumentType.Renewal },
  },
  {
    path: "renewal" + "/request/:id",
    component: NewComponent,
    data: { reqType: RequestDocumentType.Renewal },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestNewRoutingModule {}
