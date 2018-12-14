import { Injectable, OnInit } from '@angular/core';
import { TenantsService } from '../tenants/tenants.service';
import { PlantsService } from '../plants/plants.service';
import { MachinesService } from '../machines/machines.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {

  public list;

  constructor(private tenantService: TenantsService, private plantService: PlantsService, private machineService: MachinesService) {
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
      'name': 'Equipment' + ' ' + id,
      'description': 'Some discription',
      'additional_info': 'additional information about this Equipment',
      'app_object_id': '232',
      'tenant_id': id,
      'plant_id': id,
      'machine_id': id
    }
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

  public update(tenant) {
    const updateItem = this.list.find(obj => obj.id === tenant.id);
    const index = this.list.indexOf(updateItem);
    this.list[index] = tenant;
  }
}
