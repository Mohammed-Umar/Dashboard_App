import { Component, OnInit } from '@angular/core';
import { EquipmentsService } from './equipments.service';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit {

  public activeScreen = 'list';

  public equipmentToUpdate;

  constructor(private service: EquipmentsService) { }

  ngOnInit() {
    this.service.constructArrayOfPlants();
  }

  public changeScreen(screen) {
    this.activeScreen = screen;
    console.log(screen);
  }

  public toUpdate(tenant) {
    this.equipmentToUpdate = tenant;
    console.log(tenant);
  }

}
