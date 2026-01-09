import { Component } from '@angular/core';
import {RefundService} from '../../../services/refund.service';
import {UtilityService} from '../../../services/utility.service';
import {Refund} from '../../../interfaces/refund';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {MatProgressBar} from '@angular/material/progress-bar';


@Component({
  selector: 'app-refund',
  imports: [
    NgForOf,
    NgIf,
    DecimalPipe,
    MatProgressBar
  ],
  templateUrl: './refund.component.html',
  styleUrl: './refund.component.scss'
})
export class RefundComponent {
  refund: Refund[] = [];
  curSymbol: string = '$'
  queryMode: string = '';

  constructor(
    private utilityService: UtilityService,
    private refundService: RefundService
  ) {
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol()
  }

  ngOnInit(): void {
    this.getAllRefund();
  }

  getAllRefund() {
    this.queryMode = 'indeterminate';
    this.refundService.getAllRefund().subscribe(res => {
      this.refund = res;
      this.queryMode = '';
    });
  }

  onStatusChange(pos: number, status: string) {
    let a: Refund = this.refund[pos];
    a.progress_status = status;
    this.refundService.updateRefund(a).subscribe(res => {
      if (res != null) {
        this.utilityService.toastify(true, "Refund status updated");
      } else {
        this.utilityService.toastify(false);
      }
    });
  }

}
