import {Component, OnInit, ViewChild} from '@angular/core';

import {DecimalPipe, formatDate, NgForOf, NgIf} from '@angular/common';
import {MatProgressBar} from '@angular/material/progress-bar';
import {AdminDashboard} from '../../../interfaces/admin-dashboard';
import {BestSellProduct} from '../../../interfaces/best-sell-product';
import {AdminService} from '../../../services/admin.service';
import {UtilityService} from '../../../services/utility.service';

import {
  ApexAxisChartSeries,
  ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent
} from 'ng-apexcharts';
import {UserService} from '../../../services/user.service';
import {UserDashboard} from '../../../interfaces/user-dashboard';
import {OrderDetail} from '../../../interfaces/order-detail';


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


export type SalesStackChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
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

@Component({
  selector: 'app-dashboard',
  imports: [
    ChartComponent,
    DecimalPipe,
    MatProgressBar,
    NgForOf,
    NgIf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  curSymbol: string = '$';
  curName: string = '';
  queryMode: string = '';
  userDashboard: UserDashboard = {};
  weeklyRevenue: number = 0;
  bestSellProductList: BestSellProduct[] = [];
  latestOrderItemList: OrderDetail[] = [];



  @ViewChild("salesVolumeChart") salesVolumeChart!: ChartComponent;
  @ViewChild("salesTypeQtyChart") salesTypeQtyChart!: ChartComponent;
  @ViewChild("orderStatusPieChart") orderStatusPieChart!: ChartComponent;
  @ViewChild("salesStackChart") salesStackChart!: ChartComponent;

  public salesVolumeChartOptions!: Partial<SalesVolumeChartOptions>;
  public salesTypeChartOptions!: Partial<SalesTypeChartOptions>;
  public orderItemStatusPieChartOptions!: Partial<OrderItemStatusPieChartOptions>;
  public salesStackChartOptions!: Partial<SalesStackChartOptions>;

  constructor(
    private userService: UserService,
    private utilityService: UtilityService
  ) {
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol();
    this.curName = this.utilityService.getSysBaseCurrencyName();
    // this.setChart();
  }

  ngOnInit(): void {
    this.getUserDashboard();
    // this.setChart();
    console.log("===== User Dashboard - this.salesVolumeChartOptions : ", this.salesVolumeChartOptions);
  }

  getUserDashboard() {
    this.queryMode = 'indeterminate';

    this.userService.getUserDashboard().subscribe((response) => {
      this.userDashboard = response;
      console.log(this.userDashboard);

      // this.bestSellProductList = this.userDashboard.bestSellProductList as any;
      this.latestOrderItemList = this.userDashboard.latestOrderItemList as any;

      let rptDate: string[] = [];
      let dSTotal: number[] = [];
      let dGTotal: number[] = [];
      let dPTotal: number[] = [];

      this.userDashboard.biWeeklySalesVolume?.map(s =>{
        rptDate.push(s.rpt_date);
        dSTotal.push(s.s_total_amt);
        dGTotal.push(s.g_total_amt);
        dPTotal.push(s.p_total_amt);
      });

      this.setSalesVolumeChart(rptDate, dSTotal, dGTotal, dPTotal);


      let rptStartDate: string[] = [];
      let mSTotalQty: number[] = [];
      let mGTotalQty: number[] = [];
      let mPTotalQty: number[] = [];

      this.userDashboard.monthlySalesVolume?.map(s =>{
        rptStartDate.push(s.rpt_start_date);
        mSTotalQty.push(s.s_total_qty);
        mGTotalQty.push(s.g_total_qty);
        mPTotalQty.push(s.p_total_qty);
      });


      this.setSalesTypeQtyChart(rptStartDate, mSTotalQty, mGTotalQty, mPTotalQty);



      let statusLabels: string[] = [];
      let noOfItems: number[] = [];

      this.userDashboard.orderItemStatusList?.map(s => {
        statusLabels.push(s.status);
        noOfItems.push(parseInt(s.no_of_items));
      });

      this.setOrderItemStatusPieChart(statusLabels, noOfItems);

/*
      let monthLabels: string[] = [
        "01/2011",
        "02/2011",
        "03/2011",
        "04/2011",
        "05/2011",
        "06/2011"
      ];
      let sellTypeS: number[] = [13, 23, 20, 8, 13, 27];
      let sellTypeG: number[] = [11, 17, 15, 15, 21, 14];
      let sellTypeP: number[] = [21, 7, 25, 13, 22, 8];
*/

      let monthLabels: string[] = [];
      let sellTypeS: number[] = [];
      let sellTypeG: number[] = [];
      let sellTypeP: number[] = [];

      this.userDashboard.monthlySalesVolume?.map(s =>{
        monthLabels.push(s.rpt_start_date);
        sellTypeS.push(s.s_total_qty);
        sellTypeG.push(s.g_total_qty);
        sellTypeP.push(s.p_total_qty);
      });



      console.log('monthLabels',monthLabels );
      console.log('sellTypeS', sellTypeS);
      console.log('sellTypeG', sellTypeG);
      console.log('sellTypeP', sellTypeP);
      this.setSalesStackChart(monthLabels, sellTypeS, sellTypeG, sellTypeP);

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

  setOrderItemStatusPieChart(statusLabals:any, noOfItems: any) {


    this.orderItemStatusPieChartOptions = {
      series: noOfItems,
      chart: {
        width: 380,
        // type: "donut"
        type: "pie"
      },
      labels: statusLabals,
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
          // customScale: 1.0,
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

  setSalesStackChart(mths: any, sellTypeS: any, sellTypeG: any, sellTypeP: any) {
    this.salesStackChartOptions = {
      series: [
        {
          name: "Single Product",
          data: sellTypeS
        },
        {
          name: "GroupBuy Product",
          data: sellTypeG
        },
        {
          name: "Package GropBuy",
          data: sellTypeP
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        // type: "category",
        type: "datetime",
        categories: mths
      },
      legend: {
        position: "right",
        offsetY: 40
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


  protected readonly formatDate = formatDate;
}
