import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TenantsService } from '../tenants.service';

@Component({
  selector: 'app-tenants-list',
  templateUrl: './tenants-list.component.html',
  styleUrls: ['./tenants-list.component.scss']
})
export class TenantsListComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();
  @Output() needToUpdate = new EventEmitter<any>();

  tenants = this.service.list;

  public headers = this.service.headers;

  constructor(private service: TenantsService) { }

  ngOnInit() {
    this.service.getTenants();
    // const x = this.service.tenantsList.subscribe(res => res);
    // console.log(x);
    // console.log(this.service.tenantsList);
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public update(screen, data) {
    this.needToUpdate.emit(data);
    this.moveTo(screen);
  }


  /**
   * Id
   * Name
   * Description
   * app_object_id
   * additional_info
   */

}
