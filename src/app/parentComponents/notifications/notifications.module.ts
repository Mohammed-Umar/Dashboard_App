import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsComponent } from './notifications.component'
import { AddNewNotificationComponent } from './add-new-notification/add-new-notification.component'
import { NotificationsListComponent } from './notifications-list/notifications-list.component'
import { UpdateNotificationComponent } from './update-notification/update-notification.component'

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
    AddNewNotificationComponent,
    NotificationsListComponent,
    UpdateNotificationComponent,
    NotificationsComponent
  ]
})
export class NotificationsModule { }
