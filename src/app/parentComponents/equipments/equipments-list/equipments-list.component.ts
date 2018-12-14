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

  public headers = ['Id', 'Name', 'Description', 'Additional Info'];

  constructor(private service: EquipmentsService) { }

  ngOnInit() {
  }

  public moveTo(screen, data) {
    this.needToUpdate.emit(data);
    this.changeScreen.emit(screen);
  }

}
