import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UtilityService} from './utility.service';
import {UserService} from './user.service';
import {Observable} from 'rxjs';
import {Refund} from '../interfaces/refund';
import {GroupBuyEvent} from '../interfaces/groupbuy-event';

@Injectable({
  providedIn: 'root'
})
export class GroupbuyEventService {
  private baseUrl: string = '';

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService,
    private userService: UserService,
  ) {
    this.baseUrl = this.utilityService.getSpringServerApiUrl()
    console.log("GroupBuyEventService constructor baseUrl : ", this.baseUrl);
  }

  getAdminHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("admin-jwt") });
  }

  getUserHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("user-jwt") });
  }

  getAllGroupBuyEndEvent(): Observable<GroupBuyEvent[]> {
    return this.http.get<GroupBuyEvent[]>(this.baseUrl.concat('/admin/getAllGroupBuyEndEvent'), { headers: this.getAdminHeaders() });
  }

  getGroupBuyEndEvent(sid: number): Observable<GroupBuyEvent[]> {
    return this.http.get<GroupBuyEvent[]>(this.baseUrl.concat('/user/getGroupBuyEndEvent?sid=' + sid), { headers: this.getUserHeaders() });
  }

}
