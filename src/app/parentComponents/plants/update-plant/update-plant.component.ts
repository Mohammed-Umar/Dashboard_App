import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { PlantsService } from '../plants.service';

@Component({
  selector: 'app-update-plant',
  templateUrl: './update-plant.component.html',
  styleUrls: ['./update-plant.component.scss']
})
export class UpdatePlantComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  @Input() plant;

  tendentIds: any;

  constructor(private service: PlantsService) { }

  ngOnInit() {
    console.log(this.plant);
    this.getTenantIds();
  }

  private getTenantIds() {
    this.tendentIds = this.service.getTenantIds();
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public onSubmit() {
    this.service.update(this.plant);
    console.log(this.plant);
    this.moveTo('list');
  }

}
