import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TenantsService } from '../tenants.service';

@Component({
  selector: 'app-update-tenant',
  templateUrl: './update-tenant.component.html',
  styleUrls: ['./update-tenant.component.scss']
})
export class UpdateTenantComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  @Input() tenant;

  nameFormControl: FormControl = new FormControl('', Validators.minLength(5));

  descriptionFormControl: FormControl = new FormControl('', Validators.minLength(5));

  addNewForm: FormGroup = new FormGroup({
    name: this.nameFormControl,
    description: this.descriptionFormControl
  })

  constructor(private service: TenantsService) { }

  ngOnInit() {
    console.log(this.tenant);
    this.nameFormControl.patchValue(this.tenant.name);
    this.descriptionFormControl.patchValue(this.tenant.description);
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

   private _update(obj) {
    obj.name = this.nameFormControl.value;
    obj.description = this.descriptionFormControl.value;
    this.service.update(obj);
   }

  public onSubmit() {
    this._update(this.tenant);
    this.moveTo('list');
  }

}
