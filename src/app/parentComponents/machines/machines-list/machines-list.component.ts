import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MachinesService } from '../machines.service';

@Component({
  selector: 'app-machines-list',
  templateUrl: './machines-list.component.html',
  styleUrls: ['./machines-list.component.scss']
})
export class MachinesListComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();
  @Output() needToUpdate = new EventEmitter<any>();

  machines = this.service.list;

  public headers = this.service.headers;

  constructor(private service: MachinesService) { }

  ngOnInit() {
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public update(screen, data) {
    this.needToUpdate.emit(data);
    this.moveTo(screen);
  }
}
