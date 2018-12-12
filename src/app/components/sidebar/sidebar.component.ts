import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/tendents/list', title: 'Tendents',  icon: 'dashboard', class: '' },
    { path: '/plants', title: 'Plants',  icon: 'content_paste', class: '' },
    { path: '/machines', title: 'Machines',  icon: 'library_books', class: '' },
    { path: '/equipments', title: 'Equipments',  icon: 'bubble_chart', class: '' },
    { path: '/devices', title: 'Devices',  icon: 'bubble_chart', class: '' },
    { path: '/users', title: 'Users',  icon: 'person', class: '' },
    // { path: '/check/list', title: 'Check',  icon: 'person', class: '' },
    // { path: '/maps', title: 'Maps',  icon: 'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon: 'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon: 'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
