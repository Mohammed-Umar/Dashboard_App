import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PlantsService } from '../plants.service';

@Component({
  selector: 'app-update-plant',
  templateUrl: './update-plant.component.html',
  styleUrls: ['./update-plant.component.scss']
})
export class UpdatePlantComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  @Input() plant;

  @Input() tenanteNamesList;

  public tenantSelected;

  nameFormControl: FormControl = new FormControl('', Validators.minLength(5));

  descriptionFormControl: FormControl = new FormControl('', Validators.minLength(5));

  addNewForm: FormGroup = new FormGroup({
    name: this.nameFormControl,
    description: this.descriptionFormControl
  })

  constructor(private service: PlantsService) { }

  ngOnInit() {
    console.log(this.plant);
    console.log(this.tenanteNamesList);
    this.tenantSelected = this.plant.tenant_id;
    this.nameFormControl.patchValue(this.plant.name);
    this.descriptionFormControl.patchValue(this.plant.description);
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  private _update(obj) {
    obj.name = this.nameFormControl.value;
    obj.description = this.descriptionFormControl.value;
    this.service.update(obj, this.tenantSelected);
   }

  public onSubmit() {
    this._update(this.plant);
    this.moveTo('list');
  }

}
