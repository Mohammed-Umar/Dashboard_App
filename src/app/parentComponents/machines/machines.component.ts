
import { Component, OnInit } from '@angular/core';
import { MachinesService } from './machines.service';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {

  public activeScreen = 'list';

  public machineToUpdate;

  constructor(private service: MachinesService) { }

  ngOnInit() {
    this.service.constructArrayOfPlants();
  }

  public changeScreen(screen) {
    this.activeScreen = screen;
    console.log(screen);
  }

  public toUpdate(tenant) {
    this.machineToUpdate = tenant;
    console.log(tenant);
  }

}
