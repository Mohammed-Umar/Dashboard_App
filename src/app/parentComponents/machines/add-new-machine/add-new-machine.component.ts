import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MachinesService } from '../machines.service';

@Component({
  selector: 'app-add-new-machine',
  templateUrl: './add-new-machine.component.html',
  styleUrls: ['./add-new-machine.component.scss']
})
export class AddNewMachineComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  @Input() tenanteNamesList;

  @Input() plantsMiniList;

  public plantsNamesList;

  newMachine: any = {};

  public tenantSelected;

  public plantSelected;

  nameFormControl: FormControl = new FormControl('', Validators.minLength(5));

  descriptionFormControl: FormControl = new FormControl('', Validators.minLength(5));

  tenantIDFormControl: FormControl = new FormControl('', Validators.required);

  plantIDFormControl: FormControl = new FormControl('', Validators.required);

  addNewForm: FormGroup = new FormGroup({
    name: this.nameFormControl,
    description: this.descriptionFormControl,
    tenantID: this.tenantIDFormControl,
    plantID: this.plantIDFormControl
  })

  constructor(private service: MachinesService) { }

  ngOnInit() {
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public addMachine(obj) {
    obj.name = this.nameFormControl.value;
    obj.description = this.descriptionFormControl.value;
    this.service.createTenant(obj, this.tenantSelected, this.plantSelected);
  }

  onSubmit() {
    this.addMachine(this.newMachine);
    this.moveTo('list');
  }

  // Generating cascading list
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
    console.log('Selected plant ID is', this.plantSelected.id)
  }

}
