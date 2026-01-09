import { Component } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {Router} from '@angular/router';
import {Order} from '../../../interfaces/order';
import {DecimalPipe, formatDate, NgForOf, NgIf} from '@angular/common';
import {UtilityService} from '../../../services/utility.service';
import {OrderDetail} from '../../../interfaces/order-detail';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-delivery',
  imports: [
    NgForOf,
    DecimalPipe,
    NgIf,
    MatProgressBar
  ],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss'
})
export class DeliveryComponent {
  orderDetailLists: OrderDetail[] = [];
  curSymbol: string = '$'
  queryMode: string = '';

  constructor(
    private adminService: AdminService,
    private utilityService: UtilityService,
    private router: Router
  ) {
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol();
  }

  ngOnInit(): void {
    this.queryMode = 'indeterminate';
    this.adminService.getShippedOrderDetailList().subscribe((response) => {
      this.orderDetailLists = response;
      this.queryMode = '';
    });
  }

  onStatusChange(ind: number, status: string) {
    let o: OrderDetail = this.orderDetailLists[ind];
    o.status = status;
    if(o.status == 'Delivered') {
      o.delivery_date = new Date().toISOString();
    }
    this.adminService.updateOrder(o).subscribe((success) => {
      this.utilityService.toastify(success, "Order Item " + status);
    });
  }

  showDetails(id: any) {
    this.router.navigate(['admin/order', id]);
  }

  protected readonly formatDate = formatDate;
}
