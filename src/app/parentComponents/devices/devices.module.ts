import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DevicesComponent } from './devices.component';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { AddNewDeviceComponent } from './add-new-device/add-new-device.component';
import { UpdateDeviceComponent } from './update-device/update-device.component';
import { DetailsComponent } from './details/details.component';
import { DevicesService } from './devices.service';

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
    DevicesComponent,
    DevicesListComponent,
    AddNewDeviceComponent,
    UpdateDeviceComponent,
    DetailsComponent
  ],
  providers: [DevicesService]
})
export class DevicesModule { }
