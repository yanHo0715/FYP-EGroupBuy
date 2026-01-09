import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatTable, MatTableModule} from '@angular/material/table';
import {JsonPipe} from '@angular/common';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatCard, MatCardActions} from '@angular/material/card';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatSort} from '@angular/material/sort';
import {ProductItem} from '../../../interfaces/product-item';
import {UtilityService} from '../../../services/utility.service';
import {ProductAddMainComponent} from '../product-add-main/product-add-main.component';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {Product} from '../../../interfaces/product';
import {ImageFile} from '../../../interfaces/image-file';



export interface CustomDataElement {
  position: number;
  itemImageUrl: string;
  itemDesc: string;
  itemQuantity: number;
  itemPrice: number;
  itemSalePrice: number;
  itemStatus: string
  defaultValue?: string;
  mandatory?: string;
}

 let customData: CustomDataElement[] = [
  { position: 1, itemDesc: 'Hydrogen', itemQuantity: 1, itemPrice: 1.0079, itemSalePrice: 1.0079, itemStatus: 'H', itemImageUrl:'assets/images/computer/Apple01.png' },
  { position: 2, itemDesc: 'Helium', itemQuantity: 1, itemPrice: 4.0026, itemSalePrice: 4.0026, itemStatus: 'He', itemImageUrl:'assets/images/computer/Apple02.png' },
  { position: 3, itemDesc: 'Lithium', itemQuantity: 1, itemPrice: 6.941, itemSalePrice: 6.941, itemStatus: 'Li', itemImageUrl:'assets/images/computer/Apple03.png' },
  { position: 4, itemDesc: 'Beryllium', itemQuantity: 1, itemPrice: 9.0122, itemSalePrice: 9.0122, itemStatus: 'Be', itemImageUrl:'assets/images/computer/ASUS01.png' },
  { position: 5, itemDesc: 'Boron', itemQuantity: 1, itemPrice: 10.811, itemSalePrice: 10.811, itemStatus: 'B', itemImageUrl:'assets/images/computer/ASUS02.png' },
  { position: 6, itemDesc: 'Carbon', itemQuantity: 1, itemPrice: 12.0107, itemSalePrice: 12.0107, itemStatus: 'C', itemImageUrl:'assets/images/computer/HP01.png' },
  { position: 7, itemDesc: 'Nitrogen', itemQuantity: 1, itemPrice: 14.0067, itemSalePrice: 14.0067, itemStatus: 'N', itemImageUrl:'assets/images/computer/HP02.png' },
  { position: 8, itemDesc: 'Oxygen', itemQuantity: 1, itemPrice: 15.9994, itemSalePrice: 15.9994, itemStatus: 'O', itemImageUrl:'assets/images/computer/HP03.png' },
  { position: 9, itemDesc: 'Fluorine', itemQuantity: 1, itemPrice: 18.9984, itemSalePrice: 18.9984, itemStatus: 'F', itemImageUrl:'assets/images/computer/HP201.png' },
  { position: 10, itemDesc: 'Neon', itemQuantity: 1, itemPrice: 20.1797, itemSalePrice: 20.1797, itemStatus: 'Ne', itemImageUrl:'assets/images/computer/HP202.png' },
];




@Component({
  selector: 'app-mat-table-add-product-item',
  imports: [
    MatTable,
    ReactiveFormsModule,
    // JsonPipe,
    // MatCheckbox,
    MatTableModule,
    MatCard,
    MatCardActions,
    MatIcon,
    MatIconModule,
    // MatButton,
    MatSort,
  ],
  templateUrl: './product-add-items.component.html',
  styleUrl: './product-add-items.component.scss'
})

export class ProductAddItemsComponent implements OnInit, AfterViewInit{

  @ViewChild('table') table!: MatTable<any> ;

  imageFile = '';     // product main image from stepper page 1
  imageFiles = [];   // product other images from stepper page 1
  mainProdImageUrl: String = '';
  otherProdImageUrls: string[] = [];
  // parentProduct!: Product;

  otherProdImageFiles: ImageFile[] = [];

  productItemList: ProductItem[] = [];
  delProductItemList: ProductItem[] = [];

  displayedColumns: string[] = ['itemNumber', 'itemImage', 'itemName', 'itemDescription', 'itemQuantity', 'itemRegularPrice', 'itemSalePrice', 'itemStatus', 'action'];
  //dataSource = customData;
  dataSource = this.productItemList;
  isInitialLoad = true;

  newItemImageURLs : any = [];
  totalItemNumber : number = 0;
  selectedProductID : number = 0;
  selectedProduct: Product = {} as any;

  // private formArray!: FormArray<FormGroup<{
  //   itemDesc: FormControl<any>;
  //   itemQuantity: FormControl<any>;
  //   itemPrice: FormControl<any>;
  //   itemSalePrice: FormControl<any>;
  //   itemStatus: FormControl<any>;
  //   mandatory: FormControl<boolean | null>
  // }>>;

//  private formArray!: FormArray<FormGroup<{
  formArray!: FormArray<FormGroup<{
    product_item_id: FormControl<any>,
    item_name: FormControl<any>;
    description: FormControl<any>;
    quantity: FormControl<any>;
    regular_price: FormControl<any>;
    sale_price: FormControl<any>;
    status: FormControl<any>;
    item_image: FormControl<any>;
    item_seq: FormControl<any>;
    // popularity: FormControl<boolean | null>
  }>>;

  /*

    constructor(private fb: FormBuilder) {

    }

  */
  constructor(
    private userService: UserService,
    private utilityService: UtilityService,
    private router: Router,
    // public productAddMainComponent: ProductAddMainComponent,
  ) {
  }

  ngOnInit() {

    // Loading initial data from customData
/*
    this.formArray = new FormArray(
      this.dataSource.map(
        (x:any) =>
          new FormGroup({
            itemDesc: new FormControl(x.itemDesc),
            itemQuantity: new FormControl(x.itemQuantity),
            itemPrice: new FormControl(x.itemPrice),
            itemSalePrice: new FormControl(x.itemSalePrice),
            itemStatus: new FormControl(x.itemStatus),
            mandatory: new FormControl(x.mandatory == 'yes' ? true : false),
          })
      )
    );
*/

    // Loading initial item images from stepper 01 - ProductAddMainComponent

    this.formArray = new FormArray(
      this.dataSource.map(
        (x:any) =>
          new FormGroup({
            product_item_id: new FormControl(x.product_item_id),
            item_name: new FormControl(x.item_name),
            description: new FormControl(x.description),
            quantity: new FormControl(x.quantity),
            regular_price: new FormControl(x.regular_price),
            sale_price: new FormControl(x.sale_price),
            status: new FormControl(x.status),
            item_image: new FormControl(x.item_image),
            item_seq: new FormControl(x.item_seq)
            // popularity: new FormControl(x.popularity == 'yes' ? 1 : 0),
          })
      )
    );

    this.totalItemNumber = this.dataSource.length;
  }


  ngAfterViewInit() {
    const headerRow = document.querySelector('mat-header-row');
    const matTable = document.querySelector('mat-table');
    const tableContainer = document.querySelector('.mat-table-container');
    if (tableContainer && headerRow && matTable) {
      tableContainer.insertBefore(headerRow, matTable);
    }
  }


  getControl(index: number, controlName: string): FormControl {
    return (this.formArray.at(index) as FormGroup).get(controlName) as FormControl;
  }


  addNewItemRow() {

    let newItemNum : number = 0;
    newItemNum = this.totalItemNumber + 1;

/*
    const newProd: CustomDataElement = {
      position: newItemNum,
      itemDesc: 'New Add Product',
      itemQuantity: 1,
      itemPrice: 10,
      itemSalePrice: 8,
      itemStatus: 'H',
      itemImageUrl: 'assets/images/computer/HP202.png',
    };
*/

    const newProd: ProductItem =
      {
        product_item_id: 0,
        item_name: '',
        description: '',
        quantity: 1,
        regular_price: 0,
        sale_price: 0,
        status: 'ACTIVE',
        item_image: 'assets/smartgroup/img/blank-image-05.png',
        product_id: 0,
        product_title: '',
        popularity: 0,
        creation_date: '',
        item_seq: 0,
        action: 'I'
      };


    // console.log( 'createRow ---> ', newProd);

/*
    this.formArray.push(new FormGroup({
      itemDesc: new FormControl(newProd.itemDesc),
      itemQuantity: new FormControl(newProd.itemQuantity),
      itemPrice: new FormControl(newProd.itemPrice),
      itemSalePrice: new FormControl(newProd.itemSalePrice),
      itemStatus: new FormControl(newProd.itemStatus),
      mandatory: new FormControl(newProd.mandatory == 'yes' ? true : false),
    }));
*/

    this.formArray.push(new FormGroup({
      product_item_id: new FormControl(newProd.product_item_id),
      item_name: new FormControl(newProd.item_name),
      description: new FormControl(newProd.description),
      quantity: new FormControl(newProd.quantity),
      regular_price: new FormControl(newProd.regular_price),
      sale_price: new FormControl(newProd.sale_price),
      status: new FormControl(newProd.status),
      item_image: new FormControl(newProd.item_image),
      item_seq: new FormControl(newProd.item_seq)

      // popularity: new FormControl(newProd.popularity == 'yes' ? 1 : 0),
    }));

    this.totalItemNumber = this.totalItemNumber + 1;
    this.dataSource.push(newProd);
    this.table.renderRows();    // perform the view change for add/remove/move rows

    // console.log( ' this.formArray.---> ', this.formArray)
    // console.log( 'this.dataSource.---> ',this.dataSource)

  }


  addNewItemByImage(imageURL : string) {
    let newItemNum : number = 0;
    newItemNum = this.totalItemNumber + 1;

/*
    const newProd: CustomDataElement = {
      position: newItemNum,
      itemDesc: 'New Add Product',
      itemQuantity: 1,
      itemPrice: 10,
      itemSalePrice: 8,
      itemStatus: 'H',
      itemImageUrl: imageURL,
    };
*/

    const newProd: ProductItem = {
      product_item_id: 0,
      item_name: '',
      description: '',
      quantity: 1,
      regular_price: 0,
      sale_price: 0,
      status: 'ACTIVE',
      item_image: imageURL,
      product_id: 0,
      product_title: '',
      popularity: 0,
      creation_date: '',
      item_seq: 0,
      action: 'I'
    };

    // console.log( 'addNewItemByImage ---> ', newProd);

/*    this.formArray.push(new FormGroup({
      itemDesc: new FormControl(newProd.itemDesc),
      itemQuantity: new FormControl(newProd.itemQuantity),
      itemPrice: new FormControl(newProd.itemPrice),
      itemSalePrice: new FormControl(newProd.itemSalePrice),
      itemStatus: new FormControl(newProd.itemStatus),
      mandatory: new FormControl(newProd.mandatory == 'yes' ? true : false),
    }));*/

    this.formArray.push(new FormGroup({
      product_item_id: new FormControl(newProd.product_item_id),
      item_name: new FormControl(newProd.item_name),
      description: new FormControl(newProd.description),
      quantity: new FormControl(newProd.quantity),
      regular_price: new FormControl(newProd.regular_price),
      sale_price: new FormControl(newProd.sale_price),
      status: new FormControl(newProd.status),
      item_image: new FormControl(newProd.item_image),
      item_seq: new FormControl(newProd.item_seq)
      // popularity: new FormControl(newProd.popularity == 'yes' ? 1 : 0),
    }));

    this.totalItemNumber = this.totalItemNumber + 1;
    this.dataSource.push(newProd);
    this.table.renderRows();    // perform the view change for add/remove/move rows


    // console.log( 'addNewItemByImage this.formArray.---> ', this.formArray)
    // console.log( 'addNewItemByImage this.dataSource.---> ',this.dataSource)

  }

  addNewItem(newProdItem : ProductItem) {
    let newItemNum : number = 0;
    newItemNum = this.totalItemNumber + 1;

    this.formArray.push(new FormGroup({
      product_item_id: new FormControl(newProdItem.product_item_id),
      item_name: new FormControl(newProdItem.item_name),
      description: new FormControl(newProdItem.description),
      quantity: new FormControl(newProdItem.quantity),
      regular_price: new FormControl(newProdItem.regular_price),
      sale_price: new FormControl(newProdItem.sale_price),
      status: new FormControl(newProdItem.status),
      item_image: new FormControl(newProdItem.item_image),
      item_seq: new FormControl(newProdItem.item_seq)
      // popularity: new FormControl(newProd.popularity == 'yes' ? 1 : 0),
    }));

    this.totalItemNumber = this.totalItemNumber + 1;
    this.dataSource.push(newProdItem);
    console.log( 'addNewItem call from ProductAddMain this.dataSource.---> ',this.dataSource)
    this.table.renderRows();    // perform the view change for add/remove/move rows

  }


  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();

        reader.onload = (event:any) => {
          // console.log(event.target.result);

          this.newItemImageURLs.push(event.target.result);
          this.addNewItemByImage(event.target.result);
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  removeItem(event:any, i: number) {
    //console.log('Remove row number: ', i);
    if (this.dataSource[i].action == 'U') {
      this.delProductItemList.push(this.dataSource[i]);
      this.delProductItemList[this.delProductItemList.length-1].action = 'D';
    }
    this.dataSource.splice(i,1);
    console.log( 'this.delProductItemList ---> ',this.delProductItemList);

    //console.log( 'addNewItemByImage this.dataSource.---> ',this.dataSource)
    this.formArray.removeAt(i);
    //console.log( 'addNewItemByImage this.formArray.---> ', this.formArray)

    this.table.renderRows();    // perform the view change for add/remove/move rows
  }


  addInitialNewItems(otherProdImages : ImageFile[]) {
    // Loading initial item images from stepper 01 - ProductAddMainComponent

    console.log("================> addProductItemComponent this.addProductItemComponent.addInitialNewItems() <================ otherProdImages", otherProdImages);

    // this.parentProduct = product;

    if(this.isInitialLoad && otherProdImages.length > 0) {
      let noOfImages =  otherProdImages.length;

      for (let i = 0 ; i < noOfImages; i++ ) {
        let newProductItem:ProductItem;
        newProductItem = { product_item_id: 0, item_name: '', creation_date:'', regular_price: 0.00, sale_price: 0.00, quantity: 1, description: '', popularity: 0, status: 'NEW', product_id: 0, product_title: '', item_image: otherProdImages[i].image_file, item_seq: 0, action: 'I'};
        //this.productItemList.push(newProductItem);
        this.addNewItem(newProductItem);
        this.isInitialLoad = false;
      }
      console.log("================> Add initial items from ProductAddMainComponent : ", this.productItemList);
    }
  }

  addInitialNewItems2(inProd: Product) {

    // this.selectedProductID = inProd.product_id;
    this.selectedProduct = inProd;
    if (inProd.product_item_list.length > 0) {

      // if(this.isInitialLoad && otherProdImages.length > 0) {
        let noOfImages =  inProd.product_item_list.length;

        for (let i = 0 ; i < noOfImages; i++ ) {
          let newProductItem:ProductItem;
          newProductItem = {
            product_item_id: inProd.product_item_list[i].product_item_id,
            item_name: inProd.product_item_list[i].item_name,
            creation_date: inProd.product_item_list[i].creation_date,
            regular_price: inProd.product_item_list[i].regular_price,
            sale_price: inProd.product_item_list[i].sale_price,
            quantity: inProd.product_item_list[i].quantity,
            description: inProd.product_item_list[i].description,
            popularity: inProd.product_item_list[i].popularity,
            status: inProd.product_item_list[i].status,
            product_id: inProd.product_item_list[i].product_id,
            product_title: inProd.product_item_list[i].product_title,
            item_image: inProd.product_item_list[i].item_image,
            item_seq: inProd.product_item_list[i].item_seq,
            action: 'U'
          };
          //this.productItemList.push(newProductItem);
          this.addNewItem(newProductItem);
          this.isInitialLoad = false;
        }
        console.log("================> Add initial items from ProductAddMainComponent : ", this.productItemList);
      // }

    } else {
      this.otherProdImageUrls = this.getImageUrls(inProd.image_urls);
      this.downloadProdImages();
    }

  }

  saveProductItems(prodItemList: ProductItem[], parentProduct: Product) {
    console.log("================> saveProductItems this.formArray: ", this.formArray);
    console.log("================> saveProductItems this.productItemList: ", this.productItemList);
    console.log("================> saveProductItems this.dataSource: ", this.dataSource);
    console.log("================> saveProductItems prodItemList: ", prodItemList);
    console.log("================> saveProductItems newProduct: ", parentProduct);

    let formItems: any = [];
    let noOfItem = this.formArray.length;
    let curDateTime = new Date();

    formItems = this.formArray.value;

    // console.log("================> saveProductItems this.parentProduct : ", this.parentProduct);

    if (!parentProduct) {
      this.utilityService.toastify(false);
      return;
    }

    for (let i = 0; i < noOfItem; i++) {
      this.productItemList[i].item_name = formItems[i].item_name;
      this.productItemList[i].description = formItems[i].description;
      this.productItemList[i].quantity = formItems[i].quantity;
      this.productItemList[i].regular_price = formItems[i].regular_price;
      this.productItemList[i].sale_price = formItems[i].sale_price;
//      this.productItemList[i].status = formItems[i].status;
      this.productItemList[i].status = parentProduct.status
      this.productItemList[i].creation_date = curDateTime.toISOString();
      this.productItemList[i].product_id = parentProduct.product_id;
      this.productItemList[i].product_title = parentProduct.title;
      this.productItemList[i].item_seq = i+1;

    }

    if (this.delProductItemList.length > 0) {
      this.productItemList.push(...this.delProductItemList);
    }
    console.log("================> saveProductItems this.productItemList after copy : ", this.productItemList);


    this.userService.productItemsManip(this.productItemList).subscribe((response) => {
      if (response != null) {
        // console.log("Product Items Added Successfully, result with product item ID : ", response);
        this.productItemList = response;
        this.delProductItemList = [];  // clear the temporary list of the delete items
        console.log("Product Items Added Successfully, result with product item ID this.productItemList : ", this.productItemList);
        this.utilityService.toastify(true, "Product Item(s) Added Successfully");

        // this.router.navigate(['user/home/products']);
        //this.router.navigate(['customer/home']);
      } else {
        this.utilityService.toastify(false);
      }
    });

  }


  getImageUrls(imgUrlList: string) :string[] {

    let outUrls: string[] = [];

    if (imgUrlList) {
      outUrls = imgUrlList.split(';');
      // outUrls = [this.productEdit.main_image].concat(outUrls);
    } else {
      // outUrls = [this.productEdit.main_image].concat(outUrls);
    }

    console.log("===== Product Add Item Component - outUrls : ", outUrls);

    return outUrls;

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
        } else {

          console.log("================> addProductItemComponent this.addProductItemComponent.addInitialNewItems2() <================ otherProdImages", this.isInitialLoad , this.otherProdImageFiles.length, this.otherProdImageFiles);

          // this.parentProduct = product;

          if(this.isInitialLoad && this.otherProdImageFiles.length > 0) {
            // if(this.isInitialLoad && 3 > 0) {
            let noOfImages =  this.otherProdImageFiles.length;
            //   let noOfImages =  3

            for (let i = 0 ; i < noOfImages; i++ ) {
              let newProductItem:ProductItem;
              newProductItem = { product_item_id: 0, item_name: '', creation_date:'', regular_price: 0.00, sale_price: 0.00, quantity: 1, description: '', popularity: 0, status: 'NEW', product_id: this.selectedProduct.product_id, product_title: '', item_image: this.otherProdImageFiles[i].image_file, item_seq: 0, action: 'I'};
              //this.productItemList.push(newProductItem);
              this.addNewItem(newProductItem);
              this.isInitialLoad = false;
            }
            console.log("================> Add initial items from ProductAddMainComponent : ", this.productItemList);
          }

        }

      });


    //console.log("downloadProdImages base64Image: ", this.otherProdImageFiles);

  }

}
