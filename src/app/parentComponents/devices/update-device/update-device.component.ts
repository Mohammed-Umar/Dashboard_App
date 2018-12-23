import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DevicesService } from '../devices.service';

@Component({
  selector: 'app-update-device',
  templateUrl: './update-device.component.html',
  styleUrls: ['./update-device.component.scss']
})
export class UpdateDeviceComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  @Input() device;

  @Input() tenantsNamesList;

  @Input() plantsMiniList;

  @Input() machinesMiniList;

  @Input() equipmentsMiniList;

  public tenantSelected;

  public plantSelected;

  public machineSelected;

  public equipmentSelected;

  tendentIds: any;
  plantIds;
  machineIds;
  equipmentIds;

  constructor(private service: DevicesService) { }

  ngOnInit() {
    console.log(this.device);
    this.getTenantIds();
    this.getPlantIds();
    this.getMachineIds();
    this.getEquipmentIds();
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

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  // public onSubmit() {
  //   this.service.update(this.device);
  //   console.log(this.device);
  //   this.moveTo('list');
  // }

  public onSubmit() {
    this.service.update(this.device, this.tenantSelected, this.plantSelected, this.machineSelected, this.equipmentSelected);
    console.log(this.device);
    this.moveTo('list');
  }

}
