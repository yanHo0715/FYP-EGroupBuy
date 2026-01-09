import {Component, OnInit} from '@angular/core';

import {AdminService} from '../../../services/admin.service';
import {UtilityService} from '../../../services/utility.service';
import {WithdrawalAdmin} from '../../../interfaces/withdrawal-admin';
import {DecimalPipe, formatDate, NgForOf, NgIf} from '@angular/common';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-withdraw',
  imports: [
    NgIf,
    NgForOf,
    DecimalPipe,
    MatProgressBar
  ],
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.scss'
})
export class WithdrawComponent implements OnInit {
  pendingWithdrawals: WithdrawalAdmin[] = [];
  transactions: WithdrawalAdmin[] = [];
  curSymbol: string = '$';
  queryMode: string = '';

  constructor(
    private adminService: AdminService,
    private utilityService: UtilityService
  ) {
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol();
  }

  ngOnInit(): void {
    this.getAllWithdrawals();
  }

  getAllWithdrawals() {
    this.pendingWithdrawals = [];
    this.transactions = [];
    this.queryMode = 'indeterminate';

    this.adminService.getAllWithdrawals().subscribe((w) => {
      w.forEach((wa) => {
        if (wa.status == 'Pending') {
          // this.pendingWithdrawals.push(wa);
          this.pendingWithdrawals.unshift(wa);
        } else {
          this.transactions.push(wa);
        }
      });
      this.queryMode = '';
    });
  }

  updateWithdraw(pos: number, action: string) {
    if(action == 'Paid') {
      this.pendingWithdrawals[pos].payment_date = new Date().toISOString();
    }
    this.pendingWithdrawals[pos].approval_date = new Date().toISOString();
    this.pendingWithdrawals[pos].status = action;
    this.adminService.updateWithdraw(this.pendingWithdrawals[pos]).subscribe((success) => {
      this.utilityService.toastify(success, "Withdraw status updated");
      this.getAllWithdrawals();
    });
  }

  protected readonly formatDate = formatDate;
}
