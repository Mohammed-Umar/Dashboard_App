import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlantsService } from '../plants.service';

@Component({
  selector: 'app-add-new-plant',
  templateUrl: './add-new-plant.component.html',
  styleUrls: ['./add-new-plant.component.scss']
})
export class AddNewPlantComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  newPlant: Object = {};
  tendentIds;

  constructor(private service: PlantsService) { }

  ngOnInit() {
    this.getTenantIds();
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public addTenant(obj) {
    this.service.addNew(obj);
    console.log(obj);
  }

  private getTenantIds() {
    this.tendentIds = this.service.getTenantIds();
  }

  onSubmit() {
    this.addTenant(this.newPlant);
    console.log(this.service.list);
    this.moveTo('list');
  }

}
