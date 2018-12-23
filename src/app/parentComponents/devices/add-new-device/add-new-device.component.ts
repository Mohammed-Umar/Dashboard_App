import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DevicesService } from '../devices.service';

@Component({
  selector: 'app-add-new-device',
  templateUrl: './add-new-device.component.html',
  styleUrls: ['./add-new-device.component.scss']
})
export class AddNewDeviceComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  @Input() machinesMiniList;

  @Input() plantsMiniList;

  @Input() tenantsNamesList;

  @Input() equipmentsMiniList;

  newDevice: any = {};
  tendentIds;
  plantIds;
  machineIds;
  equipmentIds;

  constructor(private service: DevicesService) { }

  ngOnInit() {
    this.getTenantIds();
    this.getPlantIds();
    this.getMachineIds();
    this.getEquipmentIds();
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public addDevice(obj) {
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

  private getEquipmentIds() {
    this.equipmentIds = this.service.getTenantIds();
  }

  onSubmit() {
    this.addDevice(this.newDevice);
    console.log(this.service.list);
    this.moveTo('list');
  }

}
