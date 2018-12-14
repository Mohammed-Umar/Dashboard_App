import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EquipmentsService } from '../equipments.service';

@Component({
  selector: 'app-add-new-equipment',
  templateUrl: './add-new-equipment.component.html',
  styleUrls: ['./add-new-equipment.component.scss']
})
export class AddNewEquipmentComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  newEquipment: Object = {};
  tendentIds;
  plantIds;
  machineIds;

  constructor(private service: EquipmentsService) { }

  ngOnInit() {
    this.getTenantIds();
    this.getPlantIds();
    this.getMachineIds();
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public addEquipment(obj) {
    this.service.addNew(obj);
    console.log(obj);
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

  onSubmit() {
    this.addEquipment(this.newEquipment);
    console.log(this.service.list);
    this.moveTo('list');
  }
}
