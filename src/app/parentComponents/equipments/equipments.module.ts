import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EquipmentsComponent } from './equipments.component'
import { AddNewEquipmentComponent } from './add-new-equipment/add-new-equipment.component'
import { EquipmentsListComponent } from './equipments-list/equipments-list.component'
import { UpdateEquipmentComponent } from './update-equipment/update-equipment.component';
import { EquipmentsService } from './equipments.service';

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
    EquipmentsComponent,
    AddNewEquipmentComponent,
    EquipmentsListComponent,
    UpdateEquipmentComponent
  ],
  providers: [EquipmentsService]
})
export class EquipmentsModule { }
