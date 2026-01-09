import {Injectable, Renderer2} from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, take} from 'rxjs';
import {User} from '../interfaces/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private toast: NgToastService, private http: HttpClient) { }
  private baseUrl: string = '';

  getUserHeaders(): HttpHeaders {

    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("user-jwt")
    })
  }

  getUserToken(): User {
    return JSON.parse(localStorage.getItem('user-token') || '{}');
  }


  toastify(success: boolean, msg: string = 'Task completed', errmsg: string = 'Something went wrong') {
    if (success) {
      //this.toast.success({ detail: "SUCCESS", summary: msg, duration: 3500, position: "topCenter" });
      this.toast.success(msg, "SUCCESS", 5000 );
    } else {
      //this.toast.error({ detail: "ERROR", summary: errmsg, duration: 3500, position: 'topCenter' });
      this.toast.danger(errmsg, "ERROR", 5000);
      //this.toast.danger(msg, "ERROR", 5000);
    }
  }

  calcDateDiffInDays(dateStr1: string, dateStr2: string): number {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);

    const timeDifference = Math.abs(date2.getTime() - date1.getTime());
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return daysDifference;
  }

  getSpringServerApiUrl(): string {
    let springServerIP = "";
    let springServerPort = "";
    let protocol = "";
    let apiUrl = "";
    let springServerApiUrl = "";

    // console.log("========> Angular Environment Config : ", environment);

    protocol = window.location.protocol;
    springServerIP = environment.springserverip;
    springServerPort = environment.springserverport;
    apiUrl = environment.apiUrl;

    springServerApiUrl = protocol + '//' + springServerIP + ':'+ springServerPort + apiUrl
    // console.log('Spring Server URL => ' + springServerApiUrl);

    return springServerApiUrl;

  }

  getSpringServerUrl(): string {
    let springServerIP = "";
    let springServerPort = "";
    let protocol = "";
    let springServerUrl = "";

    console.log("========> Angular Environment Config : ", environment);

    protocol = window.location.protocol;
    springServerIP = environment.springserverip;
    springServerPort = environment.springserverport;

    springServerUrl = protocol + '//' + springServerIP + ':'+ springServerPort
    console.log('Spring Server URL => ' + springServerUrl);

    return springServerUrl;

  }

  getAngularServerUrl(): string {
    let ngServerIP = "";
    let ngServerPort = "";
    let protocol = "";
    let ngServerUrl = "";

    ngServerIP = window.location.hostname;
    ngServerPort = window.location.port;
    protocol = window.location.protocol;
    console.log('Angular server window.location.hostname => ' + ngServerIP);
    console.log('Angular server window.location.port => ' + ngServerPort);
    console.log('Angular server window.location.protocol => ' + protocol);

    ngServerUrl = protocol + '//' + ngServerIP  + ':'+ ngServerPort
    console.log('Angular server URL => ' + ngServerUrl);

    return ngServerUrl;
  }


  getSysBaseCurrencyName(): string {

    let baseCurName = "";

    baseCurName = environment.baseCurrencyName;
    console.log('Angular server base currency name => ' + baseCurName);

    return baseCurName;
  }

  getSysBaseCurrencySymbol(): string {

    let baseCurSymbol = "";

    baseCurSymbol = environment.baseCurrencySymbol;
    console.log('Angular server base currency symbol => ' + baseCurSymbol);

    return baseCurSymbol;
  }

  getSysBaseCurrencyRate(): number {

    let baseCurRate: number = 1;

    baseCurRate = environment.baseCurrencyRate.valueOf();
    console.log('Angular server base currency rate => ' + baseCurRate);

    return baseCurRate;
  }

  getMaxOrderQty(): number {

    let maxOrderQty: number = 0;

    maxOrderQty = environment.maxOrderQty;
    console.log('Angular server max allow order quantity => ' + maxOrderQty);

    return maxOrderQty;
  }

  getMinWithdraw(): number {

    let minWithDraw: number = 0;

    minWithDraw = environment.minWithdraw ? environment.minWithdraw : 10 ;
    console.log('Angular server min withdraw => ' + minWithDraw);

    return minWithDraw;
  }

  getWithdrawThreshold(): number {

    let withDrawThreshold: number = 0;

    withDrawThreshold = environment.withdrawThreshold ? environment.withdrawThreshold : 1000 ;
    console.log('Angular server withdraw threshold => ' + withDrawThreshold);

    return withDrawThreshold;
  }

  getRefundAllowDays(): number {

    let refundAllowDays: number = 0;

    refundAllowDays = environment.refundAllowDays ? environment.refundAllowDays : 7 ;
    console.log('Angular server days for allow to refund request => ' + refundAllowDays);

    return refundAllowDays;
  }

  getVATPercentage(): number {

    let vatPercentage: number = 0;

    vatPercentage = environment.vatPercentage ? environment.vatPercentage : 20 ;
    console.log('Angular server VAT percentage => ' + vatPercentage);

    return vatPercentage;
  }


  addJScriptSrcLinkInHead(inDoc: Document, inSrc: string, inIntegrity: string, inCrossOrigin: string) {

    const script :HTMLScriptElement = inDoc.createElement('script');

    script.src = inSrc;

    if (inIntegrity) {
      script.integrity = inIntegrity;
    }

    if (inCrossOrigin) {
      script.crossOrigin = inCrossOrigin;
    }

    console.log('UltilityService addJScriptSrcLink => ', script);

    inDoc.head.appendChild(script);
  }

  addJScriptSrcLinkInBody(inDoc: Document, inRenderer:Renderer2, inSrc: string, inIntegrity: string, inCrossOrigin: string ){
    let script = inRenderer.createElement('script');

    script.src = inSrc;

    if (inIntegrity) {
      script.integrity = inIntegrity;
    }

    if (inCrossOrigin) {
      script.crossOrigin = inCrossOrigin;
    }

    console.log('UltilityService addJScriptSrcStmt => ', script);

    inRenderer.appendChild(inDoc.body, script);
  }

  addJScriptSrcStmt(inDoc: Document, inRenderer:Renderer2, inJScriptStmt: string) {

    let jScriptStmt = inRenderer.createElement('script');
    //script.type = `application/ld+json`;
    jScriptStmt.text = inJScriptStmt;

    console.log('UltilityService addJScriptSrcStmt => ', jScriptStmt);

    inRenderer.appendChild(inDoc.body, jScriptStmt);

  }

  addJScriptSrcFromTextFile(inDoc: Document, inRenderer:Renderer2, inUrl: string) {

    let fileText: string = '';

    try {
      this.http.get(inUrl, {responseType: 'text'})
        .subscribe(data => {
          fileText = data;
          this.addJScriptSrcStmt(inDoc, inRenderer, fileText);
          // console.log('UltilityService addJScriptSrcFromTextFile => ', fileText);
        });
    } catch (e) {
      console.log('UltilityService addJScriptSrcFromTextFile Exception => ', e);
    }

  }


  addCssRefLinkLocalUrl(inDoc: Document, linkRef : string){
    let link: HTMLLinkElement =  inDoc.createElement('link');

    // @ts-ignore
    //let initlink: HTMLLinkElement = inDoc.getElementById('link');

    console.log("addCssRefLinkLocalUrl local css url = ", this.getAngularServerUrl() + '/' + linkRef);
    //console.log("initlink = ", initlink);

    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', this.getAngularServerUrl() + '/' + linkRef);

    inDoc.head.appendChild(link);
    //this.document.head.insertBefore();
  }

  addCssRefLinkLocalPath(inDoc: Document, linkRef : string){
    let link: HTMLLinkElement =  inDoc.createElement('link');

    console.log("addCssRefLinkLocalUrl local css path = ", linkRef);

    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', linkRef);

    inDoc.head.appendChild(link);

  }

  addCssRefLinkUrl(inDoc: Document, linkRef : string){
    let link: HTMLLinkElement =  inDoc.createElement('link');

    console.log("addCssRefLinkUrl internet css url = ", linkRef);

    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', linkRef);

    inDoc.head.appendChild(link);

  }

  uploadFile(formData: FormData): Observable<any> {
    this.baseUrl = this.getSpringServerApiUrl();
    // console.log("uploadFile url = " + this.baseUrl + '/upload');
    return this.http.post<any>(this.baseUrl.concat('/upload'), formData);
  }

  downloadFile(uid: number, fileUrl: string): Observable<any> {
    this.baseUrl = this.getSpringServerApiUrl();
    console.log("downloadFile url = " + this.baseUrl + '/upload' + fileUrl);
    return this.http.get<any>(this.baseUrl.concat('/download') , { params: { "filenameUrl": fileUrl }, headers: this.getUserHeaders() });
  }


  // getImage(imageUrl: string): Observable<File> {
  //   return this.http
  //     .get(imageUrl, { responseType: this.ResponseContentType.Blob })
  //     .map((res: Response) => res.blob());
  // }

  imageUrlToBase64(urL: string) {
    return this.http.get(urL, {
      observe: 'body',
      responseType: 'arraybuffer',
    })
      .pipe(
        take(1),
        map((arrayBuffer) =>
          btoa(
            Array.from(new Uint8Array(arrayBuffer))
              .map((b) => String.fromCharCode(b))
              .join('')
          )
        ),
      )
  }

  deleteUploadedFile(formData: FormData): Observable<any> {
    this.baseUrl = this.getSpringServerApiUrl();
    // console.log("uploadFile url = " + this.baseUrl + '/upload');
    return this.http.post<any>(this.baseUrl.concat('/deleteuploadfile'), formData);
  }

  public discount(regPrice: number, salePrice: number): number {
    let salePercent: number = 0;

    if (regPrice && salePrice && (salePrice < regPrice)) {
      salePercent = ((regPrice - salePrice) / regPrice) * 100 ;
    } else {
      salePercent = 0;
    }

    // console.log("salePercent = ",  regPrice, salePrice, salePercent);

    return salePercent;

  }

  public isNewItem(cDate: String): boolean {

    let curDate: any = new Date();
    let createDate: any;
    let isNewItem = false;
    let newItemDays = environment.newItemDay as number;
    let diffDays = 0;

    if (cDate && newItemDays) {
      createDate = new Date(cDate as any);
      diffDays = Math.floor((curDate - createDate) / (1000 * 60 * 60 * 24));
      // console.log("diffDays = ",  createDate, curDate, diffDays);
      if (diffDays >= 0 && diffDays <= newItemDays) {
        isNewItem = true
      }
    }

    return isNewItem;
  }

}
