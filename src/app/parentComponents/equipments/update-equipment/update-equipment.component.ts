import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-update-equipment',
  templateUrl: './update-equipment.component.html',
  styleUrls: ['./update-equipment.component.scss']
})
export class UpdateEquipmentComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

}
