import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloWorldAngularspringbootComponent } from './hello-world-angularspringboot.component';

describe('HelloWorldAngularspringbootComponent', () => {
  let component: HelloWorldAngularspringbootComponent;
  let fixture: ComponentFixture<HelloWorldAngularspringbootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelloWorldAngularspringbootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelloWorldAngularspringbootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
