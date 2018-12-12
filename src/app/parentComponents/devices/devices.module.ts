import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesComponent } from './devices.component';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { AddNewDeviceComponent } from './add-new-device/add-new-device.component';
import { UpdateDeviceComponent } from './update-device/update-device.component';

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
    DevicesComponent,
    DevicesListComponent,
    AddNewDeviceComponent,
    UpdateDeviceComponent
  ]
})
export class DevicesModule { }
