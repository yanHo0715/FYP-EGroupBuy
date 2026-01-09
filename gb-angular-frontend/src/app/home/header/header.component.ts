import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {UtilityService} from '../../services/utility.service';
import {Subscription} from 'rxjs';
import {CartItem} from '../../interfaces/cart-item';
import {NgForOf, NgIf} from '@angular/common';
import {Category} from '../../interfaces/category';
import {CategoryService} from '../../services/category.service';
import {Wishlist} from '../../interfaces/wishlist';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './header.component.html',
  // styleUrl: './header.component.scss'
  styleUrls:['./header.component.scss', '../home.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userID: number = 0;
  userfirstName: string = '';
  userlastName: string = '';
  ngHostUrl: string = '';
  springHostUrl: string = '';
  cartItemList: CartItem[] = [];
  cartTotal: number = 0;
  curSymbol: string = '$';
  searchValue: string = '';

  wishlistList: Wishlist[] = [];

  categories: Category[] = [];
  selected: Category = {
    category_id: 0,
    category_name: '',
    description: '',
    icon: '',
    parent_id: 0
  }
  mode = '';

  private currentCart: Subscription;

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private router: Router,
    private utilityService: UtilityService
  ) {
    // this.userfirstName = userService.getUser().firstname;
    // this.userlastName = userService.getUser().lastname;

      this.currentCart = userService.parentMethodCalled$.subscribe(data => {
      this.getItemsInCart();
    });
  }

  ngOnInit(): void {
    this.getItemsInCart();
    this.getAllCategory();
    this.getWishlist();
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol();
  }

  ngOnDestroy(): void {
    this.currentCart.unsubscribe();
  }

  getItemsInCart() {

    this.userService.getItemsInCart().subscribe((response) => {

      this.cartTotal = 0;
      this.cartItemList = response;

      console.log("===== Home HeaderComponent - getItemsInCart() : ", this.cartItemList);
      // console.log("===== Home HeaderComponent - this.cartItemList.length: ", this.cartItemList.length);


      if (this.cartItemList.length) {
        for (let item of this.cartItemList) {
          this.cartTotal += item.sub_Total;
        }
      } else {
        this.cartItemList = [];
        // console.log("===== Home HeaderComponent - this.cartItemList = [] : ", this.cartItemList.length);
      }

    });
  }

  onRemoveCartItem(cid: any) {

    // console.log("===== Home HeaderComponent - onRemoveCartItem() : ", cid);

    this.userService.removeCartItem(cid).subscribe((response) => {
      this.getItemsInCart();
      this.utilityService.toastify(response, "Removed item from cart");
      this.userService.toRefreshCart();
    })
  }

  getAllCategory() {
    this.categoryService.getAllCategories().subscribe((c) => {
      this.categories = c;
      // console.log(this.categories);
    });
  }

  getWishlist() {

    this.userService.getWishlist().subscribe((response) => {

      this.wishlistList = response;

      console.log("===== Home HeaderComponent - getWishlist() : ", this.wishlistList);
      // console.log("===== Home HeaderComponent - this.wishlistList.length: ", this.wishlistList.length);


    });
  }

  removeWishlistItem(wid: any) {

    // console.log("===== Home HeaderComponent - removeWishlistItem() : ", wid);

    this.userService.removeWishlistItem(wid).subscribe((response) => {
      this.getWishlist();
      this.utilityService.toastify(response, "Removed item from wishlist");
      //this.userService.toRefreshCart();
    })
  }

  selectCategory(cid: number) {
    this.categoryService.setSelectedCategoryId(cid);
  }

  searchProducts(){
    this.userService.setSearchValue(this.searchValue);
    this.router.navigate(['/smartgroup/productgrid']);
  }
}
