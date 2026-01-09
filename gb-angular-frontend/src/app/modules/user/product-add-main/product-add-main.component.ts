import {Component, OnInit} from '@angular/core';
import {CKEditorModule} from "ng2-ckeditor";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Category} from '../../../interfaces/category';
import {Product} from '../../../interfaces/product';
import {MatGridListModule} from '@angular/material/grid-list';
import {NgFor, NgIf} from '@angular/common';
import {MatIcon} from "@angular/material/icon";
import {UserService} from '../../../services/user.service';
import {UtilityService} from '../../../services/utility.service';
import {Router} from '@angular/router';
import {CategoryService} from '../../../services/category.service';
import {ProductItem} from '../../../interfaces/product-item';
import {Brand} from '../../../interfaces/brand';
import {BrandService} from '../../../services/brand.service';
import {ImageFile} from '../../../interfaces/image-file';

@Component({
  selector: 'app-product-add-new',
  imports: [
    CKEditorModule,
    FormsModule,
    MatGridListModule,
    NgFor,
    MatIcon,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './product-add-main.component.html',
  styleUrl: './product-add-main.component.scss'
})
export class ProductAddMainComponent implements OnInit {

  categories: Category[] = [];
  brands: Brand[] = [];
  imageFiles = [];
  imageFile = '';

  ckeditorContent = "Input detail description here...";

  curUserId: number = 0;
  mainProdImageUrl: string = '';
  otherProdImageUrls: string[] = [];
  // otherProdImageFileNames: string[] = [];
  createdProduct!: Product;

  otherProdImageFiles: ImageFile[] = [];
  mainProdImageFile: ImageFile = {image_file:'', file_url:'', action: ''};
  otherImageUrlList: string = '';

  isShowGroupDetailSection = false


  newProd: Product =
    {
      product_id: 0,
      title: '',
      creation_date: '',
      sell_style: '',
      description: '',
      image_urls: '',
      brand_id: 0,
      material: '',
      delivery_date: '',
      delivery_method: '',
      delivery_region: '',
      min_threshold: 0,
      stock_quantity: 0,
      stock_status: 'In Stock',
      status: 'Inactive',
      cost: 0,
      regular_price: undefined,
      sale_price: undefined,
      category_id: 0,
      seller_id: 0,
      seller_username: '',
      likes: 0,
      display_position: 0,
      main_image: '',
      brand_name: '',
      category_name: '',
      // grpbuy_start: undefined,
      // grpbuy_end: undefined,
      // grpbuy_quantity: undefined,
      // grpbuy_regular_price: undefined,
      // grpbuy_sale_price: undefined,
      grpbuy_start: '',
      grpbuy_end: '',
      grpbuy_quantity: 0,
      grpbuy_regular_price: 0,
      grpbuy_sale_price: 0,
      grpbuy_status: 'Inactive',
      grpbuy_order_count: 0,
      package_grp_count: 0,
      product_item_list:[]
    };

  productForm = new FormGroup({
    title: new FormControl(this.newProd.title),
    description: new FormControl(this.newProd.description),
    category_id: new FormControl(this.newProd.category_id),
    brand_id: new FormControl(this.newProd.brand_id),
    stock_status: new FormControl(this.newProd.stock_status),
    stock_quantity: new FormControl(this.newProd.stock_quantity),
    regular_price: new FormControl(this.newProd.regular_price),
    sale_price: new FormControl(this.newProd.sale_price),
    likes: new FormControl(this.newProd.likes),
    status: new FormControl(this.newProd.status),
    display_position: new FormControl(this.newProd.display_position),
    main_image: new FormControl(this.newProd.main_image),
    seller_id: new FormControl(this.newProd.seller_id),
    creation_date: new FormControl(this.newProd.creation_date),
    seller_username: new FormControl(this.newProd.seller_username),
    sell_style: new FormControl(this.newProd.sell_style),
    grpbuy_start: new FormControl(this.newProd.grpbuy_start),
    grpbuy_end: new FormControl(this.newProd.grpbuy_end),
    grpbuy_quantity: new FormControl(this.newProd.grpbuy_quantity),
    grpbuy_regular_price: new FormControl(this.newProd.grpbuy_regular_price),
    grpbuy_sale_price: new FormControl(this.newProd.grpbuy_sale_price),
    sell_style_single: new FormControl(false),
    sell_style_group_single: new FormControl(false),
    sell_style_group_package: new FormControl(false),
    min_threshold: new FormControl(this.newProd.min_threshold),
    grpbuy_status: new FormControl(this.newProd.grpbuy_status)

  })

  constructor(
    private userService: UserService,
    private utilityService: UtilityService,
    private router: Router,
    private categoryService: CategoryService,
    private brandService: BrandService
  ) {

    this.curUserId = this.userService.getUserToken().user_id;
  }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
      console.log("Product Add - Category List : ", categories);
    });

    this.brandService.getAllBrands().subscribe((brands) => {
      this.brands = brands;
      console.log("Product Add - Brand List : ", brands);
    });

    // this.productForm.controls.sell_style = 'S' as any;
  }


  saveProduct(product: Product): void {

    console.log("CKEditor value = %s", this.ckeditorContent);
    let curDateTime = new Date();

    this.newProd.seller_id = this.userService.getUserToken().user_id;

    for (let i = 0; i < this.otherProdImageFiles.length; i++) {
      if (this.otherProdImageFiles[i].file_url) {
        if (i==0) {
          this.otherImageUrlList = this.otherProdImageFiles[i].file_url;
        } else {
          this.otherImageUrlList = this.otherImageUrlList + ';' + this.otherProdImageFiles[i].file_url;
        }
      }
    }
    product.seller_id = this.userService.getUserToken().user_id;
    product.seller_username = this.userService.getUserToken().username;
    product.creation_date = curDateTime.toISOString();
    product.status = this.productForm.value.status as any;
    product.category_id = this.productForm.value.category_id as any;
    product.brand_id = this.productForm.value.brand_id as any;
    product.sell_style = this.productForm.value.sell_style as any;
    product.main_image = this.imageFile;
    product.image_urls = this.otherImageUrlList;
    product.sell_style = this.newProd.sell_style;



    // console.log("User Product - ProductAddMain ", product);
    console.log("ProductAddMain saveProduct() this.productForm.value => ", this.productForm.value);
    console.log("ProductAddMain saveProduct() this.newProd => ", this.newProd);
    console.log("ProductAddMain saveProduct() inArg [product] => ", product);

    this.userService.addProductMain(product).subscribe((response) => {
      if (response != null) {
        console.log("Product Added Successfully, New Product ID : ", response.product_id);
        this.createdProduct = response;
        this.utilityService.toastify(true, "Product Added Successfully");
      } else {
        this.utilityService.toastify(false, "", "Review cannot be posted");
      }
    });


  }

  onSelectedOtherImages(event: any){
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event:any) => {
          //console.log(event.target.result);
          // @ts-ignore
          this.imageFiles.push(event.target.result);
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  onSelectedImage(event: any) {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // @ts-ignore
        this.imageFile = event.target.result;
      }
    }
/*

    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
           this.fileService.uploadFile(formData).subscribe(res => {
              if (res.status == "success") {
                this.util.toastify(true, "Image Uploaded Successfully");
                this.thumbnailUrl = res.fileUrl;
              } else {
                this.util.toastify(false);
              }
            });
    }
*/


  }

  removeImage(i: number){
/*    this.imageFiles.splice(i, 1);
    this.otherProdImageUrls.splice(i, 1)*/

    const formData = new FormData();
    // formData.append("filenameUrl", this.otherProdImageUrls[i]);
    formData.append("filenameUrl", this.otherProdImageFiles[i].file_url);

    this.utilityService.deleteUploadedFile(formData).subscribe((response) => {
      if (response != null) {
        console.log("Product Add - deleteUploadedFile : ", response.status);

        if (response.status == "success") {
          // this.utilityService.toastify(true, "Image Deleted Successfully");
          console.log("Product add deleted image URL : ", this.otherProdImageFiles[i].file_url);

          this.imageFiles.splice(i, 1);
          this.otherProdImageFiles.splice(i, 1)

        } else {
          this.utilityService.toastify(false);
        }

        //this.router.navigate(['customer/home']);
      } else {
        this.utilityService.toastify(false);
      }

    });

  }



  removeMainImage(imgUrl: string){

    const formData = new FormData();
    formData.append("filenameUrl", imgUrl);

    this.utilityService.deleteUploadedFile(formData).subscribe((response) => {
      if (response != null) {
        console.log("Product Add - deleteUploadedFile : ", response.status);

        if (response.status == "success") {
          // this.utilityService.toastify(true, "Image Deleted Successfully");
          console.log("Product add deleted image URL : ", imgUrl);
          // this.mainProdImageFile = {image_file:'', file_url:''};

        } else {
          this.utilityService.toastify(false);
        }

        //this.router.navigate(['customer/home']);
      } else {
        this.utilityService.toastify(false);
      }

    });

  }

  // @ts-ignore
  openModal($evt) {
    //  this.editor.instance.insertText(" Alo");
  }
// @ts-ignore
  onChange($evt) {}
// @ts-ignore
  onEditorChange($evt) {}
// @ts-ignore
  onReady($evt) {}
// @ts-ignore
  onFocus($evt) {}
// @ts-ignore
  onContentDom($evt) {}
// @ts-ignore
  onFileUploadRequest($evt) {}
// @ts-ignore
  onFileUploadResponse($evt) {}
// @ts-ignore
  onPaste($evt) {}
// @ts-ignore
  onDrop($evt) {}
// @ts-ignore

  onBlur($evt) {}

  onSelectMainImage(event:any){

    let oldImage :string = '';

    if (event.target.files && event.target.files[0]) {

      if (this.mainProdImageFile.file_url) {
        oldImage = this.mainProdImageFile.file_url;
      }

      let reader = new FileReader();

//      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // @ts-ignore
        this.imageFile = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      const file: File = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", this.curUserId.toString());
      this.utilityService.uploadFile(formData).subscribe(response => {
        if (response.status == "success") {
          // this.utilityService.toastify(true, "Image Uploaded Successfully");
          this.mainProdImageUrl = response.fileUrl;
          this.mainProdImageFile.image_file = this.imageFile;
          this.mainProdImageFile.file_url = response.fileUrl;

          if (oldImage) {
            this.removeMainImage(oldImage);
          }

          console.log("Product main image URL : ", this.mainProdImageUrl);
        } else {
          this.utilityService.toastify(false);
        }
      });

    }

  }

  onSelectOtherImages(event:any){
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        // let filename : string = event.target.files[i];
        let uploadImage: string = '';

        // reader.readAsDataURL(event.target.files[i]);

        reader.onload = (event:any) => {

          uploadImage = event.target.result;

          // @ts-ignore
          this.imageFiles.push(uploadImage);

        }

        reader.readAsDataURL(event.target.files[i]);

        let file: File = event.target.files[i];
        let formData = new FormData();
        formData.append("file", file);
        formData.append("user_id", this.curUserId.toString());
        this.utilityService.uploadFile(formData).subscribe(response => {
          if (response.status == "success") {
            // this.otherProdImageFiles[i].file_url = response.fileUrl;
            // console.log("Product other image p2 i : ", response.fileUrl);
            // this.otherProdImageUrls.push(response.fileUrl);

            let updImageFile: ImageFile = { image_file: uploadImage, file_url: response.fileUrl, action: 'N'};
            this.otherProdImageFiles.push(updImageFile);

            //this.utilityService.toastify(true, "Image Uploaded Successfully");

          } else {
            this.utilityService.toastify(false);
          }
        });
      }

      // console.log("Product other image URLs : this.otherProdImageUrls ", this.otherProdImageUrls);
      console.log("Product other image URLs : this.otherProdImageFiles ", this.otherProdImageFiles);

    }
  }

  onSelectSellStyle(e: any,style: string) {

    // console.log("this.productForm.value.sell_style_single :", this.productForm.value.sell_style_single, e.target.checked);
    // console.log("this.productForm.value.sell_style_group_single :", this.productForm.value.sell_style_group_single, e.target.checked);
    // console.log("this.productForm.value.sell_style_group_package :", this.productForm.value.sell_style_group_package, e.target.checked);
    // console.log("this.productForm.value.sell_style event :",  style, e);

    let selectedStyles = '';
    let single = '';
    let groupSingle = '';
    let packageGroup = '';

    if(style=='Single') {
      this.productForm.value.sell_style = 'S' as any;
      // this.isShowGroupDetailSection = false;

      if (e.target.checked) {
        single = 'S'
      }

      if (this.productForm.value.sell_style_group_single) {
        groupSingle = 'G'
      }

      if (this.productForm.value.sell_style_group_package) {
        packageGroup = 'P'
      }

    }

    if(style=='GroupBuy') {
      this.productForm.value.sell_style = 'G' as any;
      // this.isShowGroupDetailSection = true;

      if (this.productForm.value.sell_style_single) {
        single = 'S'
      }

      if (e.target.checked) {
        groupSingle = 'G'
        this.isShowGroupDetailSection = true;
      } else {
        this.isShowGroupDetailSection = false;
      }

      if (this.productForm.value.sell_style_group_package) {
        packageGroup = 'P'
      }

    }

    if(style=='PackageGroupBuy') {
      this.productForm.value.sell_style = 'P' as any;
      // this.isShowGroupDetailSection = true;

      if (this.productForm.value.sell_style_single) {
        single = 'S'
      }

      if (this.productForm.value.sell_style_group_single) {
        groupSingle = 'G'
      }

      if (e.target.checked) {
        packageGroup = 'P'
      }

    }

    selectedStyles = single + groupSingle + packageGroup;
    this.newProd.sell_style =selectedStyles;
    console.log("Select Selling Styles : ", selectedStyles);
  }


}
