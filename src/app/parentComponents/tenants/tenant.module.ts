import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantsComponent } from './tenant.component'
import { AddNewTenantComponent } from './add-new-tenant/add-new-tenant.component'
import { TenantsListComponent } from './tenants-list/tenants-list.component'
import { UpdateTenantComponent } from './update-tenant/update-tenant.component'

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
  ],
  declarations: [
    AddNewTenantComponent,
    TenantsListComponent,
    UpdateTenantComponent,
    TenantsComponent
  ]
})
export class TenantModule { }
