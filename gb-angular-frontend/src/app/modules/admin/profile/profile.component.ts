import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {UtilityService} from '../../../services/utility.service';
import {AdminService} from '../../../services/admin.service';
import {User} from '../../../interfaces/user';
import {Admin} from '../../../interfaces/admin';
import {FormsModule} from '@angular/forms';
import {MatProgressBar} from '@angular/material/progress-bar';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [
    FormsModule,
    MatProgressBar,
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {


  name: any;
  email: any;
  icon: any;
  password: any;
  confirmPassword: any;
  imageUrl: string = '';
  dummyStr: string = '%$T^y9i3D#'
  isPasswordChanged: boolean = false;
  queryMode: string = '';

  admin: Admin = {} as any;

  updAdmin: Admin = {
    admin_id: 0,
    name: '',
    password: '',
    role: '',
    email: '',
    icon: '',
  }

  constructor(
    private adminService: AdminService,
    private utilityService: UtilityService)
  { }

  ngOnInit(): void {
    this.getAdminProfile();
  }

  getAdminProfile() {
    this.queryMode = 'indeterminate';

    this.adminService.getAdminProfile().subscribe(response => {
      this.admin = response;
      console.log('getAdminProfile => ', this.admin);

      this.name = this.admin.name;
      this.email = this.admin.email;
      this.icon = this.admin.icon;
      this.imageUrl = this.icon;
      this.password = this.dummyStr;
      this.confirmPassword = this.dummyStr;

      this.queryMode = '';

    });

  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader : any = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.imageUrl = event.target.result;
        console.log('onSelectFile => ', this.imageUrl);
      }
    }
  }

  onUpdateAdminProfile() {
    console.log('onUpdateProfile => ', this.updAdmin);
    this.updAdmin.admin_id = this.admin.admin_id;
    this.updAdmin.name = this.name;
    this.updAdmin.email = this.email;
    this.updAdmin.icon = this.imageUrl;
    this.updAdmin.role = this.admin.role;

    if (this.isPasswordChanged) {

      if (this.validateInputPassword()) {
        this.updAdmin.password = this.password;

        this.adminService.updateAdminProfileWithPwd(this.updAdmin).subscribe(response => {
          let result = response;

          if (response == true) {
            this.utilityService.toastify(true, "Admin Profile Updated!");
            this.isPasswordChanged = false;
            // window.location.reload();
          } else {
            this.utilityService.toastify(false, "", "Admin Profile Update Failed!");
          }
        });

      }

    } else {
      this.adminService.updateAdminProfile(this.updAdmin).subscribe(response => {
        let result = response;

        if (response == true) {
          this.utilityService.toastify(true, "Admin Profile Updated!");
          // window.location.reload();
        } else {
          this.utilityService.toastify(false, "", "Admin Profile Update Failed!");
        }
      });

    }

  }

  validateInputPassword(): boolean {
    let isValid = false;
    if (this.password !== this.dummyStr || this.confirmPassword !== this.dummyStr ) {
      if (this.password === this.confirmPassword) {
        isValid = true;
      } else {
        this.utilityService.toastify(false, "" ,"New password and confirm password are not match!");
        isValid = false;
      }
    }
    return isValid
  }

  onChangePassword() {
    this.isPasswordChanged = true;
    console.log('this.isPasswordChanged => ', this.isPasswordChanged);
  }

  onReset() {
    window.location.reload();
  }

}
