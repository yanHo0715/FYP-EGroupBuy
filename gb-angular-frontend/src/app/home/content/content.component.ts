import {Component} from '@angular/core';
import {ProductindexComponent} from '../product-index/productindex.component';


@Component({
  selector: 'app-content',
  imports: [
    ProductindexComponent
  ],
  templateUrl: './content.component.html',
  // styleUrl: './content.component.scss'
  styleUrls:['./content.component.scss', '../home.component.scss']
})

export class ContentComponent {
}
