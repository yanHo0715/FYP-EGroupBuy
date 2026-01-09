import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Meta, Title} from '@angular/platform-browser';
import {UtilityService} from '../../services/utility.service';

@Component({
  selector: 'app-mail-success',
  imports: [],
  templateUrl: './mail-success.component.html',
  styleUrl: './mail-success.component.scss'
})
export class MailSuccessComponent implements OnInit {


  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(DOCUMENT) private _document: Document,
    private http: HttpClient,
    public meta: Meta,
    public title: Title,
    private utilityService: UtilityService) {
  };

  ngOnInit() {

    this.addCssLinks();
    this.addJScriptStmts();

  }


  private addCssLinks(){

    this.utilityService.addCssRefLinkLocalPath(document, "assets/smartgroup/css/LineIcons.3.0.css");
    this.utilityService.addCssRefLinkLocalPath(document, "assets/smartgroup/css/main.css");
  }

  private addJScriptStmts(){
    this.utilityService.addJScriptSrcStmt(document, this._renderer2, this.appendJScriptStmt01());
  }


  private appendJScriptStmt01() : string {
    let appendJScriptStmt: string = '';

    appendJScriptStmt = `
    window.onload = function () {
      window.setTimeout(fadeout, 500);
    }

    function fadeout() {
      document.querySelector('.preloader').style.opacity = '0';
      document.querySelector('.preloader').style.display = 'none';
    }
    `;

    return appendJScriptStmt;
  }


}
