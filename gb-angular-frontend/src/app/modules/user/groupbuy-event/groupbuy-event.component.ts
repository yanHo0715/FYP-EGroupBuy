import {Component, OnInit} from '@angular/core';
import {formatDate, NgForOf, NgIf} from "@angular/common";
import {GroupBuyEvent} from '../../../interfaces/groupbuy-event';
import {UtilityService} from '../../../services/utility.service';
import {GroupbuyEventService} from '../../../services/groupbuy-event.service';
import {UserService} from '../../../services/user.service';
import {RouterLink} from '@angular/router';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-groupbuy-event',
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    MatProgressBar
  ],
  templateUrl: './groupbuy-event.component.html',
  styleUrl: './groupbuy-event.component.scss'
})
export class GroupbuyEventComponent implements OnInit {
  queryMode:string = '';
  groupBuyEventList: GroupBuyEvent[] = [];

  constructor(
    private utilityService: UtilityService,
    private userService: UserService,
    private groupbuyEvent: GroupbuyEventService
  ) { }

  ngOnInit(): void {
    this.getGroupBuyEndEvent();
  }

  getGroupBuyEndEvent() {
    this.queryMode = 'indeterminate';
    this.groupbuyEvent.getGroupBuyEndEvent(this.userService.getUserToken().user_id).subscribe(res => {
      this.groupBuyEventList = res;
      this.queryMode = '';
    });
  }

  protected readonly formatDate = formatDate;
}
