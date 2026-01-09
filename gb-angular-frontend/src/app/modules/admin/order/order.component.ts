import { Component } from '@angular/core';

import {AdminService} from '../../../services/admin.service';
import {Router} from '@angular/router';
import {Order} from '../../../interfaces/order';
import {DecimalPipe, formatDate, NgForOf, NgIf} from '@angular/common';
import {UtilityService} from '../../../services/utility.service';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-order',
  imports: [
    NgForOf,
    DecimalPipe,
    MatProgressBar,
    NgIf
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  orders: Order[] = [];
  curSymbol: string = '$';
  queryMode: string = '';

  constructor(
    private adminService: AdminService,
    private utilityService: UtilityService,
    private router: Router
  ) {
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol()
  }

  ngOnInit(): void {
    this.queryMode = 'indeterminate';
    this.adminService.getOrders().subscribe((orders) => {
      this.orders = orders;
      this.queryMode = '';
    });
  }

  showDetails(orderId: any) {
    this.router.navigate(['admin/order', orderId]);
    console.log("orderComponent: show detailsssssssss  " + orderId);
  }

  protected readonly formatDate = formatDate;
}
