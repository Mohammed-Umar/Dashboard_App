
import { Component, OnInit } from '@angular/core';
import { MachinesService } from './machines.service';

import { TenantsService } from '../tenants/tenants.service';
import { PlantsService } from '../plants/plants.service';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {

  public activeScreen = 'list';

  public machineToUpdate: any = {};

  public machineDetails;

  public tenanteNamesList;

  public plantsMiniList;

  public currentSelectedList;


  constructor(private _service: MachinesService, private _tenantService: TenantsService, private _plantsService: PlantsService) { }

  ngOnInit() {
    this.getTenantNames();
    this.getPlantNames();
  }

  getTenantNames() {
    this._tenantService.getNames();
    this._tenantService.getTenantNames.subscribe(names => {
      this.tenanteNamesList = names;
      console.log(names);
    })
  }

  getPlantNames() {
    this._plantsService.getNames();
    this._plantsService.getPlantNames.subscribe(names => {
      this.plantsMiniList = names;
      console.log(names);
    })
  }

  public changeScreen(screen) {
    this.activeScreen = screen;
    console.log(screen);
  }

  public changeScreenFromList(obj) {
    console.log(obj);
    this.currentSelectedList = obj.userListSelection;
    this.activeScreen = obj.screen;
    console.log(obj.screen);
  }

  public toUpdate(tenant) {
    this.machineToUpdate = tenant;
    console.log(tenant);
  }

  public showDetails(data) {
    console.log(data);
    this.machineDetails = data;
  }

}
