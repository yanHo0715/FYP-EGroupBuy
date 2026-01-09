import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddPackagesComponent } from './product-add-packages.component';

describe('CdkDragDropConnectedSortingGroupComponent', () => {
  let component: ProductAddPackagesComponent;
  let fixture: ComponentFixture<ProductAddPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAddPackagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAddPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
