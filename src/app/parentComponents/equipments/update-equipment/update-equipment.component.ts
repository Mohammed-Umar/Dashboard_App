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

  capacityFormControl: FormControl = new FormControl('', Validators.required);

  rpmFormControl: FormControl = new FormControl('', Validators.required);

  polesFormControl: FormControl = new FormControl('', Validators.required);

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
    this.patchValues(this.equipment);
  }

  patchValues(equipment) {
    this.nameFormControl.patchValue(equipment.name);
    this.descriptionFormControl.patchValue(equipment.description);
    this.capacityFormControl.patchValue(equipment.capacity);
    this.rpmFormControl.patchValue(equipment.rated_rpm);
    this.polesFormControl.patchValue(equipment.poles);
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  private _update(obj) {
    const data = this.bindData(obj);
    this.service.update(data, this.tenantSelected, this.plantSelected, this.machineSelected);
   }

   bindData(obj) {
    obj.name = this.nameFormControl.value;
    obj.description = this.descriptionFormControl.value;
    obj.is_critical = this.isCriticalFormControl.value;
    obj.capacity = this.capacityFormControl.value;
    obj.rpm = this.rpmFormControl.value;
    obj.poles = this.polesFormControl.value;
    return obj;
   }

  public onSubmit() {
    this._update(this.equipment);
    console.log(this.equipment);
    this.moveTo('list');
  }

}
