import { Component, OnInit } from '@angular/core';
import { DevicesService } from './devices.service';
import { TenantsService } from '../tenants/tenants.service';
import { PlantsService } from '../plants/plants.service';
import { MachinesService } from '../machines/machines.service';
import { EquipmentsService } from '../equipments/equipments.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  public activeScreen = 'list';

  public deviceToUpdate;

  public deviceDetails;

  public tenantsNamesList;

  public plantsMiniList;

  public machinesMiniList;

  public equipmentsMiniList;

  public currentSelectedList;

  constructor(
    private service: DevicesService,
    private _tenantService: TenantsService,
    private _plantsService: PlantsService,
    private _machineService: MachinesService,
    private _equipmentService: EquipmentsService) { }

  ngOnInit() {
    this.getTenantNames();
    this.getPlantNames();
    this.getMachineNames();
    this.getEquipmentNames();
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

  getEquipmentNames() {
    this._equipmentService.getNames();
    this._equipmentService.getEquipmentNames.subscribe(names => {
      this.equipmentsMiniList = names;
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
    this.deviceToUpdate = tenant;
    console.log(tenant);
  }

  public showDetails(data) {
    console.log(data);
    this.deviceDetails = data;
  }

}
