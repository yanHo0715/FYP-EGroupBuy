import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UtilityService} from './utility.service';


//const API_URL = 'http://192.168.56.104:8080/api/gb/';
// const API_URL = 'http://localhost:8080/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class HelloWorldAngularspringbootService {

  private API_URL = '';

  constructor(private http: HttpClient, private utilityService: UtilityService) { }

  getServerMessage(): Observable<any> {
    this.API_URL = this.utilityService.getSpringServerApiUrl()
    return this.http.get(this.API_URL + '/helloworld', { responseType: 'text' });
  }
}
