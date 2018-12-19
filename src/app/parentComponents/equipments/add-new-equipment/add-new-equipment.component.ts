import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { EquipmentsService } from '../equipments.service';

@Component({
  selector: 'app-add-new-equipment',
  templateUrl: './add-new-equipment.component.html',
  styleUrls: ['./add-new-equipment.component.scss']
})
export class AddNewEquipmentComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  @Input() machinesMiniList;

  @Input() plantsMiniList;

  @Input() tenantsNamesList;

  public plantsNamesList;

  public machinesNamesList;

  newEquipment: any = {};

  public tenantSelected;

  public plantSelected;

  public machineSelected;

  public isCritical = false;

  public labelPosition = 'before';

  constructor(private service: EquipmentsService) { }

  ngOnInit() {
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

  public addEquipment(obj) {
    obj.is_critical = this.isCritical;
    this.service.createTenant(obj, this.tenantSelected, this.plantSelected, this.machineSelected);
    console.log(obj);
  }

  onSubmit() {
    this.addEquipment(this.newEquipment);
    this.moveTo('list');
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

  onPlantSelection() {
    const selectedPlant = this.plantSelected;
    const selectedPlantID = selectedPlant.id;
    console.log(selectedPlantID);
    console.log(this.machinesMiniList);
    const machinesList = this.machinesMiniList.filter(machine => machine.plantID === selectedPlantID)
    console.log(machinesList);
    this.machinesNamesList = machinesList;
  }

  onMachineSelection() {
    console.log('Selected Machine ID is', this.machineSelected.id)
  }
}
