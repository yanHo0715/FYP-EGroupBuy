import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {HeaderComponent} from '../../home/header/header.component';
import {FooterComponent} from '../../home/footer/footer.component';
import {ContentComponent} from '../../home/content/content.component';
import {LoginUserComponent} from '../../home/login-user/login-user.component';
import {RegisterUserComponent} from '../../home/register-user/register-user.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    LoginUserComponent,
    RegisterUserComponent
  ]
})
export class UserModule { }
