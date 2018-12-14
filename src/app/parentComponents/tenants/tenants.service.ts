import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TenantsService {

  public list;

  public headers = ['Id', 'Name', 'Description', 'Additional Info'];

  constructor() {
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
      'app_object_id': '232'
    }
  }

  public getIds() {
    return this.list.map(obj => obj.id);
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
