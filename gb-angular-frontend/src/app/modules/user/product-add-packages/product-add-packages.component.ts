import {Component, OnInit} from '@angular/core';

import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem, CdkDragPreview,
} from '@angular/cdk/drag-drop';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconButton} from '@angular/material/button';
import {UserService} from '../../../services/user.service';
import {UtilityService} from '../../../services/utility.service';
import {Router} from '@angular/router';
import {ProductItem} from '../../../interfaces/product-item';
import {Product} from '../../../interfaces/product';
import {PackageGroup} from '../../../interfaces/package-group';
import {Package} from '../../../interfaces/package';
import {PackageItem} from '../../../interfaces/package-item';



/*
export interface PackageItem {
  item : string;
  image : string;
}
*/


@Component({
  selector: 'app-cdk-drag-drop-connected-sorting-group',
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, CdkDragPreview, NgForOf, NgIf, MatIcon, FormsModule, ReactiveFormsModule],
  templateUrl: './product-add-packages.component.html',
  styleUrl: './product-add-packages.component.scss'
})
export class ProductAddPackagesComponent implements OnInit {

  isInitialLoad = true;
  localDefCurrentDateTime: string = '';

  constructor(
    private userService: UserService,
    private utilityService: UtilityService,
    private router: Router
  ) {

    this.localDefCurrentDateTime = this.setDefCurrentDateTime();

  }

/*  packageList:PackageItem[][] = [];
  availProductItems: PackageItem[] = [];*/

  packageList:ProductItem[][] = [];
  availProductItems: ProductItem[] = [];
  orgProductItems: ProductItem[] = [];
  myPkgGroup = {} as PackageGroup;
  mydatePipe: any;

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

/*  myFormGroup!: FormGroup<{
    package_grp_name: FormControl<any>;
    quantity: FormControl<any>;
    grpbuy_start: FormControl<any>;
    grpbuy_end: FormControl<any>;
  }>;*/

  packageGroupForm: any;

/*  packageGroupForm = new FormGroup({
    package_grp_name: new FormControl(this.fPackageGroupName),
    quantity: new FormControl(this.fQuantity),
    grpbuy_start: new FormControl(this.fGroupBuyStart),
    grpbuy_end: new FormControl(this.fGroupBuyEnd)
  })*/

  pkgGroup?: PackageGroup;
  pkgList: Package[] = [];
  pkgItemList: PackageItem[] = [];


/*
  orgProductItems: PackageItem[] = [

    { item: 'Get to work',
      image: 'assets/images/computer/Apple01.png'
    },
    { item: 'Pick up groceries',
      image: 'assets/images/computer/Apple02.png'
    },
    { item: 'Go home',
      image: 'assets/images/computer/ASUS01.png'
    },
    { item: 'Fall asleep',
      image: 'assets/images/computer/ASUS02.png'
    },
    {
      item: 'Get up',
      image: 'assets/images/computer/HP01.png'
    },
    { item: 'Brush teeth',
      image: 'assets/images/computer/HP02.png'
    },
    {
      item: 'Take a shower',
      image: 'assets/images/computer/HP201.png'
    },
    { item: 'Check e-mail',
      image: 'assets/images/computer/HP202.png'
    },
    {
      item: 'Walk dog',
      image: 'assets/images/computer/HP03.png'
    },
    {
      item: 'Get XXXXXX',
      image: 'assets/images/computer/HP04.png'
    }
  ];

*/

  ngOnInit() {

    // this.packFormArray = new FormArray(<Form

    // let aa = this.setDefaultDateTime();

    this.packFormArray = new FormArray([]) as any;

    // this.fGroupBuyStart = this.setDefaultDateTime();
    // console.log( ' this.fGroupBuyStart ---> ', this.fGroupBuyStart);

    this.packageGroupForm = new FormGroup({
      package_grp_name: new FormControl(this.fPackageGroupName),
      quantity: new FormControl(this.fQuantity),
      grpbuy_start: new FormControl(this.fGroupBuyStart),
      grpbuy_end: new FormControl(this.fGroupBuyEnd),
      min_threshold: new FormControl(this.fGroupBuyMinThreshold),
      status: new FormControl(this.fGroupBuyStatus)

    })
    console.log( ' this.packageGroupForm ---> ', this.packageGroupForm);
/*    this.packFormArray = new FormArray(
      this.newPackDetail.map(
        (x:any) =>
          new FormGroup({
            description: new FormControl(x.description),
            regular_price: new FormControl(x.regular_price),
            sale_price: new FormControl(x.sale_price),
          })
      )
    );*/





    //   new FormGroup({
    //     description: new FormControl(''),
    //     regular_price: new FormControl(0),
    //     sale_price: new FormControl(0),
    //   })
    // );


/*
    this.availProductItems = this.orgProductItems.map(x => x); // clone the array
    this.packageList.push([]); // add initial empty package

    console.log( ' this.packageList[1] ####===> ', this.packageList[1]);
    console.log( ' this.packageList ####===> ', this.packageList);
*/
  }

  packageListControl(action: string){


    if (action ==  'N') {
      // To add initial empty package
      this.packageList.push([]);
      this.packFormArray.push(new FormGroup({
        description: new FormControl(this.newPackDetail.description),
        regular_price: new FormControl(this.newPackDetail.regular_price),
        sale_price: new FormControl(this.newPackDetail.sale_price),
      }));
    }

    if (action ==  'I') {
      // To add initial empty package
      this.packageList = [];
      this.packageList.push([]);

      this.packFormArray = new FormArray([]) as any;
      this.packFormArray.push(new FormGroup({
        description: new FormControl(this.newPackDetail.description),
        regular_price: new FormControl(this.newPackDetail.regular_price),
        sale_price: new FormControl(this.newPackDetail.sale_price),
      }));
    }

/*    if (action == 'D') {
      this.packageList.splice(i as number,1);
      this.packFormArray.removeAt(i as number);
    }*/
  }

  addAvailProdItems(prodItems: ProductItem[]){
    if (this.isInitialLoad) {
      this.orgProductItems = prodItems.map (x => x);
      console.log( 'ProductAddPackagesComponent - addAvailProdItems() this.orgProductItems ####===> ', this.orgProductItems);
      this.availProductItems = this.orgProductItems.map(x => x); // clone the array
      this.packageListControl('N');

/*
      this.packageList.push([]); // add initial empty package
      this.packFormArray.push(new FormGroup({
        description: new FormControl(this.newPackDetail.description),
        regular_price: new FormControl(this.newPackDetail.regular_price),
        sale_price: new FormControl(this.newPackDetail.sale_price),
      }));
*/

      this.isInitialLoad = false;
    }

  }


  savePackageList(packageList: ProductItem[][], parentProduct: Product, prodItemList: ProductItem[]){
    // console.log( 'ProductAddPackagesComponent - savePackageList() ####===> packageList', packageList);
    // console.log( 'ProductAddPackagesComponent - savePackageList() ####===> parentProduct ', parentProduct);
    // console.log( 'ProductAddPackagesComponent - savePackageList() ####===> prodItemList ', prodItemList);

    console.log( 'ProductAddPackagesComponent - savePackageList() ####===> this.packageGroupForm.value ', this.packageGroupForm.value);

    packageList[0][0].product_id = parentProduct.product_id;
    packageList[0][0].product_title = parentProduct.title;

    let itemID : number | undefined;
    const datePipe = new DatePipe('en-US');
    // const datePipe = new DatePipe('en-US');
    // let myPkgGroup = {} as PackageGroup;
    console.log( 'ProductAddPackagesComponent - savePackageList() ####===> this.packageGroupForm.value.grpbuy_start ', this.packageGroupForm.value.grpbuy_start);

    this.myPkgGroup.package_grp_name = this.packageGroupForm.value.package_grp_name as string;
    this.myPkgGroup.creation_date = '';
    this.myPkgGroup.quantity = this.packageGroupForm.value.quantity as number;
    this.myPkgGroup.product_id = parentProduct.product_id;
    this.myPkgGroup.product_title = parentProduct.title;
    this.myPkgGroup.status = this.packageGroupForm.value.status;
    this.myPkgGroup.min_threshold = this.packageGroupForm.value.min_threshold;
    this.myPkgGroup.package_grp_image = parentProduct.main_image;
    // this.myPkgGroup.grpbuy_start = datePipe.transform(this.packageGroupForm.value.grpbuy_start, 'yyyy-mm-dd hh:mm:ss') as string;
    // this.myPkgGroup.grpbuy_end = datePipe.transform(this.packageGroupForm.value.grpbuy_end, 'yyyy-mm-dd hh:mm:ss') as string;
    // this.myPkgGroup.grpbuy_start = (this.packageGroupForm.value.grpbuy_start + ' 12:00:00') as string;
    // this.myPkgGroup.grpbuy_end = (this.packageGroupForm.value.grpbuy_end + ' 12:00:00') as string;
    this.myPkgGroup.grpbuy_start = (this.packageGroupForm.value.grpbuy_start) as string;
    this.myPkgGroup.grpbuy_end = (this.packageGroupForm.value.grpbuy_end) as string;
    // this.myPkgGroup.grpbuy_start = this.myPkgGroup.grpbuy_start.replace('T',' ');
    // this.myPkgGroup.grpbuy_end = this.myPkgGroup.grpbuy_end.replace('T',' ');
    this.myPkgGroup.grpbuy_duration = 0;
    this.myPkgGroup.grpbuy_duration_type = 'D';


    // const myFormattedDate = datePipe.transform(this.myTimeStamp, 'EEEE, MMMM d');

    console.log( 'ProductAddPackagesComponent - savePackageList() ####===> this.myPkgGroup.package_grp_name ', this.myPkgGroup.package_grp_name);
    console.log( 'ProductAddPackagesComponent - savePackageList() ####===> this.myPkgGroup.quantity ', this.myPkgGroup.quantity);
    // console.log( 'ProductAddPackagesComponent - savePackageList() ####===> this.myPkgGroup.grpbuy_start ', this.myPkgGroup.grpbuy_start.replace('T',' '));
    // console.log( 'ProductAddPackagesComponent - savePackageList() ####===> this.myPkgGroup.grpbuy_end ', this.myPkgGroup.grpbuy_end.replace('T',' '));
    console.log( 'ProductAddPackagesComponent - savePackageList() ####===> this.myPkgGroup.grpbuy_start ', this.myPkgGroup.grpbuy_start);
    console.log( 'ProductAddPackagesComponent - savePackageList() ####===> this.myPkgGroup.grpbuy_end ', this.myPkgGroup.grpbuy_end);

    let myPkgList = [] as Array<Package>;

    // Update the product item seq into the item in the allocated packages
    for (let i = 0; i < packageList.length ; i++) {

      // update the package desc, regular price and sale price
      let myPkg = {} as Package;
      myPkg.package_name = this.packFormArray.value[i].description;
      myPkg.description = this.packFormArray.value[i].description;
      myPkg.quantity = this.myPkgGroup.quantity;
      myPkg.product_id = this.myPkgGroup.product_id;
      myPkg.product_title = this.myPkgGroup.product_title;
      myPkg.regular_price = this.packFormArray.value[i].regular_price;
      myPkg.sale_price = this.packFormArray.value[i].sale_price;
      myPkg.status = this.myPkgGroup.status;
      myPkg.popularity = 0;
      myPkg.likes = 0;

      let myPkgItemList = [] as Array<PackageItem>;

      // console.log( 'ProductAddPackagesComponent - savePackageList() ####===> input prodItemList : before ', prodItemList);

      for (let j = 0; j < packageList[i].length; j++) {
        // packageList[i][j].product_item_id = 0;

        let myPkgItem = {} as PackageItem;

        itemID = prodItemList.find(t=>t.item_seq == packageList[i][j].item_seq)?.product_item_id;
        if (itemID) {
          packageList[i][j].product_item_id = itemID;
        }

        myPkgItem.product_item_id = packageList[i][j].product_item_id
        myPkgItem.item_name = packageList[i][j].item_name;
        myPkgItem.status = this.myPkgGroup.status;
        myPkgItem.popularity = 0;
        myPkgItem.likes = 0;
        myPkgItem.package_item_image = packageList[i][j].item_image;
        myPkgItem.productItem = packageList[i][j];

        myPkgItemList.push(myPkgItem)
        //console.log( 'ProductAddPackagesComponent - savePackageList() ####===> packageList[i][j].product_item_id ', packageList[i][j].product_item_id);
      }

      // console.log( 'ProductAddPackagesComponent - savePackageList() ####===> input prodItemList : after ', prodItemList);

      myPkg.package_item_list = myPkgItemList;
      myPkgList.push(myPkg);

    }

    this.myPkgGroup.package_list = myPkgList;
    console.log( 'ProductAddPackagesComponent - savePackageList() ####===> myPkgGroup', this.myPkgGroup);

    // this.userService.addPackageList(packageList).subscribe((response) => {
    this.userService.addPackageList(this.myPkgGroup).subscribe((response) => {
      if (response != null) {
        // console.log("Product Added Successfully, New Product ID : ", response.product_id);
        this.utilityService.toastify(true, "Product Package(s) Added Successfully");
        // this.router.navigate(['user/home/products']);
        //this.router.navigate(['customer/home']);
      } else {
        this.utilityService.toastify(false);
      }
    });

  }

  // drop(event: CdkDragDrop<string[]>) {
  // drop(event: CdkDragDrop<{item: string; image: string}[]>) {
  // drop(event: CdkDragDrop<PackageItem[]>) {

  drop(event: CdkDragDrop<ProductItem[]>) {

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
      this.removeEmptyPackage();
      this.addNewPackage();

      console.log( ' this.packFormArray ---> ', this.packFormArray);

    }
  }

  removeEmptyPackage()
  {
    let numOfPackage : number = 0;
//    let tempPackage : PackageItem[] = [];
    let tempPackage : ProductItem[] = [];
    let noOfEmptyPack : number = 0;

    numOfPackage = this.packageList.length;

    for (let i = 0; i < numOfPackage; i++) {
      tempPackage = this.packageList[i];
      if (tempPackage.length == 0) {
        noOfEmptyPack++;
        if (noOfEmptyPack > 1) {
          this.packageList.splice(i,1);
          this.packFormArray.removeAt(i);
        }
      }
    }

    this.moveEmptyPackToLast();
  }

  addNewPackage(){
    let numOfPackage : number = 0;
    //let tempPackage : PackageItem[] = [];
    let tempPackage : ProductItem[] = [];
    let noOfEmptyPack : number = 0;

    numOfPackage = this.packageList.length;

    for (let i = 0; i < numOfPackage; i++) {
      tempPackage = this.packageList[i];
      if (tempPackage.length == 0) {
        noOfEmptyPack++;
      }
    }

    if (noOfEmptyPack == 0) {
      this.packageListControl('N');

/*
      this.packageList.push([]);
      this.packFormArray.push(new FormGroup({
        description: new FormControl(this.newPackDetail.description),
        regular_price: new FormControl(this.newPackDetail.regular_price),
        sale_price: new FormControl(this.newPackDetail.sale_price),
      }));
*/
    }

  }

  moveEmptyPackToLast(){
    let numOfPackage : number = 0;
    //let tempPackage : PackageItem[] = [];
    let tempPackage : ProductItem[] = [];
    let noOfEmptyPack : number = 0;

    numOfPackage = this.packageList.length;

    for (let i = 0; i < numOfPackage; i++) {
      tempPackage = this.packageList[i];
      if (tempPackage.length == 0) {
        this.packageList.splice(numOfPackage, 0, this.packageList.splice(i,1)[0]);
        this.packFormArray.removeAt(i);
        this.packFormArray.push(new FormGroup({
          description: new FormControl(this.newPackDetail.description),
          regular_price: new FormControl(this.newPackDetail.regular_price),
          sale_price: new FormControl(this.newPackDetail.sale_price),
        }));
        // this.packFormArray.splice(numOfPackage, 0, this.packFormArray.splice(i,1)[0]);
      }
    }

  }

  resetProductItemList(){
    console.log( ' this.orgProductItems ---> ', this.orgProductItems);
    this.availProductItems = this.orgProductItems.map(x => x); // clone the array
    console.log( ' this.availProductItems ---> ', this.availProductItems);

    this.packageListControl('I');

/*    this.packageList = [];
    this.packageList.push([]);

    this.packFormArray = new FormArray([]) as any;
    this.packFormArray.push(new FormGroup({
      description: new FormControl(this.newPackDetail.description),
      regular_price: new FormControl(this.newPackDetail.regular_price),
      sale_price: new FormControl(this.newPackDetail.sale_price),
    }));*/

  }

  addAvailToOnePack(){
    let lastPackageNum : number = 0;
    let numOfAvailItem : number = 0;
    lastPackageNum = this.packageList.length;
    numOfAvailItem = this.availProductItems.length;

    if (numOfAvailItem > 0 ) {
      if (lastPackageNum > 0) {
        for (let i = 0; i < numOfAvailItem; i++) {
          this.packageList[lastPackageNum-1].push(this.availProductItems[i]);
        }
        this.availProductItems = []; // Clear available product item list
        this.packageListControl('N');

/*
        this.packageList.push([]); // Add an empty package at the end of the list
        this.packFormArray.push(new FormGroup({
          description: new FormControl(this.newPackDetail.description),
          regular_price: new FormControl(this.newPackDetail.regular_price),
          sale_price: new FormControl(this.newPackDetail.sale_price),
        }));
*/

      }
    }
  }

  addAvailToSeparatePacks() {
    let lastPackageNum : number = 0;
    let numOfAvailItem : number = 0;
    lastPackageNum = this.packageList.length;
    numOfAvailItem = this.availProductItems.length;

    if (numOfAvailItem > 0 ) {
      if (lastPackageNum > 0) {
        for (let i = 0; i < numOfAvailItem; i++) {
          this.packageList[lastPackageNum-1+i].push(this.availProductItems[i]);
          this.packageListControl('N');

/*
          this.packageList.push([]); // Add an empty package at the end of the list
          this.packFormArray.push(new FormGroup({
            description: new FormControl(this.newPackDetail.description),
            regular_price: new FormControl(this.newPackDetail.regular_price),
            sale_price: new FormControl(this.newPackDetail.sale_price),
          }));
*/

        }
        this.availProductItems = []; // Clear available product item list

      }
    }

  }

  getControl(index: number, controlName: string): FormControl {
    return (this.packFormArray.at(index) as FormGroup).get(controlName) as FormControl;
  }


  setDefCurrentDateTime():string {
    let defCurrentDate: Date = new Date();
    let localDefCurrentDate: string = defCurrentDate.toISOString();

    localDefCurrentDate = localDefCurrentDate.substring(0, localDefCurrentDate.length - 5);

    return localDefCurrentDate;

  }

  setDefaultDateTime() : string {
    let dt =  ''
    const datePipe = new DatePipe('en-US');
    // xmydatePipe: DatePipe;
    let currentDateAndTime = datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
    console.log( ' this.setDefaultDateTime ---> ', currentDateAndTime);
    return  dt;
  }


  protected readonly transferArrayItem = transferArrayItem;
}
