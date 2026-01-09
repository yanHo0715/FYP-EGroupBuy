import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageAddStepperComponent } from './package-add-stepper.component';

describe('PackageAddStepperComponent', () => {
  let component: PackageAddStepperComponent;
  let fixture: ComponentFixture<PackageAddStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageAddStepperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageAddStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
