import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-new-tenant',
  templateUrl: './add-new-tenant.component.html',
  styleUrls: ['./add-new-tenant.component.scss']
})
export class AddNewTenantComponent implements OnInit {

  @Output() changeScreen = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  public moveTo(screen) {
    this.changeScreen.emit(screen);
  }

}
