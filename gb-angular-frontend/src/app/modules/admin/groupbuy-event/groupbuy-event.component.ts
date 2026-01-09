import {Component, OnInit} from '@angular/core';
import {UtilityService} from '../../../services/utility.service';
import {GroupBuyEvent} from '../../../interfaces/groupbuy-event';
import {GroupbuyEventService} from '../../../services/groupbuy-event.service';
import {formatDate, NgForOf, NgIf} from '@angular/common';
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

  groupBuyEventList: GroupBuyEvent[] = [];
  queryMode: string = '';

  constructor(
    private utilityService: UtilityService,
    private groupbuyEvent: GroupbuyEventService
  ) { }

  ngOnInit(): void {
    this.getAllGroupBuyEndEvent();
  }

  getAllGroupBuyEndEvent() {
    this.queryMode = 'indeterminate';
    this.groupbuyEvent.getAllGroupBuyEndEvent().subscribe(res => {
      this.groupBuyEventList = res;
      this.queryMode = '';
    });
  }


  protected readonly formatDate = formatDate;
}
