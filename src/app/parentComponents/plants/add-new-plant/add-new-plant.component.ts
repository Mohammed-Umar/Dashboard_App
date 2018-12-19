import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
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

  constructor(private service: PlantsService) { }

  ngOnInit() {
    console.log(this.tenantSelected);
    console.log(this.tenanteNamesList);
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public addTenant(obj) {
    this.service.createTenant(obj, this.tenantSelected);
  }

  onSubmit() {
    console.log(this.tenantSelected);
    this.addTenant(this.newPlant);
    this.moveTo('list');
  }

}
