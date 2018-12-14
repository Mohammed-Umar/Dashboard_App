import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { MachinesService } from '../machines.service';

@Component({
  selector: 'app-update-machine',
  templateUrl: './update-machine.component.html',
  styleUrls: ['./update-machine.component.scss']
})
export class UpdateMachineComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  @Input() machine;

  tendentIds: any;

  plantIds: any;

  constructor(private service: MachinesService) { }

  ngOnInit() {
    console.log(this.machine);
    this.getTenantIds();
    this.getPlantIds();
  }

  private getTenantIds() {
    this.tendentIds = this.service.getTenantIds();
  }

  private getPlantIds() {
    this.plantIds = this.service.getPlantIds();
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public onSubmit() {
    this.service.update(this.machine);
    console.log(this.machine);
    this.moveTo('list');
  }

}
