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

  @Input() tenanteNamesList;

  @Input() plantNamesList;

  public tenantSelected;

  public plantSelected;

  tendentIds: any;

  plantIds: any;

  constructor(private service: MachinesService) { }

  ngOnInit() {
    console.log(this.machine);
    this.tenantSelected = this.machine.tenant_id;
    this.plantSelected = this.machine.plant_id;
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public onSubmit() {
    this.service.update(this.machine, this.tenantSelected, this.plantSelected);
    console.log(this.machine);
    this.moveTo('list');
  }

}
