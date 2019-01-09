import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../authorization.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin/tenants', title: 'Tenants',  icon: 'dashboard', class: '' },
    { path: '/admin/plants', title: 'Plants',  icon: 'content_paste', class: '' },
    { path: '/admin/machines', title: 'Machines',  icon: 'library_books', class: '' },
    { path: '/admin/equipments', title: 'Equipments',  icon: 'bubble_chart', class: '' },
    { path: '/admin/devices', title: 'Devices',  icon: 'bubble_chart', class: '' },
    { path: '/admin/users', title: 'Users',  icon: 'person', class: '' },
    { path: '/admin/notifications', title: 'Notifications',  icon: 'notifications', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private _auth: AuthorizationService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  logout() {
    this._auth.logOut();
}
}
