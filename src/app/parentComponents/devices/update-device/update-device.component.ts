import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DevicesService } from '../devices.service';

@Component({
  selector: 'app-update-device',
  templateUrl: './update-device.component.html',
  styleUrls: ['./update-device.component.scss']
})
export class UpdateDeviceComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  @Input() device;

  @Input() tenantsNamesList;

  @Input() plantsMiniList;

  @Input() machinesMiniList;

  @Input() equipmentsMiniList;

  public tenantSelected;

  public plantSelected;

  public machineSelected;

  public equipmentSelected;

  public isMapped: boolean;

  nameFormControl: FormControl = new FormControl('', Validators.minLength(5));

  descriptionFormControl: FormControl = new FormControl('', Validators.minLength(5));

  addNewForm: FormGroup = new FormGroup({
    name: this.nameFormControl,
    description: this.descriptionFormControl
  })

  constructor(private service: DevicesService) { }

  ngOnInit() {
    console.log(this.device);
    this.isMapped = this.device.isMapped;
    this.tenantSelected = this.device.tenant_id;
    this.plantSelected = this.device.plant_id;
    this.machineSelected = this.device.machine_id;
    this.equipmentSelected = this.device.equipment_id;
    this.nameFormControl.patchValue(this.device.name);
    this.descriptionFormControl.patchValue(this.device.description);
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  private _update(obj) {
    obj.name = this.nameFormControl.value;
    obj.description = this.descriptionFormControl.value;
    this.service.update(obj, this.tenantSelected, this.plantSelected, this.machineSelected, this.equipmentSelected);
   }

  public onSubmit() {
    this._update(this.device);
    console.log(this.device);
    this.moveTo('list');
  }

}
