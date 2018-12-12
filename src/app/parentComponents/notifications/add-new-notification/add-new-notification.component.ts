import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-new-notification',
  templateUrl: './add-new-notification.component.html',
  styleUrls: ['./add-new-notification.component.scss']
})
export class AddNewNotificationComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

}
