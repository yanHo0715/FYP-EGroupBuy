import { Component } from '@angular/core';
import {ProductAddStepperComponent} from '../../user/product-add-stepper/product-add-stepper.component';

@Component({
  selector: 'app-productedit',
  imports: [
    ProductAddStepperComponent
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent {

}
