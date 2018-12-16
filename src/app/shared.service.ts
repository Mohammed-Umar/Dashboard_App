import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  /**
   * This URL is same for both GET & POST
   * Just we have to add the items name in end like 'tenants' or 'plants'
   */
  readonly url = 'https://vruq5qaho6.execute-api.us-east-2.amazonaws.com/dev2/v2/';


  public list;

  public headers = ['Id', 'Name', 'Description', 'Additional Info'];

  constructor(private _http: HttpClient) {}

  getList(item: string) {
    return this._http.get(this.url + item).map(res => {
      this.list = res;
      console.log('Responce from Shared Service', res);
      return res;
    });
  }

  createItem(item: string, data) {
    return this._http.post(this.url + item, data).map(res => {
      console.log('Create responce message:', res['status']);
      if (res['status'] === 'success') {
        return true;
      }
      return false;
    })
  }

  updateItem(item: string, id,  data) {
    return this._http.put(this.url + item + '/' + id, data).map (res => {
      console.log('Update Item Responce message:', res['status']);
      if (res['status'] === 'success') {
        return true;
      }
      return false;
    })
  }

  deleteItem(item: string, id) {
    return this._http.delete(this.url + item + '/' + id).map(res => {
      console.log('Delete Item Responce message:', res['status']);
      if (res['status'] === 'success') {
        return true;
      }
      return false;
    })
  }

}