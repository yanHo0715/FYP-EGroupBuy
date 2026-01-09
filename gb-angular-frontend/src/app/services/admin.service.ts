import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Admin} from '../interfaces/admin';
import {AuthRequest} from '../interfaces/auth-request';
import {Observable} from 'rxjs';
import {AuthResponse} from '../interfaces/auth-response';
import {UtilityService} from './utility.service';
import {Product} from '../interfaces/product';
import {User} from '../interfaces/user';
import {WithdrawalAdmin} from '../interfaces/withdrawal-admin';
import {Order} from '../interfaces/order';
import {OrderDetail} from '../interfaces/order-detail';
import {SalesReport} from '../interfaces/sales-report';
import {AdminDashboard} from '../interfaces/admin-dashboard';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  //private baseUrl: string = 'http://localhost:8080/admin';
  //private baseUrl: string = 'http://192.168.56.104:8080/api/gb/admin';
  private baseUrl: string = '';

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) {
    this.baseUrl = this.utilityService.getSpringServerApiUrl() + '/admin'
    console.log("AdminService constructor baseUrl : ", this.baseUrl);
  }


  getAdmin(): Admin {
    return JSON.parse(localStorage.getItem('admin-token') || '{}');
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("admin-jwt")
    })
  }

  adminLogin(req: AuthRequest): Observable<AuthResponse> {
    console.log("AdminService adminLogin: ", this.baseUrl.concat('/login'), req);
    return this.http.post<AuthResponse>(this.baseUrl.concat('/login'), req);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl.concat('/getAllProducts'), { headers: this.getHeaders() });
  }

  getSearchAllProducts(str: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl.concat('/getSearchAllProducts'), { params: { "str": str}, headers: this.getHeaders() });
  }

  updateProduct(p: Product): Observable<Product> {
    return this.http.put<Product>(this.baseUrl.concat('/updateProduct'), p, { headers: this.getHeaders() });
  }

  getAllCustomers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl.concat('/getAllCustomers'), { headers: this.getHeaders() });
  }

  updateCustomer(a: User): Observable<User> {
    return this.http.put<User>(this.baseUrl.concat('/updateCustomer'), a, { headers: this.getHeaders() });
  }

  getAllWithdrawals(): Observable<WithdrawalAdmin[]> {
    return this.http.get<WithdrawalAdmin[]>(this.baseUrl.concat('/getAllWithdrawals'), { headers: this.getHeaders() });
  }

  updateWithdraw(wa: WithdrawalAdmin): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl.concat('/updateWithdraw'), wa, { headers: this.getHeaders() });
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl.concat('/getOrders'), {headers: this.getHeaders()});
  }

  getOrder(orderid: number): Observable<Order> {
    return this.http.get<Order>(this.baseUrl.concat('/getOrder/') + orderid/*, {
      params: { "orderid": orderId }, headers: this.getHeaders()
    }*/);
  }

  updateOrder(order: OrderDetail): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl.concat('/updateOrder'), order, { headers: this.getHeaders() });
  }

  getShippedOrderDetailList(): Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>(this.baseUrl.concat('/getShippedOrderDetailList'), { headers: this.getHeaders() });
  }

  getAdminSalesReport(startDate: string, endDate: string): Observable<SalesReport[]> {
    return this.http.get<SalesReport[]>(this.baseUrl.concat('/getAdminSalesReport'), {
      params: { startDate, endDate },
      headers: this.getHeaders()
    });
  }

  getAdminProfile(): Observable<Admin> {
    return this.http.get<Admin>(this.baseUrl.concat('/getAdminProfile/') + this.getAdmin().admin_id, { headers: this.getHeaders() });
  }

  updateAdminProfile(admin: Admin): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl.concat('/updateAdminProfile'), admin, { headers: this.getHeaders() });
  }

  updateAdminProfileWithPwd(admin: Admin): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl.concat('/updateAdminProfileWithPwd'), admin, { headers: this.getHeaders() });
  }

  getAdminDashboard(): Observable<AdminDashboard> {
    return this.http.get<AdminDashboard>(this.baseUrl.concat('/getAdminDashboard'), { headers: this.getHeaders() });
  }
}
