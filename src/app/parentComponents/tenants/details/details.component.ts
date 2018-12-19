import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { TenantsService } from '../tenants.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  @Output() needToUpdate = new EventEmitter<any>();

  @Input() tenant;

  constructor(private service: TenantsService) { }

  ngOnInit() {
    console.log(this.tenant)
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public update(screen) {
    this.needToUpdate.emit(this.tenant);
    this.moveTo(screen);
  }

  public delete(screen) {
    this.service.delete(this.tenant.id);
    this.moveTo(screen);
  }

}
