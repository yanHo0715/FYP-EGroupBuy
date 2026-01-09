import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {AuthResponse} from '../interfaces/auth-response';
import {User} from '../interfaces/user';
import {UtilityService} from './utility.service';
import {Product} from '../interfaces/product';
import {ProductItem} from '../interfaces/product-item';
import {Package} from '../interfaces/package';
import {PackageGroup} from '../interfaces/package-group';
import {CartItem} from '../interfaces/cart-item';
import {Order} from '../interfaces/order';
import {ProductPackage} from '../interfaces/product-package';
import {OrderDetail} from '../interfaces/order-detail';
import {Withdrawal} from '../interfaces/withdrawal';
import {Wishlist} from '../interfaces/wishlist';
import {SalesReport} from '../interfaces/sales-report';
import {AdminDashboard} from '../interfaces/admin-dashboard';
import {UserDashboard} from '../interfaces/user-dashboard';
import {Review} from '../interfaces/review';

class AuthRequest {
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private host: string = 'http://localhost:8080';
  // private host: string = 'http://192.168.56.104:8080/api/gb';
  // private baseUrl: string = this.host.concat('/customer');

  // private host: string = 'http://192.168.56.104:8080/api/gb';
  private host: string = '';
  private baseUrl: string = '';

  private searchValueSource = new BehaviorSubject<string>(this.getSearchValue());
  searchValue = this.searchValueSource.asObservable();
  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) {
    this.baseUrl = this.utilityService.getSpringServerApiUrl() + '/user';
    this.host = this.utilityService.getSpringServerApiUrl();
    console.log("UserService constructor baseUrl : ", this.baseUrl);
  }


  private parentMethodCallSource = new Subject<any>();
  parentMethodCalled$ = this.parentMethodCallSource.asObservable();

  toRefreshCart() {
    this.parentMethodCallSource.next("");
  }

  toRefreshWishlist() {
    this.parentMethodCallSource.next("");
  }

  getUserHeaders(): HttpHeaders {

    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("user-jwt")
    })
  }

  getUserToken(): User {
    return JSON.parse(localStorage.getItem('user-token') || '{}');
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>(this.baseUrl.concat('/getUserProfile/') + this.getUser().user_id, { headers: this.getUserHeaders() });
  }

  addProductMain(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl.concat('/addProductMain'), product, { headers: this.getUserHeaders() });
  }

  updateProductMain(product: Product): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl.concat('/updateProductMain'), product, { headers: this.getUserHeaders() });
  }

  productItemsManip(productItems: ProductItem[]): Observable<ProductItem[]> {
    return this.http.post<ProductItem[]>(this.baseUrl.concat('/productItemsManip'), productItems, { headers: this.getUserHeaders() });
  }

  updatePackageGroup(pkgGrp: PackageGroup): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl.concat('/updatePackageGroup'), pkgGrp, { headers: this.getUserHeaders() });
  }


/*
  addPackageList(packageList: ProductItem[][]): Observable<ProductItem[][]> {
    return this.http.post<ProductItem[][]>(this.baseUrl.concat('/addPackageList'), packageList, { headers: this.getUserHeaders() });
  }
*/
  addPackageList(packageGroup: PackageGroup): Observable<PackageGroup> {
    return this.http.post<PackageGroup>(this.baseUrl.concat('/addPackageList'), packageGroup, { headers: this.getUserHeaders() });
  }

  addPackages(packages: Package[]): Observable<Package[]> {
    return this.http.post<Package[]>(this.baseUrl.concat('/addPackages'), packages, { headers: this.getUserHeaders() });
  }

/*  getProductList(): Observable<Product[]> {
    // return this.http.get<Product[]>(this.baseUrl.concat('/productList'));
    return this.http.get<Product[]>(this.baseUrl.concat('/productList'));
  }*/

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl.concat('/getProductList/') + this.getUserToken().user_id, { headers: this.getUserHeaders() });
  }

  getSearchProductList(str : string): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl.concat('/getSearchProductList'), { params: { "str": str, "uid": this.getUserToken().user_id }, headers: this.getUserHeaders() });
  }

  deleteProduct(pid: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl.concat('/deleteProduct/') + pid, { headers: this.getUserHeaders() });
  }

  getGroupBuyingList(uid: number): Observable<ProductPackage[]> {
    return this.http.get<ProductPackage[]>(this.baseUrl.concat('/getGroupBuyingList'), { params: { "uid": uid}, headers: this.getUserHeaders() });
  }

  getSearchGroupBuyingList(str: string, uid: number): Observable<ProductPackage[]> {
    return this.http.get<ProductPackage[]>(this.baseUrl.concat('/getSearchGroupBuyingList'), { params: { "str": str, "uid": uid}, headers: this.getUserHeaders() });
  }


  getPackageGroupList(pid: number): Observable<PackageGroup[]> {
    return this.http.get<PackageGroup[]>(this.baseUrl.concat('/getPackageGroupList'), { params: { "pid": pid, "uid": this.getUserToken().user_id }, headers: this.getUserHeaders() });
  }

  getProductPackageList(uid: number): Observable<ProductPackage[]> {
    // return this.http.get<Product[]>(this.baseUrl.concat('/productList'));
    return this.http.get<ProductPackage[]>(this.baseUrl.concat('/productPackageList/') + uid);
  }

  addItemToCart(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(this.baseUrl.concat('/addItemToCart'), cartItem, { headers: this.getUserHeaders() });
  }


  getItemsInCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.baseUrl.concat('/getItemsInCart'), {
      params: { "uid": this.getUser().user_id }, headers: this.getUserHeaders() });
  }

  removeCartItem(cid: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl.concat('/removeCartItem'), { params: { "cid": cid }, headers: this.getUserHeaders() });
  }

  updateCartItem(ci: CartItem): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl.concat('/updateCartItem'), ci, { headers: this.getUserHeaders() });
  }

  createOrder(ord: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl.concat('/createOrder'), ord, { headers: this.getUserHeaders() });
  }

  updateOrderStatus(ordDetail: OrderDetail): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl.concat('/updateOrderStatus'), ordDetail, { headers: this.getUserHeaders() });
  }

  getProduct(pid: number): Observable<Product> {
    return this.http.get<Product>(this.host.concat('/getProduct/') + pid);
  }

  getProductEditMain(pid: number, uid: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl.concat('/getProductEditMain'), { params: { "pid": pid, "uid": uid }, headers: this.getUserHeaders() });
  }

  getPackageGroup(gid: number, uid: number): Observable<PackageGroup> {
    //return this.http.get<PackageGroup>(this.host.concat('/getPackageGroup/') + gid + "/" + uid);
    return this.http.get<PackageGroup>(this.baseUrl.concat('/getPackageGroup'), { params: { "gid": gid, "uid": uid }, headers: this.getUserHeaders() });
  }

  getInvoiceOrder(oid: number): Observable<Order> {
    return this.http.get<Order>(this.baseUrl.concat('/getInvoiceOrder'), { params: { "oid": oid }, headers: this.getUserHeaders() });
  }

  getBuyOrderList(uid: number): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl.concat('/getBuyOrderList'), { params: { "uid": uid }, headers: this.getUserHeaders() });
  }

  getSellOrderList(uid: number): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl.concat('/getSellOrderList'), { params: { "uid": uid }, headers: this.getUserHeaders() });
  }


  getBuyOrderDetail(oid: number): Observable<Order> {
    return this.http.get<Order>(this.baseUrl.concat('/getBuyOrderDetail'), { params: { "oid": oid }, headers: this.getUserHeaders() });
  }

  getSellOrderDetail(oid: number, sid: number): Observable<Order> {
    return this.http.get<Order>(this.baseUrl.concat('/getSellOrderDetail'), { params: { "oid": oid, "sid": sid}, headers: this.getUserHeaders() });
  }

  getOrderTracking(oid: number): Observable<OrderDetail> {
    return this.http.get<OrderDetail>(this.baseUrl.concat('/getOrderTracking'), { params: { "oid": oid }, headers: this.getUserHeaders() });
  }

  updateUserProfile(user: User): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl.concat('/updateUserProfile'), user, { headers: this.getUserHeaders() });
  }

  updateUserProfileWithPwd(user: User): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl.concat('/updateUserProfileWithPwd'), user, { headers: this.getUserHeaders() });
  }

  requestWithdraw(withdrawal: Withdrawal) {
    return this.http.post<Withdrawal>(this.baseUrl.concat('/requestWithdraw'), withdrawal, {headers: this.getUserHeaders() });
  }

  /*getWithdrawals(uid: number): Observable<Withdrawal[]> {
    return this.http.get<Withdrawal[]>(this.baseUrl.concat('/getWithdrawals'), { params: { "uid": uid }, headers: this.getUserHeaders() });
  }*/
  getWithdrawals(): Observable<Withdrawal[]> {
    return this.http.get<Withdrawal[]>(this.baseUrl.concat('/getWithdrawals'), {
      params: { "uid": this.getUser().user_id }, headers: this.getUserHeaders() });
  }

  getWishlist(): Observable<Wishlist[]> {
    return this.http.get<Wishlist[]>(this.baseUrl.concat('/getWishlist'), {
        params: { "uid": this.getUser().user_id }, headers: this.getUserHeaders() });
  }

  addWishlistItem(wishlist: Wishlist): Observable<Wishlist> {
    return this.http.post<Wishlist>(this.baseUrl.concat('/addWishlistItem'), wishlist, { headers: this.getUserHeaders() });
  }

  removeWishlistItem(wid: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl.concat('/removeWishlistItem'), { params: { "wid": wid }, headers: this.getUserHeaders() });
  }

  isWishlisted(wishlist: Wishlist): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl.concat('/isWishlisted'), wishlist);
  }

  getUserSalesReport(startDate: string, endDate: string): Observable<SalesReport[]> {
    return this.http.get<SalesReport[]>(this.baseUrl.concat('/getUserSalesReport'), {
      params: { "uid": this.getUser().user_id, "startDate": startDate, "endDate": endDate },
      headers: this.getUserHeaders()
    });
  }

  getUserDashboard(): Observable<UserDashboard> {
    return this.http.get<UserDashboard>(this.baseUrl.concat('/getUserDashboard'), { params: { "uid": this.getUserToken().user_id }, headers: this.getUserHeaders() });
  }

  addUserReview(rw: Review): Observable<boolean> {
    return this.http.post<boolean>(this.host.concat('/addUserReview'), rw, { headers: this.getUserHeaders() });
  }

  getBuyerReviews(pid: number): Observable<Review[]> {
    return this.http.get<Review[]>(this.host.concat('/getBuyerReviews/') + pid);
  }

  isPurchasedProduct(pid: number): Observable<boolean> {
    return this.http.get<boolean>(this.baseUrl.concat('/isPurchasedProduct'), {params: { "pid": pid, "uid": this.getUserToken().user_id }, headers: this.getUserHeaders()
    });
  }

  setSearchValue(keyword: string) {
    localStorage.setItem('searchValue', keyword);
    this.searchValueSource.next(keyword);
  }

  private getSearchValue(): string {
    const keyword = localStorage.getItem('searchValue') ? String(localStorage.getItem('searchValue')) : '';

    localStorage.removeItem('searchValue');

    return keyword;
  }

  /*
    customerLogin(customer: AuthRequest): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(this.baseUrl.concat('/login'), customer);
    }

    customerSignup(customer: Customer): Observable<Customer> {
      return this.http.post<Customer>(this.baseUrl.concat('/signup'), customer);
    }
  */

  userSignup(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl.concat('/usersignup'), user);
  }

  userLogin(user: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.baseUrl.concat('/userlogin'), user);
  }


  getUser(): User {
    return JSON.parse(localStorage.getItem('user-token') || '{}');
  }

/*
  getCustomer(): Customer {
    return JSON.parse(localStorage.getItem('customer-token') || '{}');
  }
*/

  // getCustomer1(): Observable<Customer> {
  //   return this.http.get<Customer>(this.baseUrl.concat('/') + this.getCustomer().id, { headers: this.getCustomerHeaders() });
  // }

/*

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.host.concat('/product/') + id);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.host.concat('/products'));
  }

  addToCart(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(this.baseUrl.concat('/cart'), cartItem, { headers: this.getCustomerHeaders() });
  }

  updateCart(cartItem: CartItem): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl.concat('/cart'), cartItem, { headers: this.getCustomerHeaders() });
  }

  removeFromCart(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl.concat('/cart'), {
      params: { "id": id },
      headers: this.getCustomerHeaders()
    });
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.baseUrl.concat('/cart'), {
      params: { "id": this.getCustomer().id },
      headers: this.getCustomerHeaders()
    });
  }



  placeOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl.concat('/order'), order, { headers: this.getCustomerHeaders() });
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(this.baseUrl.concat('/order'), {
      params: { "id": id },
      headers: this.getCustomerHeaders()
    });
  }

  getOrders(id: number): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl.concat('/orders'), {
      params: { "id": id },
      headers: this.getCustomerHeaders()
    });
  }

  trackOrder(id: number): Observable<OrderDetails> {
    return this.http.get<OrderDetails>(this.baseUrl.concat('/track'), {
      params: { "id": id },
      headers: this.getCustomerHeaders()
    });
  }

  getWishlists(): Observable<WishlistDetail[]> {
    return this.http.get<WishlistDetail[]>(
      this.host.concat('/wishlist?customerId=') + this.getCustomer().id
    );
  }

  addToWishlist(wishlist: Wishlist): Observable<boolean> {
    return this.http.post<boolean>(this.host.concat('/wishlist/add'), wishlist);
  }

  removeFromWishlist(wishlist: Wishlist): Observable<boolean> {
    return this.http.post<boolean>(this.host.concat('/wishlist/remove'), wishlist);
  }

  isWishlisted(wishlist: Wishlist): Observable<boolean> {
    return this.http.post<boolean>(this.host.concat('/wishlist/check'), wishlist);
  }

  getReviews(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(this.host.concat('/review?productId=') + productId);
  }

  isProductPurchased(productId: number): Observable<boolean> {
    return this.http.get<boolean>(this.baseUrl.concat('/check-purchased'), {
      params: { productId, customerId: this.getCustomer().id },
      headers: this.getCustomerHeaders()
    });
  }

  postReview(r: Review): Observable<boolean> {
    return this.http.post<boolean>(this.host.concat('/review/add'), r);
  }

  getSearchProducts(q: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.host.concat('/search'), { params: { q } });
  }

  sendVerificationCode(c: Customer): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl.concat('/send-code'), c, { headers: this.getCustomerHeaders() });
  }

  verifyCode(code: number): Observable<boolean> {
    return this.http.get<boolean>(this.baseUrl.concat('/verify-code'), {
      params: {
        userId: this.getCustomer().id,
        code
      },
      headers: this.getCustomerHeaders()
    });
  }
*/

}
