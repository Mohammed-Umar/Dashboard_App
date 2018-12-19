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

  @Input() tenanteNamesList;

  public tenantSelected;

  constructor(private service: PlantsService) { }

  ngOnInit() {
    console.log(this.plant);
    console.log(this.tenanteNamesList);
    this.tenantSelected = this.plant.tenant_id;
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public onSubmit() {
    console.log(this.tenantSelected);
    this.service.update(this.plant, this.tenantSelected);
    this.moveTo('list');
  }

}
