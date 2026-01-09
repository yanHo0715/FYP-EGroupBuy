import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {Router, RouterOutlet} from '@angular/router';
import {FooterComponent} from './footer/footer.component';
import {ContentComponent} from './content/content.component';
import {AdminService} from '../services/admin.service';
import {DOCUMENT} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Meta, Title} from '@angular/platform-browser';
import {UtilityService} from '../services/utility.service';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    // ContentComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private adminService: AdminService,
              private _renderer2: Renderer2,
              @Inject(DOCUMENT) private readonly document: Document,
              @Inject(DOCUMENT) private _document: Document,
              private http: HttpClient,
              public meta: Meta,
              public title: Title,
              private utilityService: UtilityService) {

  }

  ngOnInit(): void {

    this.addCssLinks();
    this.addJScriptLinks();

    // this.setPageTitle();
    // this.setPageMeta()
    //
    // this.addCssLinks();
    // this.addJScriptLinks();
    // this.addJScriptStmts();
    //
    // this.setSibebar();

  }

  private addCssLinks(){

    // this.utilityService.addCssRefLinkLocalPath(document, "assets/smartgroup/bootstrap/css/bootstrap.min.css");
/*
    this.utilityService.addCssRefLinkLocalPath(document, "assets/smartgroup/css/bootstrap.min.css");
    this.utilityService.addCssRefLinkLocalPath(document, "assets/smartgroup/css/LineIcons.3.0.css");
    this.utilityService.addCssRefLinkLocalPath(document, "assets/smartgroup/css/tiny-slider.css");
    this.utilityService.addCssRefLinkLocalPath(document, "assets/smartgroup/css/glightbox.min.css");
    this.utilityService.addCssRefLinkLocalPath(document, "assets/smartgroup/css/main.css");
    this.utilityService.addCssRefLinkLocalPath(document, "assets/smartgroup/boxicons/css/boxicons.min.css");
*/

  }

  private addJScriptLinks() {

    this.utilityService.addJScriptSrcLinkInBody(
      document, this._renderer2,
      "assets/smartgroup/js/bootstrap.min.js",
      "",
      "");

    this.utilityService.addJScriptSrcLinkInBody(
      document, this._renderer2,
      "assets/smartgroup/js/tiny-slider.js",
      "",
      "");

    this.utilityService.addJScriptSrcLinkInBody(
      document, this._renderer2,
      "assets/smartgroup/js/glightbox.min.js",
      "",
      "");

    this.utilityService.addJScriptSrcLinkInBody(document, this._renderer2, "assets/smartgroup/js/main.js", "", "");

  }

}
