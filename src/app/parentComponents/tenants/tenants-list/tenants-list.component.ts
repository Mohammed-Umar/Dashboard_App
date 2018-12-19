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
  @Output() showDetails = new EventEmitter<any>();

  public tenants = this.service.list;

  public headers = this.service.headers;

  constructor(private service: TenantsService) { }

  ngOnInit() {
    this.service.getTenants();
    this.service.tenantsList.subscribe(list => {
      this.tenants = list;
      console.log(this.tenants);
    });
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public update(screen, data) {
    this.needToUpdate.emit(data);
    this.moveTo(screen);
  }

  public openDetails(screen, data) {
    this.showDetails.emit(data);
    this.moveTo(screen);
  }

  delete(screen, tenant) {
    this.moveTo(screen);
    this.service.delete(tenant.id);
  }
}
