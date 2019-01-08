import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';

import { TenantsComponent } from './parentComponents/tenants/tenant.component';
import { PlantsComponent } from './parentComponents/plants/plants.component';
import { MachinesComponent } from './parentComponents/machines/machines.component';
import { EquipmentsComponent } from './parentComponents/equipments/equipments.component';
import { DevicesComponent } from './parentComponents/devices/devices.component';
import { UsersComponent } from './parentComponents/users/users.component';
import { NotificationsComponent } from './parentComponents/notifications/notifications.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '',
    redirectTo: 'tenants',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }],
  }
  // {
  //   path: '',
  //   redirectTo: 'tenants',
  //   pathMatch: 'full',
  // },
  // { path: '', component: AdminLayoutComponent, children: [
  //   { path: 'tenants', component: TenantsComponent},
  //   { path: 'plants',     component: PlantsComponent },
  //   { path: 'machines',     component: MachinesComponent },
  //   { path: 'equipments',          component: EquipmentsComponent },
  //   { path: 'devices',           component: DevicesComponent },
  //   { path: 'users',   component: UsersComponent },
  //   { path: 'notifications',  component: NotificationsComponent },
  // ]}
    // { path: 'dashboard',      component: TenantsComponent },
    // { path: 'user-profile',   component: UsersComponent },
    // { path: 'table-list',     component: PlantsComponent },
    // { path: 'typography',     component: MachinesComponent },
    // { path: 'icons',          component: EquipmentsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: '',               redirectTo: 'dashboard', pathMatch: 'full' }
];


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
