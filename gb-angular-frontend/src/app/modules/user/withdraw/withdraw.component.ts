import {Component, OnInit} from '@angular/core';
import {User} from '../../../interfaces/user';
import {Withdrawal} from '../../../interfaces/withdrawal';
import {UtilityService} from '../../../services/utility.service';
import {UserService} from '../../../services/user.service';
import {CurrencyPipe, DecimalPipe, formatDate, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-withdraw',
    imports: [
        CurrencyPipe,
        FormsModule,
        NgForOf,
        DecimalPipe,
        MatProgressBar,
        NgIf
    ],
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.scss'
})
export class WithdrawComponent implements OnInit {
  user: User = {
    user_id: 0,
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    role: '',
    email: '',
    icon: '',
    status: '',
    address: '',
    balance: 0,
    holder_name: '',
    account_number: '0',
    bank_name: '',
    branch_name: '',
    creation_date: '',
    user_alias: '',
    city: '',
    country: '',
    post_code: '',
    phone: '',
    hold_fund: 0
  };

  transactions: Withdrawal[] = [];
  amount: number = 0;
  curSymbol: string = '$';
  queryMode:string = '';
  curName: String = '';
  minWithdraw: number = 10;
  withdrawThreshold: number = 1000;
  curUser: number = 0;

  constructor(
    private userService: UserService,
    private utilityService: UtilityService
  ) {

    this.curUser = this.userService.getUserToken().user_id;
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol();
    this.minWithdraw =  this.utilityService.getMinWithdraw();
    this.withdrawThreshold =  this.utilityService.getWithdrawThreshold();
    this.curName = this.utilityService.getSysBaseCurrencyName();
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    /*this.userService.getUser().subscribe((u) => {
      this.user = u;
    });*/

    // this.user = this.userService.getUser();
    this.queryMode = 'indeterminate';

    this.userService.getUserProfile().subscribe((u) => {
      this.user = u;
      this.queryMode = '';
    });

    console.log("===== WithdrawComponent - refreshDate() : ", this.user);
    // this.userService.getWithdrawals(this.userService.getUserToken().user_id).subscribe((w) => {
    //   this.transactions = w;
    // });
    this.queryMode = 'indeterminate';

    this.userService.getWithdrawals().subscribe((w) => {
      this.transactions = w;
      this.queryMode = '';
      console.log("===== WithdrawComponent - getWithdrawals() : ", this.transactions);

    });
  }


  validate(): boolean {
    if (this.amount < this.minWithdraw ) {
      this.utilityService.toastify(false, "", "Amount must be greater then " + this.curName + " " + this.minWithdraw);
      return false;
    } else if (this.amount > this.withdrawThreshold) {
      this.utilityService.toastify(false, "", "Amount must be less then " + this.curName + " " + this.withdrawThreshold);
      return false;
    } else if (this.amount > this.user.balance){
      this.utilityService.toastify(false, "", "Amount must be greater then current balance");
      return false;
    }
    return true;
  }

  onWithdraw() {
    if (this.validate()) {
      let w: Withdrawal = {
        user_id: this.userService.getUserToken().user_id,
        request_date: new Date().toISOString(),
        approval_date: '',
        amount: this.amount,
        payment_date: '',
        status: '',
        withdrawal_id: 0
      }
      this.userService.requestWithdraw(w).subscribe((w) => {
        if (w != null) {
          this.utilityService.toastify(true, "Requested for withdraw");
          this.amount = 0;
          this.refreshData();
        } else {
          this.utilityService.toastify(false);
        }
      });
    }
  }

  protected readonly formatDate = formatDate;
}
