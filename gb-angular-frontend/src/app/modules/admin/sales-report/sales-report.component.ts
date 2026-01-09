import {Component, OnInit} from '@angular/core';
import {SalesReport} from '../../../interfaces/sales-report';
import {AdminService} from '../../../services/admin.service';
import {FormsModule} from '@angular/forms';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from "@angular/router";
import {UtilityService} from '../../../services/utility.service';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-sales-report',
  imports: [
    FormsModule,
    DecimalPipe,
    NgForOf,
    RouterLink,
    MatProgressBar,
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
    private adminService: AdminService,
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

    this.adminService.getAdminSalesReport(this.startDate, this.endDate).subscribe((response) => {
      this.salesReport = response;
      // this.totalSalesVolume = 0;
      // this.totalProfit = 0;

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
        // this.totalProfit += i.profit;
      });

      this.queryMode = '';
    });
  }

  /*generatePdf() {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Sales Report", doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });
    doc.setFontSize(14);
    doc.text(this.startDate + ' - ' + this.endDate, doc.internal.pageSize.getWidth() / 2, 24, { align: 'center' });
    autoTable(doc, {
      html: '#dataTable',
      theme: 'grid',
      startY: 28,
      styles: { halign: 'center' }
    });
    const pdfOutput = doc.output('blob');
    const url = URL.createObjectURL(pdfOutput);
    window.open(url, '_blank');
  }*/

}
