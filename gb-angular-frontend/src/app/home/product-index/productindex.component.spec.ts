import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductindexComponent } from './productindex.component';

describe('ProductindexComponent', () => {
  let component: ProductindexComponent;
  let fixture: ComponentFixture<ProductindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductindexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
