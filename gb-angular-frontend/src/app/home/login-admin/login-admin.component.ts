import { Component } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Router} from '@angular/router';
import {Admin} from '../../interfaces/admin';
import {AuthRequest} from '../../interfaces/auth-request';
import {AuthResponse} from '../../interfaces/auth-response';
import {UtilityService} from '../../services/utility.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.scss'
})
export class LoginAdminComponent {

  constructor(
    private adminService: AdminService,
    private router: Router,
    private utilityService: UtilityService
  ) {

    if (localStorage.getItem('admin-token') != null) {
      console.log("localStorage.getItem('admin-token'): ", localStorage.getItem('admin-token'));
      this.router.navigate(['admin']);
    }
  }

  onAdminLogin(admin: Admin): void {
    let req: AuthRequest = {
      email: admin.email,
      password: admin.password
    }

    console.log("onAdminLogin : ", admin);

    this.adminService.adminLogin(req).subscribe(
      (res: AuthResponse) => {
        if (res.status == "success") {
          localStorage.setItem('admin-jwt', res.token);
          localStorage.setItem('admin-token', JSON.stringify(res.user));

          console.log("adminService.adminLogin : ", res);

          this.utilityService.toastify(true, "Successfully logged in")
          this.router.navigate(['admin/home']);
        } else {
          this.utilityService.toastify(false);
        }
      }
    )
  }

}
