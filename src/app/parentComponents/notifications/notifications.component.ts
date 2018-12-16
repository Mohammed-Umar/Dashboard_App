import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  public activeScreen = 'list';

  constructor() { }

  ngOnInit() {
  }

  public changeScreen(screen) {
    this.activeScreen = screen;
  }

}