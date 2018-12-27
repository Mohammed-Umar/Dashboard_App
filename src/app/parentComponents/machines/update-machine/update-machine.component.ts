import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MachinesService } from '../machines.service';

@Component({
  selector: 'app-update-machine',
  templateUrl: './update-machine.component.html',
  styleUrls: ['./update-machine.component.scss']
})
export class UpdateMachineComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  @Input() machine;

  @Input() tenanteNamesList;

  @Input() plantNamesList;

  public tenantSelected;

  public plantSelected;

  tendentIds: any;

  plantIds: any;

  nameFormControl: FormControl = new FormControl('', Validators.minLength(5));

  descriptionFormControl: FormControl = new FormControl('', Validators.minLength(5));

  addNewForm: FormGroup = new FormGroup({
    name: this.nameFormControl,
    description: this.descriptionFormControl
  })

  constructor(private service: MachinesService) { }

  ngOnInit() {
    console.log(this.machine);
    this.tenantSelected = this.machine.tenant_id;
    this.plantSelected = this.machine.plant_id;
    this.nameFormControl.patchValue(this.machine.name);
    this.descriptionFormControl.patchValue(this.machine.description);
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  private _update(obj) {
    obj.name = this.nameFormControl.value;
    obj.description = this.descriptionFormControl.value;
    this.service.update(obj, this.tenantSelected, this.plantSelected);
   }

  public onSubmit() {
    this._update(this.machine);
    console.log(this.machine);
    this.moveTo('list');
  }

}
