import {Component, OnInit} from '@angular/core';
import {SalesReport} from '../../../interfaces/sales-report';
import {UtilityService} from '../../../services/utility.service';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatProgressBar} from '@angular/material/progress-bar';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-sales-report',
  imports: [
    DecimalPipe,
    FormsModule,
    MatProgressBar,
    NgForOf,
    NgIf
  ],
  templateUrl: './sales-report.component.html',
  styleUrl: './sales-report.component.scss'
})
export class SalesReportComponent implements OnInit {
  salesReport: SalesReport[] = [];
  totalSalesVolume: number = 0;
  totalNoOfOrders: number = 0;
  totalNoOfOrderItems: number =0;
  totalSQty: number = 0;
  totalGQty: number = 0;
  totalPQty: number =0;
  totalSAmt: number = 0;
  totalGAmt: number = 0;
  totalPAmt: number =0;

  totalProfit: number = 0;
  curSymbol: string = '$';
  queryMode = '';

  today: Date = new Date();
  startDate: string = new Date(this.today.getFullYear(), this.today.getMonth(), 2).toISOString().substring(0, 10);
  endDate: string = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 1).toISOString().substring(0, 10);

  constructor(
    private userService: UserService,
    private utilityService: UtilityService
  ) {
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol()
  }

  ngOnInit(): void {
    this.getSalesReport();
  }

  getSalesReport() {
    this.salesReport = [];
    this.totalSalesVolume = 0;
    this.totalNoOfOrders = 0;
    this.totalNoOfOrderItems =0;
    this.totalSQty = 0;
    this.totalGQty = 0;
    this.totalPQty =0;
    this.totalSAmt = 0;
    this.totalGAmt = 0;
    this.totalPAmt =0;

    this.queryMode = 'indeterminate';

    this.userService.getUserSalesReport(this.startDate, this.endDate).subscribe((response) => {

      this.salesReport = response;

      this.salesReport.forEach(s => {
        this.totalSalesVolume = this.totalSalesVolume + s.sales_volume;
        this.totalNoOfOrders = this.totalNoOfOrders + s.no_of_orders;
        this.totalNoOfOrderItems = this.totalNoOfOrderItems + s.no_of_items;
        this.totalSQty = this.totalSQty + s.single_product_qty_count;
        this.totalGQty = this.totalGQty + s.single_grpbuy_qty_count;
        this.totalPQty = this.totalPQty + s.package_grpbuy_qty_count;
        this.totalSAmt = this.totalSAmt + s.single_product_sub_total;
        this.totalGAmt = this.totalGAmt + s.single_grpbuy_sub_total;
        this.totalPAmt = this.totalPAmt + s.package_grpbuy_sub_total
      });

      this.queryMode = '';
    });
  }

}
