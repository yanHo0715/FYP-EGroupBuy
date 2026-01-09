import {Component, OnInit} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {UserService} from '../../../services/user.service';
import {UtilityService} from '../../../services/utility.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductItem} from '../../../interfaces/product-item';
import {PackageGroup} from '../../../interfaces/package-group';
import {PackageItem} from '../../../interfaces/package-item';
import {Package} from '../../../interfaces/package';

@Component({
  selector: 'app-package-edit',
  imports: [
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './package-edit.component.html',
  styleUrl: './package-edit.component.scss'
})
export class PackageEditComponent implements OnInit {

  localDefCurrentDateTime: string = '';

  constructor(
    private userService: UserService,
    private utilityService: UtilityService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {

    // this.localDefCurrentDateTime = this.setDefCurrentDateTime();

  }

  curUserId: number = 0;
  pkgGrpId: number = 0;
  packageGroup: PackageGroup = {} as any;
  packageList:PackageItem[][] = [];
  availProductItems: PackageItem[] = [];
  orgProductItems: ProductItem[] = [];
  updPkgGroup = {} as PackageGroup;
  packageGroupForm: any;
  curSymbol: string = '$';

  packFormArray!: FormArray<FormGroup<{
    description: FormControl<any>;
    regular_price: FormControl<any>;
    sale_price: FormControl<any>;
  }>>;

  newPackDetail: any =
    {
      description: '',
      regular_price: 0,
      sale_price: 0,
    };

  fPackageGroupName: string = '';
  fQuantity: number = 0;
  fGroupBuyStart: string = '';
  fGroupBuyEnd: string = '';
  fGroupBuyMinThreshold: number = 0;
  fGroupBuyStatus: string = 'Inactive';



  ngOnInit(): void {
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol();

    this.pkgGrpId = this.route.snapshot.params["pid"];
    this.curUserId = this.userService.getUserToken().user_id;
    this.getPackageGroup();


    this.packFormArray = new FormArray([]) as any;



  }

  getPackageGroup() {
    this.userService.getPackageGroup(this.pkgGrpId, this.curUserId).subscribe((response) => {
      this.packageGroup = response;
      console.log("===== User PackageListComponent - getPackageGroupList() : ", this.packageGroup);


      this.packageGroupForm = new FormGroup({
        package_grp_name: new FormControl(this.packageGroup.package_grp_name),
        quantity: new FormControl(this.packageGroup.quantity),
        grpbuy_start: new FormControl(this.packageGroup.grpbuy_start),
        grpbuy_end: new FormControl(this.packageGroup.grpbuy_end),
        min_threshold: new FormControl(this.packageGroup.min_threshold),
        status: new FormControl(this.packageGroup.status)

      })
      this.packageGroupForm.controls['grpbuy_start'].setValue(this.datePipe.transform(this.packageGroupForm.value.grpbuy_start, 'yyyy-MM-ddTHH:mm:ss'));
      this.packageGroupForm.controls['grpbuy_end'].setValue(this.datePipe.transform(this.packageGroupForm.value.grpbuy_end, 'yyyy-MM-ddTHH:mm:ss'));

      this.rebuildPackageList();
      console.log( ' this.packageGroupForm ---> ', this.packageGroupForm);

    });
  }

  rebuildPackageList() {
    let pLen: number = 0;

    pLen = this.packageGroup.package_list.length;

    for(let i = 0; i < pLen; i++) {
      this.packageList.push([]);
      this.packageList[i] = this.packageGroup.package_list[i].package_item_list;
      this.packFormArray.push(new FormGroup({
        description: new FormControl(this.packageGroup.package_list[i].description),
        regular_price: new FormControl(this.packageGroup.package_list[i].regular_price),
        sale_price: new FormControl(this.packageGroup.package_list[i].sale_price)
      }));
    }


  }

  drop(event: CdkDragDrop<PackageItem[]>) {

    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      //console.log( ' this.availProductItems ---> ', this.availProductItems);
      //console.log( ' this.package1 ---> ', this.package1);
      //console.log( ' this.package2 ---> ', this.package2);
      //console.log( ' this.package3 ---> ', this.package3);
      // this.removeEmptyPackage();
      // this.addNewPackage();

      console.log( ' this.packFormArray ---> ', this.packFormArray);

    }
  }

  getControl(index: number, controlName: string): FormControl {
    return (this.packFormArray.at(index) as FormGroup).get(controlName) as FormControl;
  }

  onSavePackageGroup(){

    let orgQty : number = this.packageGroup.quantity;
    let diffQty : number = (this.packageGroupForm.value.quantity as number) - orgQty;

    this.updPkgGroup.package_grp_id = this.packageGroup.package_grp_id;
    this.updPkgGroup.package_grp_name = this.packageGroupForm.value.package_grp_name as string;
    this.updPkgGroup.creation_date = this.packageGroup.creation_date;
    this.updPkgGroup.quantity = this.packageGroupForm.value.quantity as number;
    this.updPkgGroup.product_id = this.packageGroup.product_id;
    this.updPkgGroup.product_title = this.packageGroup.product_title;
    this.updPkgGroup.status = this.packageGroupForm.value.status;
    this.updPkgGroup.min_threshold = this.packageGroupForm.value.min_threshold;
    this.updPkgGroup.package_grp_image = this.packageGroup.package_grp_image;
    this.updPkgGroup.grpbuy_start = (this.packageGroupForm.value.grpbuy_start) as string;
    this.updPkgGroup.grpbuy_end = (this.packageGroupForm.value.grpbuy_end) as string;
    this.updPkgGroup.grpbuy_duration = this.packageGroup.grpbuy_duration;
    this.updPkgGroup.grpbuy_duration_type = this.packageGroup.grpbuy_duration_type;

    let updPkgList = [] as Array<Package>;

    for (let i = 0; i < this.packageGroup.package_list.length ; i++) {

      // update the package desc, regular price and sale price
      let updPkg = {} as Package;
      updPkg.package_id = this.packageGroup.package_list[i].package_id;
      updPkg.package_name = this.packFormArray.value[i].description;
      updPkg.description = this.packFormArray.value[i].description;
      updPkg.quantity = this.packageGroup.package_list[i].quantity + diffQty;
      updPkg.product_id = this.packageGroup.package_list[i].product_id;
      updPkg.product_title = this.packageGroup.package_list[i].product_title;
      updPkg.regular_price = this.packFormArray.value[i].regular_price;
      updPkg.sale_price = this.packFormArray.value[i].sale_price;
      updPkg.status = this.packageGroup.package_list[i].status;
      updPkg.popularity = this.packageGroup.package_list[i].popularity;
      updPkg.likes = this.packageGroup.package_list[i].likes;

      updPkgList.push(updPkg);
    }

    this.updPkgGroup.package_list = updPkgList;

    console.log( ' PackageEditComponent this.onSavePackageGroup ---> ', this.updPkgGroup);

    this.userService.updatePackageGroup(this.updPkgGroup).subscribe((response) => {
      if (response == true) {
        this.utilityService.toastify(true, "Product Package Group updated Successfully");
        // this.router.navigate(['user/home/products']);
        //this.router.navigate(['customer/home']);
        // this.router.navigate([this.router.url]);

        setTimeout(() => {
          console.log('sleep');
          window.location.reload();
          // this.router.navigate(['/question', this.getQuestionID() + 1]);
        }, 3000);


      } else {
        this.utilityService.toastify(false, "", "Product Package Group update failed");
      }
    });

  }


  setDefCurrentDateTime():string {
    let defCurrentDate: Date = new Date();
    let localDefCurrentDate: string = defCurrentDate.toISOString();

    localDefCurrentDate = localDefCurrentDate.substring(0, localDefCurrentDate.length - 5);

    return localDefCurrentDate;

  }

}
