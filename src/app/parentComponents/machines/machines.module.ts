import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MachinesComponent } from './machines.component'
import { AddNewMachineComponent } from './add-new-machine/add-new-machine.component'
import { MachinesListComponent } from './machines-list/machines-list.component'
import { UpdateMachineComponent } from './update-machine/update-machine.component'
import { DetailsComponent } from './details/details.component';
import { MachinesService } from './machines.service';

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
    MachinesComponent,
    AddNewMachineComponent,
    MachinesListComponent,
    UpdateMachineComponent,
    DetailsComponent
  ],
  providers: [MachinesService]
})
export class MachinesModule { }
