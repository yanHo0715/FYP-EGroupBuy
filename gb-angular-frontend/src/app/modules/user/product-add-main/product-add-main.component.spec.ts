import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddMainComponent } from './product-add-main.component';

describe('ProductAddNewComponent', () => {
  let component: ProductAddMainComponent;
  let fixture: ComponentFixture<ProductAddMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAddMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAddMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
