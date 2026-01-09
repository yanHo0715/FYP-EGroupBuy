import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UtilityService} from './utility.service';
import {Observable} from 'rxjs';
import {Brand} from '../interfaces/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private baseUrl: string = '';

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) {
    this.baseUrl = this.utilityService.getSpringServerApiUrl() + '/admin/brand'
    console.log("BrandService constructor baseUrl : ", this.baseUrl);
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("admin-jwt")
    })
  }

  getAllBrands(): Observable<Brand[]> {
    // return this.http.get<Brand[]>(this.baseUrl.concat('/all'), { headers: this.getHeaders() });
    return this.http.get<Brand[]>(this.baseUrl.concat('/getAllBrands'));
  }

  createBrand(c: Brand): Observable<Brand> {
    return this.http.post<Brand>(this.baseUrl.concat('/createBrand'), c, { headers: this.getHeaders() });
  }

  updateBrand(c: Brand): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl.concat('/updateBrand'), c, { headers: this.getHeaders() });
  }

  deleteBrand(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl.concat('/deleteBrand'), { params: { id }, headers: this.getHeaders() });
  }

}
