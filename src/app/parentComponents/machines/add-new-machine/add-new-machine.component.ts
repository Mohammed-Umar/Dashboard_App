import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MachinesService } from '../machines.service';

@Component({
  selector: 'app-add-new-machine',
  templateUrl: './add-new-machine.component.html',
  styleUrls: ['./add-new-machine.component.scss']
})
export class AddNewMachineComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  newMachine: any = {};
  tendentIds;
  plantIds;

  constructor(private service: MachinesService) { }

  ngOnInit() {
    this.getTenantIds();
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public addMachine(obj) {
    this.service.addNew(obj);
    console.log(obj);
  }

  private getTenantIds() {
    this.tendentIds = this.service.getTenantIds();
  }

  private getPlantIds() {
    this.plantIds = this.service.getPlantIds();
  }

  onSubmit() {
    this.addMachine(this.newMachine);
    console.log(this.service.list);
    this.moveTo('list');
  }

}
