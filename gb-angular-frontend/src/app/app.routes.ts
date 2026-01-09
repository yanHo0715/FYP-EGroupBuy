import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {ProductAddMainComponent} from './modules/user/product-add-main/product-add-main.component';
import {
  ProductAddPackagesComponent
} from './modules/user/product-add-packages/product-add-packages.component';
import {
  ProductAddItemsComponent
} from './modules/user/product-add-items/product-add-items.component';
import {ProductAddStepperComponent} from './modules/user/product-add-stepper/product-add-stepper.component';
import {HomeModule} from './home/home.module';
import {UserModule} from './modules/user/user.module';
import {MailSuccessComponent} from './home/mail-success/mail-success.component';
import {AdminModule} from './modules/admin/admin.module';


export const routes: Routes = [
  { path: "", loadChildren: () => HomeModule},
  // { path: "", loadComponent: () => ProductAddStepperComponent},
  { path: "smartgroup", loadChildren: () => HomeModule},
  { path: "customer", loadChildren: () => UserModule},
  { path: "admin", loadChildren: () => AdminModule},
  { path: "productaddstepper", loadComponent: () => ProductAddStepperComponent},
  { path: "productaddmain", loadComponent: () => ProductAddMainComponent},
  { path: "productadditem", loadComponent: () => ProductAddItemsComponent},
  { path: "productaddpackage", loadComponent: () => ProductAddPackagesComponent},
  { path: "mailsuccess", loadComponent: () => MailSuccessComponent},
  { path: "**", component: PageNotFoundComponent },

];
