import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TenantsService } from '../tenants.service';

@Component({
  selector: 'app-add-new-tenant',
  templateUrl: './add-new-tenant.component.html',
  styleUrls: ['./add-new-tenant.component.scss']
})
export class AddNewTenantComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  newTenant: any = {};

  constructor(private service: TenantsService) { }

  ngOnInit() {
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public addTenant(obj) {
    this.service.createTenant(obj);
  }

  onSubmit() {
    this.addTenant(this.newTenant);
    this.moveTo('list');
  }

}
