import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UtilityService} from './utility.service';
// import {SellerService} from './seller.service';
import {Refund} from '../interfaces/refund';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RefundService {

  private baseUrl: string = '';

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService,
    private userService: UserService,
  ) {
    // this.baseUrl = this.utilityService.getSpringServerApiUrl() + '/admin/refund'
    this.baseUrl = this.utilityService.getSpringServerApiUrl()
    console.log("RefundService constructor baseUrl : ", this.baseUrl);
  }

  getAdminHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("admin-jwt") });
  }

  getUserHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("user-jwt") });
  }


  createRefund(rf: Refund): Observable<Refund> {
    return this.http.post<Refund>(this.baseUrl.concat('/user/createRefund'), rf, { headers: this.getUserHeaders() });
  }

  updateRefund(a: Refund): Observable<Refund> {
    return this.http.put<Refund>(this.baseUrl.concat('/admin/updateRefund'), a, { headers: this.getAdminHeaders() });
  }

  getAllRefund(): Observable<Refund[]> {
    return this.http.get<Refund[]>(this.baseUrl.concat('/admin/getAllRefund'), { headers: this.getAdminHeaders() });
  }

  getSellRefundList(): Observable<Refund[]> {
    return this.http.get<Refund[]>(this.baseUrl.concat('/user/getSellRefundList'), { params: { "sid": this.userService.getUserToken().user_id }, headers: this.getUserHeaders() });
  }

  getAllRefundRequests(uid: number): Observable<Refund[]> {
    return this.http.get<Refund[]>(this.baseUrl.concat('/user/getAllRefundRequests'), { params: { "uid": uid }, headers: this.getUserHeaders() });
  }
}
