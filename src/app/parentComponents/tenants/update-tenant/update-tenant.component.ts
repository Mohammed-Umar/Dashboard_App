import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { TenantsService } from '../tenants.service';

@Component({
  selector: 'app-update-tenant',
  templateUrl: './update-tenant.component.html',
  styleUrls: ['./update-tenant.component.scss']
})
export class UpdateTenantComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  @Input() tenant;

  constructor(private service: TenantsService) { }

  ngOnInit() {
    console.log(this.tenant)
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public onSubmit() {
    this.service.update(this.tenant);
    this.moveTo('list');
  }

}
