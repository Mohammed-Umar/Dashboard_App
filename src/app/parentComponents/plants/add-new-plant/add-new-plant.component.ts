import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PlantsService } from '../plants.service';

@Component({
  selector: 'app-add-new-plant',
  templateUrl: './add-new-plant.component.html',
  styleUrls: ['./add-new-plant.component.scss']
})
export class AddNewPlantComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  @Input() tenanteNamesList;

  public newPlant: any = {};

  public tenantSelected;

  nameFormControl: FormControl = new FormControl('', Validators.minLength(5));

  descriptionFormControl: FormControl = new FormControl('', Validators.minLength(5));

  tenantIDFormControl: FormControl = new FormControl('', Validators.required);

  addNewForm: FormGroup = new FormGroup({
    name: this.nameFormControl,
    description: this.descriptionFormControl,
    tenantID: this.tenantIDFormControl
  })

  constructor(private service: PlantsService) { }

  ngOnInit() {
    console.log(this.tenantSelected);
    console.log(this.tenanteNamesList);
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public addTenant(obj) {
    obj.name = this.nameFormControl.value;
    obj.description = this.descriptionFormControl.value;
    this.service.createTenant(obj, this.tenantSelected);
  }

  onSubmit() {
    console.log(this.tenantSelected);
    this.addTenant(this.newPlant);
    this.moveTo('list');
  }

}
