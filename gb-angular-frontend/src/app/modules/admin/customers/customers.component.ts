import {Component, OnInit} from '@angular/core';

import {UtilityService} from '../../../services/utility.service';
import {AdminService} from '../../../services/admin.service';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {User} from '../../../interfaces/user';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-customers',
  imports: [
    NgForOf,
    DecimalPipe,
    MatProgressBar,
    NgIf
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {

  curSymbol: string = '$';
  queryMode: string = '';

  constructor(
    private adminService: AdminService,
    private utilityService: UtilityService
  ) {
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol();
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  users: User[] = [];

  getAllUsers() {
    this.queryMode = 'indeterminate';
    this.adminService.getAllCustomers().subscribe((p) => {
      this.users = p;
      this.queryMode = '';
    });
  }

  updateProduct(p: User, s: string) {
    p.status = s;
    this.adminService.updateCustomer(p).subscribe((p) => {
      if (p != null) {
        this.utilityService.toastify(true, "User Updated");
      } else {
        this.utilityService.toastify(false);
      }
    });
  }

}
