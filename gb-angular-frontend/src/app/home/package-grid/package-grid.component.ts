import {Component, Inject, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {DecimalPipe, DOCUMENT, NgForOf, NgIf, NgStyle} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilityService} from '../../services/utility.service';
import {DomSanitizer, Meta, Title} from '@angular/platform-browser';
import {PackageGroup} from '../../interfaces/package-group';
import {Package} from '../../interfaces/package';
import {concatMap, delay, of, repeat} from 'rxjs';
import {Product} from '../../interfaces/product';
import {CartItem} from '../../interfaces/cart-item';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Wishlist} from '../../interfaces/wishlist';
import {ReviewOverallScore} from '../../interfaces/review-overall-score';

@Component({
  selector: 'app-package-grid',
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    NgStyle,
    DecimalPipe
  ],
  templateUrl: './package-grid.component.html',
  styleUrl: './package-grid.component.scss'
})
export class PackageGridComponent implements OnInit, OnDestroy{

  packageGroupId: number = 0;
  curUserId: number = 0;
  curSymbol: string = '$';
  maxOrderQty: number = 0;
  packageGroup: PackageGroup = {} as any;
  trustedScript: any;
  packageMainImageList: any[] = [];
  packageListImages: string[][] = [];
  packageList: Package[] = [];
  product: Product | any;
  productDescription:any;
  product_sell_style: string = '';
  imgTimer: any;
  packageTimer: any;
  timeLeft: number = 0;
  thresholdProgressList: number[] = [];
  overallThresholdProgress: number = 0;
  reviewOverallScore: ReviewOverallScore = {} as any;
  avgOverallSore: number = -1;

  otherProdImageUrls: string[] = [];
  displayImage: string = '';
  modalImageSrc: string = '';
  springServerBaseUrl: string = '';
  imgSrc:string = '';


  packFormArray!: FormArray<FormGroup<{
    quantity: FormControl<any>;
  }>>;

  orderQty: any =
    {
      quantity: 1,
    };



  constructor(
  private _renderer2: Renderer2,
  @Inject(DOCUMENT) private readonly document: Document,
  @Inject(DOCUMENT) private _document: Document,
  private http: HttpClient,
  private userService: UserService,
  private route: ActivatedRoute,
  private utilityService: UtilityService,
  private router: Router,
  private sanitizer: DomSanitizer,
  public meta: Meta,
  public title: Title) {

    // this.trustedScript = this.sanitizer.bypassSecurityTrustScript(this.appendJScriptStmt01());
    // console.log("===== PackageGridComponent - ngOnInit() this.packageGroup: ",  this.trustedScript)
  };



  ngOnInit() {

    this.packageGroupId = this.route.snapshot.params['gid'];
    this.packFormArray = new FormArray([]) as any;

    this.curUserId = this.userService.getUserToken().user_id;
    this.curSymbol =  this.utilityService.getSysBaseCurrencySymbol()
    this.springServerBaseUrl = this.utilityService.getSpringServerApiUrl();
    this.maxOrderQty = this.utilityService.getMaxOrderQty();

    this.userService.getPackageGroup(this.packageGroupId, this.curUserId?this.curUserId :-1 ).subscribe((response) => {

      // console.log("===== ProductdetailComponent - ngOnInit() this.route.snapshot.params['pid']: ", this.route.snapshot.params['pid']);
      // console.log("===== ProductdetailComponent - ngOnInit() this.productId : ", this.productId);

      this.packageGroup = response;

      this.packageList = this.packageGroup.package_list;
      this.product = this.packageGroup.product;
      this.product_sell_style = this.product.sell_style;
      this.reviewOverallScore = this.product.review_overall_score as any;
      this.productDescription = this.sanitizer.bypassSecurityTrustHtml(this.product.description);

      this.displayImage = this.product.main_image;
      this.otherProdImageUrls = this.getImageUrls(this.product.image_urls);

      this.setPackOrderQtyFormControl();
      this.setThresholdProgress();
      this.setEndTimeCounter(this.packageGroup.grpbuy_end);
      this.setOverScoreDetail();
      this.setPackageImages();
      // console.log("===== PackageGridComponent - ngOnInit() this.packageMainImageList before: ", this.packageMainImageList);
      this.autoShowAllPackageImages();
      // console.log("===== PackageGridComponent - ngOnInit() this.packageMainImageList after: ", this.packageMainImageList);
      //
      console.log("===== PackageGridComponent - ngOnInit() this.packageGroup: ", this.packageGroup);
      // console.log("===== PackageGridComponent - ngOnInit() this.packageGroupId: ", this.packageGroupId);
      // console.log("===== PackageGridComponent - ngOnInit() this.packageGroup.package_grp_name: ", this.packageGroup.package_grp_name);
      console.log("===== PackageGridComponent - ngOnInit() this.packageGroup.package_list: ", this.packageGroup.package_list);
      // console.log("===== PackageGridComponent - ngOnInit() this.packageListImages: ", this.packageListImages);

    });

    this.addJScriptStmt(this.appendJScriptStmt01());


  }

  setThresholdProgress() {
    let noOfPacks : number = 0;
    let gMinThreshold : number = 0;
    let pMinThreshold : number = 0;

    this.thresholdProgressList = [];
    this.overallThresholdProgress = 0;
    noOfPacks = this.packageList.length;
    gMinThreshold = this.packageGroup.min_threshold;

    for (let i = 0; i < noOfPacks; i++) {
      pMinThreshold = 0;
      if (gMinThreshold > 0) {
        pMinThreshold = ((this.packageList[i].grpbuy_order_count / gMinThreshold) * 100).toFixed(0) as any;
        if (pMinThreshold > 100) {
          pMinThreshold = 100;
        }
      } else {
        pMinThreshold= 100;
      }
      this.thresholdProgressList.push(pMinThreshold);
      this.overallThresholdProgress = this.thresholdProgressList.reduce((a,b) => Math.min(a, b));

    }

  }

  setPackageImages() {
    let noOfPacks : number = 0;
    noOfPacks = this.packageList.length;
    this.packageMainImageList = [];

    //console.log("===== PackageGridComponent - ngOnInit() this.setPackageMainImages this.packageList.length: ", this.packageList.length);

    for (let i = 0; i < noOfPacks; i++) {
      this.packageListImages.push([]);
      this.packageMainImageList.push(this.packageList[i].package_item_list[0].productItem.item_image)

      for (let j = 0; j < this.packageList[i].package_item_list.length; j++) {
        this.packageListImages[i].push(this.packageList[i].package_item_list[j].productItem.item_image);
      }
    }
  }

  setPackOrderQtyFormControl() {
    let noOfPacks : number = 0;
    noOfPacks = this.packageList.length;

    for (let i = 0; i < noOfPacks; i++) {

      this.packFormArray.push(new FormGroup({
        quantity: new FormControl(this.orderQty.quantity),
      }));

    }

  }

  qtyCounter(i: number) {
    return new Array(i);
  }

  getControl(index: number, controlName: string): FormControl {
    return (this.packFormArray.at(index) as FormGroup).get(controlName) as FormControl;
  }

  onSelectQty(i: number){
    // console.log("===== PackageGridComponent - onSelectQty this.packFormArray.value[i].quantity: ", i, this.packFormArray.value[i].quantity);
  }


  autoShowAllPackageImages() {

    this.imgTimer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 5;
      }
      if (this.timeLeft == 3) { //when 5 simply change the state
        // this.state = 'out';

        for (let i = 0; i < this.packageList.length; i++) {
          let j = this.packageList[i].package_item_list.length;
          let k = this.getRandomInt(0, j - 1);
          this.packageMainImageList[i] = this.packageList[i].package_item_list[k].productItem.item_image;
        }
      }
      }, 1000
    );

    // for (let i = 0; i < this.packageList.length; i++) {

    //   setInterval(() => {
    //     this.packageMainImageList[i] = '';
    //     }, 3000
    //   );

      // this.packageMainImageList[i] = of(this.packageListImages[i]).pipe(
      //   concatMap(url => of(url).pipe(delay(3000))),
      //   repeat()
      // );

/*
      this.packageMainImageList[i] = of('http://192.168.56.104:8080/api/gb/uploads/8/HP01.png', 'http://192.168.56.104:8080/api/gb/uploads/8/ASUS04.png', 'http://192.168.56.104:8080/api/gb/uploads/8/ASUS01(1).png').pipe(
        concatMap(url => of(url).pipe(delay(3000))),
        repeat()
      );
*/
      // this.imgTimer[i] =

    // }

  }

  ngOnDestroy() {
    clearInterval(this.imgTimer);
    clearInterval(this.packageTimer);
  }

  getRandomInt(min:number , max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  onAddPackageToCart(pkg: Package, index: number){
    console.log("===== Productdetail Component - onAddPackageToCart() : ", pkg);
    // console.log("===== Productdetail Component - selectedQuantity : ", this.selectedQuantity);

    let cartItem: CartItem = {
      buyer_id: this.curUserId,
      product_id: pkg.product_id,
      product_title: pkg.product_title,
      package_id: pkg.package_id,
      // package_name: pkg.package_name,
      package_name: pkg.description,
      seller_id: this.packageGroup?.product.seller_id,
      seller_username: this.packageGroup?.product.seller_username,
      quantity: this.packFormArray.value[index].quantity as number,
      unit_price: pkg.sale_price,
      sub_Total: pkg.sale_price * (this.packFormArray.value[index].quantity as number),
      sell_type: 'P',
      item_image_url: pkg.package_item_list[0].productItem.item_image,
      package_grp_id: this.packageGroup?.package_grp_id,
      package_grp_name: this.packageGroup?.package_grp_name,
      package_item_list: pkg.package_item_list,
      grpbuy_end: this.packageGroup.grpbuy_end
    };
    this.userService.addItemToCart(cartItem).subscribe((response) => {
      this.utilityService.toastify(response != null, "Item added to cart");
      this.userService.toRefreshCart();
      this.packageList[index].quantity = this.packageList[index].quantity - (this.packFormArray.value[index].quantity as number);
    });

  }


  getImageUrls(imgUrlList: string) :string[] {

    let outUrls: string[] | any = [];

    if (imgUrlList) {
      outUrls = imgUrlList.split(';');
      outUrls = [this.product?.main_image].concat(outUrls);
    } else {
      outUrls = [this.product?.main_image].concat(outUrls);
    }

    console.log("===== Productdetail Component - outUrls : ", outUrls);

    return outUrls;

  }

  displayThumbnailImage(index: number): string {
    let imageUrl = '';

    if (index==0) {
      imageUrl = this.otherProdImageUrls[0];
    } else {
      imageUrl= this.springServerBaseUrl + '/' + this.otherProdImageUrls[index];
    }

    return imageUrl;

  }

  onChangeImage(index: number) {
    if (index==0) {
      this.displayImage = this.otherProdImageUrls[0];
    } else {
      this.displayImage = this.springServerBaseUrl + '/' + this.otherProdImageUrls[index];
    }
  }

  toDirectBuy(pdt: Product){
    if (pdt.sell_style == 'SP' || pdt.sell_style == 'SGP') {
      this.router.navigate(['smartgroup/productdetail/' + pdt.product_id + '/S']);
    }

    if (pdt.sell_style == 'GP') {
      this.router.navigate(['smartgroup/productdetail/' + pdt.product_id + '/G']);
    }


    if (pdt.sell_style == 'P') {
      this.router.navigate(['smartgroup/packagegrid/' + this.packageGroupId]);
    }
  }

  private addJScriptStmt(scriptStr: string) {
    let scriptStmt = this._renderer2.createElement('script');
    //script.type = `application/ld+json`;
    scriptStmt.text = scriptStr;
    this._renderer2.appendChild(this._document.body, scriptStmt);
  }


  private appendJScriptStmt01() : string {
    let appendJScriptStmt: string = '';

    appendJScriptStmt = `
        const current = document.getElementById("current");
        const opacity = 0.6;
        const imgs = document.querySelectorAll(".img");
        imgs.forEach(img => {
            img.addEventListener("click", (e) => {
                //reset opacity
                imgs.forEach(img => {
                    img.style.opacity = 1;
                });
                current.src = e.target.src;
                //adding class
                //current.classList.add("fade-in");
                //opacity
                e.target.style.opacity = opacity;
            });
        });
    `;

    return appendJScriptStmt;
  }

  onSelectImage(event: any, pkgIndex: number){
    // console.log("===== PackageGridComponent -   onSelectImage(img: any, pkgIndex) : ", img.target.src, pkgIndex);
    this.packageMainImageList[pkgIndex] = event.target.src;
    this.modalImageSrc = event.target.src;
  }

  setEndTimeCounter(endTime:string){

    //const finaleDate: number = new Date("March 2, 2025 00:00:00").getTime();
    const finaleDate: number = new Date(endTime).getTime();
    // console.log("===== PackageGrid Component - setEndTimeCounter() endTime: ", endTime);
    // console.log("===== PackageGrid Component - setEndTimeCounter() finaleDate: ", finaleDate);

    let timer2 = (): void => {
      const now: number = new Date().getTime();
      let diff: number = finaleDate - now;

      // console.log("===== PackageGrid Component - setEndTimeCounter() : ", diff);

      if (diff < 0) {
        const alertElement = document.querySelector('.alert') as HTMLElement;
        const containerElement = document.querySelector('.container') as HTMLElement;
        if (alertElement) alertElement.style.display = 'block';
        if (containerElement) containerElement.style.display = 'none';
      }

      let days: string | number = Math.floor(diff / (1000 * 60 * 60 * 24));
      let hours: string | number = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
      let minutes: string | number = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
      let seconds: string | number = Math.floor(diff % (1000 * 60) / 1000);

      // days = days <= 99 ? `0${days}` : days;
      // days = days <= 9 ? `00${days}` : days;
      // hours = hours <= 9 ? `0${hours}` : hours;
      // days = days <= 99 ? `0${days}` : days;
      days = days <= 9 ? `${days}` : days;
      hours = hours <= 9 ? `${hours}` : hours;
      minutes = minutes <= 9 ? `0${minutes}` : minutes;
      seconds = seconds <= 9 ? `0${seconds}` : seconds;

      const daysElement = document.querySelector('#days') as HTMLElement;
      const hoursElement = document.querySelector('#hours') as HTMLElement;
      const minutesElement = document.querySelector('#minutes') as HTMLElement;
      const secondsElement = document.querySelector('#seconds') as HTMLElement;

      if (daysElement) daysElement.textContent = days as string;
      if (hoursElement) hoursElement.textContent = hours as string;
      if (minutesElement) minutesElement.textContent = minutes as string;
      if (secondsElement) secondsElement.textContent = seconds as string;
    }

    timer2();
    this.packageTimer = setInterval(timer2, 1000);

  }

  togglePkgGrpWishlist(pkgGrp : PackageGroup) {

    console.log("togglePackGrpWishlist - To be implemented! ", pkgGrp.product_id, pkgGrp.package_grp_id );

    if (!this.curUserId) {
      this.router.navigate(['smartgroup/auth/login']);
    }

    if (pkgGrp.wished) {
      pkgGrp.wished = '';
    }  else {
      pkgGrp.wished = this.curUserId.toString();
    }

  }

  togglePkgWishlist(pkg : Package) {

    console.log("togglePkgWishlist - To be implemented! ", pkg.product_id, pkg.package_id );

    if (!this.curUserId) {
      this.router.navigate(['smartgroup/auth/login']);
    }

    if (pkg.wished) {
      pkg.wished = '';
    }  else {
      pkg.wished = this.curUserId.toString();
      this.onAddPackageToWishlist(pkg);
    }

  }

  onAddPackageToWishlist(pkg: Package){
    console.log("===== Productdetail Component - onAddPackageToWishlist() : ", pkg);

    let wishlist: Wishlist = {
      user_id: this.curUserId,
      product_id: pkg.product_id,
      product_title: pkg.product_title,
      regular_price: pkg.regular_price,
      sale_price: pkg.sale_price,
      product_image: pkg.package_item_list[0].productItem.item_image,
      package_grp_id: this.packageGroup?.package_grp_id,
      package_grp_name: this.packageGroup?.package_grp_name,
      package_id: pkg.package_id,
      package_name: pkg.description,
      package_item_list: pkg.package_item_list,
      sell_type: 'P',
    };
    this.userService.addWishlistItem(wishlist).subscribe((response) => {
      this.utilityService.toastify(response != null, "Item added to wishlist");
      this.userService.toRefreshWishlist();
    });

  }

  setOverScoreDetail() {

    if(this.reviewOverallScore) {
      this.avgOverallSore = this.reviewOverallScore.total_review_count? (this.reviewOverallScore.total_review_score / this.reviewOverallScore.total_review_count): -1;
    }
  }

}
