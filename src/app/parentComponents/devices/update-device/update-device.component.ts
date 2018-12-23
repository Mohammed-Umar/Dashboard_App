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

  public isMapped: boolean;

  constructor(private service: DevicesService) { }

  ngOnInit() {
    console.log(this.device);
    this.isMapped = this.device.isMapped;
    this.tenantSelected = this.device.tenant_id;
    this.plantSelected = this.device.plant_id;
    this.machineSelected = this.device.machine_id;
    this.equipmentSelected = this.device.equipment_id;
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
