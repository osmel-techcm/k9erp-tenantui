import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Globals } from './config/globals';
import { ConfigService } from './services/config.service';
import { MainViewComponent } from './modules/main-view/main-view.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { NotfoundComponent } from './modules/notfound/notfound.component';
import { LoginComponent } from './modules/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTreeModule } from '@angular/material/tree';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginDialogComponent } from './modules/login/login-dialog/login-dialog.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UnauthorizedInterceptorService } from './services/unauthorized-interceptor.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MenuListItemComponent } from './modules/main-view/menu-list-item/menu-list-item.component';
import { UsersComponent } from './modules/users/users/users.component';
import { UsersDetailsComponent } from './modules/users/users-details/users-details.component';
import { ListSearchComponent } from './modules/list-search/list-search.component';
import { UserGroupsComponent } from './modules/userGroups/user-groups/user-groups.component';
import { UserGroupsDetailsComponent } from './modules/userGroups/user-groups-details/user-groups-details.component';
import { ClassesComponent } from './modules/classes/classes/classes.component';
import { ClassesDetailsComponent } from './modules/classes/classes-details/classes-details.component';
import { UnitsComponent } from './modules/units/units/units.component';
import { UnitsDetailsComponent } from './modules/units/units-details/units-details.component';
import { ItemsComponent } from './modules/items/items/items.component';
import { ItemsDetailsComponent } from './modules/items/items-details/items-details.component';
import { VendorsComponent } from './modules/entity/vendors/vendors/vendors.component';
import { VendorsDetailsComponent } from './modules/entity/vendors/vendors-details/vendors-details.component';
import { AttachmentsComponent } from './modules/attachments/attachments.component';
import { CustomersComponent } from './modules/entity/customers/customers/customers.component';
import { CustomersDetailsComponent } from './modules/entity/customers/customers-details/customers-details.component';
import { PersonnelsComponent } from './modules/entity/personnels/personnels/personnels.component';
import { PersonnelsDetailsComponent } from './modules/entity/personnels/personnels-details/personnels-details.component';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { IPublicClientApplication, PublicClientApplication, BrowserCacheLocation } from '@azure/msal-browser';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { OAuthSettings } from '../oauth';
import { ReportsComponent } from './modules/reports/reports/reports.component';
import { ReportsDetailsComponent } from './modules/reports/reports-details/reports-details.component';
import { MatSortModule } from '@angular/material/sort';

let msalInstance: IPublicClientApplication | undefined = undefined;

export function MSALInstanceFactory(): IPublicClientApplication {
  msalInstance = msalInstance ?? new PublicClientApplication({
    auth: {
      clientId: OAuthSettings.appId,
      redirectUri: OAuthSettings.redirectUri,
      postLogoutRedirectUri: OAuthSettings.redirectUri
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    }
  });

  return msalInstance;
}

const checkMasterServerStatus = (config: ConfigService) => {
  return () => {
    return config.checkMasterServerStatus()
  }
}

const checkServerStatus = (config: ConfigService) => {
  return () => {
    return config.checkServerStatus()
  }
}

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    DashboardComponent,
    NotfoundComponent,
    LoginComponent,
    LoginDialogComponent,
    MenuListItemComponent,
    UsersComponent,
    UsersDetailsComponent,
    ListSearchComponent,
    UserGroupsComponent,
    UserGroupsDetailsComponent,
    ClassesComponent,
    ClassesDetailsComponent,
    UnitsComponent,
    UnitsDetailsComponent,
    ItemsComponent,
    ItemsDetailsComponent,
    VendorsComponent,
    VendorsDetailsComponent,
    AttachmentsComponent,
    CustomersComponent,
    CustomersDetailsComponent,
    PersonnelsComponent,
    PersonnelsDetailsComponent,
    ReportsComponent,
    ReportsDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTabsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSnackBarModule,
    FlexLayoutModule,
    SweetAlert2Module.forRoot(),
    MatNativeDateModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    MsalModule,
    MatTreeModule,
    MatSortModule
  ],
  providers: [
    Globals,
    {
      provide: APP_INITIALIZER,
      useFactory: checkMasterServerStatus,
      multi: true,
      deps: [ConfigService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: checkServerStatus,
      multi: true,
      deps: [ConfigService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptorService,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
