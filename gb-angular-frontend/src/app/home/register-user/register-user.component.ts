import { Component } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {UtilityService} from '../../services/utility.service';

import {User} from '../../interfaces/user';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-register-customer',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {

  constructor(
    private userService: UserService,
    private router: Router,
    private util: UtilityService) {

  //   if (localStorage.getItem('seller-token') != null) {
  //     this.router.navigate(['seller']);
  //   }
  }

  onUserSignup(user: User): void {

    user.role = "CUSTOMER";

    console.log("====> onUserSignup - Original Data <====", user);

    this.userService.userSignup(user).subscribe(
      (user: User) => {
        if (user != null) {
          console.log("====> onUserSignup - Inserted Data <====", user);
          // localStorage.setItem('user-jwt', res.token);
          // localStorage.setItem('user-token', JSON.stringify(res.user));
          localStorage.setItem('user-token', JSON.stringify(user));
          // this.router.navigate(['seller']);
          this.router.navigate(['admin']);
          this.util.toastify(true, "Registered successfully and logged in")
        } else {
          this.util.toastify(false)
        }
      }
    )

  }

}
