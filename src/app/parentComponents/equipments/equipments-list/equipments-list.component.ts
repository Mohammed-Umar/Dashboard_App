import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { EquipmentsService } from '../equipments.service';

@Component({
  selector: 'app-equipments-list',
  templateUrl: './equipments-list.component.html',
  styleUrls: ['./equipments-list.component.scss']
})
export class EquipmentsListComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  @Output() needToUpdate = new EventEmitter<any>();

  @Output() showDetails = new EventEmitter<any>();

  // @Output() selectedFilter = new EventEmitter<any>();

  @Input() tenantsNamesList;

  @Input() plantsMiniList;

  @Input() preSelectedList;

  @Input() machinesMiniList;

  public plantsNamesList;

  public machinesNamesList;

  public equipments;

  public mainEquipmentsList;

  public tenantSelected = null;

  public plantSelected = null;

  public machineSelected = null;

  public headers = this.service.headers;

  public showlist = false;

  public userListSelection;

  public isTenantSelected = false;

  public noEquipmentsFound = false;

  public preferenceVariable = 'equipments-user-preference';

  constructor(private service: EquipmentsService) { }

  ngOnInit() {
    this.service.getTenants();
    this.service.equipmentsList.subscribe(list => {
      this.mainEquipmentsList = list;
      this.checkPreference();
      // this.checkPreSelection();
    });
  }

  checkPreference() {
    const preference = localStorage.getItem(this.preferenceVariable);
    const preferenceJson = JSON.parse(preference);
    console.log(preferenceJson);
    if (preferenceJson !== null) {
      this.tenantSelected = preferenceJson.tenantID;
      this.plantSelected = preferenceJson.plantID;
      this.machineSelected = preferenceJson.machineID;
      this.showPreference();
      console.log(this.plantSelected);
      console.log(this.machineSelected);
    }
  }

  showPreference() {
    const tenantID = this.tenantSelected;
    const plantID = this.plantSelected;
    const machineID = this.machineSelected;
    if (tenantID !== undefined && plantID !== undefined && machineID !== undefined) {
      this.allPreSelected(tenantID, plantID);
    } else if (tenantID !== undefined && plantID !== undefined) {
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
    this.onPlantSelection();
  }

  allPreSelected(tenantID, plantID) {
    this.toggleTenantSelection();
    this.generatePlantsNames(tenantID);
    this.generateMachinesNames(plantID);
    this.optionsSelected();
  }

  checkPreSelection() {
    if (this.preSelectedList !== undefined) {
      console.log('preSelectedList is not undefined')
      this.tenantSelected = this.preSelectedList.tenantID;
      this.plantSelected = this.preSelectedList.plantID;
      this.machineSelected = this.preSelectedList.machineID;
      this.generateFilteredMachines(this.tenantSelected, this.plantSelected, this.machineSelected);
    } else {
      console.log('preSelectedList is undefined')
    }
  }

  generateFilteredMachines(tenantID, plantID, machineID) {
    const filteredList = this.mainEquipmentsList.filter(obj => obj.tenant_id === tenantID &&
      obj.plant_id === plantID &&
      obj.machine_id === machineID);
    console.log(filteredList);
    this.equipments = filteredList;
    this.showlist = true;
    // this.userListSelection = { 'tenantID': this.tenantSelected.id, 'plantID': this.plantSelected.id };
  }

  optionsSelected() {
    const tenantID = this.tenantSelected;
    const plantID = this.plantSelected;
    const machineID = this.machineSelected;
    this.equipments = this.mainEquipmentsList.filter(obj => obj.tenant_id === tenantID &&
      obj.plant_id === plantID &&
      obj.machine_id === machineID);
    this.checkIfEquipmentsFound(this.equipments);
    this.setUserPreference(tenantID, plantID, machineID);
    this.userListSelection = { 'tenantID': this.tenantSelected.id, 'plantID': this.plantSelected.id, 'machineID': this.machineSelected.id };
  }

  onTenantSelection() {
    this.toggleTenantSelection();
    const selectedTenantID = this.tenantSelected;
    this.generatePlantsNames(selectedTenantID);
    this.equipments = this.mainEquipmentsList.filter(equipment => equipment.tenant_id === selectedTenantID);
    this.checkIfEquipmentsFound(this.equipments);
    this.setUserPreference(selectedTenantID);
  }

  toggleTenantSelection() {
    this.isTenantSelected = true;
  }

  generatePlantsNames(tenantID) {
    const plantsList = this.plantsMiniList.filter(plant => plant.tenantID === tenantID)
    this.plantsNamesList = plantsList;
  }

  onPlantSelection() {
    const selectedPlantID = this.plantSelected;
    const tenantID = this.tenantSelected;
    this.generateMachinesNames(selectedPlantID);
    this.equipments = this.mainEquipmentsList.filter(equipment => equipment.tenant_id === tenantID &&
      equipment.plant_id === selectedPlantID);
    this.checkIfEquipmentsFound(this.equipments);
    this.setUserPreference(tenantID, selectedPlantID);
  }

  generateMachinesNames(plantID) {
    const machinesList = this.machinesMiniList.filter(machine => machine.plantID === plantID)
    this.machinesNamesList = machinesList;
  }

  checkIfEquipmentsFound(obj) {
    if (obj.length < 1) {
      this.noEquipmentsFound = true;
    } else {
      this.noEquipmentsFound = false;
    }
  }

  setUserPreference(tenantID, plantID?, machineID?) {
    const preference = {
      tenantID: tenantID,
      plantID: plantID,
      machineID: machineID
    }
    const preferenceString = JSON.stringify(preference);
    localStorage.setItem(this.preferenceVariable, preferenceString);
  }

  public moveTo(screen) {
    const obj = { 'screen': screen, 'userListSelection': this.userListSelection };
    this.changeScreen.emit(obj);
  }

  // public addNew(screen, data) {
  //   this.selectedFilter.emit(data);
  //   this.moveTo(screen);
  // }

  public update(screen, data) {
    this.needToUpdate.emit(data);
    this.moveTo(screen);
  }

  public openDetails(screen, data) {
    this.showDetails.emit(data);
    this.moveTo(screen);
  }

  delete(screen, equipment) {
    this.moveTo(screen);
    this.service.delete(equipment.id);
  }

}
