import {Component, OnInit} from '@angular/core';
import {RefundService} from '../../../services/refund.service';
import {UtilityService} from '../../../services/utility.service';
import {Refund} from '../../../interfaces/refund';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-refund',
  imports: [
    NgForOf,
    DecimalPipe,
    MatProgressBar,
    NgIf
  ],
  templateUrl: './refund.component.html',
  styleUrl: './refund.component.scss'
})
export class RefundComponent implements OnInit {

  curSymbol: string = '$'
  queryMode: string = '';
  refundList: Refund[] = [];

  constructor(
    private utilityService: UtilityService,
    private refundService: RefundService
  ) {
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol();
  }

  ngOnInit(): void {
    this.queryMode = 'indeterminate';
    this.refundService.getSellRefundList().subscribe(response => {
      this.refundList = response;
      this.queryMode = '';
      // console.log("Sell Refund Component this.refundList : ", this.refundList);
    });
  }

}
