import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TenantsService {

  readonly url = 'https://vruq5qaho6.execute-api.us-east-2.amazonaws.com/dev2/v2/tenants';

  public tenantsList;

  public list;

  public headers = ['Id', 'Name', 'Description', 'Additional Info'];

  constructor(private _http: HttpClient) {
    this.constructArrayOfTenants();
  }

  getTenants() {
    return this._http.get(this.url).subscribe(res => {
      this.tenantsList = res;
      console.log(res);
      return res;
    });
  }

  constructArrayOfTenants() {
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
      'name': 'Tenant' + ' ' + id,
      'description': 'Some discription',
      'additional_info': 'additional information about this tenant',
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
