import {Component, OnInit} from '@angular/core';
import {OrderDetail} from '../../../interfaces/order-detail';
import {UserService} from '../../../services/user.service';
import {UtilityService} from '../../../services/utility.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../../../interfaces/order';
import {DecimalPipe, formatDate, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RefundService} from '../../../services/refund.service';
import {Refund} from '../../../interfaces/refund';

@Component({
  selector: 'app-order-buy-detail',
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
    DecimalPipe
  ],
  templateUrl: './order-buy-detail.component.html',
  styleUrl: './order-buy-detail.component.scss'
})
export class OrderBuyDetailComponent implements OnInit {


  order: Order | any;
  orderId: number = 0;

  orderDetailList: OrderDetail[] = [];
  curSymbol: string = '$';
  curDate: string = '';
  curUser: number = 0;

  refundAllowDays: number = 0;
  refundEligible: boolean = false;
  selOrderDetailId: number = 0;
  selSellerId: number = 0;
  refundAmount: number = 0;
  refundOrderDetail: OrderDetail = {} as any;

  refund: Refund = {
    refund_id: 0,
    order_id: 0,
    order_details_id: 0,
    seller_id: 0,
    reason: '',
    bank_number: '',
    bank_name: '',
    refund_amount: 0,
    progress_status: '',
    requester_id: 0,
    request_date: '',
    approval_date: '',
    orderDetail: {} as any,
    seller_username: '',
    requester_username: '',
    product_id: 0,
    package_id: 0,
    sell_type: '',
    grpbuy_end: '',
    refund_qty: 0,
    org_amount: 0,
    org_qty: 0,
    unit_price: 0,
    refund_type: ''
  };

  constructor(
    private userService: UserService,
    private utilityService: UtilityService,
    private refundService: RefundService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.curUser = this.userService.getUserToken().user_id;
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol();
    this.refundAllowDays = this.utilityService.getRefundAllowDays();
  }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params["oid"];
    this.curDate = new Date().toISOString();
    this.getOrderDetailList();
  }

  getOrderDetailList() {
    this.userService.getBuyOrderDetail(this.orderId).subscribe((order) => {
      this.order = order;
      this.orderDetailList = order.order_detail_list;
      // console.log("OrderBuyDetailsComponent order : ", order);

      // if (this.utilityService.calcDateDiffInDays(order.order_date, new Date().toISOString()) <= this.refundAllowDays) {
      //   this.refundEligible = true;
      // }
    });
  }

  isAllowForRefund(inDate : string): boolean {
    let isAllow : boolean = false;

    if (this.utilityService.calcDateDiffInDays(inDate, this.curDate) <= this.refundAllowDays) {
      isAllow = true;
    }

    return isAllow;
  }


  onOrderTracking(orderDetail: OrderDetail) {
    this.router.navigate(['customer/home/ordertrack', orderDetail.order_details_id]);
  }

  setRefundRequest(od : OrderDetail) {
    this.refundOrderDetail = od;
    this.selOrderDetailId = od.order_details_id as any;
    this.selSellerId = od.seller_id;
    this.refundAmount = od.sub_total;
  }

  onRefund() {

    this.refund.order_id = this.order.order_id; //|| 0;
    this.refund.order_details_id = this.selOrderDetailId;
    this.refund.seller_id = this.selSellerId;
    this.refund.refund_amount = this.refundAmount;
    this.refund.progress_status = 'Refund Requested';
    this.refund.requester_id = this.curUser;
    this.refund.request_date = new Date().toISOString();
    this.refund.product_id = this.refundOrderDetail.product_id
    this.refund.package_id = this.refundOrderDetail.package_id as any;
    this.refund.sell_type = this.refundOrderDetail.sell_type;
    this.refund.grpbuy_end = this.refundOrderDetail.grpbuy_end as any;
    this.refund.refund_qty = this.refundOrderDetail.quantity;
    this.refund.org_amount = this.refundOrderDetail.sub_total;
    this.refund.org_qty = this.refundOrderDetail.quantity;
    this.refund.unit_price = this.refundOrderDetail.product_unit_price;
    this.refund.refund_type = 'Full Refunded';

    console.log(this.refundOrderDetail);
    console.log(this.refund);

    this.refundService.createRefund(this.refund).subscribe(res => {
      if (res != null) {
        this.utilityService.toastify(true, "Refund request has been initiated.");
        this.getOrderDetailList();
      } else {
        this.utilityService.toastify(false);
      }
    });
  }

  protected readonly formatDate = formatDate;
}
