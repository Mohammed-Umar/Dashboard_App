import { Component, OnInit } from '@angular/core';
import { DevicesService } from './devices.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  public activeScreen = 'list';

  public deviceToUpdate;

  constructor(private service: DevicesService) { }

  ngOnInit() {
    this.service.constructArrayOfPlants();
  }

  public changeScreen(screen) {
    this.activeScreen = screen;
    console.log(screen);
  }

  public toUpdate(tenant) {
    this.deviceToUpdate = tenant;
    console.log(tenant);
  }

}
