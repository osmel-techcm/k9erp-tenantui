import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ClassesDetailsComponent } from './modules/classes/classes-details/classes-details.component';
import { ClassesComponent } from './modules/classes/classes/classes.component';
import { CustomersDetailsComponent } from './modules/entity/customers/customers-details/customers-details.component';
import { CustomersComponent } from './modules/entity/customers/customers/customers.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ItemsDetailsComponent } from './modules/items/items-details/items-details.component';
import { ItemsComponent } from './modules/items/items/items.component';
import { LoginComponent } from './modules/login/login.component';
import { MainViewComponent } from './modules/main-view/main-view.component';
import { NotfoundComponent } from './modules/notfound/notfound.component';
import { UnitsDetailsComponent } from './modules/units/units-details/units-details.component';
import { UnitsComponent } from './modules/units/units/units.component';
import { UserGroupsDetailsComponent } from './modules/userGroups/user-groups-details/user-groups-details.component';
import { UserGroupsComponent } from './modules/userGroups/user-groups/user-groups.component';
import { UsersDetailsComponent } from './modules/users/users-details/users-details.component';
import { UsersComponent } from './modules/users/users/users.component';
import { VendorsDetailsComponent } from './modules/entity/vendors/vendors-details/vendors-details.component';
import { VendorsComponent } from './modules/entity/vendors/vendors/vendors.component';
import { ReportsDetailsComponent } from './modules/reports/reports-details/reports-details.component';
import { ReportsComponent } from './modules/reports/reports/reports.component';


const routes: Routes = [
  {
    path: "mainview",
    component: MainViewComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", pathMatch: "full", redirectTo: "dashboard" },
      { path: "dashboard", component: DashboardComponent },
      { path: "users/:id", component: UsersDetailsComponent },
      { path: "users", component: UsersComponent },
      { path: "usergroups/:id", component: UserGroupsDetailsComponent },
      { path: "usergroups", component: UserGroupsComponent },
      { path: "classes/:id", component: ClassesDetailsComponent},
      { path: "classes", component: ClassesComponent },
      { path: "units/:id", component: UnitsDetailsComponent},
      { path: "units", component: UnitsComponent },
      { path: "items/:id", component: ItemsDetailsComponent},
      { path: "items", component: ItemsComponent },
      { path: "vendors/:id", component: VendorsDetailsComponent},
      { path: "vendors", component: VendorsComponent },
      { path: "customers/:id", component: CustomersDetailsComponent},
      { path: "customers", component: CustomersComponent },
      { path: "reports/:id", component: ReportsDetailsComponent},
      { path: "reports", component: ReportsComponent }
    ]
  },  
  { path: "notfound", component: NotfoundComponent },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/mainview/dashboard", pathMatch: "full" },
  { path: "**", redirectTo: "/mainview/dashboard", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
