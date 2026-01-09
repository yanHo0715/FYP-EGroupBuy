import {Component, OnInit} from '@angular/core';
import {UtilityService} from '../../services/utility.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {CartItem} from '../../interfaces/cart-item';
import {FormsModule} from '@angular/forms';
import {OrderDetail} from '../../interfaces/order-detail';
import {Order} from '../../interfaces/order';


@Component({
  selector: 'app-checkout',
  imports: [
    FormsModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  userFirstName: string = '';
  userLastName: string = '';
  userName: string = '';
  userEmail: string = '';
  userPhoneNumber: string = '';
  userAddress: string = '';
  userCity: string = '';
  userCountry: string = '';
  userPostCode: string = '';

  cartItemList: CartItem[] = [];
  cartItemsTotAmt: number = 0;
  // cartTotalAmount: number = 0;
  taxAmount: number = 0;
  taxPercentage: number = 0.2;
  shippingFee: number = 0;
  discountAmount: number = 0;
  orderTotalAmount: number = 0;

  paymentMethod: string = '';
  paymentStatus: string = '';

  cardForm: boolean = false;
  cardNumber: string = '';
  cardHolderName: string = '';
  cardExpiryMM: String = '';
  cardExpiryYYYY: String = '';
  cardExpiryDate: string = '';
  cardCvv: string = '';

  couponCode: string = '';


  deliveryMethod: string = '';
  economyShippingFee: number = 1.5;
  standardShippingFee: number = 3.0;
  expressShippingFee: number = 7.5;


  shippingUserFirstName: string = '';
  shippingUserLastName: string = '';
  shippingEmail: string = '';
  shippingPhoneNumber: string = '';
  shippingAddress: string = '';
  shippingCity: string = '';
  shippingCountry: string = '';
  shippingPostCode: string = '';
  shippingMethod: string = '';
  progressStatus: string = '';

  buyerId: number = 0;
  buyerUsername: string = '';
  sellerId: number = 0;
  sellerUsername: string = '';



  constructor(
    private userService: UserService,
    private router: Router,
    private utilityService: UtilityService,
  ) { }

  ngOnInit() {
    this.userName = this.userService.getUser().username;
    this.userEmail = this.userService.getUser().email;
    this.getItemsInCart();
  }

  getItemsInCart() {

    this.userService.getItemsInCart().subscribe((response) => {

      // this.cartTotalAmount = 0;
      this.cartItemList = response;

      console.log("===== CheckoutComponent - getItemsInCart() : ", this.cartItemList);

      for (let item of this.cartItemList) {
        this.cartItemsTotAmt += item.sub_Total;
        // this.cartTotalAmount += item.sub_Total;
      }

      this.taxAmount = this.cartItemsTotAmt * this.taxPercentage;
      this.orderAmountCalculation();
    });

  }

  orderAmountCalculation() {

    this.orderTotalAmount = this.cartItemsTotAmt + this.shippingFee + this.taxAmount - this.discountAmount;

  }

  onSelectDeliveryAddress(s:any) {
    console.log("===== CheckoutComponent - onSelectDeliveryAddress() : ", s.target.checked);

    if (s.target.checked) {

      this.shippingUserFirstName = this.userFirstName;
      this.shippingUserLastName = this.userLastName;
      this.shippingAddress = this.userAddress;
      this.shippingCity = this.userCity;
      this.shippingCountry = this.userCountry;
      this.shippingPostCode = this.userPostCode;
      this.shippingEmail = this.userEmail;
      this.shippingPhoneNumber = this.userPhoneNumber;

    } else {

      this.shippingUserFirstName = '';
      this.shippingUserLastName = '';
      this.shippingAddress = '';
      this.shippingCity = '';
      this.shippingCountry = '';
      this.shippingPostCode = '';
      this.shippingEmail = '';
      this.shippingPhoneNumber = '';

    }

  }

  onSelectShippingType(t: string) {

    this.shippingFee = 0

    if (t == 'economy') {
      this.shippingFee = this.economyShippingFee;
    }

    if (t == 'standard') {
      this.shippingFee = this.standardShippingFee;
    }

    if (t == 'express') {
      this.shippingFee = this.expressShippingFee;
    }

    this.shippingMethod = t;
    this.orderAmountCalculation();

  }

  onCreateOrder() {
    console.log("===== CheckoutComponent - onCreateOrder() ");

    // let today: Date = new Date();
    let currentDate: string = new Date().toISOString().substring(0, 10);

    if (this.isValidInput()) {

      let orderDetailList: OrderDetail[] = [];

      for (let cartItem of this.cartItemList) {
        let orderDetail: OrderDetail = {
          product_id: cartItem.product_id,
          seller_id: cartItem.seller_id as any,
          seller_username: cartItem.seller_username as any,
          product_title: cartItem.product_title,
          product_unit_price: cartItem.unit_price,
          product_image_url: cartItem.item_image_url,
          status: 'Pending',
          quantity: cartItem.quantity,
          sub_total: cartItem.sub_Total,
          delivery_date: currentDate,
          sell_type: cartItem.sell_type,
          package_grp_id: cartItem.package_grp_id,
          package_grp_name: cartItem.package_grp_name,
          package_id: cartItem.package_id,
          package_name: cartItem.package_name,
          package_item_list: cartItem.package_item_list,
          grpbuy_end: cartItem.grpbuy_end

        }
        orderDetailList.push(orderDetail);
      }

      let order: Order = {
        order_date: currentDate,
        sub_total: this.cartItemsTotAmt,
        shipping_fee: this.shippingFee,
        tax: this.taxAmount,
        order_total: this.orderTotalAmount,
        shipping_firstname: this.shippingUserFirstName,
        shipping_lastname: this.shippingUserLastName,
        shipping_email: this.shippingEmail,
        shipping_phone: this.shippingPhoneNumber,
        shipping_address: this.shippingAddress,
        shipping_country: this.shippingCountry,
        shipping_post_code: this.shippingPostCode,
        payment_status: '',
        payment_method: 'Card',
        progress_status: 'Processing',
        buyer_id: this.userService.getUser().user_id,
        buyer_username: this.userService.getUser().username,
        buyer_email: this.userEmail,
        buyer_firstname: this.userFirstName,
        buyer_lastname: this.userLastName,
        buyer_phone: this.userPhoneNumber,
        buyer_address: this.userAddress,
        buyer_country: this.userCountry,
        buyer_post_code: this.userPostCode,
        seller_id: this.sellerId,
        seller_username: this.sellerUsername,
        product_id: 0,
        product_title: '',
        package_id: 0,
        package_name: '',
        quantity:0,
        shipping_method: this.shippingMethod,
        card_holder_name: this.cardHolderName,
        card_number: this.cardNumber,
        card_expiry_date: this.cardExpiryMM + '/' + this.cardExpiryYYYY,
        card_cvv: this.cardCvv,
        order_detail_list: orderDetailList,
        gateway_fee: 0

      }

      console.log("===== CheckoutComponent - onCreateOrder() order : ", order);

      this.userService.createOrder(order).subscribe((order) => {
        if (order != null) {
          this.utilityService.toastify(true, "Order Placed Successfully");
          // this.router.navigate(['../invoice', order.id]);
          // this.router.navigate(['smartgroup/productgrid'])
          this.router.navigate(['smartgroup/invoice', order.order_id]);
          this.userService.toRefreshCart();
        } else {
          this.utilityService.toastify(false);
        }
      });

    } else {
      this.utilityService.toastify(false, "", "Check all fields required")
    }

  }


  isValidInput(): boolean {
/*    if (
      this.shippingStreet == '' ||
      this.shippingCity == 'Select District' ||
      this.shippingCity == '' ||
      this.shippingPostCode == '' ||
      this.shippingState == 'Select Division' ||
      this.shippingState == '' ||
      this.paymentMethod == '' ||
      (
        this.cardForm && (
          this.cardHolderName == '' ||
          this.cardNumber == '' ||
          this.cardCvv == '' ||
          this.cardExpiryDate == ''
        )
      )
    ) {
      return false;
    }*/
    return true;
  }
}
