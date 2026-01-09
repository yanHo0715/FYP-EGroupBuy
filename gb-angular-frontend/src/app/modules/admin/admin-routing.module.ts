import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from '../user/user.component';
import {LoginUserComponent} from '../../home/login-user/login-user.component';
import {RegisterUserComponent} from '../../home/register-user/register-user.component';
import {AdminComponent} from './admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DummyComponent} from './dummy/dummy.component';
import {ProductAddStepperComponent} from '../user/product-add-stepper/product-add-stepper.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {CategoriesComponent} from './categories/categories.component';
import {LoginAdminComponent} from '../../home/login-admin/login-admin.component';
import {adminAuthGuard} from './admin-auth.guard';
import {BrandComponent} from './brand/brand.component';
import {ProductListComponent} from './product-list/product-list.component';
import {CustomersComponent} from './customers/customers.component';
import {WithdrawComponent} from './withdraw/withdraw.component';
import {OrderComponent} from './order/order.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {RefundComponent} from './refund/refund.component';
import {DeliveryComponent} from './delivery/delivery.component';
import {SalesReportComponent} from './sales-report/sales-report.component';
import {ProfileComponent} from './profile/profile.component';
import {GroupbuyEventComponent} from './groupbuy-event/groupbuy-event.component';

const routes: Routes = [
  {
    path: "", component: AdminComponent,
    canActivate: [adminAuthGuard],
    children: [
      { path: "home", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "categories", component: CategoriesComponent },
      { path: "productedit", component: ProductEditComponent },
      { path: "brands", component: BrandComponent },
      { path: "productlist", component: ProductListComponent},
      { path: "customers", component: CustomersComponent},
      { path: "withdraw", component: WithdrawComponent },
      { path: "orders", component: OrderComponent},
      { path: "order/:orderid", component: OrderDetailComponent },
      { path: "delivery", component: DeliveryComponent },
      { path: "refund", component: RefundComponent },
      { path: "salesreport", component: SalesReportComponent },
      { path: "profile", component: ProfileComponent },
      { path: "groupbuyevent", component: GroupbuyEventComponent },
    ]
  }
  // { path: "login", component: LoginAdminComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
