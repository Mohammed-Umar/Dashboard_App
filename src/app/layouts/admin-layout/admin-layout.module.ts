import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { TenantsComponent } from '../../parentComponents/tenant/tenant.component';
import { UsersComponent } from '../../parentComponents/users/users.component';
import { PlantsComponent } from '../../parentComponents/plants/plants.component';
import { MachinesComponent } from '../../parentComponents/machines/machines.component';
import { EquipmentsComponent } from '../../parentComponents/equipments/equipments.component';
import { DevicesComponent } from '../../parentComponents/devices/devices.component';
import { NotificationsComponent } from '../../parentComponents/notifications/notifications.component';
import { ListComponent } from '../../childComponents/list/list.component';
import { AddNewComponent } from '../../childComponents/addnew/addnew.component';
import { UpdateComponent } from '../../childComponents/update/update.component';

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
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  declarations: [
    TenantsComponent,
    UsersComponent,
    PlantsComponent,
    MachinesComponent,
    EquipmentsComponent,
    DevicesComponent,
    NotificationsComponent,
    ListComponent,
    AddNewComponent,
    UpdateComponent,
  ]
})

export class AdminLayoutModule {}
