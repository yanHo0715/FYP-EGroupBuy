import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {DummyComponent} from '../../admin/dummy/dummy.component';
import {ProductAddComponent} from '../product-add/product-add.component';
import {userAuthGuard} from '../user-auth.guard';
import {ProductListComponent} from '../product-list/product-list.component';
import {OrderBuyComponent} from '../order-buy/order-buy.component';
import {OrderSellComponent} from '../order-sell/order-sell.component';
import {OrderBuyDetailComponent} from '../order-buy-detail/order-buy-detail.component';
import {OrderSellDetailComponent} from '../order-sell-detail/order-sell-detail.component';
import {RefundComponent} from '../refund/refund.component';
import {OrderTrackComponent} from '../order-track/order-track.component';
import {ProfileComponent} from '../profile/profile.component';
import {WithdrawComponent} from '../withdraw/withdraw.component';
import {WishlistComponent} from '../wishlist/wishlist.component';
import {GdprComponent} from '../../../home/gdpr/gdpr.component';
import {GroupbuyEventComponent} from '../groupbuy-event/groupbuy-event.component';
import {ProductEditMainComponent} from '../product-edit-main/product-edit-main.component';
import {PackageAddStepperComponent} from '../package-add-stepper/package-add-stepper.component';
import {PackageListComponent} from '../package-list/package-list.component';
import {PackageEditComponent} from '../package-edit/package-edit.component';
import {GroupbuyListComponent} from '../groupbuy-list/groupbuy-list.component';
import {SalesReportComponent} from '../sales-report/sales-report.component';


const routes: Routes = [
  {
    path: "", component: HomeComponent,
    canActivate: [userAuthGuard],
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "productadd", component: ProductAddComponent },
      { path: "productlist", component: ProductListComponent },
      { path: "buyorders", component: OrderBuyComponent },
      { path: "buyorder/:oid", component: OrderBuyDetailComponent },
      { path: "sellorders", component: OrderSellComponent },
      { path: "sellorder/:oid", component: OrderSellDetailComponent },
      { path: "orderrefund", component: RefundComponent },
      { path: "ordertrack/:oid", component: OrderTrackComponent },
      { path: "profile", component: ProfileComponent },
      { path: "withdraw", component: WithdrawComponent },
      { path: "wishlist", component: WishlistComponent },
      { path: "refund", component: RefundComponent },
      { path: "gdpr", component: GdprComponent },
      { path: "groupbuyevent", component: GroupbuyEventComponent },
      { path: "producteditmain/:pid", component: ProductEditMainComponent },
      { path: "packageadd/:pid", component: PackageAddStepperComponent },
      { path: "packagegrouplist/:pid", component: PackageListComponent },
      { path: "packagegroupedit/:pid", component: PackageEditComponent },
      { path: "groupbuyinglist", component: GroupbuyListComponent },
      { path: "salesreport", component: SalesReportComponent },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
