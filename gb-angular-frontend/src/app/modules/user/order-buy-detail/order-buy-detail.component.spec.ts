import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyDetailComponent } from './order-buy-detail.component';

describe('OrderDetailComponent', () => {
  let component: OrderBuyDetailComponent;
  let fixture: ComponentFixture<OrderBuyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderBuyDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderBuyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
