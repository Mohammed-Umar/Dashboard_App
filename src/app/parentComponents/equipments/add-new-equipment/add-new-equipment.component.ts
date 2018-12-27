import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { EquipmentsService } from '../equipments.service';

@Component({
  selector: 'app-add-new-equipment',
  templateUrl: './add-new-equipment.component.html',
  styleUrls: ['./add-new-equipment.component.scss']
})
export class AddNewEquipmentComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  @Input() machinesMiniList;

  @Input() plantsMiniList;

  @Input() tenantsNamesList;

  public plantsNamesList;

  public machinesNamesList;

  newEquipment: any = {};

  public tenantSelected;

  public plantSelected;

  public machineSelected;

  public isCritical = false;

  public labelPosition = 'before';

  nameFormControl: FormControl = new FormControl('', Validators.minLength(5));

  descriptionFormControl: FormControl = new FormControl('', Validators.minLength(5));

  tenantIDFormControl: FormControl = new FormControl('', Validators.required);

  plantIDFormControl: FormControl = new FormControl('', Validators.required);

  machineIDFormControl: FormControl = new FormControl('', Validators.required);

  isCriticalFormControl: FormControl = new FormControl();

  capacityFormControl: FormControl = new FormControl();

  rpmFormControl: FormControl = new FormControl();

  polesFormControl: FormControl = new FormControl();

  addNewForm: FormGroup = new FormGroup({
    name: this.nameFormControl,
    description: this.descriptionFormControl,
    tenantID: this.tenantIDFormControl,
    plantID: this.plantIDFormControl,
    machineID: this.machineIDFormControl,
    isCritical: this.isCriticalFormControl,
    capacity: this.capacityFormControl,
    rpm: this.rpmFormControl,
    poles: this.polesFormControl
  })

  constructor(private service: EquipmentsService) { }

  ngOnInit() {
    this.isCriticalFormControl.setValue(this.isCritical);
    // this.tenantSelected = this.newEquipment.
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public addEquipment(obj) {
    obj.is_critical = this.isCriticalFormControl.value;
    obj.name = this.nameFormControl.value;
    obj.description = this.descriptionFormControl.value;
    this.service.createTenant(obj, this.tenantSelected, this.plantSelected, this.machineSelected);
  }

  onSubmit() {
    this.addEquipment(this.newEquipment);
    this.moveTo('list');
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
    console.log('Selected Machine ID is', this.machineSelected.id)
  }
}
