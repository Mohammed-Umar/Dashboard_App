import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TenantsService {

  tenants = [
    { 'id': '1', 'name': 'Abc Pvt. Ltd', 'description': 'Some discription', 'additional_info': 'additional information about this tenant'},
    { 'id': '2', 'name': 'Bcd Pvt. Ltd', 'description': 'Some discription', 'additional_info': 'additional information about this tenant'},
    { 'id': '3', 'name': 'Efg Pvt. Ltd', 'description': 'Some discription', 'additional_info': 'additional information about this tenant'},
    { 'id': '4', 'name': 'Gfe Pvt. Ltd', 'description': 'Some discription', 'additional_info': 'additional information about this tenant'},
    { 'id': '5', 'name': 'Cdd Pvt. Ltd', 'description': 'Some discription', 'additional_info': 'additional information about this tenant'},
    { 'id': '6', 'name': 'Bdd Pvt. Ltd', 'description': 'Some discription', 'additional_info': 'additional information about this tenant'},
    { 'id': '7', 'name': 'Acc Pvt. Ltd', 'description': 'Some discription', 'additional_info': 'additional information about this tenant'},
  ];

  constructor() { }

  public getIds() {
    return this.tenants.map(obj => obj.id);
  }

  public addNew(tenant) {
    const length = this.tenants.length;
    tenant.id = length + 1;
    this.tenants.push(tenant);
  }

  public update(tenant) {
    const updateItem = this.tenants.find(obj => obj.id === tenant.id);
    const index = this.tenants.indexOf(updateItem);
    this.tenants[index] = tenant;
  }
}
