
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule, routes  } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AngularWebStorageModule } from 'angular-web-storage';
import { CurrencyPipe } from "@angular/common";
import { SuperLayoutComponent } from './pages/superadmin/layout/Superlayout.component';
import { SuperHeaderComponent } from './pages/superadmin/layout/header/superheader.component';
import { SuperFooterComponent } from './pages/superadmin/layout/footer/superfooter.component';
import { SuperSidebarComponent } from './pages/superadmin/layout/sidebar/supersidebar.component';
import { SuperauthComponent } from './pages/superadmin/superauth/superauth.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SuperLayoutComponent,
    SuperHeaderComponent,
    SuperFooterComponent,
    SuperSidebarComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AuthComponent,
    SuperauthComponent


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule.forRoot(),
    RouterModule.forRoot(routes),
    AngularWebStorageModule,
  ],
  exports: [RouterModule],
  providers: [ReactiveFormsModule, FormsModule,CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
