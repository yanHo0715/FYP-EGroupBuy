import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailSuccessComponent } from './mail-success.component';

describe('MailSuccessComponent', () => {
  let component: MailSuccessComponent;
  let fixture: ComponentFixture<MailSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
