import {Component, Inject, inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {ProductAddMainComponent} from '../product-add-main/product-add-main.component';
import {ProductAddItemsComponent} from '../product-add-items/product-add-items.component';
import {
  ProductAddPackagesComponent
} from '../product-add-packages/product-add-packages.component';
import {UtilityService} from '../../../services/utility.service';
import {DOCUMENT, NgIf} from '@angular/common';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {CategoryService} from '../../../services/category.service';
import {Product} from '../../../interfaces/product';
import {ProductItem} from '../../../interfaces/product-item';
import {BrandService} from '../../../services/brand.service';

@Component({
  selector: 'app-stepper01',
  imports: [
    MatStepper,
    MatStep,
    ReactiveFormsModule,
    MatButton,
    MatStepperNext,
    // MatStepperPrevious,
    MatStepLabel,
    ProductAddMainComponent,
    MatFormFieldModule,
    MatInputModule,
    ProductAddItemsComponent,
    ProductAddPackagesComponent,
    NgIf
  ],
  templateUrl: './product-add-stepper.component.html',
  styleUrl: './product-add-stepper.component.scss'
})
export class ProductAddStepperComponent implements OnInit {

  @ViewChild('AddProductComponent') addProductMainComponent!: ProductAddMainComponent;
  @ViewChild('AddProductItemComponent') addProductItemComponent!: ProductAddItemsComponent;
  @ViewChild('AddProductPackageComponent') addProductPackageComponent!: ProductAddPackagesComponent;

  private _formBuilder = inject(FormBuilder);

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(DOCUMENT) private _document: Document,
    private userService: UserService,
    private utilityService: UtilityService,
    private router: Router,
    private categoryService: CategoryService,
    private brandService: BrandService
  ) {
    this.addProductMainComponent = new ProductAddMainComponent(userService, utilityService, router, categoryService, brandService);
    this.addProductItemComponent = new ProductAddItemsComponent(userService, utilityService, router);
    this.addProductPackageComponent = new ProductAddPackagesComponent(userService, utilityService, router);

  }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });

  isLinear = false;


  ngOnInit(){
    this.addCssLinks();
  }

  goAddItems(stepper: MatStepper){
    console.log("================> Go to Add Product Item Page <================");

    this.addProductItemComponent.imageFile = this.addProductMainComponent.imageFile;
    this.addProductItemComponent.imageFiles = this.addProductMainComponent.imageFiles;
    this.addProductItemComponent.mainProdImageUrl = this.addProductMainComponent.mainProdImageUrl;
    this.addProductItemComponent.otherProdImageUrls = this.addProductMainComponent.otherProdImageUrls;
    //this.addProductMainComponent.otherProdImageUrls.forEach(val => this.addProductItemComponent.otherProdImageUrls.push(Object.assign({}, val)));
    //console.log("================> addProductItemComponent this.addProductItemComponent.otherProdImageUrls<================ ", this.addProductItemComponent.otherProdImageUrls);
    //console.log("================> addProductItemComponent this.addProductMainComponent.otherProdImageUrls <================ ", this.addProductMainComponent.otherProdImageUrls);
    console.log("================> addProductItemComponent this.addProductMainComponent.productForm <================ ", this.addProductMainComponent.productForm);

    this.addProductMainComponent.saveProduct(this.addProductMainComponent.productForm.value as Product);
    this.addProductItemComponent.addInitialNewItems(this.addProductMainComponent.otherProdImageFiles);

  }

  goAddPackages(stepper: MatStepper) {
    console.log("================> Go to Add Product Package Page <================");
    console.log("================> Added Items  productItemList : ", this.addProductItemComponent.productItemList);
    console.log("================> Added Items formArray : ", this.addProductItemComponent.formArray);
    this.addProductItemComponent.saveProductItems(this.addProductItemComponent.formArray.value as ProductItem[], this.addProductMainComponent.createdProduct);
    //this.addProductPackageComponent.addAvailProdItems(this.addProductItemComponent.formArray.value as ProductItem[]);
    this.addProductPackageComponent.addAvailProdItems(this.addProductItemComponent.productItemList);
  }

  goComplete(stepper: MatStepper) {
    console.log("================> Go to Done Page <================");
    console.log("================> Added Items productItemList : ", this.addProductItemComponent.productItemList);
    console.log("================> Added Items formArray : ", this.addProductItemComponent.formArray);
    this.addProductPackageComponent.savePackageList(this.addProductPackageComponent.packageList as ProductItem[][], this.addProductMainComponent.createdProduct, this.addProductItemComponent.productItemList);
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
