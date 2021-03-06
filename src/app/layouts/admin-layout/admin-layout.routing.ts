import { Routes } from '@angular/router';

import { TenantsComponent } from '../../parentComponents/tenant/tenant.component';
import { UsersComponent } from '../../parentComponents/users/users.component';
import { PlantsComponent } from '../../parentComponents/plants/plants.component';
import { MachinesComponent } from '../../parentComponents/machines/machines.component';
import { EquipmentsComponent } from '../../parentComponents/equipments/equipments.component';
import { DevicesComponent } from '../../parentComponents/devices/devices.component';
import { NotificationsComponent } from '../../parentComponents/notifications/notifications.component';
import { ListComponent } from '../../childComponents/list/list.component';
import { AddNewComponent } from '../../childComponents/addnew/addnew.component';
import { UpdateComponent } from '../../childComponents/update/update.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: TenantsComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UsersComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: EquipmentsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: MachinesComponent
    //     }]
    // }
    { path: 'tendents',      component: TenantsComponent, children: [
        { path: 'list', component: ListComponent},
        { path: 'new', component: AddNewComponent},
        { path: 'update', component: UpdateComponent}
    ]},
    { path: 'users',   component: UsersComponent },
    { path: 'plants',     component: PlantsComponent },
    { path: 'machines',     component: MachinesComponent },
    { path: 'equipments',          component: EquipmentsComponent },
    { path: 'devices',           component: DevicesComponent },
    { path: 'notifications',  component: NotificationsComponent },
    // { path: 'check', component: PlantsComponent, children: [
    //     { path: 'list', component: ListComponent},
    //     { path: 'new', component: AddNewComponent},
    //     { path: 'update', component: UpdateComponent}
    // ]},
];
