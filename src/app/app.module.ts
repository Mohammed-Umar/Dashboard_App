import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { DevicesModule } from './parentComponents/devices/devices.module';
import { EquipmentsModule } from './parentComponents/equipments/equipments.module';
import { MachinesModule } from './parentComponents/machines/machines.module';
import { NotificationsModule } from './parentComponents/notifications/notifications.module';
import { PlantsModule } from './parentComponents/plants/plants.module';
import { TenantModule } from './parentComponents/tenant/tenant.module';
import { UsersModule } from './parentComponents/users/users.module';



import { AppComponent } from './app.component';

import { TenantsComponent } from './parentComponents/tenant/tenant.component';
import { UsersComponent } from './parentComponents/users/users.component';
import { PlantsComponent } from './parentComponents/plants/plants.component';
import { MachinesComponent } from './parentComponents/machines/machines.component';
import { EquipmentsComponent } from './parentComponents/equipments/equipments.component';
import { NotificationsComponent } from './parentComponents/notifications/notifications.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    DevicesModule,
    EquipmentsModule,
    MachinesModule,
    NotificationsModule,
    PlantsModule,
    TenantModule,
    UsersModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
