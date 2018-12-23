import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DevicesService } from '../devices.service';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss']
})
export class DevicesListComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();
  @Output() needToUpdate = new EventEmitter<any>();
  @Output() showDetails = new EventEmitter<any>();

  @Input() tenantsNamesList;
  @Input() plantsMiniList;
  @Input() preSelectedList;
  @Input() machinesMiniList;
  @Input() equipmentsMiniList;

  public devices: Array<any> = [];

  public headers = this.service.headers;

  public mainDevicesList;

  public tenantSelected = null;

  public plantSelected = null;

  public machineSelected = null;

  public equipmentSelected = null;

  public showlist = false;

  public plantsNamesList;

  public machinesNamesList;

  public equipmentsNamesList;

  public userListSelection;

  constructor(private service: DevicesService) { }

  ngOnInit() {
    this.checkPreSelection();
  }

  checkPreSelection() {
    if (this.preSelectedList !== undefined) {
      console.log('preSelectedList is not undefined')
      this.tenantSelected = this.preSelectedList.tenantID;
      this.plantSelected = this.preSelectedList.plantID;
      this.machineSelected = this.preSelectedList.machineID;
      this.equipmentSelected = this.preSelectedList.equipmentID;
      this.callMappedDevices();
      this.generateFilteredMachines(this.tenantSelected, this.plantSelected, this.machineSelected, this.equipmentSelected);
    } else {
      console.log('preSelectedList is undefined');
      this.callDevicePool();
    }
  }

  areDevicesAvailable() {
    return this.devices.length > 0 ? true : false ;
  }

  callDevicePool() {
    this.service.getDevicePool();
    this.service.devicesList.subscribe(list => {
      this.mainDevicesList = list;
      this.devices = this.mainDevicesList;
      console.log(list);
    });
  }

  callMappedDevices() {
    this.service.getMappedDevices();
    this.service.devicesList.subscribe(list => {
      this.mainDevicesList = list;
      console.log(list);
    });
  }

  generateFilteredMachines(tenantID, plantID, machineID, equipmentID) {
    const filteredList = this.mainDevicesList.filter(obj => obj.tenant_id === tenantID &&
      obj.plant_id === plantID &&
      obj.machine_id === machineID &&
      obj.equipment_id === equipmentID);
    console.log(filteredList);
    this.devices = filteredList;
    this.showlist = true;
    // this.userListSelection = { 'tenantID': this.tenantSelected.id, 'plantID': this.plantSelected.id };
  }

  optionsSelected() {
    console.log(this.tenantSelected);
    const tenantID = this.tenantSelected.id;
    const plantID = this.plantSelected.id;
    const machineID = this.machineSelected.id;
    const equipmentID = this.equipmentSelected.id;
    console.log(tenantID);
    console.log(plantID);
    console.log(machineID);
    console.log(equipmentID);
    const filteredList = this.mainDevicesList.filter(obj => obj.tenant_id === tenantID &&
      obj.plant_id === plantID &&
      obj.machine_id === machineID &&
      obj.equipment_id === equipmentID);
    console.log(filteredList);
    this.devices = filteredList;
    this.showlist = true;
    this.userListSelection = { 'tenantID': tenantID, 'plantID': plantID, 'machineID': machineID, 'equipmentID': equipmentID };
    // this.tenantSelected
  }

  onTenantSelection() {
    this.callMappedDevices();
    const selectedTenant = this.tenantSelected;
    const selectedTenantID = selectedTenant.id;
    console.log(selectedTenantID);
    console.log(this.plantsMiniList);
    const plantsList = this.plantsMiniList.filter(plant => plant.tenantID === selectedTenantID);
    console.log(plantsList);
    this.plantsNamesList = plantsList;
    this.devices = this.mainDevicesList.filter(device => device.tenant_id === selectedTenantID);
    this.userListSelection = { 'tenantID': selectedTenantID };
  }

  onPlantSelection() {
    const selectedPlant = this.plantSelected;
    const selectedPlantID = selectedPlant.id;
    const tenantID = this.tenantSelected.id;
    console.log(selectedPlantID);
    console.log(this.machinesMiniList);
    console.log(this.plantsNamesList);
    const machinesList = this.machinesMiniList.filter(machine => machine.plantID === selectedPlantID)
    console.log(machinesList);
    this.machinesNamesList = machinesList;
    this.devices = this.mainDevicesList.filter(device => device.tenant_id === tenantID && device.plant_id === selectedPlantID);
    this.userListSelection = { 'tenantID': tenantID, 'plantID': selectedPlantID };
  }

  onMachineSelection() {
    const selectedMachine = this.machineSelected;
    const selectedMachineID = selectedMachine.id;
    const tenantID = this.tenantSelected.id;
    const plantID = this.plantSelected.id;
    console.log(selectedMachineID);
    console.log(this.equipmentsMiniList);
    console.log(this.machinesNamesList);
    const equipmentsList = this.equipmentsMiniList.filter(equipment => equipment.machineID === selectedMachineID)
    console.log(equipmentsList);
    this.equipmentsNamesList = equipmentsList;
    this.devices = this.mainDevicesList.filter(device => device.tenant_id === tenantID &&
      device.plant_id === plantID &&
      device.machine_id === selectedMachineID);
    this.userListSelection = { 'tenantID': tenantID, 'plantID': plantID, 'machineID': selectedMachineID };
  }

  // public moveTo(screen) {
  //   this.changeScreen.emit(screen);
  // }

  public moveTo(screen) {
    const obj = { 'screen': screen, 'userListSelection': this.userListSelection };
    this.changeScreen.emit(obj);
  }

  public update(screen, data) {
    if (data.tenant_id) {
      data.isMapped = true;
    } else {
      data.isMapped = false;
    }
    this.needToUpdate.emit(data);
    this.moveTo(screen);
  }

  public openDetails(screen, data) {
    this.showDetails.emit(data);
    this.moveTo(screen);
  }

  delete(screen, device) {
    this.moveTo(screen);
    this.service.delete(device.id);
  }

}
