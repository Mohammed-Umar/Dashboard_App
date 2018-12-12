import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MachinesComponent } from './machines.component'
import { AddNewMachineComponent } from './add-new-machine/add-new-machine.component'
import { MachinesListComponent } from './machines-list/machines-list.component'
import { UpdateMachineComponent } from './update-machine/update-machine.component'

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
    MachinesComponent,
    AddNewMachineComponent,
    MachinesListComponent,
    UpdateMachineComponent
  ]
})
export class MachinesModule { }
