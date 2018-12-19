import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DevicesService } from '../devices.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  @Output() needToUpdate = new EventEmitter<any>();

  @Input() plant;

  constructor(private service: DevicesService) { }

  ngOnInit() {
    console.log(this.plant)
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public update(screen) {
    this.needToUpdate.emit(this.plant);
    this.moveTo(screen);
  }

  public delete(screen) {
    // this.service.delete(this.plant.id);
    this.moveTo(screen);
  }

}
