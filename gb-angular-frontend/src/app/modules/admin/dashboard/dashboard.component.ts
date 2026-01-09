import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {UtilityService} from '../../../services/utility.service';
import {AdminDashboard} from '../../../interfaces/admin-dashboard';

import {DecimalPipe, formatDate, NgForOf, NgIf} from '@angular/common';
import {MatProgressBar} from '@angular/material/progress-bar';



import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexMarkers
} from "ng-apexcharts";
import {BestSellProduct} from '../../../interfaces/best-sell-product';


export type SalesVolumeChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

export type SalesTypeChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

export type OrderItemStatusPieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};

export type SalesRadarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  fill: ApexFill;
  markers: ApexMarkers;
  xaxis: ApexXAxis;
  labels: any;
};

@Component({
  selector: 'app-dashboard',
  imports: [
    DecimalPipe,
    MatProgressBar,
    NgIf,
    ChartComponent,
    NgForOf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  curSymbol: string = '$';
  curName: string = '';
  queryMode: string = '';
  admDashboard: AdminDashboard = {};
  weeklyRevenue: number = 0;
  bestSellProductList: BestSellProduct[] = [];

  @ViewChild("salesVolumeChart") salesVolumeChart!: ChartComponent;
  @ViewChild("salesTypeQtyChart") salesTypeQtyChart!: ChartComponent;
  @ViewChild("orderStatusPieChart") orderStatusPieChart!: ChartComponent;
  @ViewChild("salesRadarChart") salesRadarChart!: ChartComponent;
  public salesVolumeChartOptions!: Partial<SalesVolumeChartOptions>;
  public salesTypeChartOptions!: Partial<SalesTypeChartOptions>;
  public orderItemStatusPieChartOptions!: Partial<OrderItemStatusPieChartOptions>;
  public salesRadarChartOptions!: Partial<SalesRadarChartOptions>;

  constructor(
    private adminService: AdminService,
    private utilityService: UtilityService
  ) {
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol();
    this.curName = this.utilityService.getSysBaseCurrencyName();
    // this.setChart();
  }

  ngOnInit(): void {
    this.getAdminDashboard();
    // this.setChart();
    console.log("===== Admin Dashboard - this.salesVolumeChartOptions : ", this.salesVolumeChartOptions);
  }

  getAdminDashboard() {
    this.queryMode = 'indeterminate';

    this.adminService.getAdminDashboard().subscribe((s) => {
      this.admDashboard = s;
      console.log(this.admDashboard);

      this.bestSellProductList = this.admDashboard.bestSellProductList as any;

      let rptDate: string[] = [];
      let dSTotal: number[] = [];
      let dGTotal: number[] = [];
      let dPTotal: number[] = [];

      this.admDashboard.weeklySalesVolume?.map(s =>{
         rptDate.push(s.rpt_date);
         dSTotal.push(s.s_total_amt);
         dGTotal.push(s.g_total_amt);
         dPTotal.push(s.p_total_amt);
      });

      this.setSalesVolumeChart(rptDate, dSTotal, dGTotal, dPTotal);


      let rptStartDate: string[] = [];
      let rptStartMth: string[] = [];
      let mSTotalQty: number[] = [];
      let mGTotalQty: number[] = [];
      let mPTotalQty: number[] = [];
      let mSTotalAmt: number[] = [];
      let mGTotalAmt: number[] = [];
      let mPTotalAmt: number[] = [];

      this.admDashboard.monthlySalesVolume?.map(s =>{
        rptStartDate.push(s.rpt_start_date);
        rptStartMth.push(formatDate(s.rpt_start_date, 'MMM YYYY', 'en-US'));
        mSTotalQty.push(s.s_total_qty);
        mGTotalQty.push(s.g_total_qty);
        mPTotalQty.push(s.p_total_qty);
        mSTotalAmt.push(s.s_total_amt);
        mGTotalAmt.push(s.g_total_amt);
        mPTotalAmt.push(s.p_total_amt);
      });

      console.log('rptStartDate', rptStartDate);
      console.log('mSTotalAmt', mSTotalAmt);
      console.log('mGTotalAmt', mGTotalAmt);
      console.log('mPTotalAmt', mPTotalAmt);

      this.setSalesTypeQtyChart(rptStartDate, mSTotalQty, mGTotalQty, mPTotalQty);
      this.setSalesRadarChart(rptStartMth, mSTotalAmt, mGTotalAmt, mPTotalAmt);


      let statusLabels: string[] = [];
      let noOfItems: number[] = [];

      this.admDashboard.orderItemStatusList?.map(s => {
        statusLabels.push(s.status);
        noOfItems.push(parseInt(s.no_of_items));
      });

      this.setOrderItemStatusPieChart(statusLabels, noOfItems);

      setTimeout(() => {
        // console.log('hello');
        this.queryMode = '';
      }, 3000);

      // this.queryMode = '';


    });


  }



  public generateData(baseval:any, count: any, yrange: any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

  setSalesVolumeChart(days:any, sTotal:any, gTotal: any, pTotal: any) {
    this.salesVolumeChartOptions = {
      series: [
        {
          name: "Single Product " + this.curSymbol ,
          // data: [31, 40, 28, 51, 42, 109, 100]
          data: sTotal
        },
        {
          name: "Group Buy " + this.curSymbol,
          // data: [11, 32, 45, 32, 34, 52, 41]
          data: gTotal
        },

        {
          name: "Package Group Buy " + this.curSymbol,
          // data: [20, 28, 35, 24, 10, 30, 55]
          data: pTotal
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false

      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        // categories: [
        //   "2018-09-19T00:00:00.000Z",
        //   "2018-09-19T01:30:00.000Z",
        //   "2018-09-19T02:30:00.000Z",
        //   "2018-09-19T03:30:00.000Z",
        //   "2018-09-19T04:30:00.000Z",
        //   "2018-09-19T05:30:00.000Z",
        //   "2018-09-19T06:30:00.000Z"
        // ]
        categories: days
      },
      yaxis: {
        title: {
          text: "Amount in " + this.curName
        }
      },
      tooltip: {
        x: {
          format: "dd/MM/yyyy"
        }

      }

    };
  }


  setSalesTypeQtyChart(months:any, sTotalQty:any, gTotalQty: any, pTotalQty: any) {

    this.salesTypeChartOptions = {
      series: [
        {
          name: "Single Product",
          data: sTotalQty
        },
        {
          name: "Group Buy",
          data: gTotalQty
        },
        {
          name: "Package Group Buy",
          data: pTotalQty
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          // endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        type: "datetime",
        categories: months
      },
      yaxis: {
        title: {
          text: "Quantity sold in the month"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        x: {
          format: "MMM yyyy"
        },
        y: {
          formatter: function(val:any) {
            return val + " items sold in the month";
          }
        }
      }
    };

  }

  setOrderItemStatusPieChart(statusLabels:any, noOfItems: any) {


    this.orderItemStatusPieChartOptions = {
      series: noOfItems,
      chart: {
        width: 380,
        type: "donut"
      },
      labels: statusLabels,
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return (val as number).toFixed(0) + "%"
        },
      },
      fill: {
        type: "gradient"
      },
      legend: {
        formatter: function(val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        }
      },
      plotOptions: {
        pie: {
          customScale: 1.0,
          donut: {
            size: '50%',
            labels: {
              show: true,
              name: {
                formatter(val: string): string {
                  return "Total ";
                }
              }
              ,
/*
              value: {
                ...
              }
*/
            }
          }
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  setSalesRadarChart(mths:any, sTotal:any, gTotal: any, pTotal: any) {
    this.salesRadarChartOptions = {
      series: [
        {
          name: "Single Product",
          data: sTotal
        },
        {
          name: "GroupBuy Product",
          data: gTotal
        },
        {
          name: "Package GroupBuy",
          data: pTotal
        }
      ],
      chart: {
        height: 350,
        type: "radar",
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        }
      },
      title: {
        text: "Monthly Sales Income"
      },
      stroke: {
        width: 0
      },
      fill: {
        opacity: 0.4
      },
      markers: {
        size: 0
      },
      xaxis: {
        // type: "datetime",
        categories: mths
      },
      labels: []
    };
  }

}
