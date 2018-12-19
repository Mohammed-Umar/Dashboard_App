import { Injectable, OnInit } from '@angular/core';
import { TenantsService } from '../tenants/tenants.service';
import { SharedService } from '../../shared.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class PlantsService {

  public list;

  public plantsUrl = 'plants'

  public headers = ['Id', 'Name', 'Description' ];

  public tenantsNames;

  public plantsSubject: BehaviorSubject<Array<any>> = new BehaviorSubject([]);

  public plantsList = this.plantsSubject.asObservable();

  public fetchPlantNames: BehaviorSubject<any> = new BehaviorSubject([])

  public getPlantNames = this.fetchPlantNames.asObservable();

  constructor(private _tenantService: TenantsService, private sharedService: SharedService) {
    // this.constructArrayOfPlants();
   }

   public getTenants() {
    const responce = this.sharedService.getList(this.plantsUrl).subscribe(res => {
      console.log(res);
      this.list = res;
      this.plantsSubject.next(res);
      // const listHeaders = res;
      return res;
    })
  }

  public createTenant(data, tenantDetails) {
    data.tenant_id = tenantDetails.id;
    const inputData = this._generateCreateData(data);
    this.sharedService.createItem(this.plantsUrl, inputData).subscribe(res => {
      console.log(res);
      this.getTenants();
    })
  }

  public updateTenant(id, data) {
    // const inputData = generateUpdateData(data);
    this.sharedService.updateItem(this.plantsUrl, id, data).subscribe(res => {
      console.log(res);
      this.getTenants();
    })
  }

  public getTenantByID(id) {
    this.sharedService.getItemByID(this.plantsUrl, id).subscribe(res => {
      console.log(res);
    })
  }

  public delete(id) {
    this.sharedService.deleteItem(this.plantsUrl, id).subscribe(res => {
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
      'additional_info': {}
    }
  }

  public update(plant, tenant) {
    // let tenant;
    // this._tenantService.getTenants();
    // this._tenantService.tenantsList.subscribe(list => {
    //   tenant = list.filter(obj => obj.name === tenantName);
    //   plant.tenant_id = tenant.id;
    //   this.updateTenant(plant.id, plant);
    // })
    plant.tenant_id = tenant.id;
    this.updateTenant(plant.id, plant);
  }

  public getNames() {
    this.getTenants();
    this.plantsList.subscribe(list => {
      console.log(list);
      const reduce = list.reduce((finalList, obj) => {
        console.log(obj)
        const id = obj.id;
        const name = obj.name;
        const tenantID = obj.tenant_id;
        finalList.push({id, name, tenantID});
        return finalList;
      } , [])
      console.log('REDUCE', reduce);
      const namesList = list.map(obj => obj.name);
      console.log(namesList);
      this.fetchPlantNames.next(reduce);
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
    return this._tenantService.getIds();
  }

  public getTenantNames() {
    this._tenantService.getNames();
    this._tenantService.getTenantNames.subscribe(names => this.tenantsNames = names);
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
      'tenant_id': this._getRandomNum(1, 10)
    }
  }
}
