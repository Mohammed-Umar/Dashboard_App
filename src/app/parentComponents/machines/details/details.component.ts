import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { MachinesService } from '../machines.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  @Output() needToUpdate = new EventEmitter<any>();

  @Input() machine;

  constructor(private service: MachinesService) { }

  ngOnInit() {
    console.log(this.machine)
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public update(screen) {
    this.needToUpdate.emit(this.machine);
    this.moveTo(screen);
  }

  public delete(screen) {
    this.service.delete(this.machine.id);
    this.moveTo(screen);
  }

}
