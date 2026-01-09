import {Component, OnInit} from '@angular/core';
import {CKEditorModule} from "ng2-ckeditor";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Category} from '../../../interfaces/category';
import {Brand} from '../../../interfaces/brand';
import {Product} from '../../../interfaces/product';
import {ImageFile} from '../../../interfaces/image-file';
import {UserService} from '../../../services/user.service';
import {UtilityService} from '../../../services/utility.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../services/category.service';
import {BrandService} from '../../../services/brand.service';
import {Observable, timeout} from 'rxjs';

@Component({
  selector: 'app-product-edit-main',
  imports: [
    CKEditorModule,
    FormsModule,
    MatIcon,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './product-edit-main.component.html',
  styleUrl: './product-edit-main.component.scss'
})
export class ProductEditMainComponent implements OnInit {

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
  productEdit: Product = {} as any;
  productID: number = 0;

  otherProdImageFiles: ImageFile[] = [];
  //showOtherProdImageFiles : ImageFile[] = [];
  delOtherProdImageFiles: ImageFile[] = [];
  mainProdImageFile: ImageFile = {image_file:'', file_url:'', action: ''};
  otherImageUrlList: string = '';

  isShowGroupDetailSection = false;

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
      stock_status: '',
      status: '',
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
      grpbuy_status: '',
      grpbuy_order_count: 0,
      package_grp_count: 0,
      product_item_list: []
    };

  productForm = new FormGroup({
    product_id: new FormControl(this.newProd.product_id),
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
  private ResponseContentType: any;

  constructor(
    private userService: UserService,
    private utilityService: UtilityService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private datePipe: DatePipe
  ) {

    this.curUserId = this.userService.getUserToken().user_id;


  }

  ngOnInit() {
    this.addCssLinks();
    this.productID = this.route.snapshot.params["pid"];
    console.log("Product Edit Main - Product ID, User ID: ", this.productID, this.curUserId);

    this.userService.getProductEditMain(this.productID, this.curUserId).subscribe((Product) => {
      this.productEdit = Product;
      this.mapProductField(this.productEdit);

      console.log("Product Edit Main - Product : ", Product);
    });


    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
      console.log("Product Add - Category List : ", categories);
    });

    this.brandService.getAllBrands().subscribe((brands) => {
      this.brands = brands;
      console.log("Product Add - Brand List : ", brands);
    });

  }


  mapProductField(inProd: Product) {
    this.newProd.product_id = inProd.product_id;
    this.productForm.value.product_id = inProd.product_id;

    this.newProd.title = inProd.title;
    this.productForm.value.title = inProd.title;
    this.productForm.controls['title'].setValue(this.productForm.value.title);

    this.newProd.creation_date = inProd.creation_date;
    this.productForm.value.creation_date = inProd.creation_date;
    this.productForm.controls['creation_date'].setValue(this.productForm.value.creation_date);

    this.newProd.sell_style = inProd.sell_style;
    this.productForm.value.sell_style = inProd.sell_style;
    this.productForm.controls['sell_style'].setValue(this.productForm.value.sell_style);

    this.newProd.description = inProd.description;
    this.productForm.value.description = inProd.description;
    this.productForm.controls['description'].setValue(this.productForm.value.description);

    // this.newProd.image_urls = inProd.image_urls;
    // this.productForm.value.image_urls = inProd.image_urls;
    // this.productForm.controls['image_urls'].setValue(this.productForm.value.image_urls);

    this.newProd.brand_id = inProd.brand_id;
    this.productForm.value.brand_id = inProd.brand_id;
    this.productForm.controls['brand_id'].setValue(this.productForm.value.brand_id);

    this.newProd.min_threshold = inProd.min_threshold;
    this.productForm.value.min_threshold = inProd.min_threshold;
    this.productForm.controls['min_threshold'].setValue(this.productForm.value.min_threshold);

    this.newProd.stock_quantity = inProd.stock_quantity;
    this.productForm.value.stock_quantity = inProd.stock_quantity;
    this.productForm.controls['stock_quantity'].setValue(this.productForm.value.stock_quantity);

    this.newProd.stock_status = inProd.stock_status;
    this.productForm.value.stock_status = inProd.stock_status;
    this.productForm.controls['stock_status'].setValue(this.productForm.value.stock_status);

    this.newProd.status = inProd.status;
    this.productForm.value.status = inProd.status;
    this.productForm.controls['status'].setValue(this.productForm.value.status);

    this.newProd.regular_price = inProd.regular_price;
    this.productForm.value.regular_price = inProd.regular_price;
    this.productForm.controls['regular_price'].setValue(this.productForm.value.regular_price);

    this.newProd.sale_price = inProd.sale_price;
    this.productForm.value.sale_price = inProd.sale_price;
    this.productForm.controls['sale_price'].setValue(this.productForm.value.sale_price);

    this.newProd.category_id = inProd.category_id;
    this.productForm.value.category_id = inProd.category_id;
    this.productForm.controls['category_id'].setValue(this.productForm.value.category_id);

    this.newProd.display_position = inProd.display_position;
    this.productForm.value.display_position = inProd.display_position;
    this.productForm.controls['display_position'].setValue(this.productForm.value.display_position);

    this.newProd.main_image = inProd.main_image;
    this.imageFile = inProd.main_image;
    this.productForm.value.main_image = inProd.main_image;
    this.productForm.controls['main_image'].setValue(this.productForm.value.main_image);

    this.newProd.grpbuy_start = inProd.grpbuy_start;
    this.productForm.value.grpbuy_start = inProd.grpbuy_start;
    this.productForm.controls['grpbuy_start'].setValue(this.datePipe.transform(this.productForm.value.grpbuy_start, 'yyyy-MM-ddTHH:mm:ss'));

    this.newProd.grpbuy_end = inProd.grpbuy_end;
    this.productForm.value.grpbuy_end = inProd.grpbuy_end;
    this.productForm.controls['grpbuy_end'].setValue(this.datePipe.transform(this.productForm.value.grpbuy_end, 'yyyy-MM-ddTHH:mm:ss'));

    this.newProd.grpbuy_quantity = inProd.grpbuy_quantity;
    this.productForm.value.grpbuy_quantity = inProd.grpbuy_quantity;
    this.productForm.controls['grpbuy_quantity'].setValue(this.productForm.value.grpbuy_quantity);

    this.newProd.grpbuy_regular_price = inProd.grpbuy_regular_price;
    this.productForm.value.grpbuy_regular_price = inProd.grpbuy_regular_price;
    this.productForm.controls['grpbuy_regular_price'].setValue(this.productForm.value.grpbuy_regular_price);

    this.newProd.grpbuy_sale_price = inProd.grpbuy_sale_price;
    this.productForm.value.grpbuy_sale_price = inProd.grpbuy_sale_price;
    this.productForm.controls['grpbuy_sale_price'].setValue(this.productForm.value.grpbuy_sale_price);

    this.newProd.grpbuy_status = inProd.grpbuy_status;
    this.productForm.value.grpbuy_status = inProd.grpbuy_status;
    this.productForm.controls['grpbuy_status'].setValue(this.productForm.value.grpbuy_status);

    this.mainProdImageFile.image_file = this.productForm.value.main_image;
    this.newProd.sell_style =  inProd.sell_style;


    this.toggleSelectedSellStyle(this.productForm.value.sell_style);
    this.otherProdImageUrls = this.getImageUrls(this.productEdit.image_urls);
    this.downloadProdImages();
    //this.showOtherProdImageFiles = this.otherProdImageFiles;

    //cloning the array
    //this.showOtherProdImageFiles = this.otherProdImageFiles.map(item => ({...item}));
  }

  onSaveProduct(product: any): void {

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
    product.product_id = this.newProd.product_id;
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


    console.log("ProductAddMain saveProduct() this.productForm.value => ", this.productForm.value);
    console.log("ProductAddMain saveProduct() this.newProd => ", this.newProd);
    console.log("ProductAddMain saveProduct() inArg [product] => ", product);

    this.userService.updateProductMain(product).subscribe((response) => {
      if (response) {
        console.log("Product Updated Successfully, response = ", response);
        this.utilityService.toastify(true, "Product Updated Successfully!");
        // this.router.navigate(['/customer/home/packagegroupedit/'+this.productID ])
      } else {
        this.utilityService.toastify(false, "", "Product Update Failed!");
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

  oldremoveImage(i: number){
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

  removeImage(i: number,imgFile: ImageFile){
    /*    this.imageFiles.splice(i, 1);
        this.otherProdImageUrls.splice(i, 1)*/

    this.delOtherProdImageFiles.push(imgFile);
    this.otherProdImageFiles.splice(i, 1)

    // this.otherProdImageFiles[i].action = 'D';
    // this.otherProdImageFiles.forEach(item => {
    //   if(item.file_url == imgFile.file_url) {
    //       item.action = 'D';
    //   }
    // });

  //  console.log("removeImage this.showOtherProdImageFiles : ", this.showOtherProdImageFiles);
    console.log("removeImage this.otherProdImageFiles : ", this.otherProdImageFiles);
    console.log("removeImage this.delOtherProdImageFiles : ", this.delOtherProdImageFiles);


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

  downloadProdImages() {

    let base64Image: string;
    let beServerUrl: string;
    let imageType: string = '';
    let imageFile: ImageFile = {image_file:'', file_url:'', action: ''};

    beServerUrl = this.utilityService.getSpringServerApiUrl();

    let len1 = this.otherProdImageUrls.length;
    let len2 = this.otherProdImageUrls.length - this.otherProdImageFiles.length;
    let pos = len1 - len2;

      // console.log("downloadProdImages imageType: ", imageType);
      this.utilityService.imageUrlToBase64(beServerUrl + '/' + this.otherProdImageUrls[pos]).subscribe(
        base64 => {
          imageType = this.otherProdImageUrls[pos].substring(this.otherProdImageUrls[pos].lastIndexOf('.')+1, this.otherProdImageUrls[pos].length);
          base64Image = 'data:image/' + imageType + ';base64,' + base64;
          imageFile.image_file = base64Image;
          imageFile.file_url = this.otherProdImageUrls[pos];
          imageFile.action = 'L'
          if (base64) {
            this.otherProdImageFiles.push(imageFile);
          } else {
            this.otherProdImageUrls.splice(pos, 1);
          }

          // call the download recursively until all images downloaded
          if (len1 > this.otherProdImageFiles.length) {
            this.downloadProdImages();
          }

        });


    // console.log("downloadProdImages base64Image: ", this.otherProdImageFiles);

  }




  onSelectSellStyle(e: any,style: string) {

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


  toggleSelectedSellStyle(sellStyle: string){

    if (sellStyle.indexOf('S') !== -1) {
      this.productForm.controls['sell_style_single'].setValue(true);
    } else {
      this.productForm.controls['sell_style_single'].setValue(false);
    }

    if (sellStyle.indexOf('G') !== -1) {
      this.productForm.controls['sell_style_group_single'].setValue(true);
      this.isShowGroupDetailSection = true;
    } else {
      this.productForm.controls['sell_style_group_single'].setValue(false);
      this.isShowGroupDetailSection = false;
    }

    if (sellStyle.indexOf('P') !== -1) {
      this.productForm.controls['sell_style_group_package'].setValue(true);
    } else {
      this.productForm.controls['sell_style_group_package'].setValue(false);
    }


  }

  getImageUrls(imgUrlList: string) :string[] {

    let outUrls: string[] = [];

    if (imgUrlList) {
      outUrls = imgUrlList.split(';');
      // outUrls = [this.productEdit.main_image].concat(outUrls);
    } else {
      // outUrls = [this.productEdit.main_image].concat(outUrls);
    }

    console.log("===== ProductEditMain Component - outUrls : ", outUrls);

    return outUrls;

  }

  private addCssLinks(){

    this.utilityService.addCssRefLinkUrl(document, "https://fonts.googleapis.com/icon?family=Material+Icons");


  }

}
