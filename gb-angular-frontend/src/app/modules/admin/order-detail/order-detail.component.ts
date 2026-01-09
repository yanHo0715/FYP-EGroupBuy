import { Component } from '@angular/core';
import {Order} from '../../../interfaces/order';
import {AdminService} from '../../../services/admin.service';
import {UtilityService} from '../../../services/utility.service';
import {ActivatedRoute} from '@angular/router';
import {DecimalPipe, formatDate, NgForOf, NgIf} from '@angular/common';
import {OrderDetail} from '../../../interfaces/order-detail';

@Component({
  selector: 'app-order-details',
    imports: [
        NgForOf,
        NgIf,
        DecimalPipe
    ],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent {
  // order: any;
  order: any;
  orderDetails: OrderDetail[] = [];
  curSymbol: string = '$'

  constructor(
    private adminService: AdminService,
    private utilityService: UtilityService,
    private route: ActivatedRoute,
    private util: UtilityService
  ) {
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol()
  }

  ngOnInit(): void {
    const orderid:number = this.route.snapshot.params["orderid"];
    this.adminService.getOrder(orderid).subscribe((order) => {
      this.order = order;
      console.log("orderDetailsComponent: show order  " + orderid);
      for (const item of order.order_detail_list) {
        this.orderDetails.push(item);
        console.log("orderDetailsComponent: show order  " + this.orderDetails);
      }
    });
  }

  onStatusChange(pos: number, status: string) {
    let o: OrderDetail = this.orderDetails[pos];
    o.status = status;
    if(o.status == 'Delivered') {
      o.delivery_date = new Date().toISOString();
    }
    this.adminService.updateOrder(o).subscribe((success) => {
      this.util.toastify(success, "Order " + status);
    });
  }

  protected readonly formatDate = formatDate;
}
