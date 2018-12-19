import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SharedService } from '../../shared.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class TenantsService {

  readonly url = 'https://vruq5qaho6.execute-api.us-east-2.amazonaws.com/dev2/v2/tenants';

  // public tenantsList;

  public list;

  public tenantUrl = 'tenants'

  public headers = ['Id', 'Name', 'Description'];

  public headersList: BehaviorSubject<Array<any>> = new BehaviorSubject([]);

  public headersObservable = this.headersList.asObservable();

  public tenantsSubject: BehaviorSubject<Array<any>> = new BehaviorSubject([]);

  public tenantsList = this.tenantsSubject.asObservable();

  public fetchTenantNames: BehaviorSubject<any> = new BehaviorSubject([])

  public getTenantNames = this.fetchTenantNames.asObservable();

  constructor(private _http: HttpClient, private sharedService: SharedService) {
    // this.constructArrayOfTenants();
  }

  public getTenants() {
    const responce = this.sharedService.getList(this.tenantUrl).subscribe(res => {
      console.log(res);
      this.list = res;
      this.tenantsSubject.next(res);
      // const listHeaders = res;
      return res;
    })
  }

  public createTenant(data) {
    const inputData = this._generateCreateData(data);
    this.sharedService.createItem(this.tenantUrl, data).subscribe(res => {
      console.log(res);
      this.getTenants();
    })
  }

  public updateTenant(id, data) {
    // const inputData = generateUpdateData(data);
    this.sharedService.updateItem(this.tenantUrl, id, data).subscribe(res => {
      console.log(res);
      this.getTenants();
    })
  }

  public getTenantByID(id) {
    this.sharedService.getItemByID(this.tenantUrl, id).subscribe(res => {
      console.log(res);
    })
  }

  public delete(id) {
    this.sharedService.deleteItem(this.tenantUrl, id).subscribe(res => {
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
      'additional_info': {}
    }
  }

  public update(tenant) {
    const updateItem = this.list.find(obj => obj.id === tenant.id);
    const index = this.list.indexOf(updateItem);
    this.updateTenant(tenant.id, tenant);
    // this.list[index] = tenant;
  }

  public getIds() {
    return this.list.map(obj => obj.id);
  }

  public getNames() {
    this.getTenants();
    this.tenantsList.subscribe(list => {
      console.log(list);
      const reduce = list.reduce((finalList, obj) => {
        // console.log(obj)
        const id = obj.id;
        const name = obj.name;
        finalList.push({id, name});
        return finalList;
      } , [])
      console.log('REDUCE', reduce);
      const namesList = list.map(obj => obj.name);
      console.log(namesList);
      this.fetchTenantNames.next(reduce);
      return reduce;
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
}
