import {Component, OnInit} from '@angular/core';
import {Order} from '../../../interfaces/order';
import {OrderDetail} from '../../../interfaces/order-detail';
import {UserService} from '../../../services/user.service';
import {UtilityService} from '../../../services/utility.service';
import {ActivatedRoute} from '@angular/router';
import {DecimalPipe, formatDate, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-order-sell-detail',
    imports: [
        NgForOf,
        NgIf,
        DecimalPipe
    ],
  templateUrl: './order-sell-detail.component.html',
  styleUrl: './order-sell-detail.component.scss'
})
export class OrderSellDetailComponent implements OnInit {

  order: Order | any;
  orderDetailList: OrderDetail[] = [];
  curSymbol: string = '$'
  refundEligible: boolean = false;

  constructor(
    private userService: UserService,
    private utilityService: UtilityService,
    private route: ActivatedRoute,
  ) {
    this.curSymbol = this.utilityService.getSysBaseCurrencySymbol()
  }

  ngOnInit(): void {
    let oid: number = this.route.snapshot.params["oid"];

    this.userService.getSellOrderDetail(oid, this.userService.getUserToken().user_id).subscribe((order) => {
      this.order = order;
      this.orderDetailList = order.order_detail_list;
    });

  }

  onChangeStatus(ind: number, status: string) {
    let od: OrderDetail = this.orderDetailList[ind];
    od.status = status;
    if(od.status == 'Delivered') {
      od.delivery_date = new Date().toISOString();
    }
    this.userService.updateOrderStatus(od).subscribe((success) => {
      this.utilityService.toastify(success, "Order " + status);
    });
  }

  trackOrder(orderItem: OrderDetail) {

    // this.router.navigate(['customer/track', orderItem.id]);
  }

  setRefundDetails(orderDetailsId: any, sellerId: any) {
    /*    this.selectedOrderDetailsId = orderDetailsId;
        this.selectedSellerId = sellerId;*/
  }

  onRefund() {
    /*    this.refundDetails.orderId = this.order.id || 0;
        this.refundDetails.orderDetailsId = this.selectedOrderDetailsId;
        this.refundDetails.sellerId = this.selectedSellerId;
        this.refundDetails.amount = this.order.orderTotal;
        console.log(this.refundDetails);
        this.refundService.createRefund(this.refundDetails).subscribe(res => {
          if (res != null) {
            this.util.toastify(true, "Your refund initiated");
            this.getOrderDetails();
          } else {
            this.util.toastify(false);
          }
        });*/
  }


  protected readonly formatDate = formatDate;
}
