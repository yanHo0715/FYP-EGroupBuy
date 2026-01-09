import {Component, OnInit} from '@angular/core';

import {UtilityService} from '../../../services/utility.service';
import {Product} from '../../../interfaces/product';
import {AdminService} from '../../../services/admin.service';
import {FormsModule} from '@angular/forms';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-product-list',
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    MatProgressBar,
    DecimalPipe
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  curSymbol: string = '$';
  queryMode: string = '';

  constructor(
    private adminService: AdminService,
    private utilityService: UtilityService
  ) {
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol()
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  products: Product[] = [];

  getAllProducts() {
    this.queryMode = 'indeterminate';
    this.adminService.getAllProducts().subscribe((p) => {
      this.products = p;
      this.queryMode = '';
    });
  }

  onSearch(e : any) {
    if (e.target.value) {
      this.queryMode = 'indeterminate';
      this.adminService.getSearchAllProducts(e.target.value).subscribe((response) => {
        this.products = response;
        this.queryMode = '';
        console.log("===== Admin ProductListComponent - onSearch() : ", e);
      });
    } else {
      this.getAllProducts();
    }

  }

  updateProduct(p: Product, s: string) {
    p.status = s;
    this.adminService.updateProduct(p).subscribe((p) => {
      if(p != null) {
        this.utilityService.toastify(true, "Product Updated");
      } else {
        this.utilityService.toastify(false);
      }
    });
  }
}
