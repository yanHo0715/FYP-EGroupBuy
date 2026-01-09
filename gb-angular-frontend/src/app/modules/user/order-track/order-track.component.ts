import {Component, OnInit} from '@angular/core';
import {UtilityService} from '../../../services/utility.service';
import {RefundService} from '../../../services/refund.service';
import {OrderDetail} from '../../../interfaces/order-detail';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-order-track',
  imports: [],
  templateUrl: './order-track.component.html',
  styleUrl: './order-track.component.scss'
})
export class OrderTrackComponent implements OnInit {

  orderDetail: OrderDetail = {} as any;

  constructor(
    private userService: UserService,
    private utilityService: UtilityService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    let oid: number = this.route.snapshot.params['oid'];
    this.userService.getOrderTracking(oid).subscribe((orderDetail) => {
      this.orderDetail = orderDetail;
    });
  }

  protected readonly formatDate = formatDate;
}
