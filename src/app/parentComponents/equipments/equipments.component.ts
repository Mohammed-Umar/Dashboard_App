import { Component, OnInit } from '@angular/core';
import { EquipmentsService } from './equipments.service';
import { TenantsService } from '../tenants/tenants.service';
import { PlantsService } from '../plants/plants.service';
import { MachinesService } from '../machines/machines.service';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit {

  public activeScreen = 'list';

  public equipmentToUpdate;

  public equipmentDetails;

  public tenantsNamesList;

  public plantsMiniList;

  public machinesMiniList;

  public currentSelectedList;

  constructor(
    private _service: EquipmentsService,
    private _tenantService: TenantsService,
    private _plantsService: PlantsService,
    private _machineService: MachinesService) { }

  ngOnInit() {
    this.getTenantNames();
    this.getPlantNames();
    this.getMachineNames();
  }

  getTenantNames() {
    this._tenantService.getNames();
    this._tenantService.getTenantNames.subscribe(names => {
      this.tenantsNamesList = names;
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

  getMachineNames() {
    this._machineService.getNames();
    this._machineService.getMachineNames.subscribe(names => {
      this.machinesMiniList = names;
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
    this.equipmentToUpdate = tenant;
    console.log(tenant);
  }

  public showDetails(data) {
    console.log(data);
    this.equipmentDetails = data;
  }

}
