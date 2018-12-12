import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-new-plant',
  templateUrl: './add-new-plant.component.html',
  styleUrls: ['./add-new-plant.component.scss']
})
export class AddNewPlantComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

}
