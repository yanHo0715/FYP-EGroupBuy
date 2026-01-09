import {Component, OnInit} from '@angular/core';
import {CartItem} from '../../interfaces/cart-item';
import {UserService} from '../../services/user.service';
import {UtilityService} from '../../services/utility.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  cartTotalAmount: number = 0;
  cartItemList: CartItem[] = [];
  curSymbol: string = '$'

  constructor(private userService: UserService, private utilityService: UtilityService) {

  }

  ngOnInit(): void {
    this.getItemsInCart();
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol()

  }

  getItemsInCart() {

    this.userService.getItemsInCart().subscribe((response) => {

      this.cartTotalAmount = 0;
      this.cartItemList = response;

      console.log("===== Cart Component - getItemsInCart() : ", this.cartItemList);


      for (let item of this.cartItemList) {
        this.cartTotalAmount += item.sub_Total;
      }

    });
  }


  onRemoveCartItem(cid: any) {

    console.log("===== Home HeaderComponent - onRemoveCartItem() : ", cid);

    this.userService.removeCartItem(cid).subscribe((response) => {
      this.getItemsInCart();
      this.utilityService.toastify(response, "Removed item from cart");
      this.userService.toRefreshCart();
    })
  }

  updateQuantity(qty:any, item: CartItem): void {

    console.log("===== CartComponent - updateQuantity() : ", qty.target.value);

    item.quantity = qty.target.value
    item.sub_Total = item.unit_price * item.quantity;

    this.userService.updateCartItem(item).subscribe((response) => {
      if (response) {
        this.getItemsInCart();
        this.userService.toRefreshCart();
        this.utilityService.toastify(response, "Quantity Update successfully!", "Quantity update failed!");
      } else {
        this.utilityService.toastify(response, "Quantity Update successfully!", "Quantity update failed!");
      }
    });

  }

}
