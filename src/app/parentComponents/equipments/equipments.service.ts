import { Injectable, OnInit } from '@angular/core';
import { TenantsService } from '../tenants/tenants.service';
import { PlantsService } from '../plants/plants.service';
import { MachinesService } from '../machines/machines.service';

import { SharedService } from '../../shared.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {

  public list;

  public headers = ['Id', 'Name', 'Description' ];

  public equipmentsUrl = 'equipments'

  public equipmentsSubject: BehaviorSubject<Array<any>> = new BehaviorSubject([]);

  public equipmentsList = this.equipmentsSubject.asObservable();

  constructor(
    private tenantService: TenantsService,
    private plantService: PlantsService,
    private machineService: MachinesService,
    private _sharedService: SharedService) {
    // this.constructArrayOfEquipments();
  }

  public getTenants() {
    const responce = this._sharedService.getList(this.equipmentsUrl).subscribe(res => {
      console.log(res);
      this.list = res;
      this.equipmentsSubject.next(res);
      // const listHeaders = res;
      return res;
    })
  }

  public createTenant(data, tenantDetails, plantDetails, machineDetails) {
    data.tenant_id = tenantDetails.id;
    data.plant_id = plantDetails.id;
    data.machine_id = machineDetails.id;
    const inputData = this._generateCreateData(data);
    this._sharedService.createItem(this.equipmentsUrl, inputData).subscribe(res => {
      console.log(res);
      this.getTenants();
    })
  }

  public updateTenant(id, data) {
    // const inputData = generateUpdateData(data);
    this._sharedService.updateItem(this.equipmentsUrl, id, data).subscribe(res => {
      console.log(res);
      this.getTenants();
    })
  }

  public getTenantByID(id) {
    this._sharedService.getItemByID(this.equipmentsUrl, id).subscribe(res => {
      console.log(res);
    })
  }

  public delete(id) {
    this._sharedService.deleteItem(this.equipmentsUrl, id).subscribe(res => {
      console.log(res);
      this.getTenants();
    })
  }

  private _generateCreateData(data) {
    // TODO make the add new page fields mandatory
    // Make this json dynamic.
    return {
      'name': data.name,
      'description': data.description,
      'created_on': '2018-12-12T13:53:47.000Z',
      'created_by': 'uday',
      'modified_on': '2018-12-12T13:53:47.000Z',
      'modified_by': 'uday',
      'app_object_id': 't1',
      'tenant_id': data.tenant_id,
      'additional_info': {},
      'delete_flag': false,
      'plant_id': data.plant_id,
      'machine_id': data.machine_id,
      'equipment_type': null,
      'is_critical': data.is_critical
    }
  }

  public update(equipment, tenant, plant, machine) {
    // let tenant;
    // this._tenantService.getTenants();
    // this._tenantService.tenantsList.subscribe(list => {
    //   tenant = list.filter(obj => obj.name === tenantName);
    //   plant.tenant_id = tenant.id;
    //   this.updateTenant(plant.id, plant);
    // })
    equipment.tenant_id = tenant.id;
    equipment.plant_id = plant.id;
    equipment.machine_id = machine.id;
    this.updateTenant(equipment.id, equipment);
  }

  private _getRandomNum(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  public getIds() {
    return this.list.map(obj => obj.id);
  }

  public getTenantIds() {
    return this.tenantService.getIds();
  }

  public getPlantIds() {
    return this.plantService.getIds();
  }

  public getMachineIds() {
    return this.machineService.getIds();
  }

  public addNew(tenant) {
    const length = this.list.length;
    tenant.id = length + 1;
    this.list.push(tenant);
  }

  // public update(tenant) {
  //   const updateItem = this.list.find(obj => obj.id === tenant.id);
  //   const index = this.list.indexOf(updateItem);
  //   this.list[index] = tenant;
  // }

  constructArrayOfEquipments() {
    const array = [];
    for (let i = 0; i < 10; i++) {
      array[i] = this.constructObject(i + 1);
    }
    this.list = array;
    console.log(this.list);
  }

  constructObject(id) {
    return {
      'id': id,
      'name': 'Equipment' + ' ' + id,
      'description': 'Some discription',
      'additional_info': 'additional information about this Equipment',
      'app_object_id': '232',
      'tenant_id': this._getRandomNum(1, 10),
      'plant_id': this._getRandomNum(1, 10),
      'machine_id': this._getRandomNum(1, 10)
    }
  }
}
