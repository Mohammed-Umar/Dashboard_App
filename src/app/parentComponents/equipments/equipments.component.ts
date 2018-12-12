import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit {

  public activeScreen = 'list';

  constructor() { }

  ngOnInit() {
  }

  public changeScreen(screen) {
    this.activeScreen = screen;
  }

}
