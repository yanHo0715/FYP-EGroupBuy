import {Component, OnInit} from '@angular/core';
import {Order} from '../../../interfaces/order';
import {UserService} from '../../../services/user.service';
import {UtilityService} from '../../../services/utility.service';
import {Router} from '@angular/router';
import {DecimalPipe, formatDate, NgForOf, NgIf} from '@angular/common';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-order-sell',
  imports: [
    NgForOf,
    DecimalPipe,
    MatProgressBar,
    NgIf
  ],
  templateUrl: './order-sell.component.html',
  styleUrl: './order-sell.component.scss'
})
export class OrderSellComponent implements OnInit {

  sellOrderList: Order[] = [];
  curSymbol: string = '$';
  queryMode: string = '';

  constructor(
    private userService: UserService,
    private utilityService: UtilityService,
    private router: Router
  ) {
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol()
  }

  ngOnInit(): void {
    this.queryMode = 'indeterminate';
    this.userService.getSellOrderList(this.userService.getUserToken().user_id).subscribe((response) => {
      this.sellOrderList = response;
      this.queryMode = '';
      console.log("User Sell Orders : ", this.sellOrderList);
    });
  }

  showOrderDetail(oid: any) {
    this.router.navigate(['customer/home/sellorder', oid]);
  }


  protected readonly formatDate = formatDate;
}
