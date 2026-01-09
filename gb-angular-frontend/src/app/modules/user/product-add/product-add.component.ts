import { Component } from '@angular/core';
import {ProductAddStepperComponent} from "../product-add-stepper/product-add-stepper.component";

@Component({
  selector: 'app-product-add',
    imports: [
        ProductAddStepperComponent
    ],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss'
})
export class ProductAddComponent {

}
