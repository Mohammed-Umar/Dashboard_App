import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TenantsComponent } from './tenant.component'
import { AddNewTenantComponent } from './add-new-tenant/add-new-tenant.component'
import { TenantsListComponent } from './tenants-list/tenants-list.component'
import { UpdateTenantComponent } from './update-tenant/update-tenant.component'
import { TenantsService } from './tenants.service';

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
    FormsModule,
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
  ],
  providers: [TenantsService]
})
export class TenantModule { }
