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
      this.generateFilteredMachines(this.preSelectedList.tenantID, this.preSelectedList.plantID);
    } else {
      console.log('preSelectedList is undefined')
    }
  }

  generateFilteredMachines(tenantID, plantID) {
    const filteredList = this.mainEquipmentsList.filter(obj => obj.tenant_id === tenantID && obj.plant_id === plantID);
    console.log(filteredList);
    this.equipments = filteredList;
    this.showlist = true;
    // this.userListSelection = { 'tenantID': this.tenantSelected.id, 'plantID': this.plantSelected.id };
  }

  optionsSelected() {
    console.log(this.tenantSelected);
    const tenantID = this.tenantSelected.id;
    const plantID = this.plantSelected.id;
    const machineID = this.machineSelected.id;
    console.log(tenantID);
    console.log(plantID);
    console.log(machineID);
    const filteredList = this.mainEquipmentsList.filter(obj => obj.tenant_id === tenantID &&
      obj.plant_id === plantID &&
      obj.machine_id === machineID);
    console.log(filteredList);
    this.equipments = filteredList;
    this.showlist = true;
    this.userListSelection = { 'tenantID': this.tenantSelected.id, 'plantID': this.plantSelected.id, 'machineID': this.machineSelected.id };
    // this.tenantSelected
  }

  onTenantSelection() {
    const selectedTenant = this.tenantSelected;
    const selectedTenantID = selectedTenant.id;
    console.log(selectedTenantID);
    console.log(this.plantsMiniList);
    const plantsList = this.plantsMiniList.filter(plant => plant.tenantID === selectedTenantID)
    console.log(plantsList);
    this.plantsNamesList = plantsList;
  }

  onPlantSelection() {
    const selectedPlant = this.plantSelected;
    const selectedPlantID = selectedPlant.id;
    console.log(selectedPlantID);
    console.log(this.machinesMiniList);
    console.log(this.plantsNamesList);
    const machinesList = this.machinesMiniList.filter(machine => machine.plantID === selectedPlantID)
    console.log(machinesList);
    this.machinesNamesList = machinesList;
  }

  // public moveTo(screen) {
  //   this.changeScreen.emit(screen);
  // }

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

  delete(screen, tenant) {
    this.moveTo(screen);
    this.service.delete(tenant.id);
  }

}
