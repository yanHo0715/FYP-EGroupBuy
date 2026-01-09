import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home.component';
import {ContentComponent} from './content/content.component';
import {ProductindexComponent} from './product-index/productindex.component';
import {ProductgridComponent} from './product-grid/productgrid.component';
import {ProductdetailComponent} from './product-detail/productdetail.component';
import {CartComponent} from './cart/cart.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {ContactusComponent} from './contactus/contactus.component';
import {AboutComponent} from './about/about.component';
import {FaqComponent} from './faq/faq.component';
import {AuthModule} from './auth/auth.module';
import {MailSuccessComponent} from './mail-success/mail-success.component';
import {InvoiceComponent} from './invoice/invoice.component';
import {PackageGridComponent} from './package-grid/package-grid.component';

const routes: Routes = [
  {
    path: "", component: HomeComponent, children: [
      { path: "", component: ContentComponent },
      { path: "productindex", component: ProductindexComponent },
      { path: "productgrid", component: ProductgridComponent },
      { path: "productgrid/:cid", component: PackageGridComponent },
      { path: "productdetail", component: ProductdetailComponent },
      { path: "productdetail/:pid/:type", component: ProductdetailComponent },
      { path: "packagegrid", component: PackageGridComponent },
      { path: "packagegrid/:gid", component: PackageGridComponent },
      { path: "cart", component: CartComponent },
      { path: "checkout", component: CheckoutComponent },
      { path: "invoice/:oid", component: InvoiceComponent },
      { path: "contactus", component: ContactusComponent },
      { path: "about", component: AboutComponent },
      { path: "faq", component: FaqComponent },
      // { path: "mailsuccess", component: MailSuccessComponent},
      { path: "auth", loadChildren: () =>AuthModule }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
