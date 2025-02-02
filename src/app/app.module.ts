import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComponentsModule } from './components/components.module';
import { DocumentComponentsModule } from './document-components/document-components.module';
import { PipesModule } from './shared/pipes/pipes.module';
//import { GuardsModule } from './shared/guards/guards.module';
import { DirectiveModule } from './shared/directives/directive.module';

import { PathNotFoundComponent } from './pages/path-not-found/path-not-found.component';

//import { ReqDraftComponent } from './pages/req-draft/req-draft.component';
import { SearchComponent } from './pages/search/search.component';
import { RecycleBinComponent } from './pages/recycle-bin/recycle-bin.component';
import { LicenseComponent } from './pages/page-license/page-license.component';
import { DocStatusComponent } from './pages/doc-status/doc-status.component';

import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { UnauthorizePageComponent } from './pages/unauthorize-page/unauthorize-page.component';
import { PageInitComponent } from './pages/page-init/page-init.component';


@NgModule({
  declarations: [
    AppComponent,
    PathNotFoundComponent,

    SearchComponent, RecycleBinComponent,
    LicenseComponent, DocStatusComponent, PageDashboardComponent,
    UnauthorizePageComponent,
    PageInitComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, ComponentsModule, DocumentComponentsModule, PipesModule, DirectiveModule,
    AppRoutingModule
  ],
  providers: [
    // CookieService //, GuardsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
