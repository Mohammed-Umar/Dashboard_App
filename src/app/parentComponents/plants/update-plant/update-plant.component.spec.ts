import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlantComponent } from './update-plant.component';

describe('UpdatePlantComponent', () => {
  let component: UpdatePlantComponent;
  let fixture: ComponentFixture<UpdatePlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePlantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
