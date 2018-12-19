import { Injectable, OnInit } from '@angular/core';
import { TenantsService } from '../tenants/tenants.service';
import { PlantsService } from '../plants/plants.service';
import { SharedService } from '../../shared.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class MachinesService {


  public list;

  public machinesUrl = 'machines'

  public headers = ['Id', 'Name', 'Description' ];

  public machinesSubject: BehaviorSubject<Array<any>> = new BehaviorSubject([]);

  public machinesList = this.machinesSubject.asObservable();

  public fetchMachineNames: BehaviorSubject<any> = new BehaviorSubject([])

  public getMachineNames = this.fetchMachineNames.asObservable();

  constructor(private tenantService: TenantsService, private plantService: PlantsService, private _sharedService:SharedService) {
    // this.constructArrayOfMachines();
  }

  public getTenants() {
    const responce = this._sharedService.getList(this.machinesUrl).subscribe(res => {
      console.log(res);
      this.list = res;
      this.machinesSubject.next(res);
      // const listHeaders = res;
      return res;
    })
  }

  public createTenant(data, tenantDetails, plantDetails) {
    data.tenant_id = tenantDetails.id;
    data.plant_id = plantDetails.id;
    const inputData = this._generateCreateData(data);
    this._sharedService.createItem(this.machinesUrl, inputData).subscribe(res => {
      console.log(res);
      this.getTenants();
    })
  }

  public updateTenant(id, data) {
    // const inputData = generateUpdateData(data);
    this._sharedService.updateItem(this.machinesUrl, id, data).subscribe(res => {
      console.log(res);
      this.getTenants();
    })
  }

  public getTenantByID(id) {
    this._sharedService.getItemByID(this.machinesUrl, id).subscribe(res => {
      console.log(res);
    })
  }

  public delete(id) {
    this._sharedService.deleteItem(this.machinesUrl, id).subscribe(res => {
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
      'machine_type': data.machine_type
    }
  }

  public update(machine, tenant, plant) {
    // let tenant;
    // this._tenantService.getTenants();
    // this._tenantService.tenantsList.subscribe(list => {
    //   tenant = list.filter(obj => obj.name === tenantName);
    //   plant.tenant_id = tenant.id;
    //   this.updateTenant(plant.id, plant);
    // })
    machine.tenant_id = tenant.id;
    machine.plant_id = plant.id;
    this.updateTenant(machine.id, machine);
  }

  public getNames() {
    this.getTenants();
    this.machinesList.subscribe(list => {
      console.log(list);
      const reduce = list.reduce((finalList, obj) => {
        console.log(obj)
        const id = obj.id;
        const name = obj.name;
        const tenantID = obj.tenant_id;
        const plantID = obj.plant_id;
        finalList.push({id, name, tenantID, plantID});
        return finalList;
      } , [])
      console.log('REDUCE', reduce);
      const namesList = list.map(obj => obj.name);
      console.log(namesList);
      this.fetchMachineNames.next(reduce);
      return reduce;
    });
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

  constructArrayOfMachines() {
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
      'name': 'Machine' + ' ' + id,
      'description': 'Some discription',
      'additional_info': 'additional information about this machine',
      'app_object_id': '232',
      'tenant_id': this._getRandomNum(1, 10),
      'plant_id': this._getRandomNum(1, 10)
    }
  }
}
