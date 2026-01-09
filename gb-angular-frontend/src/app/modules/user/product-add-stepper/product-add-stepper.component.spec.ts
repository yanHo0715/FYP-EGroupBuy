import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddStepperComponent } from './product-add-stepper.component';

describe('Stepper01Component', () => {
  let component: ProductAddStepperComponent;
  let fixture: ComponentFixture<ProductAddStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAddStepperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAddStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
