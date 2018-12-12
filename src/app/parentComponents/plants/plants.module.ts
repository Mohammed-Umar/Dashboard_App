import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantsComponent } from './plants.component'
import { AddNewPlantComponent } from './add-new-plant/add-new-plant.component'
import { PlantsListComponent } from './plants-list/plants-list.component'
import { UpdatePlantComponent } from './update-plant/update-plant.component'

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
    AddNewPlantComponent,
    PlantsListComponent,
    UpdatePlantComponent,
    PlantsComponent
  ]
})
export class PlantsModule { }
