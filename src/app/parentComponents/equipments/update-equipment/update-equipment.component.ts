import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { EquipmentsService } from '../equipments.service';

@Component({
  selector: 'app-update-equipment',
  templateUrl: './update-equipment.component.html',
  styleUrls: ['./update-equipment.component.scss']
})
export class UpdateEquipmentComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  @Input() equipment;

  tendentIds: any;

  plantIds: any;

  machineIds: any;

  constructor(private service: EquipmentsService) { }

  ngOnInit() {
    console.log(this.equipment);
    this.getTenantIds();
    this.getPlantIds();
    this.getMachineIds();
  }

  private getTenantIds() {
    this.tendentIds = this.service.getTenantIds();
  }

  private getPlantIds() {
    this.plantIds = this.service.getTenantIds();
  }

  private getMachineIds() {
    this.machineIds = this.service.getTenantIds();
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public onSubmit() {
    this.service.update(this.equipment);
    console.log(this.equipment);
    this.moveTo('list');
  }

}
