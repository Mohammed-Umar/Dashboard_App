import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-update-plant',
  templateUrl: './update-plant.component.html',
  styleUrls: ['./update-plant.component.scss']
})
export class UpdatePlantComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

}
