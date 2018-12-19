import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { EquipmentsService } from '../equipments.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  @Output() needToUpdate = new EventEmitter<any>();

  @Input() equipment;

  constructor(private service: EquipmentsService) { }

  ngOnInit() {
    console.log(this.equipment)
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public update(screen) {
    this.needToUpdate.emit(this.equipment);
    this.moveTo(screen);
  }

  public delete(screen) {
    this.service.delete(this.equipment.id);
    this.moveTo(screen);
  }

}
