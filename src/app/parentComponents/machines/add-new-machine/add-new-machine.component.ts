import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-new-machine',
  templateUrl: './add-new-machine.component.html',
  styleUrls: ['./add-new-machine.component.scss']
})
export class AddNewMachineComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

}
