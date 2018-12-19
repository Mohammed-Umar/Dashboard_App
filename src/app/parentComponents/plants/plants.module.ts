import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { PlantsComponent } from './plants.component'
import { AddNewPlantComponent } from './add-new-plant/add-new-plant.component'
import { PlantsListComponent } from './plants-list/plants-list.component'
import { UpdatePlantComponent } from './update-plant/update-plant.component';
import { DetailsComponent } from './details/details.component';
import { PlantsService } from './plants.service';

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
    BsDropdownModule.forRoot(),
  ],
  declarations: [
    AddNewPlantComponent,
    PlantsListComponent,
    UpdatePlantComponent,
    PlantsComponent,
    DetailsComponent
  ],
  providers: [PlantsService]
})
export class PlantsModule { }
