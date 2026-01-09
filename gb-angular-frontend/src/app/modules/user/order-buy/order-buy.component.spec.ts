import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBuyComponent } from './order-buy.component';

describe('OrderComponent', () => {
  let component: OrderBuyComponent;
  let fixture: ComponentFixture<OrderBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderBuyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
