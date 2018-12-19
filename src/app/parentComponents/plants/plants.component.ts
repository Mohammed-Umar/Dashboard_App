import { Component, OnInit } from '@angular/core';
import { PlantsService } from './plants.service';

import { TenantsService } from '../tenants/tenants.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {

  public activeScreen = 'list';

  public plantToUpdate;

  public plantDetails;

  public tenanteNamesList;

  constructor(private service: PlantsService, private _tenantService: TenantsService) { }

  ngOnInit() {
    this.getTenantNames();
  }

  getTenantNames() {
    this._tenantService.getNames();
    this._tenantService.getTenantNames.subscribe(names => {
      this.tenanteNamesList = names;
      console.log(names);
    })
  }

  public changeScreen(screen) {
    this.activeScreen = screen;
    console.log(screen);
  }

  public toUpdate(tenant) {
    this.plantToUpdate = tenant;
    console.log(tenant);
  }

  public showDetails(plant) {
    console.log(plant);
    this.plantDetails = plant;
  }

}
