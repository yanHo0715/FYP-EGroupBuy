import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Meta, Title} from '@angular/platform-browser';
import {UtilityService} from '../../services/utility.service';

@Component({
  selector: 'app-productindex',
  imports: [],
  templateUrl: './productindex.component.html',
  // styleUrl: './productindex.component.scss'
  styleUrls:['./productindex.component.scss', '../home.component.scss']
})
export class ProductindexComponent implements OnInit {


  fileText: string = 'xx';
  // ipaddress: string = '';
  // port: string = '';
  // protocol: string ='';
  url: string = '';

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(DOCUMENT) private _document: Document,
    private http: HttpClient,
    public meta: Meta,
    public title: Title,
    private utilityService: UtilityService) {           };


  ngOnInit() {

    // this.ipaddress = window.location.hostname;
    // this.port = window.location.port;
    // this.protocol = window.location.protocol;
    // console.log('window.location.hostname => ' + this.ipaddress);
    // console.log('window.location.port => ' + this.port);
    // console.log('window.location.protocol => ' + this.protocol);

    // this.url = this.protocol + '//' + this.ipaddress + ':'+ this.port
    this.url = this.utilityService.getAngularServerUrl()
    console.log('ProductindexComponent Angular server URL => ' + this.url);

    this.addJScriptFromTextFile();

  }

  addJScriptFromTextFile() {
    //console.log('getTextFile /dist/js/custom.js => In => ' + this.fileText);

    try {

//      this.http.get('http://localhost:4200/assets/smartgroup/custom/smartgroup.js', {responseType: 'text'})

      this.http.get(this.url + '/assets/smartgroup/custom/smartgroup.js', {responseType: 'text'})
        .subscribe(data => {
          //console.log('getTextFile /dist/js/custom.js => data => ' + data);
          this.fileText = data;
          this.addJScriptStmt(this.fileText);
        });
    } catch (e) {

    }
    //console.log('getTextFile /dist/js/custom.js => Out => ' + this.fileText);

  }

  private addJScriptStmt(scriptStr: string) {
    let scriptStmt = this._renderer2.createElement('script');
    //script.type = `application/ld+json`;
    scriptStmt.text = scriptStr;
    this._renderer2.appendChild(this._document.body, scriptStmt);
  }



}
