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

  public isTenantSelected = false;

  public noPlantsFound = false;

  public preferenceVariable = 'plants-user-preference';

  constructor(private service: PlantsService) { }

  ngOnInit() {
    this.service.getTenants();
    this.service.plantsList.subscribe(list => {
      this.mainPlantsList = list;
      this.checkPreference();
    });
  }

  checkPreference() {
    const preference = localStorage.getItem(this.preferenceVariable);
    const preferenceJson = JSON.parse(preference);
    if (preferenceJson !== null) {
      this.tenantSelected = preferenceJson.tenantID;
      this.showPreference();
    }
  }

  showPreference() {
    const tenantID = this.tenantSelected;
    if (tenantID !== undefined) {
      this.onlyTenantPreSelected();
    }
  }

  onlyTenantPreSelected() {
    this.optionSelected()
  }

  optionSelected() {
    this.toggleTenantSelection();
    const tenantID = this.tenantSelected;
    this.plants = this.mainPlantsList.filter( obj => obj.tenant_id === tenantID );
    this.checkIfMachinesFound(this.plants);
    this.setUserPreference(tenantID);
  }

  toggleTenantSelection() {
    this.isTenantSelected = true;
  }

  checkIfMachinesFound(obj) {
    if (obj.length < 1) {
      this.noPlantsFound = true;
    } else {
      this.noPlantsFound = false;
    }
  }

  setUserPreference(tenantID) {
    const preference = {
      tenantID: tenantID
    }
    const preferenceString = JSON.stringify(preference);
    localStorage.setItem(this.preferenceVariable, preferenceString);
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

  delete(screen, plant) {
    this.moveTo(screen);
    this.service.delete(plant.id);
  }
}
