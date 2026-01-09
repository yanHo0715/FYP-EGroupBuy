import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AdminService} from '../../services/admin.service';
import {DOCUMENT} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Meta, Title} from '@angular/platform-browser';
import {UtilityService} from '../../services/utility.service';

@Component({
  selector: 'app-admin',
  imports: [
    RouterOutlet
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {

  adminName: string = '';

  constructor(
    private router: Router,
    private adminService: AdminService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(DOCUMENT) private _document: Document,
    private http: HttpClient,
    public meta: Meta,
    public title: Title,
    private utilityService: UtilityService) {
    this.adminName = adminService.getAdmin().name;
  }



  onAdminLogout(): void {
    //console.log("onAdminLogout() localStorage.removeItem('admin-token') Begin : ", localStorage.getItem('admin-token'));
    localStorage.removeItem('admin-token');
    //console.log("onAdminLogout() localStorage.removeItem('admin-token') After: ", localStorage.getItem('admin-token'));
    this.router.navigate(['smartgroup/auth/adminlogin']);
  }


  ngOnInit(): void {

    this.setPageTitle();
    this.setPageMeta()

    this.addCssLinks();
    this.addJScriptLinks();
    this.addJScriptStmts();

    // this.setSidebar(); // remarked due to use the listener provided in adminlte.js

  }


  private setSidebar() {

    let sidebar:Element | null = document.querySelector('.sidebar');
    let apploaded:Element | null = document.querySelector('.app-loaded');
    let closeBtn:Element | null = document.querySelector('#btn');

    console.log("sidebar class : ", sidebar);
    console.log("apploaed class : ", apploaded);
    console.log("closeBtn class : ", closeBtn);



    closeBtn!.addEventListener('click', () => {
      //sidebar!.classList.toggle('open');
      menuBtnChange(); //calling the function(optional)
    });


    // following are the code to change sidebar button(optional)
    function menuBtnChange() {
      if (apploaded!.classList.contains('sidebar-collapse')) {
        // closeBtn!.classList.replace('bx-menu', 'bx-menu-alt-right'); //replacing the iocns class
        //closeBtn!.classList.replace('fa-bars', 'fa-square-caret-left'); //replacing the iocns class
        apploaded!.classList.replace('sidebar-collapse', 'sidebar-open');
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA sidebar-collapse")

      } else {
        apploaded!.classList.replace('sidebar-open', 'sidebar-collapse');
        console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB sidebar-open")
      }
      // if (apploaded!.classList.contains('sidebar-open')) {
      //   // closeBtn!.classList.replace('bx-menu', 'bx-menu-alt-right'); //replacing the iocns class
      //   //closeBtn!.classList.replace('fa-bars', 'fa-square-caret-left'); //replacing the iocns class
      //   apploaded!.classList.replace('sidebar-open', 'sidebar-collapse');
      //   console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA sidebar-open")
      //
      // }

      /*
            else {
              // closeBtn!.classList.replace('bx-menu-alt-right', 'bx-menu'); //replacing the iocns class
              //closeBtn!.classList.replace('fa-square-caret-left', 'fa-bars'); //replacing the iocns class
              console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
            }
      */
    }
  }


  private addCssLinks(){

    this.utilityService.addCssRefLinkLocalPath(document, "assets/admin/dist/css/adminlte.css");
    this.utilityService.addCssRefLinkUrl(document, "https://cdn.jsdelivr.net/npm/@fontsource/source-sans-3@5.0.12/index.css");
    this.utilityService.addCssRefLinkUrl(document, "https://cdn.jsdelivr.net/npm/overlayscrollbars@2.10.1/styles/overlayscrollbars.min.css");
    this.utilityService.addCssRefLinkUrl(document, "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");
    // this.utilityService.addCssRefLinkLocalPath(document, "assets/smartgroup/boxicons/css/boxicons.min.css");

  }

  private addJScriptLinks() {

    this.utilityService.addJScriptSrcLinkInBody(document, this._renderer2, "assets/ckeditor/ckeditor.js", "", "");

/*  // Must put this js in index.html
    this.utilityService.addJScriptSrcLinkInBody(
      document, this._renderer2,
      "https://cdn.jsdelivr.net/npm/overlayscrollbars@2.10.1/browser/overlayscrollbars.browser.es6.min.js",
      "sha256-dghWARbRe2eLlIJ56wNB+b760ywulqK3DzZYEpsg2fQ=",
      "anonymous");
*/

    this.utilityService.addJScriptSrcLinkInBody(
      document, this._renderer2,
      "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js",
      "sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r",
      "anonymous");

    this.utilityService.addJScriptSrcLinkInBody(
      document, this._renderer2,
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js",
      "sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy",
      "anonymous");

    this.utilityService.addJScriptSrcLinkInBody(document, this._renderer2, "assets/admin/dist/js/adminlte.js", "", "");

  }

  private addJScriptStmts(){
    this.utilityService.addJScriptSrcStmt(document, this._renderer2, this.appendJScriptStmt01());
  }

  private appendJScriptStmt01() : string {
    let appendJScriptStmt: string = '';

    appendJScriptStmt = `
      const SELECTOR_SIDEBAR_WRAPPER = '.sidebar-wrapper';
      const Default = {
        scrollbarTheme: 'os-theme-light',
        scrollbarAutoHide: 'leave',
        scrollbarClickScroll: true,
      };
      document.addEventListener('DOMContentLoaded', function () {
        const sidebarWrapper = document.querySelector(SELECTOR_SIDEBAR_WRAPPER);
        if (sidebarWrapper && typeof OverlayScrollbarsGlobal?.OverlayScrollbars !== 'undefined') {
          OverlayScrollbarsGlobal.OverlayScrollbars(sidebarWrapper, {
            scrollbars: {
              theme: Default.scrollbarTheme,
              autoHide: Default.scrollbarAutoHide,
              clickScroll: Default.scrollbarClickScroll,
            },
          });
        }
      });
    `;

    return appendJScriptStmt;
  }

  private setPageTitle(){
    this.title.setTitle('SmartGroup | Admin HomePage');
  }

  private setPageMeta() {
    this.meta.updateTag({ name: 'viewport', content: `width=device-width, initial-scale=1.0` });
    this.meta.updateTag({ name: 'title', content: `SmartGroup | Administrator HomePage` });
    this.meta.updateTag({ name: 'author', content: `ColorlibHQ` });
    this.meta.updateTag({ name: 'description', content: `SmartGroup | Administrator HomePage` });
    this.meta.updateTag({ name: 'keywords', content: `bootstrap 5, bootstrap, bootstrap 5 admin dashboard, bootstrap 5 dashboard, bootstrap 5 charts, bootstrap 5 calendar, bootstrap 5 datepicker, bootstrap 5 tables, bootstrap 5 datatable, vanilla js datatable, colorlibhq, colorlibhq dashboard, colorlibhq admin dashboard` });
  }

}
