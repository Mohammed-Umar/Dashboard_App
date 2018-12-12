import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tendents',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => AdminLayoutModule
  }]}
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
