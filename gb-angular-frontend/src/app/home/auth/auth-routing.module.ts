import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginUserComponent} from '../login-user/login-user.component';
import {RegisterUserComponent} from '../register-user/register-user.component';
import {AdminComponent} from '../../modules/admin/admin.component';
import {DummyComponent} from '../../modules/admin/dummy/dummy.component';
import {DashboardComponent} from '../../modules/admin/dashboard/dashboard.component';
import {ProductEditComponent} from '../../modules/admin/product-edit/product-edit.component';
import {AuthComponent} from './auth.component';
import {LoginAdminComponent} from '../login-admin/login-admin.component';

const routes: Routes = [
  {
    path: "", component: AuthComponent, children: [
      { path: "login", component: LoginUserComponent },
      { path: "register", component: RegisterUserComponent },
      { path: "adminlogin", component: LoginAdminComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
