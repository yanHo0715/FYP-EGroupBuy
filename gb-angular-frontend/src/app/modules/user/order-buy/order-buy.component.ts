import {Component, OnInit} from '@angular/core';
import {Order} from '../../../interfaces/order';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {UtilityService} from '../../../services/utility.service';
import {DecimalPipe, formatDate, NgForOf, NgIf} from '@angular/common';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-order-buy',
  imports: [
    NgForOf,
    DecimalPipe,
    MatProgressBar,
    NgIf
  ],
  templateUrl: './order-buy.component.html',
  styleUrl: './order-buy.component.scss'
})
export class OrderBuyComponent implements OnInit {

  buyOrderList: Order[] = [];
  curSymbol: string = '$';
  queryMode: string = '';

  constructor(
    private userService: UserService,
    private utilityService: UtilityService,
    private router: Router
  ) {
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol();
  }

  ngOnInit(): void {
    this.queryMode = 'indeterminate';
    this.userService.getBuyOrderList(this.userService.getUserToken().user_id).subscribe((response) => {
      this.buyOrderList = response;
      this.queryMode = '';
      console.log("User Buy Orders : ", this.buyOrderList);
    });
  }

  showOrderDetail(oid: any) {
    this.router.navigate(['customer/home/buyorder', oid]);
  }


  protected readonly formatDate = formatDate;
}
