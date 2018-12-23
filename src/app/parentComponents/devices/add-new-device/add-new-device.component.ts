import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DevicesService } from '../devices.service';

@Component({
  selector: 'app-add-new-device',
  templateUrl: './add-new-device.component.html',
  styleUrls: ['./add-new-device.component.scss']
})
export class AddNewDeviceComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  @Input() machinesMiniList;

  @Input() plantsMiniList;

  @Input() tenantsNamesList;

  @Input() equipmentsMiniList;

  public plantsNamesList;

  public machinesNamesList;

  public equipmentsNamesList;

  public tenantSelected;

  public plantSelected;

  public machineSelected;

  public equipmentSelected;

  newDevice: any = {};

  constructor(private service: DevicesService) { }

  ngOnInit() {
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public addDevice(obj) {
    this.service.createTenant(obj, this.tenantSelected, this.plantSelected, this.machineSelected, this.equipmentSelected);
    console.log(obj);
  }

  onTenantSelection() {
    const selectedTenant = this.tenantSelected;
    const selectedTenantID = selectedTenant.id;
    console.log(selectedTenantID);
    console.log(this.plantsMiniList);
    const plantsList = this.plantsMiniList.filter( plant => plant.tenantID === selectedTenantID)
    console.log(plantsList);
    this.plantsNamesList = plantsList;
  }

  onPlantSelection() {
    const selectedPlant = this.plantSelected;
    const selectedPlantID = selectedPlant.id;
    console.log(selectedPlantID);
    console.log(this.machinesMiniList);
    const machinesList = this.machinesMiniList.filter(machine => machine.plantID === selectedPlantID)
    console.log(machinesList);
    this.machinesNamesList = machinesList;
  }

  onMachineSelection() {
    const selectedMachine = this.machineSelected;
    const selectedMachineID = selectedMachine.id;
    console.log(selectedMachineID);
    console.log(this.equipmentsMiniList);
    const equipmentList = this.equipmentsMiniList.filter(equipment => equipment.machineID === selectedMachineID)
    console.log(equipmentList);
    this.equipmentsNamesList = equipmentList;
  }

  onEquipmentSelection() {
    console.log('Selected Equipment ID is', this.equipmentSelected.id)
  }

  onSubmit() {
    this.addDevice(this.newDevice);
    console.log(this.service.list);
    this.moveTo('list');
  }

}
