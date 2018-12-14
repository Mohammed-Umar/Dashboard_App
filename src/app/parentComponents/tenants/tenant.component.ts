import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})
export class TenantsComponent implements OnInit {

  public activeScreen = 'list';

  public tenantToUpdate;

  constructor() { }

  ngOnInit() {
  }

  public changeScreen(screen) {
    this.activeScreen = screen;
    console.log(screen);
  }

  public toUpdate(tenant) {
    this.tenantToUpdate = tenant;
    console.log(tenant);
  }

}
