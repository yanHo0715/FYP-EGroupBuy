import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupbuyEventComponent } from './groupbuy-event.component';

describe('GroupbuyEventComponent', () => {
  let component: GroupbuyEventComponent;
  let fixture: ComponentFixture<GroupbuyEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupbuyEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupbuyEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
