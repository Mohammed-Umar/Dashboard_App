import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlantsService } from '../plants.service';

@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: ['./plants-list.component.scss']
})
export class PlantsListComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();
  @Output() needToUpdate = new EventEmitter<any>();

  plants = this.service.list;

  public headers = ['Id', 'Name', 'Description', 'Additional Info'];

  constructor(private service: PlantsService) { }

  ngOnInit() {
  }

  public moveTo(screen, data) {
    this.needToUpdate.emit(data);
    this.changeScreen.emit(screen);
  }
}
