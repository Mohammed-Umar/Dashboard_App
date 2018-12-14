import { Component, OnInit } from '@angular/core';
import { PlantsService } from './plants.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {

  public activeScreen = 'list';

  public plantToUpdate;

  constructor(private service: PlantsService) { }

  ngOnInit() {
  }

  public changeScreen(screen) {
    this.activeScreen = screen;
    console.log(screen);
  }

  public toUpdate(tenant) {
    this.plantToUpdate = tenant;
    console.log(tenant);
  }

}
