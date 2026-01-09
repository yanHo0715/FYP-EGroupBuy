import {Component, Inject, inject, Input, OnInit, ViewChild} from '@angular/core';
import {ProductAddItemsComponent} from '../product-add-items/product-add-items.component';
import {ProductAddPackagesComponent} from '../product-add-packages/product-add-packages.component';
import {FormBuilder, Validators} from '@angular/forms';
import {DOCUMENT, NgIf} from '@angular/common';
import {UserService} from '../../../services/user.service';
import {UtilityService} from '../../../services/utility.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../services/category.service';
import {BrandService} from '../../../services/brand.service';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext} from '@angular/material/stepper';
import {Product} from '../../../interfaces/product';
import {ProductItem} from '../../../interfaces/product-item';
import {MatButton} from '@angular/material/button';
import {ImageFile} from '../../../interfaces/image-file';

@Component({
  selector: 'app-package-add-stepper',
  imports: [
    MatButton,
    MatStep,
    MatStepLabel,
    MatStepper,
    MatStepperNext,
    ProductAddItemsComponent,
    ProductAddPackagesComponent
  ],
  templateUrl: './package-add-stepper.component.html',
  styleUrl: './package-add-stepper.component.scss'
})

export class PackageAddStepperComponent implements OnInit {

  @ViewChild('AddProductItemComponent') addProductItemComponent!: ProductAddItemsComponent;
  @ViewChild('AddProductPackageComponent') addProductPackageComponent!: ProductAddPackagesComponent;

  private _formBuilder = inject(FormBuilder);
  productID: number = 0;
  curUserId: number = 0;
  isLinear = false;
  selectedProduct: Product = {} as any;

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(DOCUMENT) private _document: Document,
    private userService: UserService,
    private utilityService: UtilityService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private brandService: BrandService
  ) {
    this.curUserId = this.userService.getUserToken().user_id;
    this.addProductItemComponent = new ProductAddItemsComponent(userService, utilityService, router);
    this.addProductPackageComponent = new ProductAddPackagesComponent(userService, utilityService, router);

  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });



  ngOnInit(){
    this.addCssLinks();

    this.productID = this.route.snapshot.params["pid"];
    console.log("Package Add Stepper - Product ID: ", this.productID);

    this.userService.getProductEditMain(this.productID, this.curUserId).subscribe((Product) => {
      this.selectedProduct = Product;
      this.addProductItemComponent.addInitialNewItems2(this.selectedProduct );

      console.log("Product Edit Main - Product : ", Product);
    });

  }


  goSaveProductItem(stepper: MatStepper) {
    console.log("================> Go to Add Product Package Page <================");
    console.log("================> Added Items  productItemList : ", this.addProductItemComponent.productItemList);
    console.log("================> Added Items formArray : ", this.addProductItemComponent.formArray);
    this.addProductItemComponent.saveProductItems(this.addProductItemComponent.formArray.value as ProductItem[], this.selectedProduct);
    //this.addProductPackageComponent.addAvailProdItems(this.addProductItemComponent.formArray.value as ProductItem[]);
    // this.addProductPackageComponent.addAvailProdItems(this.addProductItemComponent.productItemList);
  }

  goAddPackages(stepper: MatStepper) {
    console.log("================> Go to Add Product Package Page <================");
    console.log("================> Added Items  productItemList : ", this.addProductItemComponent.productItemList);
    console.log("================> Added Items formArray : ", this.addProductItemComponent.formArray);
    // this.addProductItemComponent.saveProductItems(this.addProductItemComponent.formArray.value as ProductItem[], this.selectedProduct);
    //this.addProductPackageComponent.addAvailProdItems(this.addProductItemComponent.formArray.value as ProductItem[]);
    this.addProductPackageComponent.addAvailProdItems(this.addProductItemComponent.productItemList);
  }

  goComplete(stepper: MatStepper) {
    console.log("================> Go to Done Page <================");
    console.log("================> Added Items productItemList : ", this.addProductItemComponent.productItemList);
    console.log("================> Added Items formArray : ", this.addProductItemComponent.formArray);
    this.addProductPackageComponent.savePackageList(this.addProductPackageComponent.packageList as ProductItem[][], this.selectedProduct, this.addProductItemComponent.productItemList);
  }



  goNewInputAgain(stepper: MatStepper) {
    // location.href = 'customer/home/productadd';

    this.router.navigate(['customer/home/productadd'])
      .then(() => {
        window.location.reload();
      });

  }

  goHomePage(stepper: MatStepper){
    this.router.navigate(['customer/home']);
  }

  private addCssLinks(){

    this.utilityService.addCssRefLinkUrl(document, "https://fonts.googleapis.com/icon?family=Material+Icons");


  }

}
