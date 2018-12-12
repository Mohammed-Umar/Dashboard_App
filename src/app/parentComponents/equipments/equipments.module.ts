import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentsComponent } from './equipments.component'
import { AddNewComponent } from './addnew/addnew.component'
import { ListComponent } from './list/list.component'
import { UpdateComponent } from './update/update.component'

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
    EquipmentsComponent,
    AddNewComponent,
    ListComponent,
    UpdateComponent
  ]
})
export class EquipmentsModule { }
