import { Injectable, OnInit } from '@angular/core';
import { TenantsService } from '../tenants/tenants.service';
import { SharedService } from 'app/shared.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  public list;

  public headers = ['Id', 'Name', 'Description' ];

  readonly devicesUrl = 'devices';

  readonly devicePoolUrl = 'devicepool';

  readonly mappedDevicesUrl = 'mappeddevices';

  private _guidType = 'device';

  public devicesSubject: BehaviorSubject<Array<any>> = new BehaviorSubject([]);

  public devicesList = this.devicesSubject.asObservable();

  public guidSubject = new BehaviorSubject([]);

  public guidObject = this.guidSubject.asObservable();

  constructor(private tenantService: TenantsService, private _sharedService: SharedService) {
    this.constructArrayOfDevices();
   }

   public getTenants() {
    const responce = this._sharedService.getList(this.devicesUrl).subscribe(res => {
      console.log(res);
      this.list = res;
      this.devicesSubject.next(res);
      // const listHeaders = res;
      return res;
    })
  }

  public getDevicePool() {
    this._sharedService.getList(this.devicePoolUrl).subscribe( res => {
      console.log(res);
      this.list = res;
      this.devicesSubject.next(res);
      return res;
    }, (error) => {
      console.error('Found error', error);
    })
  }

  public getMappedDevices() {
    this._sharedService.getList(this.mappedDevicesUrl).subscribe( res => {
      console.log(res);
      this.list = res;
      this.devicesSubject.next(res);
      return res;
    })
  }

  public createTenant(data, tenantDetails, plantDetails, machineDetails, equipmentDetails) {
    data.tenant_id = tenantDetails.id;
    data.plant_id = plantDetails.id;
    data.machine_id = machineDetails.id;
    data.equipment_id = equipmentDetails.id;
    const inputData = this._generateCreateData(data);
    this._sharedService.createItem(this.devicesUrl, inputData).subscribe(res => {
      console.log(res);
      this.getTenants();
    })
  }

  public updateTenant(id, data) {
    // const inputData = generateUpdateData(data);
    this._sharedService.updateItem(this.devicesUrl, id, data).subscribe(res => {
      console.log(res);
      this.getTenants();
    })
  }

  public getTenantByID(id) {
    this._sharedService.getItemByID(this.devicesUrl, id).subscribe(res => {
      console.log(res);
    })
  }

  public getGuid(id) {
    this._sharedService.getGuid(id, this._guidType).subscribe(obj => {
      this.guidSubject.next(obj);
      return obj;
    })
  }

  public delete(id) {
    this._sharedService.deleteItem(this.devicesUrl, id).subscribe(res => {
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
      'device_type': null,
      'equipment_id': data.equipment_id
    }
  }

  public update(device, tenant, plant, machine, equipment) {
    // let tenant;
    // this._tenantService.getTenants();
    // this._tenantService.tenantsList.subscribe(list => {
    //   tenant = list.filter(obj => obj.name === tenantName);
    //   plant.tenant_id = tenant.id;
    //   this.updateTenant(plant.id, plant);
    // })
    device.tenant_id = tenant.id;
    device.plant_id = plant.id;
    device.machine_id = machine.id;
    device.equipment_id = equipment.id;
    this.updateTenant(device.id, device);
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

  constructArrayOfDevices() {
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
      'name': 'Device' + ' ' + id,
      'description': 'Some discription',
      'additional_info': 'additional information about this Device',
      'app_object_id': '232',
      'tenant_id': this._getRandomNum(1, 10),
      'plant_id': this._getRandomNum(1, 10),
      'machine_id': this._getRandomNum(1, 10),
      'equipment_id': this._getRandomNum(1, 10)
    }
  }
}
