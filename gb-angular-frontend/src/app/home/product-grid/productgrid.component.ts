import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilityService} from '../../services/utility.service';
import {Product} from '../../interfaces/product';
import {HttpHeaders} from '@angular/common/http';
import {DecimalPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {CartItem} from '../../interfaces/cart-item';
import {ProductPackage} from '../../interfaces/product-package';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {EndTime} from '../../interfaces/end-time';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../interfaces/category';
import {BrandService} from '../../services/brand.service';
import {Brand} from '../../interfaces/brand';
import {Wishlist} from '../../interfaces/wishlist';
import {ReviewOverallScore} from '../../interfaces/review-overall-score';
import {FormsModule} from '@angular/forms';
import {Options} from '@angular/cli/src/command-builder/command-module';

@Component({
  selector: 'app-productgrid',
  imports: [
    NgForOf,
    NgIf,
    MatPaginator,
    DecimalPipe,
    FormsModule,
    NgClass
  ],
  templateUrl: './productgrid.component.html',
  // styleUrl: './productgrid.component.scss'
  styleUrls:['./productgrid.component.scss', '../home.component.scss']
})
export class ProductgridComponent implements OnInit {

  curUserId: number = 0;
  productList: Product[] = [];
  productPackageList: ProductPackage[] = [];
  displayProdPkgList: ProductPackage[] = [];
  productPackageFilterList: ProductPackage[] = [];
  categories: Category[] = [];
  brands: Brand[] = [];
  isCategoryListOpen: boolean = true;
  isBrandListOpen: boolean = true;
  isSearchBarOpen: boolean = true;
  isPriceRangeOpen: boolean = true;
  isWishlist: boolean = false;
  selectedCategoryId: number = 0;
  //selectedBrands: number[] = [];
  selectedBrands: { [key: number]: boolean } = {};
  // selectedBrandIdList: number[];
  springHostUrl: string = '';
  curSymbol: string = '$'
  maxOrderQty: number = 0;
  searchValue: string = '';
  selectedSortOption: string = 'newest';
  minPrice: number = 1;
  maxPrice: number = 10000;
  minSelectedPrice: number = this.minPrice;
  maxSelectedPrice: number = this.maxPrice;
  priceSliderOptions: Options<any> = {
    floor: this.minPrice, // Minimum price
    ceil: this.maxPrice, // Maximum price
    step: 1, // Step size
    translate: (value: number): string => `£${value}`
  };

  length = 0;
  pageSize = 12;
  pageIndex = 0;
  // pageSizeOptions = [5, 10, 25];
  pageSizeOptions = [12, 24, 48];
  startProductIndex: number = 0;
  endProductIndex: number = 0;

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent?: PageEvent;

  @ViewChildren('sellTypeBtn') sellTypeButtons!: QueryList<ElementRef>;

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private route: ActivatedRoute,
    private router: Router,
    protected utilityService: UtilityService
  ) {
    this.curUserId = this.userService.getUserToken().user_id;
    this.springHostUrl = this.utilityService.getSpringServerApiUrl();
    this.maxOrderQty = this.utilityService.getMaxOrderQty();
  }

  ngOnInit(): void {
    // this.getProductList();
    this.getSelectCategory();
    this.getSearchValue();
    // console.log('ngOnInit Selected Category Updated:', this.selectedCategoryId);
    this.getProductPackageList();
    this.getAllCategories();
    this.getAllBrands();
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol()

  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((c) => {
      this.categories = c;
      // console.log(this.categories);//
    });
  }

  toggleCategoryList() {
    this.isCategoryListOpen = !this.isCategoryListOpen;
  }

  getSelectCategory(){
    this.categoryService.selectedCategoryId.subscribe(id => {
      this.selectedCategoryId = id;
      // console.log('getSelectCategory Selected Category Updated:', this.selectedCategoryId);
    });
  }

  getAllBrands() {
    this.brandService.getAllBrands().subscribe((b) => {
      this.brands = b;
      //console.log(this.brands);//
      this.brands.forEach(brand => {
        this.selectedBrands[brand.brand_id] = true;
      });
      this.selectedBrands[0] = true;
      //console.log('ngOnInit selectedBrands:', this.selectedBrands);
    });
  }

  toggleBrandList() {
    this.isBrandListOpen = !this.isBrandListOpen;
  }


/*  getProductList(): void {
    this.userService.getProductList().subscribe((response) => {
      this.productList = response;
      console.log("===== ProductgridComponent - getProductList() : ", this.productList);

    });
  }*/

  getProductPackageList(): void {
    /*this.userService.getProductPackageList(this.curUserId ? this.curUserId : -1).subscribe((response) => {
      this.productPackageList = response;
      this.productPackageFilterList = this.productPackageList;
      this.displayProdPkgList = this.productPackageFilterList;

      console.log("===== ProductgridComponent - getProductPackageList() : ", this.productPackageList);
      this.length = this.productPackageList.length;
      this.initPageItemLoad(this.displayProdPkgList);
      this.createPackageEndTimeCounters();
      // this.createPackageEndTimeCounters();
    });*/
    this.userService.getProductPackageList(this.curUserId ? this.curUserId : -1).subscribe((response) => {
      this.productPackageList = response;
      // console.log('getProductPackageList Selected Category Updated:', this.selectedCategoryId);
      this.onDisplayProdPkgList();
    });
  }

  addItemToCart(p :ProductPackage){
    console.log("===== ProductgridComponent - addToCart() : ", p);

    let cartItem: CartItem = {
      buyer_id: this.curUserId,
      product_id: p.product_id,
      product_title: p.title,
      // package_id: 0,
      // package_name: '',
      seller_id: p.seller_id,
      seller_username: p.seller_username,
      quantity: 1,
      unit_price: p.sell_type == 'G' ? p.grpbuy_sale_price? p.grpbuy_sale_price: 0 : p.sale_price? p.sale_price: 0,
      sub_Total: (p.sell_type == 'G' ? p.grpbuy_sale_price ? p.grpbuy_sale_price : 0 : p.sale_price ? p.sale_price : 0) * 1,
      sell_type: p.sell_type,
      item_image_url: p.main_image,
      grpbuy_end: p.grpbuy_end
    };
    this.userService.addItemToCart(cartItem).subscribe((response) => {
      this.utilityService.toastify(response != null, "Item added to cart");
      this.userService.toRefreshCart();
    });

  }

  displayProductInfo(pid: number, sType: string): void {
    this.router.navigate(['smartgroup/productdetail/' + pid + '/' + sType]);
  }

  displayPackageInfo(gid: number) {
    this.router.navigate(['smartgroup/packagegrid/' + gid]);
  }

  onDisplayProdPkgList() {
    this.resetTimer();
    const keyword = this.searchValue.toLowerCase().trim();
    if (this.selectedCategoryId != 0){
      // this.productPackageFilterList = this.productPackageList.filter(p => p.category_id == this.selectedCategoryId);
      this.productPackageFilterList = this.productPackageList.filter(p => (
        p.category_id == this.selectedCategoryId && this.selectedBrands[p.brand_id] &&
        (p.title.toLowerCase().includes(keyword) || p.brand_name.toLowerCase().includes(keyword)) &&
        p.sale_price >= this.minSelectedPrice && p.sale_price <= this.maxSelectedPrice));
    } else {
      // this.productPackageFilterList = this.productPackageList;
      this.productPackageFilterList = this.productPackageList.filter(
        p => (this.selectedBrands[p.brand_id] &&
          (p.title.toLowerCase().includes(keyword) || p.brand_name.toLowerCase().includes(keyword)) &&
          p.sale_price >= this.minSelectedPrice && p.sale_price <= this.maxSelectedPrice));
    }
    this.displayProdPkgList = this.productPackageFilterList;
    this.sortProdPkgList();
    this.initPageItemLoad(this.displayProdPkgList);
    this.createPackageEndTimeCounters();
  }

  onDisplayProductList() {
    this.resetTimer();
    const keyword = this.searchValue.toLowerCase().trim();
    /*const keyword = this.searchValue;
    keyword.toLowerCase().trim();*/
    if (this.selectedCategoryId != 0){
      // this.productPackageFilterList = this.productPackageList.filter(p => (p.sell_type == 'S' && p.category_id == this.selectedCategoryId));
      this.productPackageFilterList = this.productPackageList.filter(
        p => (p.sell_type == 'S' && p.category_id == this.selectedCategoryId && this.selectedBrands[p.brand_id] &&
          (p.title.toLowerCase().includes(keyword) || p.brand_name.toLowerCase().includes(keyword)) &&
          p.sale_price >= this.minSelectedPrice && p.sale_price <= this.maxSelectedPrice));
    } else {
      // this.productPackageFilterList = this.productPackageList.filter(p => p.sell_type == 'S');
      this.productPackageFilterList = this.productPackageList.filter(
        p => (p.sell_type == 'S' && this.selectedBrands[p.brand_id] &&
          (p.title.toLowerCase().includes(keyword) || p.brand_name.toLowerCase().includes(keyword)) &&
          p.sale_price >= this.minSelectedPrice && p.sale_price <= this.maxSelectedPrice));
    }
    this.displayProdPkgList = this.productPackageFilterList;
    this.initPageItemLoad(this.displayProdPkgList);
    this.createPackageEndTimeCounters();
  }

  onDisplayPackageList() {
    this.resetTimer();
    const keyword = this.searchValue.toLowerCase().trim();
    if (this.selectedCategoryId != 0){
      // this.productPackageFilterList = this.productPackageList.filter(p => ((p.sell_type == 'P' || p.sell_type == 'G') && p.category_id == this.selectedCategoryId));
      this.productPackageFilterList = this.productPackageList.filter(
        p => ((p.sell_type == 'P' || p.sell_type == 'G') &&
        p.category_id == this.selectedCategoryId && this.selectedBrands[p.brand_id] &&
          (p.title.toLowerCase().includes(keyword) || p.brand_name.toLowerCase().includes(keyword)) &&
          p.sale_price >= this.minSelectedPrice && p.sale_price <= this.maxSelectedPrice));
    } else {
      // this.productPackageFilterList = this.productPackageList.filter(p => (p.sell_type == 'P' || p.sell_type == 'G'));
      this.productPackageFilterList = this.productPackageList.filter(
        p => ((p.sell_type == 'P' || p.sell_type == 'G') &&
          this.selectedBrands[p.brand_id] && (p.title.toLowerCase().includes(keyword) || p.brand_name.toLowerCase().includes(keyword)) &&
          p.sale_price >= this.minSelectedPrice && p.sale_price <= this.maxSelectedPrice));
    }
    this.displayProdPkgList = this.productPackageFilterList;
    this.initPageItemLoad(this.displayProdPkgList);
    this.createPackageEndTimeCounters();
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;


    // console.log("===== ProductgridComponent - this.pageSize : ", this.pageSize);
    // console.log("===== ProductgridComponent - this.pageIndex : ",this.pageIndex);

    // let startProductIndex = 0;
    // let endProductIndex = 0;

    this.startProductIndex = (this.pageSize * this.pageIndex) + 1;
    this.endProductIndex = this.pageSize * (this.pageIndex + 1) > this.length ? this.length : this.pageSize * (this.pageIndex + 1);


    // console.log("===== ProductgridComponent - startProductIndex : ", this.startProductIndex);
    // console.log("===== ProductgridComponent - endProductIndex : ", this.endProductIndex);

    this.resetTimer();
    this.displayProdPkgList = [];
    for (let i = this.startProductIndex-1; i < this.endProductIndex ; i++ ) {
      this.displayProdPkgList.push(this.productPackageFilterList[i])
    }

    this.createPackageEndTimeCounters();

  }

  initPageItemLoad(prodPkgList: ProductPackage[]) {
    this.length = prodPkgList.length;
    this.pageSize = 12;
    this.pageIndex = 0;


    // console.log("===== ProductgridComponent - this.pageSize : ", this.pageSize);
    // console.log("===== ProductgridComponent - this.pageIndex : ",this.pageIndex);


    this.startProductIndex = (this.pageSize * this.pageIndex) + 1;
    this.endProductIndex = this.pageSize * (this.pageIndex + 1) > this.length ? this.length : this.pageSize * (this.pageIndex + 1);


    // console.log("===== ProductgridComponent - startProductIndex : ", this.startProductIndex);
    // console.log("===== ProductgridComponent - endProductIndex : ", this.endProductIndex);

    this.displayProdPkgList = [];
    for (let i = this.startProductIndex-1; i < this.endProductIndex ; i++ ) {
      this.displayProdPkgList.push(prodPkgList[i])
    }
  }


  setPkgEndTimeCounter(pkgGroupIndex: number, endTime:string){

    //const finaleDate: number = new Date("March 2, 2025 00:00:00").getTime();
    const finaleDate: number = new Date(endTime).getTime();
    // console.log("===== PackageGrid Component - setEndTimeCounter() endTime: ", endTime);
    // console.log("===== PackageGrid Component - setEndTimeCounter() finaleDate: ", finaleDate);

    const timer = (): void => {
      const now: number = new Date().getTime();
      let diff: number = finaleDate - now;

      // console.log("===== PackageGrid Component - setEndTimeCounter() : ", diff);

      if (diff < 0) {
        // console.log("===== ProductgridComponent - setPkgEndTimeCounter diff : ", diff);
        // return
      }

      let days: string | number = Math.floor(diff / (1000 * 60 * 60 * 24));
      let hours: string | number = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
      let minutes: string | number = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
      let seconds: string | number = Math.floor(diff % (1000 * 60) / 1000);

      let endTimeCounter: EndTime = {EndDay: '', EndHour: '', EndMin: '', EndSec: ''};

      days = days <= 9 ? `${days}` : days;
      hours = hours <= 9 ? `${hours}` : hours;
      minutes = minutes <= 9 ? `0${minutes}` : minutes;
      seconds = seconds <= 9 ? `0${seconds}` : seconds;

      endTimeCounter.EndDay = days;
      endTimeCounter.EndHour = hours;
      endTimeCounter.EndMin = minutes;
      endTimeCounter.EndSec = seconds;

      // console.log("===== ProductgridComponent - setPkgEndTimeCounter pkgGroupIndex endTimeCounter : ", pkgGroupIndex, endTimeCounter);
      // console.log("===== ProductgridComponent - setPkgEndTimeCounter this.displayProdPkgList : ", this.displayProdPkgList);
      this.displayProdPkgList[pkgGroupIndex].pkg_end_time_counter = endTimeCounter;

      // console.log("===== ProductgridComponent - setPkgEndTimeCounter this.displayProdPkgList[pkgGroupIndex].pkg_end_time_counter : ", this.displayProdPkgList[pkgGroupIndex].pkg_end_time_counter);

    }

    clearInterval(this.displayProdPkgList[pkgGroupIndex].timer);

    timer();
    this.displayProdPkgList[pkgGroupIndex].timer = setInterval(timer, 1000);

  }


  resetTimer() {

    for(let i = 0; i < this.displayProdPkgList.length; i++) {
      clearInterval(this.displayProdPkgList[i].timer);
    }
  }

  createPackageEndTimeCounters() {

    for(let i = 0; i < this.displayProdPkgList.length; i++ ) {
      if (this.displayProdPkgList[i].sell_type == 'P') {
        this.setPkgEndTimeCounter(i, this.displayProdPkgList[i].pkg_grpbuy_end);
      }
      if (this.displayProdPkgList[i].sell_type == 'G') {
        this.setPkgEndTimeCounter(i, this.displayProdPkgList[i].grpbuy_end);
      }
    }

  }

  toggleWishlist(p: ProductPackage) {

    console.log("toggleWishlist - To be implemented! ", p.product_id );

    if (!this.curUserId) {
      this.router.navigate(['smartgroup/auth/login']);
    }

    if (p.wished) {
      p.wished = '';
    }  else {
      p.wished = this.curUserId.toString();
      this.addWishlistItem(p);
    }


  }

  addWishlistItem(p :ProductPackage) {
    console.log("===== ProductgridComponent - addWishlistItem() : ", p);

    let wishlist: Wishlist = {
      user_id: this.curUserId,
      product_id: p.product_id,
      product_title: p.title,
      regular_price: p.regular_price,
      sale_price: p.sale_price,
      product_image: p.main_image,
      stock_status: p.stock_status,
      sell_type: p.sell_type,
      package_grp_id: p.pkg_grp_id,
      package_grp_name: p.pkg_grp_name
    };
    this.userService.addWishlistItem(wishlist).subscribe((response) => {
      this.utilityService.toastify(response != null, "Item added to wishlist");
      this.userService.toRefreshWishlist();
    });
  }

  calOverScore(ros : ReviewOverallScore) : number{

    let overScore : number = -1;

    if(ros) {
      overScore = ros? (ros.total_review_score / ros.total_review_count): -1;
    }

    return overScore;
  }


  onSelectCategory(cid: number) {
    if (this.selectedCategoryId != cid){
      this.selectedCategoryId = cid;
    } else {
      this.selectedCategoryId = 0;
    }
    const selectedButton = this.sellTypeButtons.find(btn => btn.nativeElement.getAttribute('aria-selected') === 'true');

    if (selectedButton) {
      console.log('Selected Button ID:', selectedButton.nativeElement.id);
      if (selectedButton.nativeElement.id == "sell-prod-pkg-tab"){
        this.onDisplayProdPkgList();
      }
      if (selectedButton.nativeElement.id == "sell-product-tab"){
        this.onDisplayProductList();
      }
      if (selectedButton.nativeElement.id == "sell-package-tab"){
        this.onDisplayPackageList();
      }
    } else {
      console.log('No button is selected.');
    }
  }

  onBrandChange(event: any, brandId: number) {
    this.selectedBrands[brandId] = event.target.checked;
    console.log(this.selectedBrands);

    const selectedButton = this.sellTypeButtons.find(btn => btn.nativeElement.getAttribute('aria-selected') === 'true');

    if (selectedButton) {
      console.log('Selected Button ID:', selectedButton.nativeElement.id);
      if (selectedButton.nativeElement.id == "sell-prod-pkg-tab"){
        this.onDisplayProdPkgList();
      }
      if (selectedButton.nativeElement.id == "sell-product-tab"){
        this.onDisplayProductList();
      }
      if (selectedButton.nativeElement.id == "sell-package-tab"){
        this.onDisplayPackageList();
      }
    } else {
      console.log('No button is selected.');
    }
  }

  onSearch(): void {
    // this.searchValue = this.searchValue.toLowerCase().trim();

    const selectedButton = this.sellTypeButtons.find(btn => btn.nativeElement.getAttribute('aria-selected') === 'true');

    if (selectedButton) {
      if (selectedButton.nativeElement.id == "sell-prod-pkg-tab"){
        this.onDisplayProdPkgList();
      }
      if (selectedButton.nativeElement.id == "sell-product-tab"){
        this.onDisplayProductList();
      }
      if (selectedButton.nativeElement.id == "sell-package-tab"){
        this.onDisplayPackageList();
      }
    } else {
      // this.productPackageFilterList = [...this.productPackageFilterList]; // Reset to full list
      console.log('No button is selected.');
    }
  }

  sortProdPkgList(): void {
    switch (this.selectedSortOption) {
      case 'newest':
        this.displayProdPkgList.sort((p1, p2) =>
          new Date(p2.creation_date).getTime() - new Date(p1.creation_date).getTime());
        break;
      case 'oldest':
        this.displayProdPkgList.sort((p1, p2) =>
          new Date(p1.creation_date).getTime() - new Date(p2.creation_date).getTime());
        break;
      case 'priceLowHigh':
        this.displayProdPkgList.sort((p1, p2) => p1.sale_price - p2.sale_price);
        break;
      case 'priceHighLow':
        this.displayProdPkgList.sort((p1, p2) => p2.sale_price - p1.sale_price);
        break;
      /*case 'popularity':
        this.productPackageFilterList.sort((p1, p2) => p2.likes - p1.likes);
        break;*/
      case 'nameAsc':
        this.displayProdPkgList.sort((p1, p2) => p1.title.localeCompare(p2.title));
        break;
      case 'nameDesc':
        this.displayProdPkgList.sort((p1, p2) => p2.title.localeCompare(p1.title));
        break;
      default:
        break;
    }
  }

  filterProductsByPrice(): void {
    // Ensure min is always less than max
    if (this.minSelectedPrice > this.maxSelectedPrice) {
      let temp = this.minSelectedPrice;
      this.minSelectedPrice = this.maxSelectedPrice;
      this.maxSelectedPrice = temp;
    }

    const selectedButton = this.sellTypeButtons.find(btn => btn.nativeElement.getAttribute('aria-selected') === 'true');

    if (selectedButton) {
      if (selectedButton.nativeElement.id == "sell-prod-pkg-tab"){
        this.onDisplayProdPkgList();
      }
      if (selectedButton.nativeElement.id == "sell-product-tab"){
        this.onDisplayProductList();
      }
      if (selectedButton.nativeElement.id == "sell-package-tab"){
        this.onDisplayPackageList();
      }
    } else {
      console.log('No button is selected.');
    }
  }

  toggleSearchBar() {
    this.isSearchBarOpen = !this.isSearchBarOpen;
  }

  togglePriceRange() {
    this.isPriceRangeOpen = !this.isPriceRangeOpen;
  }

  getSearchValue(){
    this.userService.searchValue.subscribe(keyword => {
      this.searchValue = keyword;
    });
  }


}
