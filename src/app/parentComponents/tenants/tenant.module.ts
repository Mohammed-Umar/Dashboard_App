import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { DetailsComponent } from './details/details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  declarations: [
    AddNewTenantComponent,
    TenantsListComponent,
    UpdateTenantComponent,
    TenantsComponent,
    DetailsComponent
  ],
  providers: [TenantsService]
})
export class TenantModule { }
