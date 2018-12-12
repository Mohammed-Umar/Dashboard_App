import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-new-equipment',
  templateUrl: './add-new-equipment.component.html',
  styleUrls: ['./add-new-equipment.component.scss']
})
export class AddNewEquipmentComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

}
