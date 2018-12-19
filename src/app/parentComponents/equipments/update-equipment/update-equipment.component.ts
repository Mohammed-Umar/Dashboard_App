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

  @Input() tenantsNamesList;

  @Input() plantsMiniList;

  @Input() machinesMiniList;

  public tenantSelected;

  public plantSelected;

  public machineSelected;

  tendentIds: any;

  plantIds: any;

  machineIds: any;

  public isCritical;

  constructor(private service: EquipmentsService) { }

  ngOnInit() {
    console.log(this.equipment);
    this.tenantSelected = this.equipment.tenant_id;
    this.plantSelected = this.equipment.plant_id;
    this.machineSelected = this.equipment.machine_id;
    this.isCritical = this.equipment.is_critical;
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public onSubmit() {
    this.service.update(this.equipment, this.tenantSelected, this.plantSelected, this.machineSelected);
    console.log(this.equipment);
    this.moveTo('list');
  }

}
