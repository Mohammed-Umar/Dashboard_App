import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AdminLayoutRoutes } from './admin-layout.routing';
// import { TenantsComponent } from '../../parentComponents/tenant/tenant.component';
// import { UsersComponent } from '../../parentComponents/users/users.component';
// import { PlantsComponent } from '../../parentComponents/plants/plants.component';
// import { MachinesComponent } from '../../parentComponents/machines/machines.component';
// import { EquipmentsComponent } from '../../parentComponents/equipments/equipments.component';
// import { DevicesComponent } from '../../parentComponents/devices/devices.component';
// import { NotificationsComponent } from '../../parentComponents/notifications/notifications.component';
import { ListComponent } from '../../childComponents/list/list.component';
import { AddNewComponent } from '../../childComponents/addnew/addnew.component';
import { UpdateComponent } from '../../childComponents/update/update.component';

// import { DevicesModule } from '../../parentComponents/devices/devices.module';
// import { EquipmentsModule } from '../../parentComponents/equipments/equipments.module';
// import { MachinesModule } from '../../parentComponents/machines/machines.module';
// import { NotificationsModule } from '../../parentComponents/notifications/notifications.module';
// import { PlantsModule } from '../../parentComponents/plants/plants.module';
// import { TenantModule } from '../../parentComponents/tenants/tenant.module';
// import { UsersModule } from '../../parentComponents/users/users.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { ComponentsModule } from '../../components/components.module';

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
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ComponentsModule,
  ],
  declarations: [
    AdminLayoutComponent,
    ListComponent,
    AddNewComponent,
    UpdateComponent,
  ]
})

export class AdminLayoutModule {}
