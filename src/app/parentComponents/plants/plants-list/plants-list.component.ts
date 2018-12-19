import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { PlantsService } from '../plants.service';

@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: ['./plants-list.component.scss']
})
export class PlantsListComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();
  @Output() needToUpdate = new EventEmitter<any>();
  @Output() showDetails = new EventEmitter<any>();

  @Input() tenanteNamesList;

  public plants;

  public mainPlantsList;

  public tenantSelected = null;

  public showlist = false;

  public headers = this.service.headers;

  constructor(private service: PlantsService) { }

  ngOnInit() {
    this.service.getTenants();
    this.service.plantsList.subscribe(list => {
      this.mainPlantsList = list;
      console.log(this.plants);
    });
  }

  optionSelected() {
    console.log(this.tenantSelected);
    const tenantID = this.tenantSelected.id;
    const filteredList = this.mainPlantsList.filter( obj => obj.tenant_id === tenantID );
    console.log(filteredList);
    this.plants = filteredList;
    this.showlist = true;
    // this.tenantSelected
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
