import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageInitComponent } from './pages/page-init/page-init.component';
// import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PathNotFoundComponent } from './pages/path-not-found/path-not-found.component';
// import { SearchComponent } from './pages/search/search.component';

import { LicenseComponent } from './pages/page-license/page-license.component';
import { DocStatusComponent } from './pages/doc-status/doc-status.component';

// import { UnauthorizePageComponent } from './pages/unauthorize-page/unauthorize-page.component';

import { DocumentStatus } from './shared/enums/document-status.enum';

//import routeDef from './shared/data/route-definition';
//import {  PageDraftModule} from './pages/page-draft/page-draft.module';

const routes: Routes = [

  { path: 'initial', component: PageInitComponent },

  // { path: 'new', loadChildren: './pages/page-new/page-new.module#PageNewModule' },
  // { path: 'draft', loadChildren: './pages/page-draft/page-draft.module#PageDraftModule' },
  { path: 'new', loadChildren: ()=> import('./pages/page-new/page-new.module').then(m=>m.PageNewModule) },
  { path: 'draft', loadChildren: ()=> import('./pages/page-draft/page-draft.module').then(m=>m.PageDraftModule) },

  { path: 'submit', component: DocStatusComponent, data: { status: DocumentStatus.Submited } },
  { path: 'receive', component: DocStatusComponent, data: { status: DocumentStatus.Accepted } },
  { path: 'reject', component: DocStatusComponent, data: { status: DocumentStatus.RejectToTrader } },
  { path: 'pending', component: DocStatusComponent, data: { status: DocumentStatus.Inform } },
  { path: 'approve', component: DocStatusComponent, data: { status: DocumentStatus.Approved } },
  { path: 'refuse', component: DocStatusComponent, data: { status: DocumentStatus.Refuse } },

  //{ path: 'history', component: DocStatusComponent },
  //{ path: routeDef.pageSearch, component: SearchComponent },
  //{ path: 'bin', component: RecycleBinComponent },

  { path: 'license/renew', component: LicenseComponent },
  { path: 'license/substitue', component: LicenseComponent },
  { path: 'license', component: LicenseComponent },


  //// disable pageDashboard
  { path: '', redirectTo: 'new', pathMatch: 'prefix' },
  // { path: '', redirectTo: '/new', pathMatch: 'full' },


  { path: '**', component: PathNotFoundComponent }


];

//console.log('in routing : ', routes);

// ---------------------------------------------------------

// ---------------------------------------------------------
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
