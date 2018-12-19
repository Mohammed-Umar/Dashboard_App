import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { MachinesService } from '../machines.service';

@Component({
  selector: 'app-add-new-machine',
  templateUrl: './add-new-machine.component.html',
  styleUrls: ['./add-new-machine.component.scss']
})
export class AddNewMachineComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  @Input() tenanteNamesList;

  @Input() plantsMiniList;

  public plantsNamesList;

  newMachine: any = {};

  public tenantSelected;

  public plantSelected;

  constructor(private service: MachinesService) { }

  ngOnInit() {
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public addMachine(obj) {
    this.service.createTenant(obj, this.tenantSelected, this.plantSelected);
    console.log(obj);
  }

  onSubmit() {
    this.addMachine(this.newMachine);
    this.moveTo('list');
  }

  // Generating cascading list
  onTenantSelection() {
    const selectedTenant = this.tenantSelected;
    const selectedTenantID = selectedTenant.id;
    console.log(selectedTenantID);
    console.log(this.plantsMiniList);
    const plantsList = this.plantsMiniList.filter( plant => plant.tenantID === selectedTenantID)
    console.log(plantsList);
    this.plantsNamesList = plantsList;
  }

  onPlantSelection() {
    console.log('Selected plant ID is', this.plantSelected.id)
  }

}
