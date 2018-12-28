import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { MachinesService } from '../machines.service';

@Component({
  selector: 'app-machines-list',
  templateUrl: './machines-list.component.html',
  styleUrls: ['./machines-list.component.scss']
})
export class MachinesListComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();
  @Output() needToUpdate = new EventEmitter<any>();
  @Output() showDetails = new EventEmitter<any>();

  @Input() tenanteNamesList;
  @Input() plantsMiniList;
  @Input() preSelectedList;


  public machines;

  public mainMachinesList;

  public tenantSelected = null;

  public plantSelected = null;

  public plantsNamesList;

  public showlist = false;

  public headers = this.service.headers;

  public userListSelection;

  public isTenantSelected = false;

  public noMachinesFound = false;

  public preferenceVariable = 'machines-user-preference';

  constructor(private service: MachinesService) { }

  ngOnInit() {
    this.service.getTenants();
    this.service.machinesList.subscribe(list => {
      this.mainMachinesList = list;
      this.checkPreference();
      // this.checkPreSelection();
    });
  }

  checkPreference() {
    const preference = localStorage.getItem(this.preferenceVariable);
    const preferenceJson = JSON.parse(preference);
    if (preferenceJson !== null) {
      this.tenantSelected = preferenceJson.tenantID;
      this.plantSelected = preferenceJson.plantID;
      this.showPreference();
    }
  }

  showPreference() {
    const tenantID = this.tenantSelected;
    const plantID = this.plantSelected;
    if (tenantID !== undefined && plantID !== undefined) {
      this.teanatAndPlantPreSelected(tenantID);
    } else if (tenantID !== undefined) {
      this.onlyTenantPreSelected();
    }
  }

  onlyTenantPreSelected() {
    this.onTenantSelection()
  }

  teanatAndPlantPreSelected(tenantID, ) {
    this.toggleTenantSelection();
    this.generatePlantsNames(tenantID);
    this.optionsSelected();
  }

  checkPreSelection() {
    if (this.preSelectedList !== undefined) {
      console.log('preSelectedList is not undefined')
      this.tenantSelected = this.preSelectedList.tenantID;
      this.plantSelected = this.preSelectedList.plantID;
      this.generateFilteredMachines(this.preSelectedList.tenantID, this.preSelectedList.plantID);
    } else {
    console.log('preSelectedList is undefined')
    }
  }

  optionsSelected() {
    const tenantID = this.tenantSelected;
    const plantID = this.plantSelected;
    this.machines = this.mainMachinesList.filter( obj => obj.tenant_id === tenantID && obj.plant_id === plantID);
    this.checkIfMachinesFound(this.machines);
    this.setUserPreference(tenantID, plantID);
    this.userListSelection = { 'tenantID': this.tenantSelected.id, 'plantID': this.plantSelected.id };
  }

  onTenantSelection() {
    this.toggleTenantSelection();
    const selectedTenantID = this.tenantSelected;
    this.generatePlantsNames(selectedTenantID);
    this.machines = this.mainMachinesList.filter(machine => machine.tenant_id === selectedTenantID);
    this.checkIfMachinesFound(this.machines);
    this.setUserPreference(selectedTenantID);
  }

  toggleTenantSelection() {
    this.isTenantSelected = true;
  }

  generatePlantsNames(tenantID) {
    const plantsList = this.plantsMiniList.filter(plant => plant.tenantID === tenantID)
    this.plantsNamesList = plantsList;
  }

  generateFilteredMachines(tenantID, plantID) {
    const filteredList = this.mainMachinesList.filter( obj => obj.tenant_id === tenantID && obj.plant_id === plantID);
    this.machines = filteredList;
    this.showlist = true;
    // this.userListSelection = { 'tenantID': this.tenantSelected.id, 'plantID': this.plantSelected.id };
  }

  checkIfMachinesFound(obj) {
    if (obj.length < 1) {
      this.noMachinesFound = true;
    } else {
      this.noMachinesFound = false;
    }
  }

  setUserPreference(tenantID, plantID?) {
    const preference = {
      tenantID: tenantID,
      plantID: plantID
    }
    const preferenceString = JSON.stringify(preference);
    localStorage.setItem(this.preferenceVariable, preferenceString);
  }

  public moveTo(screen) {
    const obj = { 'screen': screen, 'userListSelection': this.userListSelection };
    this.changeScreen.emit(obj);
  }

  public update(screen, data) {
    this.needToUpdate.emit(data);
    this.moveTo(screen);
  }

  public openDetails(screen, data) {
    this.showDetails.emit(data);
    this.moveTo(screen);
  }

  delete(screen, machine) {
    this.moveTo(screen);
    this.service.delete(machine.id);
  }
}
