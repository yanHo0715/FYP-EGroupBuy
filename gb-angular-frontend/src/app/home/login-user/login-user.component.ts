import { Component } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {UtilityService} from '../../services/utility.service';
import {User} from '../../interfaces/user';
import {FormsModule} from '@angular/forms';
import {AuthRequest} from '../../interfaces/auth-request';
import {AuthResponse} from '../../interfaces/auth-response';


@Component({
  selector: 'app-login-customer',
  imports: [
    FormsModule,
  ],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.scss'
})
export class LoginUserComponent {

  constructor(
    private userService: UserService,
    private router: Router,
    private utilityService: UtilityService) {

    //   if (localStorage.getItem('seller-token') != null) {
    //     this.router.navigate(['seller']);
    //   }
  }

  onUserLogin(user: User): void {

    let req: AuthRequest = {
      email: user.email,
      password: user.password
    }
    console.log("====> onUserLogin - Original Data <====", user);

    this.userService.userLogin(req).subscribe(
      (res: AuthResponse) => {
        if (res.status == "success") {
          localStorage.setItem('user-jwt', res.token);
          localStorage.setItem('user-token', JSON.stringify(res.user));
          this.router.navigate(['smartgroup']);
          this.utilityService.toastify(true, "Successfully logged in")
        } else {
          this.utilityService.toastify(false)
        }
      }
    )
/*
    user.role = "SELLER";

    console.log("====> onUserLogin - Original Data <====", user);

    // this.customerService.customerSignup(customer).subscribe((customer) => {})

    this.customerService.userLogin(user).subscribe(
      (user: User) => {
        if (user != null) {
          console.log("====> onUserLogin - User Data <====", user);

          localStorage.setItem('user-token', JSON.stringify(user));
          // this.router.navigate(['seller']);
          this.router.navigate(['smartgroup']);
          this.util.toastify(true, "User Login successfully")
        } else {
          this.util.toastify(false)
        }
      }
    )
*/

  }

}
