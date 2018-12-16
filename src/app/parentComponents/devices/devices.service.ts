import { Injectable, OnInit } from '@angular/core';
import { TenantsService } from '../tenants/tenants.service';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  public list;

  public headers = ['Id', 'Name', 'Description', 'Additional Info', 'Tenant ID', 'Plant ID', 'Machine ID', 'Equipment ID'];

  constructor(private tenantService: TenantsService) {
    this.constructArrayOfDevices();
   }

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

  public update(tenant) {
    const updateItem = this.list.find(obj => obj.id === tenant.id);
    const index = this.list.indexOf(updateItem);
    this.list[index] = tenant;
  }
}
