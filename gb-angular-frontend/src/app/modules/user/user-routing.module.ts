import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from './user.component';
import {HomeModule} from './home/home.module';
import {ProductListComponent} from './product-list/product-list.component';




const routes: Routes = [
  {
    path: "", component: UserComponent,
    children: [
      // { path: "login", loadChildren: () =>AuthModule },
      // { path: "register", loadChildren: () =>AuthModule },
      // { path: "", component: DummyComponent },
      // { path: "auth", loadChildren: () =>AuthModule },
      { path: "home", loadChildren: () =>HomeModule },
      // { path: "dashboard", loadComponent: () => DashboardComponent },
      // { path: "register", component: RegisterUserComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
