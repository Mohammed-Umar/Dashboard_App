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

  public emptyDevicepool = false;

  public noDevicesFound = false;

  public preferenceVariable = 'devices-user-preference';

  constructor(private service: DevicesService) { }

  ngOnInit() {
    // this.checkPreSelection();
    this.deviceWay();
  }

  deviceWay() {
    this.callDevicePool();
  }

  // checkPreference() {
  //   const preference = localStorage.getItem(this.preferenceVariable);
  //   const preferenceJson = JSON.parse(preference);
  //   if (preferenceJson !== null) {
  //     this.tenantSelected = preferenceJson.tenantID;
  //     this.plantSelected = preferenceJson.plantID;
  //     this.machineSelected = preferenceJson.machineID;
  //     this.equipmentSelected = preferenceJson.equipmentID;
  //     this.showPreference();
  //   } else {
  //     this.callDevicePool();
  //   }
  // }

  // showPreference() {
  //   this.callMappedDevices();
  //   this.emptyDevicepool = false;
  //   const tenantID = this.tenantSelected;
  //   const plantID = this.plantSelected;
  //   const machineID = this.machineSelected;
  //   const equipmentID = this.equipmentSelected;
  //   if (tenantID !== undefined && plantID !== undefined && machineID !== undefined && equipmentID !== undefined) {
  //     this.allPreSelected(tenantID, plantID, machineID);
  //   } else if (tenantID !== undefined && plantID !== undefined && machineID !== undefined) {
  //     this.TenantPlantMachinePreSelected(tenantID, plantID);
  //   } else if (tenantID !== undefined && plantID !== undefined) {
  //     this.teanatAndPlantPreSelected(tenantID);
  //   } else if (tenantID !== undefined) {
  //     this.onlyTenantPreSelected();
  //   }
  // }

  // onlyTenantPreSelected() {
  //   // this.callMappedDevices();
  //   this.onTenantSelection()
  // }

  // teanatAndPlantPreSelected(tenantID) {
  //   // this.callMappedDevices();
  //   this.generatePlantsNames(tenantID);
  //   this.onPlantSelection();
  // }

  // TenantPlantMachinePreSelected(tenantID, plantID) {
  //   // this.callMappedDevices();
  //   this.generatePlantsNames(tenantID);
  //   this.generateMachinesNames(plantID);
  //   this.onMachineSelection();
  // }

  // allPreSelected(tenantID, plantID, machineID) {
  //   // this.callMappedDevices();
  //   this.generatePlantsNames(tenantID);
  //   this.generateMachinesNames(plantID);
  //   this.generateEquipmentsNames(machineID);
  //   this.optionsSelected();
  // }

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
      if (this.devices.length < 1) {
        this.emptyDevicepool = true;
      } else {
        this.emptyDevicepool = false;
      }
    });
  }

  callMappedDevices() {
    this.service.getMappedDevices();
    this.service.devicesList.subscribe(list => {
      this.mainDevicesList = list;
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
    const tenantID = this.tenantSelected;
    const plantID = this.plantSelected;
    const machineID = this.machineSelected;
    const equipmentID = this.equipmentSelected;
    this.devices = this.mainDevicesList.filter(obj => obj.tenant_id === tenantID &&
      obj.plant_id === plantID &&
      obj.machine_id === machineID &&
      obj.equipment_id === equipmentID);
    this.checkIfDevicesFound(this.devices);
    // this.setUserPreference(tenantID, plantID, machineID, equipmentID);
    // this.showlist = true;
    // this.userListSelection = { 'tenantID': tenantID, 'plantID': plantID, 'machineID': machineID, 'equipmentID': equipmentID };
    // this.tenantSelected
  }

  onTenantSelection() {
    this.callMappedDevices();
    const selectedTenantID = this.tenantSelected;
    this.generatePlantsNames(selectedTenantID);
    this.devices = this.mainDevicesList.filter(device => device.tenant_id === selectedTenantID);
    this.checkIfDevicesFound(this.devices);
    // this.setUserPreference(selectedTenantID);
    // this.userListSelection = { 'tenantID': selectedTenantID };
  }

  generatePlantsNames(tenantID) {
    const plantsList = this.plantsMiniList.filter(plant => plant.tenantID === tenantID)
    this.plantsNamesList = plantsList;
  }

  onPlantSelection() {
    const selectedPlantID = this.plantSelected;
    const tenantID = this.tenantSelected;
    this.generateMachinesNames(selectedPlantID);
    this.devices = this.mainDevicesList.filter(device => device.tenant_id === tenantID && device.plant_id === selectedPlantID);
    this.checkIfDevicesFound(this.devices);
    // this.setUserPreference(tenantID, selectedPlantID);
    // this.userListSelection = { 'tenantID': tenantID, 'plantID': selectedPlantID };
  }

  generateMachinesNames(plantID) {
    const machinesList = this.machinesMiniList.filter(machine => machine.plantID === plantID)
    this.machinesNamesList = machinesList;
  }

  onMachineSelection() {
    const selectedMachineID = this.machineSelected;
    const tenantID = this.tenantSelected;
    const plantID = this.plantSelected;
    this.generateMachinesNames(selectedMachineID);
    this.devices = this.mainDevicesList.filter(device => device.tenant_id === tenantID &&
      device.plant_id === plantID &&
      device.machine_id === selectedMachineID);
    this.checkIfDevicesFound(this.devices);
    // this.setUserPreference(tenantID, plantID, selectedMachineID);
    // this.userListSelection = { 'tenantID': tenantID, 'plantID': plantID, 'machineID': selectedMachineID };
  }

  generateEquipmentsNames(machineID) {
    const equipmentsList = this.equipmentsMiniList.filter(equipment => equipment.machineID === machineID)
    this.equipmentsNamesList = equipmentsList;
  }

  checkIfDevicesFound(obj) {
    if (obj.length < 1) {
      this.noDevicesFound = true;
    } else {
      this.noDevicesFound = false;
    }
  }

  // setUserPreference(tenantID, plantID?, machineID?, equipmentID?) {
  //   const preference = {
  //     tenantID: tenantID,
  //     plantID: plantID,
  //     machineID: machineID,
  //     equipmentID: equipmentID
  //   }
  //   const preferenceString = JSON.stringify(preference);
  //   localStorage.setItem(this.preferenceVariable, preferenceString);
  // }

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
