import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddItemsComponent } from './product-add-items.component';

describe('MatTableAddProductItemComponent', () => {
  let component: ProductAddItemsComponent;
  let fixture: ComponentFixture<ProductAddItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAddItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAddItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
