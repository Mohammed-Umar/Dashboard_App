import { Injectable, OnInit } from '@angular/core';
import { TenantsService } from '../tenants/tenants.service';

@Injectable({
  providedIn: 'root'
})
export class PlantsService {

  plants = [
    {
      'id': '1',
      'name': 'Plant 1',
      'description': 'Some discription',
      'additional_info': 'additional information about this plant',
      'app_object_id': '232',
      'tenant_id': '2'
    },
  ];

  public list;

  plant = {
    'id': '1',
    'name': 'Plant 1',
    'description': 'Some discription',
    'additional_info': 'additional information about this plant',
    'app_object_id': '232',
    'tenant_id': '2'
  }

  constructor(private tenantService: TenantsService) {
    this.constructArrayOfPlants();
   }

  constructArrayOfPlants() {
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
      'name': 'Plant' + ' ' + id,
      'description': 'Some discription',
      'additional_info': 'additional information about this plant',
      'app_object_id': '232',
      'tenant_id': id
    }
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
