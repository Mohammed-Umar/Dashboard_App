import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { MachinesService } from '../machines.service';

@Component({
  selector: 'app-machines-list',
  templateUrl: './machines-list.component.html',
  styleUrls: ['./machines-list.component.scss']
})
export class MachinesListComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();
  @Output() needToUpdate = new EventEmitter<any>();
  @Output() showDetails = new EventEmitter<any>();

  @Input() tenanteNamesList;
  @Input() plantsMiniList;
  @Input() preSelectedList;


  public machines;

  public mainMachinesList;

  public tenantSelected = null;

  public plantSelected = null;

  public plantsNamesList;

  public showlist = false;

  public headers = this.service.headers;

  public userListSelection;

  constructor(private service: MachinesService) { }

  ngOnInit() {
    this.service.getTenants();
    this.service.machinesList.subscribe(list => {
      this.mainMachinesList = list;
      console.log(list);
      this.checkPreSelection();
    });
  }

  checkPreSelection() {
    if (this.preSelectedList !== undefined) {
      console.log('preSelectedList is not undefined')
      this.tenantSelected = this.preSelectedList.tenantID;
      this.plantSelected = this.preSelectedList.plantID;
      this.generateFilteredMachines(this.preSelectedList.tenantID, this.preSelectedList.plantID);
    } else {
    console.log('preSelectedList is undefined')
    }
  }

  optionsSelected() {
    console.log(this.tenantSelected);
    const tenantID = this.tenantSelected.id;
    const plantID = this.plantSelected.id;
    const filteredList = this.mainMachinesList.filter( obj => obj.tenant_id === tenantID && obj.plant_id === plantID);
    console.log(filteredList);
    this.machines = filteredList;
    this.showlist = true;
    this.userListSelection = { 'tenantID': this.tenantSelected.id, 'plantID': this.plantSelected.id };
    // this.tenantSelected
  }

  onTenantSelection() {
    const selectedTenant = this.tenantSelected;
    const selectedTenantID = selectedTenant.id;
    console.log(selectedTenantID);
    console.log(this.plantsMiniList);
    const plantsList = this.plantsMiniList.filter( plant => plant.tenantID === selectedTenantID)
    console.log(plantsList);
    this.plantsNamesList = plantsList;
  }

  generateFilteredMachines(tenantID, plantID) {
    const filteredList = this.mainMachinesList.filter( obj => obj.tenant_id === tenantID && obj.plant_id === plantID);
    this.machines = filteredList;
    this.showlist = true;
    // this.userListSelection = { 'tenantID': this.tenantSelected.id, 'plantID': this.plantSelected.id };
  }

  public moveTo(screen) {
    const obj = { 'screen': screen, 'userListSelection': this.userListSelection };
    this.changeScreen.emit(obj);
  }

  public update(screen, data) {
    this.needToUpdate.emit(data);
    this.moveTo(screen);
  }

  public openDetails(screen, data) {
    this.showDetails.emit(data);
    this.moveTo(screen);
  }

  delete(screen, tenant) {
    this.moveTo(screen);
    this.service.delete(tenant.id);
  }
}
