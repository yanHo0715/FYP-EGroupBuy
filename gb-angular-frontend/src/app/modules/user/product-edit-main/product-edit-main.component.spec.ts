import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditMainComponent } from './product-edit-main.component';

describe('ProductEditMainComponent', () => {
  let component: ProductEditMainComponent;
  let fixture: ComponentFixture<ProductEditMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductEditMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductEditMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
