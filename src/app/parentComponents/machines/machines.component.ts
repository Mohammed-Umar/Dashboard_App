
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {

  public activeScreen = 'list';

  constructor() { }

  ngOnInit() {
  }

  public changeScreen(screen) {
    this.activeScreen = screen;
  }

}
