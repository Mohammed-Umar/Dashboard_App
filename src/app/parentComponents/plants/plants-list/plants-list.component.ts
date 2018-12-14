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

  public headers = this.service.headers;

  constructor(private service: PlantsService) { }

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
