import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DevicesService } from '../devices.service';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss']
})
export class DevicesListComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();
  @Output() needToUpdate = new EventEmitter<any>();

  devices = this.service.list;

  public headers = this.service.headers;

  constructor(private service: DevicesService) { }

  ngOnInit() {
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public update(screen, data) {
    this.needToUpdate.emit(data);
    this.moveTo(screen);
  }

}
