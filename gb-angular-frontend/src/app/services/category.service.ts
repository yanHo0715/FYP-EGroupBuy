import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Category} from '../interfaces/category';
import {UtilityService} from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  //private baseUrl: string = 'http://localhost:8080/category';
  // private baseUrl: string = 'http://192.168.56.110:8080/category';
  // private host: string = 'http://192.168.56.104:8080/api/gb';
  //
  // private baseUrl: string = this.host.concat('/admin/category');
  private baseUrl: string = '';

  private categorySource = new BehaviorSubject<number>(this.getStoredCategoryId());
  selectedCategoryId = this.categorySource.asObservable();
  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) {
    this.baseUrl = this.utilityService.getSpringServerApiUrl() + '/admin'
    console.log("CategoryService constructor baseUrl : ", this.baseUrl);
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("admin-jwt")
    })
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.utilityService.getSpringServerApiUrl() + '/getAllCategories');
    // return this.http.get<Category[]>(this.baseUrl.concat('/getCategories'), { headers: this.getHeaders() });
    //return this.http.get<Category[]>(this.baseUrl.concat('/all'));
  }

  createCategory(c: Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl.concat('/createCategory'), c, { headers: this.getHeaders() });
  }

  updateCategory(c: Category): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl.concat('/updateCategory'), c, { headers: this.getHeaders() });
  }

  deleteCategory(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl.concat('/deleteCategory'), { params: { id }, headers: this.getHeaders()
    });
  }

  setSelectedCategoryId(id: number) {
    localStorage.setItem('selectedCategoryId', id.toString());
    this.categorySource.next(id);
  }

  private getStoredCategoryId(): number {
    const categoryId = localStorage.getItem('selectedCategoryId') ? Number(localStorage.getItem('selectedCategoryId')) : 0;

    localStorage.removeItem('selectedCategoryId');

    return categoryId;
  }

}
