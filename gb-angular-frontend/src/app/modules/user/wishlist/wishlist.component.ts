import { Component } from '@angular/core';
import {DecimalPipe, NgForOf, NgIf, TranslationWidth} from '@angular/common';
import {UtilityService} from '../../../services/utility.service';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {Wishlist} from '../../../interfaces/wishlist';
import {Category} from '../../../interfaces/category';
import {PackageItem} from '../../../interfaces/package-item';
import {ProductPackage} from '../../../interfaces/product-package';
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-wishlist',
    imports: [
        NgForOf,
        NgIf,
        DecimalPipe,
        MatProgressBar
    ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  curUserId: number = 0;
  curSymbol: string = '$';
  queryMode: string = '';
  wishlists: Wishlist[] = [];
  selected: Wishlist = {
    wishlist_id: 0,
    user_id: 0,
    product_id: 0,
    product_title: '',
    package_grp_id: 0,
    package_grp_name: '',
    package_id: 0,
    package_name: '',
    product_image: '',
    regular_price: 0,
    sale_price: 0,
    stock_status: '',
    package_item_list: [],
    sell_type: ''
  }
  //mode = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private utilityService: UtilityService
  ) {
    this.curUserId = this.userService.getUserToken().user_id;
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol();
  }

  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist() {
    this.queryMode = 'indeterminate';
    this.userService.getWishlist().subscribe((res) => {
      this.wishlists = res;
      this.queryMode = '';
    });
  }

  showDetails(id: number, sell_type: string) {
    if (sell_type == "S"){
      this.router.navigate(['productdetail', id, "S"]);
    }
    if (sell_type == "G"){
      this.router.navigate(['productdetail', id, "G"]);
    }
    if (sell_type == "P"){
      this.router.navigate(['smartgroup/packagegrid', id]);
    }
  }

  /*addWishlistItem(p :ProductPackage) {
    console.log("===== WishlistComponent - addWishlistItem() : ", p);

    let wishlist: Wishlist = {
      user_id: this.curUserId,
      product_id: p.product_id,
      product_title: p.title,
      regular_price: p.regular_price,
      sale_price: p.sale_price,
      product_image: p.main_image,
      stock_status: p.stock_status
    };
    this.userService.addWishlistItem(wishlist).subscribe((response) => {
      this.utilityService.toastify(response != null, "Item added to wishlist");
      //this.userService.toRefreshCart();
    });
  }*/

  //deleteWishlist(w: Wishlist) {
  removeWishlistItem(wid: any) {
    /*let ww: Wishlist = {
      user_id: w.user_id,
      product_id: w.product_id,
      package_grp_id: w.package_grp_id,
      package_id: w.package_id
    }
    this.userService.deleteWishlist(ww).subscribe(res => {
      this.utilityService.toastify(res, "Removed from wishlist");
      this.getWishlist();
    });*/

    /*this.userService.removeWishlistItem(this.selected.wishlist_id).subscribe((success) => {
      if (success){
        this.utilityService.toastify(success, "Removed from wishlist");
        this.getWishlist();
      }
      else {
        this.utilityService.toastify(false, "", "Deleting wishlist is not support for now");
      }

    });*/
    console.log("===== Home WishlistComponent - removeWishlistItem() : ", wid);

    this.userService.removeWishlistItem(wid).subscribe((response) => {
      this.getWishlist();
      this.utilityService.toastify(response, "Removed item from wishlist");
      //this.userService.toRefreshCart();
    })

    // this.util.toastify(false, "", "Deleteing category is not support for now");
  }



}
