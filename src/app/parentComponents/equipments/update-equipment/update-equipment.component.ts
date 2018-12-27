import { Component, OnInit, Output, Input, EventEmitter, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { EquipmentsService } from '../equipments.service';

@Component({
  selector: 'app-update-equipment',
  templateUrl: './update-equipment.component.html',
  styleUrls: ['./update-equipment.component.scss']
})
export class UpdateEquipmentComponent implements OnInit, OnChanges {

  @Output() changeScreen = new EventEmitter<any>();

  @Input() equipment;

  @Input() tenantsNamesList;

  @Input() plantsMiniList;

  @Input() machinesMiniList;

  public tenantSelected;

  public plantSelected;

  public machineSelected;

  tendentIds: any;

  plantIds: any;

  machineIds: any;

  public isCritical;

  nameFormControl: FormControl = new FormControl('', Validators.minLength(5));

  descriptionFormControl: FormControl = new FormControl('', Validators.minLength(5));

  isCriticalFormControl: FormControl = new FormControl();

  capacityFormControl: FormControl = new FormControl();

  rpmFormControl: FormControl = new FormControl();

  polesFormControl: FormControl = new FormControl();

  addNewForm: FormGroup = new FormGroup({
    name: this.nameFormControl,
    description: this.descriptionFormControl,
    isCritical: this.isCriticalFormControl,
    capacity: this.capacityFormControl,
    rpm: this.rpmFormControl,
    poles: this.polesFormControl
  })

  constructor(private service: EquipmentsService) { }

  ngOnChanges() {
    this.isCriticalFormControl.patchValue(this.equipment.is_critical);
  }

  ngOnInit() {
    console.log(this.equipment);
    this.tenantSelected = this.equipment.tenant_id;
    this.plantSelected = this.equipment.plant_id;
    this.machineSelected = this.equipment.machine_id;
    this.isCritical = this.equipment.is_critical;
    this.nameFormControl.patchValue(this.equipment.name);
    this.descriptionFormControl.patchValue(this.equipment.description);
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  private _update(obj) {
    obj.name = this.nameFormControl.value;
    obj.description = this.descriptionFormControl.value;
    obj.is_critical = this.isCriticalFormControl.value;
    this.service.update(obj, this.tenantSelected, this.plantSelected, this.machineSelected);
   }

  public onSubmit() {
    this._update(this.equipment);
    console.log(this.equipment);
    this.moveTo('list');
  }

}
