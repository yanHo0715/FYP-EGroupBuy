import {Component, OnInit} from '@angular/core';
import {PackageGroup} from '../../../interfaces/package-group';
import {UserService} from '../../../services/user.service';
import {UtilityService} from '../../../services/utility.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ProductPackage} from '../../../interfaces/product-package';
import {formatDate, NgForOf, NgIf} from '@angular/common';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-groupbuy-list',
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    MatProgressBar
  ],
  templateUrl: './groupbuy-list.component.html',
  styleUrl: './groupbuy-list.component.scss'
})
export class GroupbuyListComponent implements OnInit {

  pdtPackageList: ProductPackage[] = [];
  curSymbol: string = '$';
  queryMode: string = '';
  // productID: number = 0;
  curUser: number = 0;

  constructor(
    private userService: UserService,
    private utilityService: UtilityService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol()
    this.curUser = this.userService.getUserToken().user_id;
  }


  ngOnInit(): void {
    // this.productID = this.route.snapshot.params["pid"];
    this.getGroupBuyingList();
  }

  getGroupBuyingList() {
    this.queryMode = 'indeterminate';
    this.userService.getGroupBuyingList(this.curUser).subscribe((response) => {
      this.pdtPackageList = response;
      this.queryMode = '';
      console.log("===== User GroupBuyingComponent - getGroupBuyingList() : ", this.pdtPackageList);
    });
  }

  onSearch(e : any) {
    if (e.target.value) {
      this.queryMode = 'indeterminate';
      this.userService.getSearchGroupBuyingList(e.target.value, this.curUser).subscribe((response) => {
        this.pdtPackageList = response;
        this.queryMode = '';
        console.log("===== User ProductListComponent - onSearch() : ", e);
      });
    } else {
      this.getGroupBuyingList();
    }

  }
  protected readonly formatDate = formatDate;
}

