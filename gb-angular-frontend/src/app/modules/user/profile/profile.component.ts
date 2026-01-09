import {Component, OnInit, signal} from '@angular/core';
import {UtilityService} from '../../../services/utility.service';
import {UserService} from '../../../services/user.service';
import {FormsModule} from '@angular/forms';
import {User} from '../../../interfaces/user';
import {formatNumber, NgIf, NgOptimizedImage} from '@angular/common';
import {MatDivider} from '@angular/material/divider';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBar} from '@angular/material/progress-bar';


@Component({
  selector: 'app-profile',
  imports: [
    FormsModule,
    MatDivider,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionModule,
    MatProgressBar,
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  firstname: any;
  lastname: any;
  username: any;
  phone: any;
  email: any;
  icon: any;
  password: any;
  confirmPassword: any;
  address: any;
  city: any;
  country: any;
  post_code: any;
  imageUrl: string = '';
  dummyStr: string = '%$T^y9i3D#'
  isPasswordChanged: boolean = false;
  curSymbol: string = '$';
  queryMode: string = '';
  balance: any;
  holdFund: any;
  holderName: any;
  bankName: any;
  branchName: any;
  accountNumber: any;

  user: User = {} as any;

  updUser: User = {
    user_id: 0,
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    role: '',
    email: '',
    icon: '',
    status: '',
    address: '',
    city: '',
    country: '',
    post_code: '',
    phone: '',
    balance: 0,
    account_number: '',
    holder_name: '',
    bank_name: '',
    branch_name: '',
    creation_date: '',
    user_alias: '',
    hold_fund: 0
  }

  constructor(
    private userService: UserService,
    private utilityService: UtilityService) {
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol();
  }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    this.queryMode = 'indeterminate';
    this.userService.getUserProfile().subscribe(response => {
      this.user = response;
      console.log('getUserProfile => ', this.user);

      this.firstname = this.user.first_name;
      this.lastname = this.user.last_name;
      this.username = this.user.user_alias;
      this.phone = this.user.phone;
      this.email = this.user.email;
      this.address = this.user.address;
      this.city = this.user.city;
      this.country = this.user.country;
      this.post_code = this.user.post_code;
      this.icon = this.user.icon;
      this.imageUrl = this.icon;
      this.password = this.dummyStr;
      this.confirmPassword = this.dummyStr;
      this.balance = formatNumber(Number( this.user.balance), 'en-GB', '1.2-2');
      this.holdFund = formatNumber(Number( this.user.hold_fund), 'en-GB', '1.2-2');
      this.holderName = this.user.holder_name;
      this.bankName = this.user.bank_name;
      this.branchName = this.user.branch_name;
      this.accountNumber = this.user.account_number;

      this.queryMode = '';
    });

  }

  onUpdateUserProfile() {
    console.log('onUpdateProfile => ', this.updUser);
    this.updUser.user_id = this.user.user_id;
    this.updUser.first_name = this.firstname;
    this.updUser.last_name = this.lastname;
    this.updUser.username = this.username;
    this.updUser.phone = this.phone;
    this.updUser.email = this.email;
    this.updUser.address = this.address;
    this.updUser.city = this.city;
    this.updUser.country = this.country;
    this.updUser.post_code = this.post_code;
    this.updUser.icon = this.imageUrl;
    this.updUser.role = this.user.role;
    this.updUser.holder_name = this.holderName;
    this.updUser.bank_name = this.bankName;
    this.updUser.branch_name = this.branchName;
    this.updUser.account_number = this.accountNumber;

    if (this.isPasswordChanged) {

      if (this.validateInputPassword()) {
        this.updUser.password = this.password;

        this.userService.updateUserProfileWithPwd(this.updUser).subscribe(response => {
          let result = response;

          if (response == true) {
            this.utilityService.toastify(true, "User Profile Updated!");
            this.isPasswordChanged = false;
            // window.location.reload();
          } else {
            this.utilityService.toastify(false, "", "User Profile Update Failed!");
          }
        });

      }

    } else {
      this.userService.updateUserProfile(this.updUser).subscribe(response => {
        let result = response;

        if (response == true) {
          this.utilityService.toastify(true, "User Profile Updated!");
          // window.location.reload();
        } else {
          this.utilityService.toastify(false, "", "User Profile Update Failed!");
        }
      });

    }

  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader: any = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.imageUrl = event.target.result;
        console.log('onSelectFile => ', this.imageUrl);
      }
    }
  }

  validateInputPassword(): boolean {
    let isValid = false;
    if (this.password !== this.dummyStr || this.confirmPassword !== this.dummyStr) {
      if (this.password === this.confirmPassword) {
        isValid = true;
      } else {
        this.utilityService.toastify(false, "", "New password and confirm password are not match!");
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

  protected readonly formatNumber = formatNumber;
  protected readonly Number = Number;
  readonly panelOpenState = signal(false);
}
