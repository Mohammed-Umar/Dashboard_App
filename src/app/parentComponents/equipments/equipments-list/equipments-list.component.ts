import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EquipmentsService } from '../equipments.service';

@Component({
  selector: 'app-equipments-list',
  templateUrl: './equipments-list.component.html',
  styleUrls: ['./equipments-list.component.scss']
})
export class EquipmentsListComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();
  @Output() needToUpdate = new EventEmitter<any>();

  equipments = this.service.list;

  public headers = this.service.headers;

  constructor(private service: EquipmentsService) { }

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
