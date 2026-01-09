import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupbuyListComponent } from './groupbuy-list.component';

describe('GroupbuyListComponent', () => {
  let component: GroupbuyListComponent;
  let fixture: ComponentFixture<GroupbuyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupbuyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupbuyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
