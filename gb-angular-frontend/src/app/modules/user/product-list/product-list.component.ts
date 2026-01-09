import { Component } from '@angular/core';
import {UtilityService} from '../../../services/utility.service';
import {UserService} from '../../../services/user.service';
import {AdminService} from '../../../services/admin.service';
import {Product} from '../../../interfaces/product';
import {Router, RouterLink} from '@angular/router';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {MatProgressBar} from '@angular/material/progress-bar';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    MatProgressBar,
    FormsModule,
    DecimalPipe
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  productList: Product[] = [];
  curSymbol: string = '$';
  queryMode: string = '';

  constructor(
    private userService: UserService,
    private utilityService: UtilityService,
    private router: Router
  ) {
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol()
  }


  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.queryMode = 'indeterminate';
    this.userService.getProductList().subscribe((response) => {
      this.productList = response;
      console.log("===== User ProductListComponent - getProductList() : ", this.productList);
      this.queryMode = '';
    });
  }

  onDelete(id: number) {
    let isToDel = confirm("Are you sure to delete the product?");
    if (isToDel) {
      this.userService.deleteProduct(id).subscribe((response) => {
        this.getProductList();
        this.utilityService.toastify(response, "Product Deleted!");
      });
    }
  }

  onSearch(e : any) {
    if (e.target.value) {
      this.queryMode = 'indeterminate';
      this.userService.getSearchProductList(e.target.value).subscribe((response) => {
        this.productList = response;
        this.queryMode = '';
        console.log("===== User ProductListComponent - onSearch() : ", e);
      });
    } else {
      this.getProductList();
    }

  }

  onAddPackageItem(prod: Product) {
    this.router.navigate(['customer/home/packageadd', prod]);
  }

  onEditProductMain(pid: number) {
    this.router.navigate(['customer/home/producteditmain', pid]);
  }

}
