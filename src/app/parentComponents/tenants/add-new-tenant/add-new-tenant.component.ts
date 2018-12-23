import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TenantsService } from '../tenants.service';

@Component({
  selector: 'app-add-new-tenant',
  templateUrl: './add-new-tenant.component.html',
  styleUrls: ['./add-new-tenant.component.scss']
})
export class AddNewTenantComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  newTenant: any = {};

  nameFormControl: FormControl = new FormControl('', Validators.minLength(5));

  descriptionFormControl: FormControl = new FormControl('', Validators.minLength(5));

  addNewForm: FormGroup = new FormGroup({
    name: this.nameFormControl,
    description: this.descriptionFormControl
  })

  constructor(private service: TenantsService) { }

  ngOnInit() {
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public addTenant(obj) {
    obj.name = this.nameFormControl.value;
    obj.description = this.descriptionFormControl.value;
    this.service.createTenant(obj);
  }

  onSubmit() {
    this.addTenant(this.newTenant);
    this.moveTo('list');
  }

}
