import {Component, OnInit} from '@angular/core';
import {Product} from '../../../interfaces/product';
import {UserService} from '../../../services/user.service';
import {UtilityService} from '../../../services/utility.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {PackageGroup} from '../../../interfaces/package-group';
import {formatDate, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-package-list',
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './package-list.component.html',
  styleUrl: './package-list.component.scss'
})
export class PackageListComponent implements OnInit {

  pkgGrpList: PackageGroup[] = [];
  curSymbol: string = '$';
  productID: number = 0;

  constructor(
    private userService: UserService,
    private utilityService: UtilityService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol()
  }


  ngOnInit(): void {
    this.productID = this.route.snapshot.params["pid"];
    this.getPackageGroupList();
  }

  getPackageGroupList() {
    this.userService.getPackageGroupList(this.productID).subscribe((response) => {
      this.pkgGrpList = response;
      console.log("===== User PackageListComponent - getPackageGroupList() : ", this.pkgGrpList);
    });
  }

  protected readonly formatDate = formatDate;
}
