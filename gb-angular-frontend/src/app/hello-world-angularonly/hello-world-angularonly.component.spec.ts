import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloWorldAngularonlyComponent } from './hello-world-angularonly.component';

describe('HelloWorldAngularonlyComponent', () => {
  let component: HelloWorldAngularonlyComponent;
  let fixture: ComponentFixture<HelloWorldAngularonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelloWorldAngularonlyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelloWorldAngularonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
