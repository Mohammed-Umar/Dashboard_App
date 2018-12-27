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

  constructor(private service: EquipmentsService) { }

  ngOnInit() {
    this.service.getTenants();
    this.service.equipmentsList.subscribe(list => {
      this.mainEquipmentsList = list;
      console.log(list);
      this.checkPreSelection();
    });
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
    const tenantID = this.tenantSelected.id;
    const plantID = this.plantSelected.id;
    const machineID = this.machineSelected.id;
    this.equipments = this.mainEquipmentsList.filter(obj => obj.tenant_id === tenantID &&
      obj.plant_id === plantID &&
      obj.machine_id === machineID);
    this.checkIfEquipmentsFound(this.equipments);
    this.userListSelection = { 'tenantID': this.tenantSelected.id, 'plantID': this.plantSelected.id, 'machineID': this.machineSelected.id };
  }

  onTenantSelection() {
    this.isTenantSelected = true;
    const selectedTenant = this.tenantSelected;
    const selectedTenantID = selectedTenant.id;
    const plantsList = this.plantsMiniList.filter(plant => plant.tenantID === selectedTenantID)
    this.plantsNamesList = plantsList;
    this.equipments = this.mainEquipmentsList.filter(equipment => equipment.tenant_id === selectedTenantID);
    this.checkIfEquipmentsFound(this.equipments);
  }

  onPlantSelection() {
    const selectedPlant = this.plantSelected;
    const selectedPlantID = selectedPlant.id;
    const tenantID = this.tenantSelected.id;
    const machinesList = this.machinesMiniList.filter(machine => machine.plantID === selectedPlantID)
    this.machinesNamesList = machinesList;
    this.equipments = this.mainEquipmentsList.filter(equipment => equipment.tenant_id === tenantID &&
      equipment.plant_id === selectedPlantID);
    this.checkIfEquipmentsFound(this.equipments);
  }

  checkIfEquipmentsFound(obj) {
    if (obj.length < 1) {
      this.noEquipmentsFound = true;
    } else {
      this.noEquipmentsFound = false;
    }
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

  delete(screen, tenant) {
    this.moveTo(screen);
    this.service.delete(tenant.id);
  }

}
