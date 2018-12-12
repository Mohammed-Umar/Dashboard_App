import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent } from './users.component'
import { AddNewUserComponent } from './add-new-user/add-new-user.component'
import { UsersListComponent } from './users-list/users-list.component'
import { UpdateUserComponent } from './update-user/update-user.component'

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
    AddNewUserComponent,
    UsersListComponent,
    UpdateUserComponent,
    UsersComponent
  ]
})
export class UsersModule { }
