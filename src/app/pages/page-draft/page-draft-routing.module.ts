import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
//import { NewComponent as DraftComponent  } from './../req-new/new/new.component';
import { EditorComponent } from './editor/editor.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: ':id', component: EditorComponent }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageDraftRoutingModule { }
